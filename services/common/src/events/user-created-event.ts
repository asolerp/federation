import { Subjects } from './subjects'


export interface UserCreatedEvent {
  subject: Subjects.UserCreated
  data: {
    id: string,
    version: number,
    email: string
  }
}