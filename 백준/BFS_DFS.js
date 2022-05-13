const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `4 5 1
1 2
1 3
1 4
2 4
3 4
`
  .trim()
  .split("\n");

const [N, M, V] = input
  .shift()
  .split(" ")
  .map((ele) => Number(ele));

// console.log(N, M, V);

const graph = Array.from(Array(N + 1), () => []);

// console.log(graph);
input.forEach((edge) => {
  const [start, dest] = edge.split(" ").map((ele) => Number(ele));
  graph[start].push(dest);
  graph[dest].push(start);
});

const distance = Array(N + 1).fill(0);
// distance[1] = 0;

const queue = [V];
const answer_DFS = [];
while (queue.length > 0) {
  const start = queue.shift();
  console.log(start, "start");
  console.log(distance);
  if (distance[start] === 1) {
    continue;
  }
  answer_DFS.push(start);
  graph[start].forEach((dest) => {
    // 가지 않은 곳이라면
    if (distance[dest - 1] === 0) {
      queue.push(dest);
      distance[dest - 1] = 1;
    }
  });
}
// console.log(graph);

console.log(distance);
console.log(answer_DFS);
