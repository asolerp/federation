import { Subjects, Listener, UserCreatedEvent } from '@aspfederation/common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'

import { PhoneVerification } from '../../models/phoneVerification'
import { PhoneCreatedPublisher } from '../publisher/phone-created-publisher'
import { natsWrapper } from '../../nats-wrapper'


export class UserCreatedListener extends Listener<UserCreatedEvent> {

  readonly subject = Subjects.UserCreated
  readonly phonePublisher = new PhoneCreatedPublisher(natsWrapper.client)
  queueGroupName = queueGroupName

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, phoneID } = data
    console.log("Creando registro en phone_verification...")
    
    try {
      const phoneVerification = PhoneVerification.build({_id: phoneID ,user: id, code:'', verified: false, phone: ''})
      await phoneVerification.save();
      console.log("Registro phone_verification creado...")
    } catch (err) {
      console.log(err)
    }
    msg.ack()
  }
}