const fs = require('fs');
const input = fs.readFileSync('/stdin/dev').toString().trim().split('\n');

function solution(input) {
    // 여기서 X, Y 는 입력시의 그래프 축을 90도 돌리는 느낌으로 진행한다.
    const [X, Y] = input[0].split(" ").map((v) => +v);
    const graph = [];
    for (let i = 1; i <= X; i++) graph.push(input[i].split("").map((v) => +v)); // 미로 행렬
    const visited = Array.from({ length: X }, () => Array(Y).fill(0)); // 방문 여부를 위한 체크 행렬
    

    // 너비 우선 탐색하여 원점에서부터 가까운 지점부터 탐색
    function BFS(firstX, firstY) {
        // 이동시에 기존 좌표에서 더해줄 좌표들
        const dx = [0, 1, 0, -1];
        const dy = [1, 0, -1, 0];
        const queue = [];
        queue.push([firstX, firstY]);
        // 원정에서 시작한다는 것은 방문을 한 것이기 때문에 1 로 해준다.
        visited[firstX][firstY] = 1;
        while (queue.length) {
            const [x, y] = queue.shift(); // queue 자료구조이기 때문에 FIFO(First In First Out)
            // 4방향을 모두 체크
            for (let i = 0; i < 4; i++) {
                const [nx, ny] = [x + dx[i], y + dy[i]];
                // 정해진 좌표를 벗어날 경우 뒤의 코드를 실행하지 않고 다음으로 넘어감
                if(nx < 0 || ny < 0 || nx >= X || ny >= Y) continue;
                // 해당 좌표가 갈 수 있는 길(1) 이면서 방문하지 않은 곳(0) 일 경우에 다음 로직을 실행함
                if(graph[nx][ny] && !visited[nx][ny]) {
                    // 탐색중이 queue에 집어넣고 해당 좌표의 원점으로부터의 거리는 이전 좌표 + 1 이다.
                    visited[nx][ny] = visited[x][y] + 1
                    queue.push([nx, ny]);
                }
            }
        }
    }
    BFS(0, 0);
    return visited[X - 1][Y - 1]
}

console.log(solution(input))
