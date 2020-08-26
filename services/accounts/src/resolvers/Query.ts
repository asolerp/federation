import { comparePassword } from '../utils/encryption'
import { assertAuthenticated } from '../perm'
import jwt from 'jsonwebtoken'


const Query = {

  // LOGIN USER
  async loginUser(info: any, args: any, context: any) {
    const user = await context.db.query.user({
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
  async me (info: any, args: any, context: any) {
    assertAuthenticated(context)
    return await context.db.query.user({
      where: {
        id: context.user.id
      }
    }, info)
  },

  // GET USER BY ID
  async user (info: any, args: any, context: any) {
    return await context.db.query.user({
      where: {...args}
    },info)
  },

  // GET ALL USERS
  async users(info: any, args: any, context: any) {
    return await context.db.query.users()
  }
}

export default Query