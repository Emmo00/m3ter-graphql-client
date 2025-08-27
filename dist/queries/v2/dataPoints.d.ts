import { MeterDataPointEdgeV2, MeterDataPointsQueryParamsV2 } from '../../types';
import { MeterGraphQLClient } from '../../client';
export declare const METER_DATA_POINTS_QUERY = "\n  query GetMeterDataPoints(\n    $meterNumber: String\n    $first: Int\n    $after: String\n    $sortBy: MeterDataPointOrderBy\n  ) {\n    meterDataPoints(\n      meterNumber: $meterNumber\n      first: $first\n      after: $after\n      sortBy: $sortBy\n    ) {\n      cursor\n      node {\n        transactionId\n        meterNumber\n        timestamp\n        payload {\n          nonce\n          voltage\n          energy\n          longitude\n          latitude\n          signature\n          publicKey\n        }\n      }\n    }\n  }\n";
export declare class DataPointsAPIV2 {
    private client;
    constructor(client: MeterGraphQLClient);
    /**
     * Get meter data points with pagination and sorting
     * @param params Query parameters
     * @returns Promise with meter data point edges
     */
    getMeterDataPoints(params?: MeterDataPointsQueryParamsV2): Promise<MeterDataPointEdgeV2[]>;
}
