const { Jwtoken } = require('../services/jwt')
const { UserCreatedPublisher } = require('../events/publisher/user-created-publisher');
const { natsWrapper } = require('../nats-wrapper');
const mongoose = require('mongoose');
const { createWriteStream, mkdir } = require('fs')

const { User } = require('../models/user')

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: "dh8rg0xrn",
  api_key: "639998231479181",
  api_secret: "oU-neJZN0glGqko67dDrs6egrt8"
})

const storeUpload = async ({ stream, filename, mimetype, user }) => {
  const id = mongoose.Types.ObjectId();
  let path = ""
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(
        cloudinary.uploader.upload_stream({
          folder: `matcher/users/${user.id}/profile`
        },(error, result) => {
          if (error) {
            reject(error)
          }
          path = result.url
          resolve({id, path: result.url, filename, mimetype})
       })  
      )
      // .on("finish", () => {
      //   resolve({id, path, filename, mimetype })
      // })
      // .on("error", reject)
  );
};

const processUpload = async (upload, user) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  try {
    const file = await storeUpload({ stream, filename, mimetype, user });
    await User.findByIdAndUpdate(user.id, {profileImage: file.path}, {
      new: true
    });
  
    return file;
  } catch (err) {
    console.log(err)
  }
};


const Mutation = {
  async signUpUser(info, args, { models: { User }}) {
    
    const phoneID = mongoose.Types.ObjectId()

    try {

      const findUser = await User.findOne({ email: args.email})    

      if (findUser) {
        throw new Error("User already exists")
      }
  
      const user = User.build({ email: args.email, password: args.password, phoneID });
      
      if (user) {
        const userCreated = {
          id: user.id,
          phoneID
        }
  
        new UserCreatedPublisher(natsWrapper.client).publish(userCreated)
  
      }
      
      await user.save();
  
      return {
        token: Jwtoken.sign(user.id, user.email),
        success: true
      }
    } catch (err) {
      console.log("ERROR", err)
      return {
        success: false,
        error: { message: "Something went wrong"}
      }
    }

  },
  async imageUpload(info, args, { user }) {
      const file = await args.file;
      const upload = await processUpload(file, user);
      return upload;

  }
}

module.exports = Mutation