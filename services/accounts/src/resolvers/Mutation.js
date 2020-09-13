const { Jwtoken } = require('../services/jwt')
const { UserCreatedPublisher } = require('../events/publisher/user-created-publisher');
const { natsWrapper } = require('../nats-wrapper');
const mongoose = require('mongoose');

const Mutation = {
  async signUpUser(info, args, { models: { User }}) {

    const phoneID = mongoose.Types.ObjectId()

    const findUser = await User.findOne({ email: args.email})
    console.log(findUser) 
    
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
    
    const response = await user.save();
    console.log("Response", response)

    return Jwtoken.sign(user.id, user.email)

  }
}

module.exports = Mutation