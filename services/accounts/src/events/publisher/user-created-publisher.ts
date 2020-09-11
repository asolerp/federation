import { Publisher, UserCreatedEvent, Subjects } from "@aspfederation/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    readonly subject = Subjects.UserCreated
}