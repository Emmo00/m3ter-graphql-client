/**
 * Utility to extract nodes from data point edges
 * @param edges Array of data point edges
 * @returns Array of data points
 */
export declare function extractNodesFromEdges<T>(
  edges: Array<{
    node?: T;
  }>,
): T[];
/**
 * Get the last cursor from a list of edges
 * @param edges Array of edges with cursors
 * @returns The last cursor or undefined
 */
export declare function getLastCursor(
  edges: Array<{
    cursor?: string;
  }>,
): string | undefined;
