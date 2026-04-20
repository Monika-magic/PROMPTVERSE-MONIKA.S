/**
 * Simple Dijkstra's Algorithm to find the shortest path.
 * Modifies weights based on crowd levels.
 */

export const calculateOptimalRoute = (startNode, endNode, graph, zones) => {
  if (!startNode || !endNode || startNode === endNode) return null;

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  // Initialize
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  });
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let currNode = null;
    let minDistance = Infinity;
    
    unvisited.forEach(node => {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currNode = node;
      }
    });

    if (currNode === null) break;
    if (currNode === endNode) break;

    unvisited.delete(currNode);

    // Update neighbors
    const neighbors = graph[currNode];
    for (let neighbor in neighbors) {
      if (unvisited.has(neighbor)) {
        // Base distance
        let weight = neighbors[neighbor];
        
        // Add penalty based on crowd level of the target node
        const neighborZone = zones[neighbor];
        if (neighborZone) {
          if (neighborZone.crowdLevel === 'medium') weight += 5; // 5 minute penalty
          if (neighborZone.crowdLevel === 'high') weight += 15; // 15 minute penalty
        }

        const altDistance = distances[currNode] + weight;
        if (altDistance < distances[neighbor]) {
          distances[neighbor] = altDistance;
          previous[neighbor] = currNode;
        }
      }
    }
  }

  // Reconstruct path
  const path = [];
  let current = endNode;
  
  if (previous[current] !== null || current === startNode) {
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
  }

  if (path.length === 0 || path[0] !== startNode) return null;

  // Calculate total time
  const estimatedTime = distances[endNode];

  return { path, estimatedTime };
};
