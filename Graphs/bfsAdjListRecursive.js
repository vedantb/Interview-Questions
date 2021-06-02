const DEPTH_TOKEN = -1;

function bfs(graph, start, n) {
  let visited = Array(n).fill(false);
  let queue = [];
  queue.unshift(start);
  queue.unshift(DEPTH_TOKEN);
  return bfsHelper(visited, queue, graph);
}

function bfsHelper(visited, queue, graph) {
  console.log(queue, "queue");
  let at = queue.pop();

  if (at === DEPTH_TOKEN) {
    queue.unshift(DEPTH_TOKEN);
    return 1;
  }

  // This node is already visited
  if (visited[at]) return 0;

  // visit this node
  visited[at] = true;

  // add all neighbors to the queue
  let neighbors = graph[at];
  if (neighbors) {
    for (let neighbor of neighbors) {
      if (!visited[neighbor.to]) {
        queue.unshift(neighbor.to);
      }
    }
  }

  let depth = 0;
  while (true) {
    // Stop when the queue is empty (i.e there's only one depth token remaining)
    if (queue.length === 1 && queue[0] === DEPTH_TOKEN) break;

    // The depth is the sum of all DEPTH_TOKENS encountered.
    depth += bfsHelper(visited, queue, graph);
  }

  return depth;
}

function Edge(from, to) {
  this.from = from;
  this.to = to;
}

function createEmptyGraph(n) {
  let graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  return graph;
}

function addDirectedEdge(graph, u, v) {
  graph[u] = graph[u] || [];
  graph[u].push(new Edge(u, v));
}

function addUndirectedEdge(graph, u, v) {
  addDirectedEdge(graph, u, v);
  addDirectedEdge(graph, v, u);
}

let n = 14;
let graph = createEmptyGraph(n);

addUndirectedEdge(graph, 0, 1);
addUndirectedEdge(graph, 0, 2);
addUndirectedEdge(graph, 0, 3);
addUndirectedEdge(graph, 2, 9);
addUndirectedEdge(graph, 8, 2);
addUndirectedEdge(graph, 3, 4);
addUndirectedEdge(graph, 10, 11);
addUndirectedEdge(graph, 12, 13);
addUndirectedEdge(graph, 3, 5);
addUndirectedEdge(graph, 5, 7);
addUndirectedEdge(graph, 5, 6);
addUndirectedEdge(graph, 0, 10);
addUndirectedEdge(graph, 11, 12);
console.log(`BFS DEPTH: ${bfs(graph, 12, n)}`);
