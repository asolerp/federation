
const {  EventCreatedPublisher } = require('../events/publisher/event-created-publisher')
const { natsWrapper } = require('../nats-wrapper')

const Mutation = {
  async newMatch(info, args, { user,  models: { Match }}) {

    console.log("Creando nuevo evento...")
    const match = await Match.build({ name: args.name, admins: args.admins})

    if (match) {
      const eventCreated = {
        id: match.id,
        version: 0,
        name: match.name,
        userID: user.id
      }
  
      console.log("Created event: ", eventCreated)
  
      new EventCreatedPublisher(natsWrapper.client).publish(eventCreated)
    }

    await match.save();

    return match
  }
}

module.exports = Mutation