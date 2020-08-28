const { encrypt } = require('../utils/encryption')
const jwt = require ('jsonwebtoken')


const Mutation = {
  async signUpUser(info, args, context) {
    const user = await context.db.mutation.createUser({
      data: {...args, password: await encrypt(args.password)}
    },info)

    return jwt.sign({
      id: user.id,
      email: user.email
    }, 'f1BtnWgD3VKY', { algorithm: "HS256", subject: user.id, expiresIn: "1d" })

  }
}

module.exports = Mutation