const { Jwtoken } = require('../services/jwt')
const { UserCreatedPublisher } = require('../events/publisher/user-created-publisher');
const { natsWrapper } = require('../nats-wrapper');

const Mutation = {
  async signUpUser(info, args, { models: { User }}) {
    const user = User.build({ email: args.email, password: args.password });
    
    if (user) {
      const userCreated = {
        id: user.id
      }

      new UserCreatedPublisher(natsWrapper.client).publish(userCreated)

    }
    
    await user.save();

    return Jwtoken.sign(user.id, user.email)

  }
}

module.exports = Mutation