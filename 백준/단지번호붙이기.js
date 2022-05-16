// 단지 번호 붙이기

// 어딘가 이상하다..
const input = `7
0110100
0110101
1110101
0000111
0100000
0111110
0111000
`
  .trim()
  .split("\n");

function solution(input) {
  const N = Number(input.shift());
  // console.log(input.map(row => row.split('').map(ele => Number(ele))
  const graph = input.map((row) => row.split("").map((ele) => Number(ele)));
  const distance = Array.from(Array(N), () => Array(N).fill(0));

  function BFS(firstX, firstY, idx) {
    const queue = [[firstX, firstY]];
    console.log(firstX, firstY, idx);

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (graph[nx][ny] && !distance[nx][ny]) {
          // 집이 존재하고 가지않은 곳이라면
          queue.push([nx, ny]);
          distance[nx][ny] = idx;
          graph[nx][ny] = 0;
        }
      }
    }
  }

  while (true) {
    BFS(0, 0, 1);
    let groupNum = 2;

    for (let x = 0; x < N; x++) {
      const flag = graph[x].indexOf(1);
      if (flag) {
        BFS(x, flag, groupNum);
        groupNum += 1;
      }
    }

    break;
  }

  let a = distance.flatMap((row) => row.filter((ele) => ele !== 0));
  console.log(new Set([...a]));
  // console.log(new Set([...distance.filter((ele) => ele !== 0)]));
}

console.log(solution(input));
