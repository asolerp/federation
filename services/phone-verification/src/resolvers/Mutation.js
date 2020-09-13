const { assertAuthenticated } = require('../perm')

const Mutation = {
  async updatePhoneVerification(info, args, { user, models: { PhoneVerification } } ) {
    // assertAuthenticated(user)
    
    console.log("Actualizando teléfono...")
    console.log("Generando código confirmación...")

    const code = Math.floor(100000 + Math.random() * 900000)
    const verification = await PhoneVerification.findOne({user: user.id})
    console.log(verification)

    if (verification) {
      verification.phone = args.phone
      verification.code = code.toString()
    }

    await verification.save()

    return verification

  },

  async codeVerification(info, args, { user, models: { PhoneVerification } } ) {

    console.log("Verificando código...")

    const userPhone = await PhoneVerification.findOne({user: user.id})

    if (userPhone) {
      if (userPhone.code === args.code) {
        userPhone.verified = true
        await userPhone.save()
      } else {
        throw new Error("Code is not correct")
      }
    } else {
      throw new Error("User phone not found")
    }

    return userPhone

  }
}

module.exports = Mutation