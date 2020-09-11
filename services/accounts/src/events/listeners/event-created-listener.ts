import { Subjects, Listener, EventCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { User } from '../../models/user'


export class EventCreatedListener extends Listener<EventCreatedEvent> {

  readonly subject = Subjects.EventCreated
  queueGroupName = queueGroupName

  async onMessage(data: EventCreatedEvent['data'], msg: Message) {
    const { id, userID } = data
    console.log("Actualizando usuario...")

    try {

     const user = await User.findOne({
      _id: userID,
    })
    if (!user) {
      throw new Error('User not found')
    }
 
    await User.updateOne({ _id: userID }, { $push: { matches: id } } )
    console.log("Usuario actualizado...")

    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }

}