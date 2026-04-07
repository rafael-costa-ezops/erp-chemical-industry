import { DistributionZone, ZoneStatus } from '../../domain/entities/DistributionZone';
import { IDistributionZoneRepository } from '../../domain/repositories/IDistributionZoneRepository';
import { IOutboxPublisher } from '../interfaces/IOutboxPublisher';

export interface CreateZoneCommand {
  name: string;
  code: string;
  region: string;
}

export class CreateZoneHandler {
  constructor(
    private readonly zoneRepository: IDistributionZoneRepository,
    private readonly outboxPublisher: IOutboxPublisher
  ) {}

  async handle(command: CreateZoneCommand): Promise<DistributionZone> {
    const existingZone = await this.zoneRepository.findByCode(command.code);
    
    if (existingZone) {
      throw new Error(`Zone with code ${command.code} already exists`);
    }

    const zone = DistributionZone.create({
      id: this.generateId(),
      name: command.name,
      code: command.code,
      region: command.region,
    });

    await this.zoneRepository.save(zone);

    return zone;
  }

  private generateId(): string {
    return `zone_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
