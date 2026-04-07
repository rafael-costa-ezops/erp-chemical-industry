# Chemical Industry ERP

NestJS Clean Architecture implementation for chemical industry logistics.

## Module: Logistics Territories

- **Rich Domain Model** with `DistributionZone` entity
- **Outbox Pattern** for `ZoneContractSuspendedEvent`
- **Dependency Inversion** (IOutboxPublisher in application layer)
- **Unit tests** colocated with handlers
- **Prisma schema** for DistributionZone and OutboxEntry

## Architecture

```
src/
├── domain/           # Entities, Value Objects, Domain Events
├── application/      # Use Cases, Handlers, Interfaces (DI)
├── infrastructure/   # Prisma, Outbox Publisher, External Services
└── presentation/     # Controllers, DTOs
```

## Getting Started

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

## Testing

```bash
npm test
```

---

Built with Clean Architecture patterns: Rich Domain, Dependency Inversion, Outbox Pattern
