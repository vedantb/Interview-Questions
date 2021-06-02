# DFS

The DFS is the fundamental search algorithm used to explore nodes and edges of a graph. It runs with a time complexity of O(V+E) and is often the building block of other algorithms

By itself, DFS isn't all that useful, but when augmented to perform other tasks such as count connected components, find bridges etc DFS really shines.

As the name suggests, a DFS plunges depth first into a graph without regard for which edge it takes next until it cannot go any further at which point it backtracks and continues.

### Pseudocode

```
// Global or class scope variables
n = number of nodes in the graph
graph = adjacency list representing graph
visited = [false, ..., false] // size n

function dfs(at):
    if visited[at]: return;
    visited[at] = true;

    neighbors = graph[at];
    for next in neighbors:
        dfs(next)


// Start DFS at node 0
start_node = 0;
dfs(start_node)
```

### Connected Components

Sometimes a graph is split into multiple components. It’s useful to be able to identify and count these components

We can use a DFS to identify components. First, make sure all the nodes are labeled from [0, n) where n is the number of nodes.

Algorithm: Start a DFS at every node (except if it’s already been visited) and mark all reachable nodes as being part of the same component.

```
// Global or class scope variables
n = number of nodes in the graph
g = adjacency list representing graph
count = 0
components = empty integer array // size n
visited = [false, ..., false] // size n

function findComponents() {
    for(i = 0; i < n; i++):
        if !visited[i]:
            count++
            dfs(i)

    return (count, components);
}

function dfs(at) {
    visited[at] = true
    components[at] = count
    for(next: g[at]):
        if !visited[next]:
            dfs(next)
}
```

### What else can DFS do?

- compute the minimum spanning tree
- detect and find cycles
- check if a graph is bipartite
- find strongly connected components
- topologically sort the nodes of a graph
- find bridges and articulation points
- generate mazes
- find augmenting paths in a flow network
