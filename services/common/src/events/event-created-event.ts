import { Subjects } from './subjects'

export interface EventCreatedEvent {
  subject: Subjects.EventCreated
  data: {
    id: string
    version: number
    name: string
  }
}