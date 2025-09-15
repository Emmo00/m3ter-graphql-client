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

// Get all meters (V1)
async function getAllMeters() {
  const meters = await client.meters.getMeters();
  console.log(meters);
}

// Get a specific meter (V1)
async function getMeter() {
  const meter = await client.meters.getMeter({ meterNumber: 'METER123' });
  console.log(meter);
}

// Get meter data points with pagination (V1)
async function getMeterDataPoints() {
  const dataPointEdges = await client.dataPoints.getMeterDataPoints({
    meterNumber: 'METER123',
    first: 10,
    sortBy: 'HEIGHT_DESC',
  });
  console.log(dataPointEdges);
}
```

### Using the V2 API

The client exposes a `v2` property for accessing the V2 endpoints:

```typescript
// Get all meters (V2)
async function getAllMetersV2() {
  const meters = await client.v2.meters.getMeters();
  console.log(meters);
}

// Get a specific meter (V2)
async function getMeterV2() {
  const meter = await client.v2.meters.getMeter({ meterNumber: 1 });
  console.log(meter);
}

// Get meter data points (V2)
async function getMeterDataPointsV2() {
  const dataPointEdges = await client.v2.dataPoints.getMeterDataPoints({
    meterNumber: 1,
    first: 10,
    sortBy: 'HEIGHT_DESC',
  });
  console.log(dataPointEdges);
}
```

#### Using array of nonces with V2 API

The V2 client supports querying data with an array of nonces for more flexible data retrieval:

```typescript
// Query data points with multiple specific nonces
async function getDataPointsWithNonces() {
  const dataPoints = await client.v2.dataPoints.getMeterDataPoints({
    meterNumber: 1,
    nonces: [1, 2, 3, 5, 8, 13], // Array of specific nonce values
    first: 20,
  });
  console.log(dataPoints);
}

// Create a range of nonces using the helper method
async function getDataPointsWithNonceRange() {
  const nonces = MeterClient.createNonceArray(1, 100); // Creates [1, 2, 3, ..., 100]

  const dataPoints = await client.v2.dataPoints.getMeterDataPoints({
    meterNumber: 1,
    nonces: nonces,
    first: 50,
  });
  console.log(dataPoints);
}

// Query meters with multiple nonces
async function getMetersWithNonces() {
  const noncesToQuery = MeterClient.createNonceArray(10, 20);

  const meters = await client.v2.meters.getMeters({
    nonces: noncesToQuery,
  });
  console.log(meters);
}
```

### Nonce Array Utilities

The library provides a convenient static method to create arrays of nonces for batch operations:

```typescript
import { MeterClient } from 'm3ter-graphql-client';

// Create a range of nonces
const nonces = MeterClient.createNonceArray(1, 10);
console.log(nonces); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Use with V2 APIs
const dataPoints = await client.v2.dataPoints.getMeterDataPoints({
  meterNumber: 1,
  nonces: MeterClient.createNonceArray(100, 150),
  first: 25,
});

// Error handling for invalid ranges
try {
  const invalidNonces = MeterClient.createNonceArray(10, 5); // start > end
} catch (error) {
  console.error(error.message); // "Start nonce must be less than or equal to end nonce"
}

try {
  const negativeNonces = MeterClient.createNonceArray(-1, 5); // negative values
} catch (error) {
  console.error(error.message); // "Nonce values must be non-negative"
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

### Change GraphQL endpoint or version

You can change the GraphQL endpoint at runtime:

```typescript
// Switch to a different subgraph or GraphQL server version
client.setEndpoint('https://different-graphql-endpoint.com/graphql');
```

#### Change between GraphQL server versions

If your project uses different endpoints for different API versions (e.g., v1 and v2), you can switch between them at runtime:

```typescript
// Set to v1 endpoint
client.setEndpoint('https://api.example.com/graphql/v1');

// Set to v2 endpoint
client.setEndpoint('https://api.example.com/graphql/v2');

// You can continue to use the same client instance:
const metersV2 = await client.v2.meters.getMeters();
```

#### Helper functions for headers and endpoint

You can also update authentication or custom headers at any time:

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

#### Static Methods

- `createNonceArray(startNonce: number, endNonce: number)`: Create an array of nonce numbers from start to end (inclusive)

#### Properties

- `meters`: Access meters API (V1)
- `dataPoints`: Access data points API (V1)
- `v2`: Access V2 APIs with enhanced features including array of nonces support
  - `v2.meters`: Access meters API V2
  - `v2.dataPoints`: Access data points API V2

### Meters API

Methods for working with meter data.

- `getMeters()`: Get all meters
- `getMeter({ meterNumber?: string, contractId?: string })`: Get a specific meter

### DataPoints API

Methods for working with meter data points.

- `getMeterDataPoints(params: MeterDataPointsQueryParams)`: Get meter data points with pagination and sorting

## License

MIT
