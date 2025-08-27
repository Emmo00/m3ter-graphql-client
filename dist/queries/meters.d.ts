import { Meter } from '../types';
import { MeterGraphQLClient } from '../client';
export declare const METERS_QUERY =
  '\n  query GetMeters {\n    meters {\n      meterNumber\n      contractId\n      publicKey\n      state {\n        app_eui\n        app_key\n        dev_eui\n        is_on\n        kwh_balance\n        last_block\n        nonce\n        public_key\n        token_id\n      }\n    }\n  }\n';
export declare const METER_QUERY =
  '\n  query GetMeter($meterNumber: String, $contractId: String) {\n    meter(meterNumber: $meterNumber, contractId: $contractId) {\n      meterNumber\n      contractId\n      publicKey\n      state {\n        app_eui\n        app_key\n        dev_eui\n        is_on\n        kwh_balance\n        last_block\n        nonce\n        public_key\n        token_id\n      }\n    }\n  }\n';
export declare class MetersAPI {
  private client;
  constructor(client: MeterGraphQLClient);
  /**
   * Get all meters
   * @returns Promise with all meters
   */
  getMeters(): Promise<Meter[]>;
  /**
   * Get a specific meter by meterNumber or contractId
   * @param params Search parameters
   * @returns Promise with the meter or null if not found
   */
  getMeter(params: { meterNumber?: string; contractId?: string }): Promise<Meter | null>;
}
