import { Subjects, Listener, EventCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'


export class EventCreatedListener extends Listener<EventCreatedEvent> {

  readonly subject = Subjects.EventCreated
  queueGroupName = queueGroupName

  async onMessage(data: EventCreatedEvent['data'], msg: Message) {
    const { id, name, version } = data
    console.log('Nuevo evento', id, name, version)
    msg.ack()
  }

}