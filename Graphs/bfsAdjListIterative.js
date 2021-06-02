function Edge(from, to, cost) {
  this.from = from;
  this.to = to;
  this.cost = cost;
}

function bfs(start, end, graph, n) {
  let prev = Array(n).fill(null);
  bfsHelper(start, prev, graph, n);
  let path = [];
  for (let at = end; at !== null; at = prev[at]) {
    path.push(at);
  }
  path = path.reverse();
  if (path[0] === start) return path;
  return [];
}

function bfsHelper(start, prev, graph, n) {
  let visited = Array(n);
  let queue = [];

  queue.unshift(start);
  visited[start] = true;

  while (queue.length) {
    let node = queue.pop();
    let edges = graph[node];

    for (edge of edges) {
      if (!visited[edge.to]) {
        visited[edge.to] = true;
        prev[edge.to] = node;
        queue.unshift(edge.to);
      }
    }
  }
}

function createEmptyGraph(n) {
  let graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  return graph;
}

function addDirectedEdge(graph, u, v, cost) {
  graph[u] = graph[u] || [];
  graph[u].push(new Edge(u, v, cost));
}

function addUndirectedEdge(graph, u, v, cost) {
  addDirectedEdge(graph, u, v, cost);
  addDirectedEdge(graph, v, u, cost);
}

function addUnweightedUndirectedEdge(graph, u, v) {
  addUndirectedEdge(graph, u, v, 1);
}

let n = 13;
let graph = createEmptyGraph(n);

addUnweightedUndirectedEdge(graph, 0, 7);
addUnweightedUndirectedEdge(graph, 0, 9);
addUnweightedUndirectedEdge(graph, 0, 11);
addUnweightedUndirectedEdge(graph, 7, 11);
addUnweightedUndirectedEdge(graph, 7, 6);
addUnweightedUndirectedEdge(graph, 7, 3);
addUnweightedUndirectedEdge(graph, 6, 5);
addUnweightedUndirectedEdge(graph, 3, 4);
addUnweightedUndirectedEdge(graph, 2, 3);
addUnweightedUndirectedEdge(graph, 2, 12);
addUnweightedUndirectedEdge(graph, 12, 8);
addUnweightedUndirectedEdge(graph, 8, 1);
addUnweightedUndirectedEdge(graph, 1, 10);
addUnweightedUndirectedEdge(graph, 10, 9);
addUnweightedUndirectedEdge(graph, 9, 8);

let start = 10;
let end = 5;
let path = bfs(start, end, graph, n);
console.log(path);
