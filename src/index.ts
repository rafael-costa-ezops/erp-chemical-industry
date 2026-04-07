export { DistributionZone, ZoneStatus } from './domain/entities/DistributionZone';
export { DomainEvent, IntegrationEvent } from './domain/events/DomainEvent';
export { IDistributionZoneRepository } from './domain/repositories/IDistributionZoneRepository';
export { IOutboxPublisher } from './application/interfaces/IOutboxPublisher';
export { CreateZoneHandler } from './application/handlers/CreateZoneHandler';
export { SuspendZoneHandler } from './application/handlers/SuspendZoneHandler';
export { OutboxPublisher } from './infrastructure/outbox/OutboxPublisher';
export { InMemoryDistributionZoneRepository } from './infrastructure/persistence/InMemoryDistributionZoneRepository';
