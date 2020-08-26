import bcrypt from 'bcryptjs'

const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
} 

export { encrypt, comparePassword }