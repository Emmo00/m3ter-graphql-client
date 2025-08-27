# GraphQL M3ter Client

A TypeScript library for interacting with the M3ter GraphQL API.

## Installation

```bash
npm install m3ter-graphql-client
```

## Usage

### Basic usage

```typescript
import { MeterClient } from 'm3ter-graphql-client';

// Initialize the client with your GraphQL endpoint
const client = new MeterClient({
  endpoint: 'https://your-graphql-endpoint.com/graphql',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN', // Optional
  },
});

// Get all meters
async function getAllMeters() {
  const meters = await client.meters.getMeters();
  console.log(meters);
}

// Get a specific meter
async function getMeter() {
  const meter = await client.meters.getMeter({ meterNumber: 'METER123' });
  console.log(meter);
}

// Get meter data points with pagination
async function getMeterDataPoints() {
  const dataPointEdges = await client.dataPoints.getMeterDataPoints({
    meterNumber: 'METER123',
    first: 10,
    sortBy: 'HEIGHT_DESC',
  });
  console.log(dataPointEdges);
}
```

### Custom queries

The library also supports executing custom GraphQL queries:

```typescript
async function executeCustomQuery() {
  const customQuery = `
    query GetCustomData($id: String!) {
      customEntity(id: $id) {
        field1
        field2
      }
    }
  `;

  const result = await client.executeCustomQuery(customQuery, { id: '123' });
  console.log(result);
}
```

### Change GraphQL endpoint

You can change the GraphQL endpoint at runtime:

```typescript
// Switch to a different subgraph
client.setEndpoint('https://different-graphql-endpoint.com/graphql');
```

### Handle authentication

```typescript
// Set or update authentication headers
client.setHeaders({
  Authorization: 'Bearer NEW_TOKEN',
});

// Add additional headers
client.addHeaders({
  'X-Custom-Header': 'CustomValue',
});
```

## API Reference

### MeterClient

The main client class for interacting with the API.

#### Constructor

```typescript
new MeterClient({
  endpoint: string;
  headers?: Record<string, string>;
})
```

#### Methods

- `setEndpoint(endpoint: string)`: Update the GraphQL endpoint URL
- `setHeaders(headers: Record<string, string>)`: Set custom headers
- `addHeaders(headers: Record<string, string>)`: Add additional headers
- `executeCustomQuery<T>(query: string, variables?: Record<string, any>)`: Execute a custom GraphQL query

#### Properties

- `meters`: Access meters API
- `dataPoints`: Access data points API

### Meters API

Methods for working with meter data.

- `getMeters()`: Get all meters
- `getMeter({ meterNumber?: string, contractId?: string })`: Get a specific meter

### DataPoints API

Methods for working with meter data points.

- `getMeterDataPoints(params: MeterDataPointsQueryParams)`: Get meter data points with pagination and sorting

## License

MIT
