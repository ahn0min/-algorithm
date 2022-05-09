// 설명
// 컴퓨터들끼리 연결된 정보를 담은 2차원 배열과 모든 컴퓨터의 수를 주어줬을 때
// 컴퓨터들끼리 연결되어 있는 상태를 네트워크라고 한다.

// 즉 네트워크의 총 개수를 구하는 문제

// 풀이방법

// BFS 너비우선탐색을 이용하여 풀 문제
// 시간복잡도 O(n ^ 3).. 늦다.

// 노드를 모두 방문하고 방문한 노드들을 서로 다른 네트워크 번호로 체크
// Set을 이용하여 중복을 제거하고 해당 Set 자료구조의 길이를 통해 답을 return 하는 방식으로 풀었다.

function solution(n, computers) {
  const graph = Array.from(Array(n), () => []);

  // O(n ^ 2)
  computers.forEach((computer, index) => {
    computer.forEach((ele, idx) => {
      if(ele === 1) {
        graph[index].push(idx)
      }
    })
  })

  // 자기를 제외한 연결된 노드들이 담겨있을 것이다.
  let visited = Array(n).fill(0);
  let count = 1;

  // ❓ O(n ^ 3) .. 별로 좋지않다..
  // 방문하지 않은 장소가 없을 때 까지 loop
  while(visited.indexOf(0) >= 0) {
    visited = BFS(visited, graph, count)
    count++
  }
  
  function BFS(visited, graph, count) {
    const queue = [visited.indexOf(0)];

    while(queue.length > 0) {
      const start = queue.shift()

      graph[start].forEach(dest => {
        if(visited[dest] === 0) {
          queue.push(dest);
          visited[dest] = count
        }
      })
    }

    return visited
  }

  return [...new Set(visited)].length
}