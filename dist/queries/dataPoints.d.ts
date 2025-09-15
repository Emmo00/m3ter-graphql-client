import { MeterDataPointEdge, MeterDataPointsQueryParams } from '../types';
import { MeterGraphQLClient } from '../client';
export declare const METER_DATA_POINTS_QUERY =
  '\n  query GetMeterDataPoints(\n    $meterNumber: String\n    $contractId: String\n    $first: Int\n    $after: String\n    $sortBy: MeterDataPointOrderBy\n  ) {\n    meterDataPoints(\n      meterNumber: $meterNumber\n      contractId: $contractId\n      first: $first\n      after: $after\n      sortBy: $sortBy\n    ) {\n      cursor\n      node {\n        transactionId\n        contractId\n        meterNumber\n        timestamp\n        payload {\n          nonce\n          voltage\n          current\n          energy\n          signature\n          publicKey\n        }\n      }\n    }\n  }\n';
export declare class DataPointsAPI {
  private client;
  constructor(client: MeterGraphQLClient);
  /**
   * Get meter data points with pagination and sorting
   * @param params Query parameters
   * @returns Promise with meter data point edges
   */
  getMeterDataPoints(params?: MeterDataPointsQueryParams): Promise<MeterDataPointEdge[]>;
}
