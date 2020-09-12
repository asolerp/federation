import { Publisher, PhoneCreatedEvent, Subjects } from "@aspfederation/common";

export class PhoneCreatedPublisher extends Publisher<PhoneCreatedEvent> {
    readonly subject = Subjects.PhoneCreated
}