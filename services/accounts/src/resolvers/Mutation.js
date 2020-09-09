const { Jwtoken } = require('../services/jwt')

const Mutation = {
  async signUpUser(info, args, { models: { User }}) {
    const user = User.build({ email: args.email, password: args.password });
    await user.save();

    return Jwtoken.sign(user.id, user.email)

  }
}

module.exports = Mutation