/*
# 문제설명
영어 끝말잇기게임을 하는 도중 가장 먼저 틀린 사람의 번호와 몇번째 기회인지를 return 하는 문제
아무도 틀리지 않았으면 [0, 0]을 return 한다.

# 새롭게 시도한 부분
entries를 이용하여 index를 key값으로 가지는 객체를 return 받는다는 개념을 이용하여
틀린사람의 번호와 몇번째 기회인지를 구하는데 사용해보았음

# 아쉬운 부분
조건문에 !!currentWord를 통해서 currentWord가 비어있는지를 확인을 해야한다는 부분이 
처음에 실행할 때만 유의미한 코드라고 생각함
*/

function solution(n, words) {
  const speachedWords = [];
  let currentWord = '';
  
  for(let [index, word] of words.entries()) {
      if ((!!currentWord && currentWord.substr(-1) !== word.substr(0, 1)) || speachedWords.includes(word)) {
          const userNum = (index + 1) % n || n;
          const userTurn = Math.ceil((index + 1) / n);
      
          return [userNum, userTurn]
      }
      speachedWords.push(word)
      currentWord = word;
  }
  return [0, 0];
}

console.log(solution(3, ["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"]))