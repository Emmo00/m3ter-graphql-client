"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetersAPI = exports.METER_QUERY = exports.METERS_QUERY = void 0;
exports.METERS_QUERY = `
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
exports.METER_QUERY = `
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
class MetersAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get all meters
     * @returns Promise with all meters
     */
    async getMeters() {
        var _a;
        const response = await this.client.query(exports.METERS_QUERY);
        if (response.errors) {
            throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(", ")}`);
        }
        return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meters) || [];
    }
    /**
     * Get a specific meter by meterNumber or contractId
     * @param params Search parameters
     * @returns Promise with the meter or null if not found
     */
    async getMeter(params) {
        var _a;
        if (!params.meterNumber && !params.contractId) {
            throw new Error("Either meterNumber or contractId must be provided");
        }
        const response = await this.client.query(exports.METER_QUERY, params);
        if (response.errors) {
            throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(", ")}`);
        }
        return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meter) || null;
    }
}
exports.MetersAPI = MetersAPI;
