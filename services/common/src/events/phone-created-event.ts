import { Subjects } from './subjects'

export interface PhoneCreatedEvent {
  subject: Subjects.PhoneCreated
  data: {
    id: string,
    userID: string,
  }
}