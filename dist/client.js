"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterGraphQLClient = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class MeterGraphQLClient {
    constructor(options) {
        if (!options.endpoint) {
            throw new Error("The endpoint option is required");
        }
        this.endpoint = options.endpoint;
        this.headers = {
            "Content-Type": "application/json",
            "X-Client-Version": "1.0.0",
            "X-Source": "MeterGraphQLClient",
            ...(options.headers || {}),
        };
    }
    /**
     * Update the GraphQL endpoint URL
     * @param endpoint New GraphQL endpoint URL
     */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }
    /**
     * Set custom headers for GraphQL requests
     * @param headers Headers to set
     */
    setHeaders(headers) {
        this.headers = {
            "Content-Type": "application/json",
            ...headers,
        };
    }
    /**
     * Add additional headers to existing headers
     * @param headers Headers to add
     */
    addHeaders(headers) {
        this.headers = {
            ...this.headers,
            ...headers,
        };
    }
    /**
     * Execute a GraphQL query
     * @param query GraphQL query string
     * @param variables Variables for the query
     * @returns Promise with query results
     */
    async query(query, variables) {
        try {
            const response = await (0, cross_fetch_1.default)(this.endpoint, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });
            if (!response.ok) {
                throw new Error(`Network error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error("GraphQL query error:", error);
            throw error;
        }
    }
    /**
     * Execute a raw custom GraphQL query
     * @param query GraphQL query string
     * @param variables Variables for the query
     * @returns Promise with the raw query results
     */
    async executeCustomQuery(query, variables) {
        return this.query(query, variables);
    }
}
exports.MeterGraphQLClient = MeterGraphQLClient;
