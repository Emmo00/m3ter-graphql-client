import { GraphQLResponse } from './types';
export declare class MeterGraphQLClient {
  private endpoint;
  private headers;
  constructor(options: { endpoint: string; headers?: Record<string, string> });
  /**
   * Update the GraphQL endpoint URL
   * @param endpoint New GraphQL endpoint URL
   */
  setEndpoint(endpoint: string): void;
  /**
   * Get the origin (protocol + host) of a URL
   * @param url The URL to parse
   * @returns The origin of the URL
   */
  static getURLOrigin(url: string): string;
  useV2Route(): void;
  useV1Route(): void;
  resetEndpointRoute(): void;
  /**
   * Set custom headers for GraphQL requests
   * @param headers Headers to set
   */
  setHeaders(headers: Record<string, string>): void;
  /**
   * Add additional headers to existing headers
   * @param headers Headers to add
   */
  addHeaders(headers: Record<string, string>): void;
  /**
   * Execute a GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with query results
   */
  query<T = any>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>>;
  /**
   * Execute a raw custom GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with the raw query results
   */
  executeCustomQuery<T = any>(
    query: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>>;
}
