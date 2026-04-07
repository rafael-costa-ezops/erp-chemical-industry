import { DomainEvent } from '../../domain/events/DomainEvent';

export interface IOutboxPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}
