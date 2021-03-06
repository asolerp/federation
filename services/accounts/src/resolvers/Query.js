const { comparePassword } = require('../utils/encryption')
const { assertAuthenticated } = require('../perm')
const jwt = require('jsonwebtoken')


const Query = {

  // LOGIN USER
  async loginUser(info, args, context) {
    const user = await context.prisma.user({
      where: {
        email: args.email,
      }
    }, info)
    if (!user) throw new Error('No User Found');
    
    const isValid = comparePassword(args.password, user.password)
    if (!isValid) throw new Error('Something went wrong...');

    return jwt.sign({
      id: user.id,
      email: user.email
    }, 'f1BtnWgD3VKY', { algorithm: "HS256", subject: user.id, expiresIn: "1d" })
  },

  // GET USER LOGED IN
  async me (info, args, context) {
    assertAuthenticated(context)
    return await context.prisma.user({
      where: {
        id: context.user.id
      }
    }, info)
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
  async users(info, args, context) {
    const users = await context.prisma.users()
    console.log(users)
    return users
  }
}

module.exports = Query