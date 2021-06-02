// Depth First Search: Using Adjacency List - Iterative

function Edge(from, to, cost) {
  this.from = from;
  this.to = to;
  this.cost = cost;
}

// Perform a depth first search on a graph with n nodes
// from a starting point to count the number of nodes
// in a given component.
function dfs(at, graph) {
  return dfsHelper(at, Array(Object.keys(graph).length), graph);
}

function dfsHelper(at, visited, graph) {
  if (visited[at]) return 0;

  visited[at] = true;
  let count = 1;

  let edges = graph[at];
  if (edges) {
    for (edge of edges) {
      count += dfsHelper(edge.to, visited, graph);
    }
  }
  return count;
}

// EXAMPLE USAGE OF DFS: (Not part of the algorithm)

// Create a fully connected graph
//           (0)
//           / \
//        5 /   \ 4
//         /     \
// 10     <   -2  >
//   +->(2)<------(1)      (4)
//   +--- \       /
//         \     /
//        1 \   / 6
//           > <
//           (3)
let numNodes = 5;
let graph = {};
addDirectedEdge(graph, 0, 1, 4);
addDirectedEdge(graph, 0, 2, 5);
addDirectedEdge(graph, 1, 2, -2);
addDirectedEdge(graph, 1, 3, 6);
addDirectedEdge(graph, 2, 3, 1);
addDirectedEdge(graph, 2, 2, 10);

for (let i = 0; i < numNodes; i++) {
  if (!(i in graph)) {
    graph[i] = [];
  }
}

let nodeCount = dfs(0, graph);
console.log("DFS node count starting at node 0: " + nodeCount);
if (nodeCount !== 4) console.log("error with dfs");

nodeCount = dfs(4, graph);
console.log("DFS node count starting at node 4: " + nodeCount);
if (nodeCount !== 1) console.log("error with dfs");

// Helper method to setup graph
function addDirectedEdge(graph, from, to, cost) {
  graph[from] = graph[from] || [];
  graph[from].push(new Edge(from, to, cost));
}
