'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataPointsAPI = exports.METER_DATA_POINTS_QUERY = void 0;
exports.METER_DATA_POINTS_QUERY = `
  query GetMeterDataPoints(
    $meterNumber: String
    $contractId: String
    $first: Int
    $after: String
    $sortBy: MeterDataPointOrderBy
  ) {
    meterDataPoints(
      meterNumber: $meterNumber
      contractId: $contractId
      first: $first
      after: $after
      sortBy: $sortBy
    ) {
      cursor
      node {
        transactionId
        contractId
        meterNumber
        timestamp
        payload {
          nonce
          voltage
          current
          energy
          signature
          publicKey
        }
      }
    }
  }
`;
class DataPointsAPI {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get meter data points with pagination and sorting
   * @param params Query parameters
   * @returns Promise with meter data point edges
   */
  async getMeterDataPoints(params = {}) {
    var _a;
    const response = await this.client.query(exports.METER_DATA_POINTS_QUERY, params);
    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }
    return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.meterDataPoints) || [];
  }
}
exports.DataPointsAPI = DataPointsAPI;
