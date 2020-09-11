import { Subjects, Listener, EventCreatedEvent, UserCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { PhoneVerification } from '../../models/phoneVerification'


export class UserCreatedListener extends Listener<UserCreatedEvent> {

  readonly subject = Subjects.UserCreated
  queueGroupName = queueGroupName

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id } = data
    console.log("Creando registro en phone_verification...")
    
    try {
      const phoneVerification = PhoneVerification.build({user: id, code:'', verified: false, phone: ''})
      await phoneVerification.save();
      
      console.log("Registro phone_verification creado...")
    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }
}