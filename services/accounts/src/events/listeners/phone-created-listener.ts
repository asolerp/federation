import { Subjects, Listener, PhoneCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { User } from '../../models/user'


export class PhoneCreatedListener extends Listener<PhoneCreatedEvent> {

  readonly subject = Subjects.PhoneCreated
  queueGroupName = queueGroupName

  async onMessage(data: PhoneCreatedEvent['data'], msg: Message) {
    console.log(data)
    const { id, userID } = data
    console.log("Actualizando usuario...")

    try {
      const users = await User.find({})
      console.log(users)
    //  const user = await User.findById(userID)
    // if (!user) {
    //   throw new Error('User not found')
    // }
 
    // await User.updateOne({ _id: userID }, { phone: id } )
    // console.log("Usuario actualizado...")

    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }

}