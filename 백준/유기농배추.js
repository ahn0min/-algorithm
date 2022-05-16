// 억지로 어떻게든 풀었다ㅏ..

// 그러나 하나의 함수안에 모든 로직이 담겨있기 때문에 가독석, 의존성 적인 측면에서 모두 좋지 않다.
// 작은 단위의 함수로 분리해보자.

// BFS

const input = `1
5 3 6
0 2
1 2
2 2
3 2
4 2
4 0
`
  .trim()
  .split("\n");

function solution(input) {
  const T = Number(input.shift());
  const testList = Array.from(Array(T), () => []);
  let index = -1;
  const nodes = input.map((row) => row.split(" ").map((ele) => Number(ele)));

  for (let [X, Y, K] of nodes) {
    if (K > 0) {
      index++;
      testList[index].push([X, Y, K]);
      continue;
    }
    testList[index].push([X, Y]);
  }

  const result = [];

  for (let test of testList) {
    const [X, Y, K] = test[0];
    const graph = Array.from(Array(X), () => Array(Y).fill(0));
    const visited = Array.from(Array(X), () => Array(Y).fill(0));
    for (let i = 1; i <= K; i++) {
      const [x, y] = test[i];
      graph[x][y] = 1;
    }

    function BFS(firstX, firstY) {
      const queue = [[firstX, firstY]];
      const dx = [0, 1, 0, -1];
      const dy = [1, 0, -1, 0];
      let count = 0;
      visited[firstX][firstY] = 1;

      while (queue.length) {
        const [x, y] = queue.shift();
        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx < 0 || ny < 0 || nx >= X || ny >= Y) continue;
          if (graph[nx][ny] === 1 && visited[nx][ny] === 0) {
            queue.push([nx, ny]);
            visited[nx][ny] = 1;
            count++;
          }
        }
      }
      return count;
    }

    const testResult = [];

    for (let i = 0; i < X; i++) {
      for (let j = 0; j < Y; j++) {
        if (visited[i][j] === 0 && graph[i][j] === 1) {
          testResult.push(BFS(i, j));
        }
      }
    }

    result.push(testResult);
  }
  return result.map((array) => array.length);
}
console.log(solution(input).join("\n"));
