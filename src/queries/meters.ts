import { Meter } from "../types";
import { MeterGraphQLClient } from "../client";

export const METERS_QUERY = `
  query GetMeters {
    meters {
      meterNumber
      contractId
      publicKey
      state {
        app_eui
        app_key
        dev_eui
        is_on
        kwh_balance
        last_block
        nonce
        public_key
        token_id
      }
    }
  }
`;

export const METER_QUERY = `
  query GetMeter($meterNumber: String, $contractId: String) {
    meter(meterNumber: $meterNumber, contractId: $contractId) {
      meterNumber
      contractId
      publicKey
      state {
        app_eui
        app_key
        dev_eui
        is_on
        kwh_balance
        last_block
        nonce
        public_key
        token_id
      }
    }
  }
`;

export class MetersAPI {
  private client: MeterGraphQLClient;

  constructor(client: MeterGraphQLClient) {
    this.client = client;
  }

  /**
   * Get all meters
   * @returns Promise with all meters
   */
  async getMeters(): Promise<Meter[]> {
    const response = await this.client.query<{ meters: Meter[] }>(METERS_QUERY);

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(", ")}`);
    }

    return response.data?.meters || [];
  }

  /**
   * Get a specific meter by meterNumber or contractId
   * @param params Search parameters
   * @returns Promise with the meter or null if not found
   */
  async getMeter(params: { meterNumber?: string; contractId?: string }): Promise<Meter | null> {
    if (!params.meterNumber && !params.contractId) {
      throw new Error("Either meterNumber or contractId must be provided");
    }

    const response = await this.client.query<{ meter: Meter }>(METER_QUERY, params);

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(", ")}`);
    }

    return response.data?.meter || null;
  }
}
