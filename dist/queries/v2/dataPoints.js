'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataPointsAPIV2 = exports.METER_DATA_POINTS_QUERY = void 0;
exports.METER_DATA_POINTS_QUERY = `
  query GetMeterDataPoints(
    $meterNumber: Int!
    $first: Int
    $after: String
    $sortBy: MeterDataPointOrderBy
    $nonces: [Int!]
  ) {
    meterDataPoints(
      meterNumber: $meterNumber
      first: $first
      after: $after
      sortBy: $sortBy
      nonces: $nonces
    ) {
      cursor
      node {
        transactionId
        meterNumber
        timestamp
        payload {
          nonce
          voltage
          energy
          longitude
          latitude
          signature
          publicKey
        }
      }
    }
  }
`;
class DataPointsAPIV2 {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get meter data points with pagination and sorting
   * @param params Query parameters
   * @returns Promise with meter data point edges
   */
  async getMeterDataPoints(params) {
    var _a;
    // use v2 route
    this.client.useV2Route();
    const response = await this.client.query(exports.METER_DATA_POINTS_QUERY, params);
    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }
    // reset to base route
    this.client.resetEndpointRoute();
    return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meterDataPoints) || [];
  }
}
exports.DataPointsAPIV2 = DataPointsAPIV2;
