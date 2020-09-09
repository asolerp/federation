import bcrypt from 'bcryptjs'


export class Password {
  static async encrypt(password: string) {
    return await bcrypt.hash(password, 10)
  }

  static async comparePassword(password: string, userPassword: string) {
    return await  bcrypt.compare(password, userPassword)
  }

}