"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetersAPIV2 = exports.METER_QUERY = exports.METERS_QUERY = void 0;
exports.METERS_QUERY = `
  query GetMeters {
    meters {
      meterNumber
      pubicKey
    }
  }
`;
exports.METER_QUERY = `
  query GetMeter($meterNumber: String) {
    meter(meterNumber: $meterNumber) {
      meterNumber
      publicKey
    }
  }
`;
class MetersAPIV2 {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get all meters
     * @returns Promise with all meters
     */
    async getMeters() {
        var _a;
        // set client endpoint to call v2
        this.client.useV2Route();
        const response = await this.client.query(exports.METERS_QUERY);
        if (response.errors) {
            throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
        }
        // reset client endpoint to call v1
        this.client.useV1Route();
        return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meters) || [];
    }
    /**
     * Get a specific meter by meterNumber or contractId
     * @param params Search parameters
     * @returns Promise with the meter or null if not found
     */
    async getMeter(meterNumber) {
        var _a;
        // use v2 route
        this.client.useV2Route();
        const response = await this.client.query(exports.METER_QUERY, { meterNumber });
        if (response.errors) {
            throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
        }
        // reset to v1 route
        this.client.useV1Route();
        return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meter) || null;
    }
}
exports.MetersAPIV2 = MetersAPIV2;
