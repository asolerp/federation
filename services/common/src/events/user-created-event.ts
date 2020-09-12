import { Subjects } from './subjects'
import mongoose from 'mongoose'

export interface UserCreatedEvent {
  subject: Subjects.UserCreated
  data: {
    id: string,
    phoneID: mongoose.Schema.Types.ObjectId
  }
}