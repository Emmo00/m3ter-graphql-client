/**
 * Utility to extract nodes from data point edges
 * @param edges Array of data point edges
 * @returns Array of data points
 */
export function extractNodesFromEdges<T>(edges: Array<{ node?: T }>): T[] {
  return edges
    .filter((edge) => edge.node !== undefined)
    .map((edge) => edge.node as T);
}

/**
 * Get the last cursor from a list of edges
 * @param edges Array of edges with cursors
 * @returns The last cursor or undefined
 */
export function getLastCursor(
  edges: Array<{ cursor?: string }>
): string | undefined {
  if (edges.length === 0) return undefined;
  return edges[edges.length - 1].cursor;
}
