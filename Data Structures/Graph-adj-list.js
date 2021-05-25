class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(nodeVal) {
    this.adjacencyList[nodeVal] = [];
  }

  addEdge(src, dest) {
    this.adjacencyList[src].push(dest);
    this.adjacencyList[dest].push(src);
  }

  removeVertex(val) {
    if (this.adjacencyList[val]) {
      this.adjacencyList.delete(val);
    }

    this.adjacencyList.forEach((vertex) => {
      const neighborIdx = vertex.indexOf(val);
      if (neighborIdx >= 0) {
        vertex.splice(neighborIdx, 1);
      }
    });
  }

  removeEdge(src, dest) {
    const srcDestIdx = this.adjacencyList[src].indexOf(dest);
    this.adjacencyList[src].splice(srcDestIdx, 1);

    const destSrcIdx = this.adjacencyList[dest].indexOf(src);
    this.adjacencyList[dest].splice(srcDestIdx, 1);
  }
}

var graph = new Graph(7);
var vertices = ["A", "B", "C", "D", "E", "F", "G"];
for (var i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}
graph.addEdge("A", "G");
graph.addEdge("A", "E");
graph.addEdge("A", "C");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("D", "E");
graph.addEdge("E", "F");
graph.addEdge("E", "C");
graph.addEdge("G", "D");
console.log(graph.adjacencyList);
