
const {  EventCreatedPublisher } = require('../events/publisher/event-created-publisher')
const { natsWrapper } = require('../nats-wrapper')

const Mutation = {
  async newEvent(info, args, context) {
    console.log("Creando nuevo evento...")
    const event = context.db.mutation.createEvent({
      data: {...args}
    }, info)

    new EventCreatedPublisher(natsWrapper.client).publish({
      id: event.id,
      version: 1,
      name: event.name
    })

    return event
  }
}

module.exports = Mutation