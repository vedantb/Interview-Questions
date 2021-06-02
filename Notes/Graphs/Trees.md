# Trees

## Storage and Representation of Trees

A tree is an undirected graph with **no cycles**.
Equivalently, a tree is a connected graph with N nodes and N-1 edges

Examples of Trees:

1. File System
2. Social Hierarchies
3. DOM
4. AST
5. Game Theory decision trees

### Storing undirected trees

Start by labelling the tree nodes from [0, n)
A simple way to store a tree is like an edge list which is a list of undirected edges indicating which two nodes have an edge between them
[(0,1), (1,4), (4,5), (4,8). (1,3), (3, 7), (3,6), (2,3), (6,9)]
Con - this lacks the structure to efficiently query all neighbors of a node

This is why the adjacency list is a more popular option to represent a tree. This stores a mapping from a node to all its neighbors. e.g. 4 -> 1,5,8
You can also use an adjacency matrix. Often a huge waste of space for trees.

### Rooted Trees

Trees which have a designated root node (one which you usually come across)

### Binary Trees

trees for which every node has **at most 2 child nodes**

## Binary Search Trees

trees which satisfy the BST invariant which states that for every node x: x.left.value < x.value < x.right.value

### Storing Rooted Trees

Rooted trees are most naturally defined recursively in a top down manner. In practice, you maintain a pointer reference to the root node so that you can access the entire tree. Each node also has a list of all its children.

Sometimes, a node might also have references to parent node (bi-directional edges). Usually this isn't necessary because you can access a nodes parent on a recursive functions callback.

Another way of storing a rooted binary tree is a flattened array.
In this representation, each node has an assigned index position based on where it is in the tree.
The root node is always at index 0 and the children of current node i are accessed relative to i. left node = 2*i + 1 and right node = 2*i + 2
Reciprocally, the parent of node i is: floor((i-1)/2)

## Simple Tree Algorithms

Problem 1: leaf node sum
What is the sum of all the leaf node values in a tree?

When dealing with rooted trees, you begin with having a reference to the root node as a starting point.
You can traverse the tree and print if you encounter a leaf node. Two popular traversals are DFS and BFS. On trees, the prefered traveral method is a DFS.
This is because DFS is easily implemented recursively

```code
// Sums up leaf node values in a tree
function leafSum(root):
    // handle empty tree case
    if root === null:
        return 0

    if isLeaf(root):
        return node.value

    total = 0;

    for child in root.getChildNodes():
        total += leadSum(child)

    return total

function isLeaf(node):
    return node.getChildNodes().length === 0
```

Problem 2: Height of a Tree
The height of the tree is the numer of edges from the root to the lowest edge of the tree

Base Case: h(leaf_node) = 0
Assuming node x is not a leaf node:
h(x) = max(h(x.left), h(x.right)) + 1

```code
// The height of a tree is the number of edges
// from the root to lowest leaf
function treeHeight(node):
    // Handle empty case
    if node === null:
        return -1

    // Identify leaf nodes and return 0
    if node.left === null and node.right === null:
        return 0

    return max(treeHeight(node.left), treeHeight(node.right)) + 1
```

## Rooting a Tree

Sometimes it's useful to root an undirected tree to add structure to the problem you're trying to solve

This allows you to easily perform recursive algorithms and also gives you directed edges instead of undirected edges which are generally a lot easier to work with.

Conceptually, root a tree is like "picking up" the tree by a specific node and having all the edges point downwards.

You can root a tree using any of its nodes. However, be cautious because not every node you select will result in a well balanced tree.

In some situations, it's useful to have a reference to the parent node to be able to walk up the tree.

---

Rooting a tree is easily done depth first.
The algorithm starts on the designated root node. From the root node, begin a DFS and add nodes to the tree as the algorithm proceeds.

```code
// TreeNode object structure
class TreeNode:
    // unique integer id to identify this node
    id

    // pointer to parent TreeNode reference. Only the root node has a null parent
    TreeNode parent

    // List of pointers to child nodes
    TreeNode[] children

// g is the graph/tree represented as an adjacency list with undirected edges. If there's an edge
// between (u,v) there's also an edge (v,u).
// rootId is the id of the node to root from
function rootTree(g, rootId = 0):
    root = TreeNode(rootId, null, [])
    return buildTree(g, root, null)

// Build Tree recursively depth first
function buildTree(g, node, parent):
    for childId in g[node.id]:
        // Avoid adding an edge pointing back to the parent
        if parent !== null and childId === parent.id:
            continue

        child = TreeNode(child, node, [])
        node.children.add(child)
        buildTree(g, child, node)
    return node
```

## Center(s) of a Tree

An interesting problem when you have an undirected tree is finding the tree's center node(s). This can come in handy if we wanted to select a good node to root our tree.

The center is always the middle vertex or middle two vertices in every longest path of the tree.

Another approach to find the center is to iteratively pick off each leaf node layer like we're peeling an onion.
The way to do this is to calculate the degree of each node. The leaf nodes will have a degree of 1. As we prune the leaf nodes and update the degree values, we can keep repeating the process till we reach the center of the tree.

```code
// g = tree represented as an undirected graph
function treeCenters(g):
    n = g.numberOfNodes()
    degree = [0,0,...,0] // size n
    leaves = []

    for(i = 0; i < n; i++):
        degree[i] = g[i].length
        if(degree[i] === 0 or degree[i] === 1):
            leaves.add(i)
            degree[i] = 0

    count = leaves.length

    while count < n:
        newLeaves = []
        for(node: leaves):
            for(neighbor: g[node]):
                degree[neighbor] = degree[neighbor] - 1
                if(degree[neighbor] === 1):
                    newLeaves.add(neighbor)
            degree[node] = 0
        count += newleaves.length
        leaves = newLeaves

    return leaves // center(s)
```
