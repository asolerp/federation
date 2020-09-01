
const {  EventCreatedPublisher } = require('../events/publisher/event-created-publisher')
const { natsWrapper } = require('../nats-wrapper')

const Mutation = {
  async newEvent(info, args, context) {

    console.log("Creando nuevo evento...")
    const event = await context.db.mutation.createEvent({
      data: {...args, userID: context.user.id}
    }, info)

    if (event) {
      const eventCreated = {
        id: event.id,
        version: 0,
        name: event.name,
        userID: context.user.id
      }
  
      console.log("Created event: ", eventCreated)
  
      new EventCreatedPublisher(natsWrapper.client).publish(eventCreated)
    }


    return event
  }
}

module.exports = Mutation