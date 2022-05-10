// // BFS를 이용한 최단거리로 구한 경우중 거리가 가장 먼 노드들의 개수를 return 하는 문제
// // class Queue를 구현해서 풀면 주어진 경우가 많은 경우에 더 빠르게 답을 도출해 낸다.

// function solution(n, edge) {
  
//   // 그래프
//   const graph = Array.from(Array(n + 1), () => []);

//   edge.forEach(([start, dest]) => {
//     graph[start].push(dest)
//     graph[dest].push(start)
//   })

//   // 시작점에서 노드들의 거리가 담길 배열
//   const distance = Array(n + 1).fill(0);
//   // 시작점에서 1번 노드까지의 거리는 1이다.
//   distance[1] = 1;

//   // BFS 너비우선탐색 구현을 위한 Queue
//   const queue = [1]
//   // Queue가 다 비워질 때 까지 loop
//   while(queue.length > 0) {
//     // queue의 가장 앞에있는 node에서 시작한다.
//     const start = queue.shift();
    
//     // start Node와 연결되어있는 Node들을 순회
//     graph[start].forEach((dest) => {
//       // 목적지가 아직 방문하지 않은 상태라면?
//       if (distance[dest] === 0) {
//         // 방문해준다. enqueue
//         queue.push(dest)
//         // 거리는 시작점보다 1 만큼 더 멀다.
//         distance[dest] = distance[start] + 1
//       }
//     })
//   }


//   const max = Math.max(...distance);
//   return distance.filter(num => num === max).length
// }



// Array로 Queue를 구현하여 해결한 문제

class Queue {
  constructor() {
      this.queue = [];
      this.front = 0;
      this.rear = 0;
  }
  
  enqueue(value) {
      this.queue[this.rear++] = value
  }
  
  dequeue() {
      const value = this.queue[this.front];
      delete this.queue[this.front];
      this.front++
      return value
  }
  
  isEmpty() {
      return this.front === this.rear
  }
  peek() {
      return this.queue[this.front]
  }
  
  size() {
      return this.rear - this.front
  }
}

function solution(n, edge) {
  const graph = Array.from({length : n + 1}, () => []);
  
  edge.forEach(([start, dest]) => {
      graph[start].push(dest)
      graph[dest].push(start)
  })
  
  // 노드들의 거리가 담기는 배열
  const distance = Array(n + 1).fill(0);
  distance[1] = 1
  
 // BFS를 위한 queue
  const queue = new Queue
  queue.enqueue(1)
  
  while(!queue.isEmpty()) {
      const start = queue.dequeue();
      
      graph[start].forEach(dest => {
          // 가지 않은 Node라면
          if (distance[dest] === 0) {
              queue.enqueue(dest);
              distance[dest] = distance[start] + 1
          }
      })
  }
  return distance.filter(ele => ele === Math.max(...distance)).length
}

console.log(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))