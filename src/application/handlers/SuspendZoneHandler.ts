import { DistributionZone, ZoneStatus } from '../../domain/entities/DistributionZone';
import { IDistributionZoneRepository } from '../../domain/repositories/IDistributionZoneRepository';
import { IOutboxPublisher } from '../interfaces/IOutboxPublisher';

export interface SuspendZoneCommand {
  zoneId: string;
  reason?: string;
}

export class SuspendZoneHandler {
  constructor(
    private readonly zoneRepository: IDistributionZoneRepository,
    private readonly outboxPublisher: IOutboxPublisher
  ) {}

  async handle(command: SuspendZoneCommand): Promise<DistributionZone> {
    const zone = await this.zoneRepository.findById(command.zoneId);
    
    if (!zone) {
      throw new Error(`Zone not found: ${command.zoneId}`);
    }

    zone.suspend();
    await this.zoneRepository.save(zone);

    const events = zone.getDomainEvents();
    if (events.length > 0) {
      await this.outboxPublisher.publishBatch(events);
    }

    return zone;
  }
}
