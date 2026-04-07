import { DistributionZone, ZoneStatus } from '../../src/domain/entities/DistributionZone';

describe('DistributionZone', () => {
  describe('create', () => {
    it('should create a zone with ACTIVE status', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      expect(zone.status).toBe(ZoneStatus.ACTIVE);
      expect(zone.id).toBe('zone-123');
      expect(zone.name).toBe('North Region');
      expect(zone.code).toBe('NR-001');
      expect(zone.region).toBe('North');
      expect(zone.isActive()).toBe(true);
    });
  });

  describe('suspend', () => {
    it('should suspend an active zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.suspend();

      expect(zone.status).toBe(ZoneStatus.SUSPENDED);
      expect(zone.isActive()).toBe(false);
    });

    it('should throw when suspending already suspended zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.suspend();

      expect(() => zone.suspend()).toThrow('Zone is already suspended');
    });

    it('should throw when suspending inactive zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.deactivate();

      expect(() => zone.suspend()).toThrow('Cannot suspend inactive zone');
    });

    it('should emit ZONE_CONTRACT_SUSPENDED event', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.suspend();
      const events = zone.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ZONE_CONTRACT_SUSPENDED');
      expect(events[0].payload).toEqual({
        zoneId: 'zone-123',
        zoneCode: 'NR-001',
        zoneName: 'North Region',
        region: 'North',
      });
    });
  });

  describe('activate', () => {
    it('should activate a suspended zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.suspend();
      zone.activate();

      expect(zone.status).toBe(ZoneStatus.ACTIVE);
      expect(zone.isActive()).toBe(true);
    });

    it('should throw when activating already active zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      expect(() => zone.activate()).toThrow('Zone is already active');
    });
  });

  describe('deactivate', () => {
    it('should deactivate an active zone', () => {
      const zone = DistributionZone.create({
        id: 'zone-123',
        name: 'North Region',
        code: 'NR-001',
        region: 'North',
      });

      zone.deactivate();

      expect(zone.status).toBe(ZoneStatus.INACTIVE);
      expect(zone.isActive()).toBe(false);
    });
  });
});
