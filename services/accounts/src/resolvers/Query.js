const { comparePassword } = require('../utils/encryption')

const Query = {

  // LOGIN USER
  async loginUser(info, args, context) {
    const user = await context.db.query.use({
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
  async me (info, args, { db, user }) {
    return await db.query.user({
      where: {
        id: user.id
      }
    }, info)
  },

  // GET USER BY ID
  async user (info, args, context) {
    return await context.db.query.user({
      where: {...args}
    },info)
  },

  // GET ALL USERS
  async users(info, args, context) {
    return await context.db.query.users()
  }
}

module.exports = Query