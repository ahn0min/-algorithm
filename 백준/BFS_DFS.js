// const fs = require("fs");
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

const graph = Array.from(Array(N + 1), () => []);

input.forEach((edge) => {
  const [start, dest] = edge.split(" ").map((ele) => Number(ele));
  graph[start].push(dest);
  graph[dest].push(start);
});

graph.map((dests) => {
  dests.sort((a, b) => a - b);
});

const visitedList = Array(N + 1).fill(0);

function DFS(graph, startNode) {
  let needVisitStack = []; // 탐색을 해야 할 노드들
  const visitedQueue = []; // 탐색을 마친 노드들

  needVisitStack.push(startNode);

  // 탐색을 해야 할 노드가 남아 있다면
  while (needVisitStack.length !== 0) {
    const node = needVisitStack.pop();
    if (!visitedQueue.includes(node)) {
      visitedQueue.push(node);
      needVisitStack = [...needVisitStack, ...graph[node].slice().reverse()];
    }
  }

  return visitedQueue;
}

// visitedList.fill(0);
// visitedList[V] = V;

function BFS(graph, startNode) {
  // const queue = [V];
  let needVisitQueue = []; // 탐색해야하는 노드들
  const visitedQueue = []; // 탐색을 마친 노드들

  needVisitQueue.push(startNode);

  // 탐색해야할 노드가 존재하지 않을 때까지 Loop
  while (needVisitQueue.length > 0) {
    const node = needVisitQueue.shift();
    // 해당 node를 방문하지 않았다면?
    // 방문해주고 현재 방문해야하는 노드들이 담긴 배열과 방금 방문한 노드와 연결된 노드들의 배열을 합쳐준다.
    if (!visitedQueue.includes(node)) {
      visitedQueue.push(node);
      needVisitQueue = [...needVisitQueue, ...graph[node]];
    }
  }
  return visitedQueue;
}

console.log(DFS(graph, V).join(" "));
console.log(BFS(graph, V).join(" "));

// 재귀함수 느낌 DFS를 호출을 한번 할 때마다 방문을 체크하고 스텍에 노드를 쌓는다.
// 그러다가 더이상 갈 곳이 없어지면 return 해주고

// const answerDFS = [];
// function DFS(V) {
//   visitedList[V] = 1;
//   answerDFS.push(V);
//   // DFS 탐색
//   // console.log(graph);
//   graph[V].forEach((dest) => {
//     // console.log(visitedList[dest], "visitedList[dext]");
//     if (visitedList[dest] === 0) DFS(dest);
//   });

//   // for 문을 통해 해당 노드와 연결된 노드를 차례대로 탐색한다.
//   // 만일 방문했던 노드라면 그냥 return 을 해주면 된다.

//   // 그렇게 되면 해당 노드 배열안의 다음 노드요소를 DFS 함수로 또다시 호출하는 것이다.
//   // 이렇게 되면 가장 깊게 들어가면서 탐색하게 된다.
// }

// 인접행렬, 인접리스트 간단정리

// i, j 의 연결상태만을 확인하기 위해서는 인접행렬이 좋다. O(1)의 시간복잡도이기 때문
// i 노드와 연결된 모든 노드들을 확인하고 싶다면 인접리스트가 좋다. 최악의 경우를 제외하고는 같은 O(n)이라도 인접리스트가 빠르기때문
