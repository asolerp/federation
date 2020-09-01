import { Subjects, Listener, EventCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { prisma } from '../../generated/prisma-client'


export class EventCreatedListener extends Listener<EventCreatedEvent> {

  readonly subject = Subjects.EventCreated
  queueGroupName = queueGroupName

  async onMessage(data: EventCreatedEvent['data'], msg: Message) {
    const { id, userID} = data

    try {
     console.log("Actualizaond usuario...")
     await prisma.updateUser({
        where: { id: userID },
        data: { events: { create: { eventID: id } } },
      })
    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }

}