import { encrypt } from '../utils/encryption'
import jwt from 'jsonwebtoken'


const Mutation = {
  async signUpUser(info: any, args: any, context: any) {
    const user = await context.db.mutation.createUser({
      data: {...args, password: await encrypt(args.password)}
    },info)

    return jwt.sign({
      id: user.id,
      email: user.email
    }, 'f1BtnWgD3VKY', { algorithm: "HS256", subject: user.id, expiresIn: "1d" })

  }
}

export default Mutation