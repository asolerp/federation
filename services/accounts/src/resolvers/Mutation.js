const { encrypt } = require('../utils/encryption')
const jwt = require('jsonwebtoken')


const Mutation = {
  async signUpUser(info, args, context) {
    const user = await context.db.mutation.createUser({
      data: {...args, password: await encrypt(args.password)}
    },info)

    const authToken = jwt.sign({
      id: user.id,
      email: user.email
    }, 'f1BtnWgD3VKY')

    return  { token: authToken } 

  }
}

module.exports = Mutation