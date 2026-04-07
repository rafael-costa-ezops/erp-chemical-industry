import { DomainEvent } from '../events/DomainEvent';

export enum ZoneStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export class DistributionZone {
  public readonly id: string;
  public readonly name: string;
  public readonly code: string;
  public readonly region: string;
  public status: ZoneStatus;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public readonly version: number;

  private constructor(
    id: string,
    name: string,
    code: string,
    region: string,
    status: ZoneStatus,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.region = region;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  public static create(props: {
    id: string;
    name: string;
    code: string;
    region: string;
  }): DistributionZone {
    const now = new Date();
    return new DistributionZone(
      props.id,
      props.name,
      props.code,
      props.region,
      ZoneStatus.ACTIVE,
      now,
      now,
      1
    );
  }

  public static fromPersistence(props: {
    id: string;
    name: string;
    code: string;
    region: string;
    status: ZoneStatus;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): DistributionZone {
    return new DistributionZone(
      props.id,
      props.name,
      props.code,
      props.region,
      props.status,
      props.createdAt,
      props.updatedAt,
      props.version
    );
  }

  public suspend(): void {
    if (this.status === ZoneStatus.SUSPENDED) {
      throw new Error('Zone is already suspended');
    }
    if (this.status === ZoneStatus.INACTIVE) {
      throw new Error('Cannot suspend inactive zone');
    }
    this.status = ZoneStatus.SUSPENDED;
    this.updatedAt = new Date();
  }

  public activate(): void {
    if (this.status === ZoneStatus.ACTIVE) {
      throw new Error('Zone is already active');
    }
    this.status = ZoneStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  public deactivate(): void {
    this.status = ZoneStatus.INACTIVE;
    this.updatedAt = new Date();
  }

  public isActive(): boolean {
    return this.status === ZoneStatus.ACTIVE;
  }

  public getDomainEvents(): DomainEvent[] {
    const events: DomainEvent[] = [];
    
    if (this.status === ZoneStatus.SUSPENDED) {
      events.push({
        type: 'ZONE_CONTRACT_SUSPENDED',
        occurredOn: new Date(),
        payload: {
          zoneId: this.id,
          zoneCode: this.code,
          zoneName: this.name,
          region: this.region,
        },
      });
    }
    
    return events;
  }
}
