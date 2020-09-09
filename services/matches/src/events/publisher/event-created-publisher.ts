import { Publisher, EventCreatedEvent, Subjects } from '@aspfederation/common'

export class EventCreatedPublisher extends Publisher<EventCreatedEvent> {
  readonly subject = Subjects.EventCreated
}