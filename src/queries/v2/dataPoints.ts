import { MeterDataPointEdgeV2, MeterDataPointsQueryParamsV2 } from '../../types';
import { MeterGraphQLClient } from '../../client';

export const METER_DATA_POINTS_QUERY = `
  query GetMeterDataPoints(
    $meterNumber: String
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

export class DataPointsAPIV2 {
  private client: MeterGraphQLClient;

  constructor(client: MeterGraphQLClient) {
    this.client = client;
  }

  /**
   * Get meter data points with pagination and sorting
   * @param params Query parameters
   * @returns Promise with meter data point edges
   */
  async getMeterDataPoints(
    params: MeterDataPointsQueryParamsV2 = {},
  ): Promise<MeterDataPointEdgeV2[]> {
    // use v2 route
    this.client.useV2Route();

    const response = await this.client.query<{
      meterDataPoints: MeterDataPointEdgeV2[];
    }>(METER_DATA_POINTS_QUERY, params);

    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }

    // reset to v1 route
    this.client.useV1Route();

    return response.data?.meterDataPoints || [];
  }
}
