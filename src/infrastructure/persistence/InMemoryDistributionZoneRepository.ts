import { DistributionZone, ZoneStatus } from '../../domain/entities/DistributionZone';
import { IDistributionZoneRepository } from '../../domain/repositories/IDistributionZoneRepository';

export class InMemoryDistributionZoneRepository implements IDistributionZoneRepository {
  private zones: Map<string, DistributionZone> = new Map();

  async findById(id: string): Promise<DistributionZone | null> {
    return this.zones.get(id) || null;
  }

  async findByCode(code: string): Promise<DistributionZone | null> {
    for (const zone of this.zones.values()) {
      if (zone.code === code) {
        return zone;
      }
    }
    return null;
  }

  async findAll(): Promise<DistributionZone[]> {
    return Array.from(this.zones.values());
  }

  async save(zone: DistributionZone): Promise<void> {
    this.zones.set(zone.id, zone);
  }

  async delete(id: string): Promise<void> {
    this.zones.delete(id);
  }
}
