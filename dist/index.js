'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MeterClient = void 0;
__exportStar(require('./types'), exports);
__exportStar(require('./client'), exports);
__exportStar(require('./queries/meters'), exports);
__exportStar(require('./queries/dataPoints'), exports);
__exportStar(require('./utils'), exports);
const client_1 = require('./client');
const meters_1 = require('./queries/meters');
const dataPoints_1 = require('./queries/dataPoints');
const meters_2 = require('./queries/v2/meters');
const dataPoints_2 = require('./queries/v2/dataPoints');
/**
 * Main class for the Meter GraphQL client package
 */
class MeterClient {
  /**
   * Create a new MeterClient instance
   * @param options Client configuration options
   */
  constructor(options) {
    this.client = new client_1.MeterGraphQLClient(options);
    this.meters = new meters_1.MetersAPI(this.client);
    this.dataPoints = new dataPoints_1.DataPointsAPI(this.client);
    this.v2 = {
      meters: new meters_2.MetersAPIV2(this.client),
      dataPoints: new dataPoints_2.DataPointsAPIV2(this.client),
    };
  }
  /**
   * Update the GraphQL endpoint URL
   * @param endpoint New GraphQL endpoint URL
   */
  setEndpoint(endpoint) {
    this.client.setEndpoint(endpoint);
  }
  /**
   * Set custom headers for GraphQL requests
   * @param headers Headers to set
   */
  setHeaders(headers) {
    this.client.setHeaders(headers);
  }
  /**
   * Add additional headers to existing headers
   * @param headers Headers to add
   */
  addHeaders(headers) {
    this.client.addHeaders(headers);
  }
  /**
   * Execute a custom GraphQL query
   * @param query GraphQL query string
   * @param variables Variables for the query
   * @returns Promise with the query results
   */
  async executeCustomQuery(query, variables) {
    const response = await this.client.executeCustomQuery(query, variables);
    if (response.errors) {
      throw new Error(`GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
    }
    return response.data;
  }
}
exports.MeterClient = MeterClient;
