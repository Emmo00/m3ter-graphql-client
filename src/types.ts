export interface Meter {
  meterNumber: string;
  contractId?: string;
  publicKey?: string;
  state?: MeterState;
}

export interface MeterV2 {
  meterNumber: number;
  publicKey: string;
}

export interface MeterState {
  app_eui?: string;
  app_key?: string;
  dev_eui?: string;
  is_on?: boolean;
  kwh_balance?: number;
  last_block?: number;
  nonce?: number;
  public_key?: string;
  token_id?: string;
}

export interface MeterDataPointPayload {
  nonce?: number;
  voltage?: number;
  current?: number;
  energy?: number;
  signature?: string;
  publicKey?: string;
}

export interface MeterDataPointPayloadV2 {
  nonce?: number;
  voltage?: number;
  energy?: number;
  longitude?: number;
  latitude?: number;
  signature?: string;
  publicKey?: string;
}

export interface MeterDataPoint {
  transactionId: string;
  contractId?: string;
  meterNumber?: string;
  timestamp?: number;
  payload?: MeterDataPointPayload;
}

export interface MeterDataPointV2 {
  transactionId: string;
  meterNumber?: number;
  timestamp?: number;
  payload?: MeterDataPointPayloadV2;
}

export interface MeterDataPointEdge {
  cursor?: string;
  node?: MeterDataPoint;
}

export interface MeterDataPointEdgeV2 {
  cursor?: string;
  node?: MeterDataPointV2;
}

export enum MeterDataPointOrderBy {
  HEIGHT_ASC = 'HEIGHT_ASC',
  HEIGHT_DESC = 'HEIGHT_DESC',
}

export interface MeterDataPointsQueryParams {
  meterNumber?: string;
  contractId?: string;
  first?: number;
  after?: string;
  sortBy?: MeterDataPointOrderBy;
}

export interface MeterDataPointsQueryParamsV2 {
  meterNumber: number;
  first?: number;
  after?: string;
  sortBy?: MeterDataPointOrderBy;
  nonces?: number[];
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, any>;
  }>;
}
