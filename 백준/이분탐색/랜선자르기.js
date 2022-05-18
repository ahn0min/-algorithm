// 즉 길이가 제각각 다른 N개의 랜선을 K개로 만들어야하는데 이때 K개의 랜선의 최대 길이를 구하는 문제.

// 1~ 가장 긴녀석만큼 정해서 가운데 길이만큼 짤라봤을 때의 랜선의 개수가 크다면 길이를 늘리고
// 랜선의 개수가 이하면 길이를 늘리고
// 개수가 같다면 ? answer 덮어쓰기해볼까

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function solution(input) {
  const [N, M] = input
    .shift()
    .split(" ")
    .map((ele) => Number(ele));

  const lans = input.map((ele) => Number(ele));
  lans.sort((a, b) => a - b);
  function binarySearch(list, target) {
    let mid = 0;
    let left = 0;
    let right = list[list.length - 1];
    let answer = Number.MIN_SAFE_INTEGER;
    let answer2 = Number.MIN_SAFE_INTEGER;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      let sum = 0;

      // mid 길이로 잘라서 갯수 (sum) 에 더한다.
      for (let lan of lans) {
        if (lan >= mid) {
          sum += Math.floor(lan / mid);
        }
      }
      // console.log(mid, sum);
      // 탈출 조건
      if (sum === target) {
        if (mid > answer) answer = mid;
      }
      // 너무 길게 잘라 갯수가 부족한 경우
      if (sum < target) {
        right = mid - 1;
        continue;
      }
      if (mid >= answer) {
        answer2 = mid;
      }

      left = mid + 1;
    }

    return answer < 0 ? answer2 : answer;
  }

  console.log(binarySearch(lans, M));
}
solution(input);
// 이전의 길이를 기록해놓고 1씩 늘려가볼까?

// N 개가 딱 맞아떨어지지않을때는 N 개 이상이니깐 answer2 에 담아줬다.
// if (lan >= mid) {
//   sum += Math.floor(lan / mid);
// }

// >= 가 아니라 > 로 하니 틀렸다고 나왔다.
// 아.. 저 부분은 추정값 mid cm 로 lan을 자를 수 있냐를 보는건데
// 난 1cm 이상 커야 자를 수 있다고 생각했지만 (꼭 잘라야 한다고 생각했다.)
// 길이가 같을 경우 안잘라도 자른것과 똑같기 때문에 .. 저부분을 놓치다니
