"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNodesFromEdges = extractNodesFromEdges;
exports.getLastCursor = getLastCursor;
/**
 * Utility to extract nodes from data point edges
 * @param edges Array of data point edges
 * @returns Array of data points
 */
function extractNodesFromEdges(edges) {
    return edges
        .filter((edge) => edge.node !== undefined)
        .map((edge) => edge.node);
}
/**
 * Get the last cursor from a list of edges
 * @param edges Array of edges with cursors
 * @returns The last cursor or undefined
 */
function getLastCursor(edges) {
    if (edges.length === 0)
        return undefined;
    return edges[edges.length - 1].cursor;
}
