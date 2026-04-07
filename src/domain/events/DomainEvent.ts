export interface DomainEvent {
  type: string;
  occurredOn: Date;
  payload: Record<string, unknown>;
}

export interface IntegrationEvent extends DomainEvent {
  eventId: string;
  publishedAt?: Date;
}
