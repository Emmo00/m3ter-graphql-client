export * from './types';
export * from './client';
export * from './queries/meters';
export * from './queries/dataPoints';
export * from './utils';

import { MeterGraphQLClient } from './client';
import { MetersAPI } from './queries/meters';
import { DataPointsAPI } from './queries/dataPoints';
import { MetersAPIV2 } from './queries/v2/meters';
import { DataPointsAPIV2 } from './queries/v2/dataPoints';

/**
 * Main class for the Meter GraphQL client package
 */
export class MeterClient {
  private client: MeterGraphQLClient;
  readonly meters: MetersAPI;
  readonly dataPoints: DataPointsAPI;
  readonly v2: {
    readonly meters: MetersAPIV2;
    readonly dataPoints: DataPointsAPIV2;
  };

  /**
   * Create a new MeterClient instance
   * @param options Client configuration options
   */
  constructor(options: { endpoint: string; headers?: Record<string, string> }) {
    this.client = new MeterGraphQLClient(options);
    this.meters = new MetersAPI(this.client);
    this.dataPoints = new DataPointsAPI(this.client);
    this.v2 = {
      meters: new MetersAPIV2(this.client),
      dataPoints: new DataPointsAPIV2(this.client),
    };
  }

  /**
   * Update the GraphQL endpoint URL
   * @param endpoint New GraphQL endpoint URL
   */
  setEndpoint(endpoint: string): void {
    this.client.setEndpoint(endpoint);
  }

  /**
   * Set custom headers for GraphQL requests
   * @param headers Headers to set
   */
  setHeaders(headers: Record<string, string>): void {
    this.client.setHeaders(headers);
  }

  /**
   * Add additional headers to existing headers
   * @param headers Headers to add
   */
  addHeaders(headers: Record<string, string>): void {
    this.client.addHeaders(headers);
  }

  /**
   * Execute a custom GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with the query results
   */
  async executeCustomQuery<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    const response = await this.client.executeCustomQuery<T>(query, variables);

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }

    return response.data as T;
  }
}
