const { Password } = require('../services/password')
const { Jwtoken } = require('../services/jwt')

const { assertAuthenticated } = require('../perm')
const jwt = require('jsonwebtoken')


const Query = {

  // LOGIN USER
  async loginUser(info, args, { models: { User } } ) {
    const user = await User.findOne({ email: args.email})
    if (!user) throw new Error('No User Found');
    
    const isValid = Password.comparePassword(args.password, user.password)
    if (!isValid) throw new Error('Something went wrong...');

    return Jwtoken.sign(user.id, user.email)
  },

  // GET USER LOGED IN
  async me (info, args, { user, models: { User } } ) {
    console.log(user)
    assertAuthenticated(user)
    return await User.findById(user.id)
  },

  // GET USER BY ID
  async user (info, args, context) {
    const user = await context.prisma.user({
      where: {...args}
    },info)
    console.log("user", user.events)
    return user
  },

  // GET ALL USERS
  async users(info, args, { models: { User }}) {
    const users = await User.find()
    return users
  }
}

module.exports = Query