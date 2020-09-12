import { Subjects } from './subjects'

export interface PhoneCreatedEvent {
  subject: Subjects.MatchCreated
  data: {
    id: string,
    userID: string,
  }
}