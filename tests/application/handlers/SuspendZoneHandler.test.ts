import { SuspendZoneHandler } from '../../src/application/handlers/SuspendZoneHandler';
import { DistributionZone, ZoneStatus } from '../../src/domain/entities/DistributionZone';
import { IDistributionZoneRepository } from '../../src/domain/repositories/IDistributionZoneRepository';
import { IOutboxPublisher } from '../../src/application/interfaces/IOutboxPublisher';

describe('SuspendZoneHandler', () => {
  let mockRepository: jest.Mocked<IDistributionZoneRepository>;
  let mockOutboxPublisher: jest.Mocked<IOutboxPublisher>;
  let handler: SuspendZoneHandler;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findByCode: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockOutboxPublisher = {
      publish: jest.fn(),
      publishBatch: jest.fn(),
    };

    handler = new SuspendZoneHandler(mockRepository, mockOutboxPublisher);
  });

  it('should suspend zone and publish events', async () => {
    const zone = DistributionZone.create({
      id: 'zone-123',
      name: 'North Region',
      code: 'NR-001',
      region: 'North',
    });

    mockRepository.findById.mockResolvedValue(zone);
    mockRepository.save.mockResolvedValue();

    const result = await handler.handle({ zoneId: 'zone-123' });

    expect(result.status).toBe(ZoneStatus.SUSPENDED);
    expect(mockRepository.save).toHaveBeenCalledWith(zone);
    expect(mockOutboxPublisher.publishBatch).toHaveBeenCalledWith(zone.getDomainEvents());
  });

  it('should throw when zone not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(handler.handle({ zoneId: 'non-existent' }))
      .rejects.toThrow('Zone not found: non-existent');
  });
});
