import { DomainEvent } from '../events/DomainEvent';

export interface IDistributionZoneRepository {
  findById(id: string): Promise<import('../entities/DistributionZone').DistributionZone | null>;
  findByCode(code: string): Promise<import('../entities/DistributionZone').DistributionZone | null>;
  findAll(): Promise<import('../entities/DistributionZone').DistributionZone[]>;
  save(zone: import('../entities/DistributionZone').DistributionZone): Promise<void>;
  delete(id: string): Promise<void>;
}
