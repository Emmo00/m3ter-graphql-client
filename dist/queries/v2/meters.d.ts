import { MeterV2 } from '../../types';
import { MeterGraphQLClient } from '../../client';
export declare const METERS_QUERY = "\n  query GetMeters {\n    meters {\n      meterNumber\n      pubicKey\n    }\n  }\n";
export declare const METER_QUERY = "\n  query GetMeter($meterNumber: String) {\n    meter(meterNumber: $meterNumber) {\n      meterNumber\n      publicKey\n    }\n  }\n";
export declare class MetersAPIV2 {
    private client;
    constructor(client: MeterGraphQLClient);
    /**
     * Get all meters
     * @returns Promise with all meters
     */
    getMeters(): Promise<MeterV2[]>;
    /**
     * Get a specific meter by meterNumber or contractId
     * @param params Search parameters
     * @returns Promise with the meter or null if not found
     */
    getMeter(meterNumber: string): Promise<MeterV2 | null>;
}
