import { Subjects, Listener, EventCreatedMatch } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { User } from '../../models/user'


export class EventCreatedListener extends Listener<EventCreatedMatch> {

  readonly subject = Subjects.MatchCreated
  queueGroupName = queueGroupName

  async onMessage(data: EventCreatedMatch['data'], msg: Message) {
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