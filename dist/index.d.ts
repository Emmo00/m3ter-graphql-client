export * from './types';
export * from './client';
export * from './queries/meters';
export * from './queries/dataPoints';
export * from './utils';
import { MetersAPI } from './queries/meters';
import { DataPointsAPI } from './queries/dataPoints';
import { MetersAPIV2 } from './queries/v2/meters';
import { DataPointsAPIV2 } from './queries/v2/dataPoints';
/**
 * Main class for the Meter GraphQL client package
 */
export declare class MeterClient {
    private client;
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
    constructor(options: {
        endpoint: string;
        headers?: Record<string, string>;
    });
    /**
     * Update the GraphQL endpoint URL
     * @param endpoint New GraphQL endpoint URL
     */
    setEndpoint(endpoint: string): void;
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
     * Execute a custom GraphQL query
     * @param query GraphQL query string
     * @param variables Variables for the query
     * @returns Promise with the query results
     */
    executeCustomQuery<T = any>(query: string, variables?: Record<string, any>): Promise<T>;
}
