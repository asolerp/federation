import { Subjects } from './subjects'

export interface EventCreatedMatch {
  subject: Subjects.MatchCreated
  data: {
    id: string
    version: number
    userID: string,
    name: string
  }
}