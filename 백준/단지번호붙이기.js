// 엣지케이스에서는 이전 로직이 오답으로 나왔다.
// 확실히 vsited라는 체크배열을 만들어 활용하는 것이 정확도 적인 측면에서 뛰어났다.

// 이것 또한 BFS를 활용하여 풀었다.
// 바이러스와 비슷한 문제

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function solution(input) {
  const N = Number(input.shift());

  const graph = input.map((row) => row.split("").map((ele) => Number(ele)));
  let visited = Array.from(Array(N), () => Array(N).fill(0));

  function BFS(x, y) {
    const queue = [];
    queue.push([x, y]);

    visited[x][y] = 1;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let count = 1;

    while (queue.length) {
      let XY = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = XY[0] + dx[i];
        const ny = XY[1] + dy[i];

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (graph[nx][ny] === 1 && visited[nx][ny] === 0) {
          queue.push([nx, ny]);
          visited[nx][ny] = 1;
          count++;
        }
      }
    }
    return count;
  }

  const result = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 1 && visited[i][j] === 0) {
        result.push(BFS(i, j));
      }
    }
  }
  return [result.length, ...result.sort((a, b) => a - b)];
}

console.log(solution(input).join("\n"));
