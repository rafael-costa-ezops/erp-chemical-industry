import { DomainEvent, IntegrationEvent } from '../../domain/events/DomainEvent';
import { IOutboxPublisher } from '../../application/interfaces/IOutboxPublisher';

export class OutboxPublisher implements IOutboxPublisher {
  async publish(event: DomainEvent): Promise<void> {
    const integrationEvent: IntegrationEvent = {
      ...event,
      eventId: this.generateEventId(),
    };
    
    await this.saveToOutbox(integrationEvent);
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    const integrationEvents: IntegrationEvent[] = events.map((event) => ({
      ...event,
      eventId: this.generateEventId(),
    }));

    await this.saveBatchToOutbox(integrationEvents);
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private async saveToOutbox(event: IntegrationEvent): Promise<void> {
    console.log(`[Outbox] Saving event: ${JSON.stringify(event)}`);
  }

  private async saveBatchToOutbox(events: IntegrationEvent[]): Promise<void> {
    for (const event of events) {
      await this.saveToOutbox(event);
    }
  }
}
