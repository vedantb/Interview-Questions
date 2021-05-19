function shortestPath(path) {
  let startsWithSlah = path[0] === "/";
  const tokens = path.split("/").filter((token) => token.length > 0 && token !== ".");
  const stack = [];
  if (startsWithSlah) stack.push("");
  for (const token of tokens) {
    if (token === "..") {
      if (stack.length === 0 || stack[stack.length - 1] === "..") {
        stack.push(token);
      } else if (stack[stack.length - 1] !== "") {
        stack.pop();
      }
    } else {
      stack.push(token);
    }
  }

  if (stack.length === 1 && stack[0] === "") return "/";
  return stack.join("/");
}

console.log(shortestPath("/foo/../test/../test/../foo//bar/./baz"));
console.log(shortestPath("/foo/bar/baz"));
console.log(shortestPath("foo/bar/baz"));
console.log(shortestPath("/../../foo/bar/baz"));
console.log(shortestPath("../../foo/bar/baz"));
console.log(shortestPath("/../../foo/../../bar/baz"));
console.log(shortestPath("../../foo/../../bar/baz"));
console.log(shortestPath("/foo/./././bar/./baz///////////test/../../../kappa"));
console.log(
  shortestPath(
    "../../../this////one/./../../is/../../going/../../to/be/./././../../../just/eight/double/dots/../../../../../.."
  )
);
console.log(
  shortestPath(
    "/../../../this////one/./../../is/../../going/../../to/be/./././../../../just/a/forward/slash/../../../../../.."
  )
);

console.log(
  shortestPath(
    "../../../this////one/./../../is/../../going/../../to/be/./././../../../just/eight/double/dots/../../../../../../foo"
  )
);

console.log(
  shortestPath(
    "/../../../this////one/./../../is/../../going/../../to/be/./././../../../just/a/forward/slash/../../../../../../foo"
  )
);
