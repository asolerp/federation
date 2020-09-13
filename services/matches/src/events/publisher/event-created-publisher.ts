import { Publisher, EventCreatedMatch, Subjects } from '@aspfederation/common'

export class EventCreatedPublisher extends Publisher<EventCreatedMatch> {
  readonly subject = Subjects.MatchCreated
}