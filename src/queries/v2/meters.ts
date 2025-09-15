import { MeterV2 } from '../../types';
import { MeterGraphQLClient } from '../../client';

export const METERS_QUERY = `
  query GetMeters {
    meters {
      meterNumber
      pubicKey
    }
  }
`;

export const METER_QUERY = `
  query GetMeter($meterNumber: String) {
    meter(meterNumber: $meterNumber) {
      meterNumber
      publicKey
    }
  }
`;

export class MetersAPIV2 {
  private client: MeterGraphQLClient;

  constructor(client: MeterGraphQLClient) {
    this.client = client;
  }

  /**
   * Get all meters
   * @returns Promise with all meters
   */
  async getMeters(): Promise<MeterV2[]> {
    // set client endpoint to call v2
    this.client.useV2Route();

    const response = await this.client.query<{ meters: MeterV2[] }>(METERS_QUERY);

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }

    // reset client endpoint
    this.client.resetEndpointRoute();

    return response.data?.meters || [];
  }

  /**
   * Get a specific meter by meterNumber or contractId
   * @param params Search parameters
   * @returns Promise with the meter or null if not found
   */
  async getMeter(meterNumber: string): Promise<MeterV2 | null> {
    // use v2 route
    this.client.useV2Route();

    const response = await this.client.query<{ meter: MeterV2 }>(METER_QUERY, { meterNumber });

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }

    // reset to base route
    this.client.resetEndpointRoute();

    return response.data?.meter || null;
  }
}
