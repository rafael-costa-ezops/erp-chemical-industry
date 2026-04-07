# ERP Chemical Industry

Sistema ERP para indústria química com arquitetura limpa (Clean Architecture).

## Arquitetura

```
src/
├── domain/           # Entidades, Eventos, Interfaces de Repositório
│   ├── entities/
│   ├── events/
│   └── repositories/
├── application/      # Handlers, Casos de Uso, Interfaces
│   ├── handlers/
│   └── interfaces/
└── infrastructure/  # Implementações concretas
    ├── persistence/
    └── outbox/
```

## Padrões Implementados

- **Rich Domain Model**: Entidades com comportamento encapsulado
- **Outbox Pattern**: Garantia de entrega de eventos
- **Dependency Inversion**: Interfaces no domínio, implementações na infraestrutura

## Tecnologias

- TypeScript
- Prisma ORM
- Jest
- PostgreSQL

## Início Rápido

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run prisma:generate

# Executar testes
npm test

# Build
npm run build
```

## Estrutura do Domínio

### Entidade: DistributionZone

```typescript
const zone = DistributionZone.create({
  id: 'zone-123',
  name: 'North Region',
  code: 'NR-001',
  region: 'North',
});

zone.suspend(); // Emite ZONE_CONTRACT_SUSPENDED event
```
