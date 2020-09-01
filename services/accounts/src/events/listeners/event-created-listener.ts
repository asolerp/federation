import { Subjects, Listener, EventCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { db } from '../../db'


export class EventCreatedListener extends Listener<EventCreatedEvent> {

  readonly subject = Subjects.EventCreated
  queueGroupName = queueGroupName

  async onMessage(data: EventCreatedEvent['data'], msg: Message) {
    const { id, userID} = data

    try {

     await db.mutation.updateUser({
        where: { id: userID },
        data: { events: { set: [ id ] } },
      })
    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }

}