/*
# 문제설명
게임판인 2차원 배열과 크레인의 작동위치가 담긴 배열이 주어질 떄
인형 2개가 서로 이웃하여 터지는 모든 인형의 개수를 구하는 문제

# 풀이
1. FILO 구조인 stack 자료구조를 활용
2. 2중 for ... of 문을 통해 문제를 해결 (O(n ^ 2))
3. 크레인 작동위치와 행을 기준으로 구성된 2차원 배열을 순회
4. 뽑은 인형 (`item`)이 존재할 경우 해당 아이템이 stack의 마지막 요소와 일치한다면 pop 해주고 answer에 2를 더해줌
5. 그렇지 않을 경우에는 뽑은 인행을 stack 의 끝에 push 해줌
6. 조건문의 결과와 상관없이 인형을 뽑은 자리는 0으로 재할당해줌

# 시간복잡도
O (n ^ 2)
*/


function solution(board, moves) {
  let answer = 0;
  const basket = [];
  const moveIndexList = moves.map(num => num - 1);

  for(let moveIndex of moveIndexList) {
    for(let row of board) {
      const item = row[moveIndex];

      if(!!item) {
        if(item === basket[basket.length - 1]) {
          basket.pop()
          answer += 2
        } else {
          basket.push(item)
        }
        row[moveIndex] = 0
        break
      }
    }
  }
  return answer
}

console.log(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1, 5, 3, 5, 1, 2, 1, 4]))