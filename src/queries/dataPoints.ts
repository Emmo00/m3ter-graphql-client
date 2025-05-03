import {
  MeterDataPointEdge,
  MeterDataPointsQueryParams,
  GraphQLResponse,
} from "../types";
import { MeterGraphQLClient } from "../client";

export const METER_DATA_POINTS_QUERY = `
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

export class DataPointsAPI {
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
    params: MeterDataPointsQueryParams = {}
  ): Promise<MeterDataPointEdge[]> {
    const response = await this.client.query<{
      meterDataPoints: MeterDataPointEdge[];
    }>(METER_DATA_POINTS_QUERY, params);

    if (response.errors) {
      throw new Error(
        `GraphQL error: ${response.errors.map((e) => e.message).join(", ")}`
      );
    }

    return response.data?.meterDataPoints || [];
  }
}
