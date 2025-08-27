import fetch from 'cross-fetch';
import { GraphQLResponse } from './types';

export class MeterGraphQLClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor(options: { endpoint: string; headers?: Record<string, string> }) {
    if (!options.endpoint) {
      throw new Error('The endpoint option is required');
    }

    this.endpoint = options.endpoint;
    this.headers = {
      'Content-Type': 'application/json',
      'X-Client-Version': '1.0.0',
      'X-Source': 'MeterGraphQLClient',
      ...(options.headers || {}),
    };
  }

  /**
   * Update the GraphQL endpoint URL
   * @param endpoint New GraphQL endpoint URL
   */
  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  /**
   * Get the origin (protocol + host) of a URL
   * @param url The URL to parse
   * @returns The origin of the URL
   */
  static getURLOrigin(url: string): string {
    const { origin } = new URL(url);
    return origin;
  }

  

  useV2Route(): void {
    this.setEndpoint(`${MeterGraphQLClient.getURLOrigin(this.endpoint)}/v2`);
  }

  useV1Route(): void {
    this.setEndpoint(`${MeterGraphQLClient.getURLOrigin(this.endpoint)}/v1`);
  }

  resetEndpointRoute(): void {
    this.setEndpoint(MeterGraphQLClient.getURLOrigin(this.endpoint));
  }

  /**
   * Set custom headers for GraphQL requests
   * @param headers Headers to set
   */
  setHeaders(headers: Record<string, string>): void {
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  /**
   * Add additional headers to existing headers
   * @param headers Headers to add
   */
  addHeaders(headers: Record<string, string>): void {
    this.headers = {
      ...this.headers,
      ...headers,
    };
  }

  /**
   * Execute a GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with query results
   */
  async query<T = any>(
    query: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GraphQL query error:', error);
      throw error;
    }
  }

  /**
   * Execute a raw custom GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with the raw query results
   */
  async executeCustomQuery<T = any>(
    query: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>> {
    return this.query<T>(query, variables);
  }
}
