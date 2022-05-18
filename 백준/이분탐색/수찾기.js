//  1. 무조건 정렬이 되있어야 한다.
/// left는왼쪽의 끝 인덱스를 말하며  right 는 오른쪽의 끝 인덱스ㅡㄹ 말한다.
// 3. left - right 가 탐색범위가 될 것이다.

// mid 는 left와 right의 중간점을 하며 탐색범위의 중간을 말한다.
// 중간점(mid) = (left + right) / 2 이다.

// 이진탐색의 시간 복잡도는 O(logN)이며
// 단순히 매번 절반을 제외한다라고 볼 수 있다.

// 미드와 찾고자하는 값(target) 을 비교한다.

// 조건
// - mid 보다 target의 값이 크다면 left는 mid + 1 이 된다.(mid 이상의 수이기 때문에)
// - 미드보다 target의 값이 작다면 right는 mid - 1 이 된다.

// target 과 mid가 같다면 return 해준다.

// 예시코드

// const sample = [1, 3, 2, 4, 5];
// sample.sort((a, b) => a - b);

// const binarySearch = (list, target, left, right) => {
//   let mid = 0;

//   // 최소와 최대가 같아지면 값을 찾은거다.
//   while (left <= right) {
//     // 얘는 index다.
//     mid = Math.floor((left + right) / 2);

//     if (list[mid] === target) {
//       return mid;
//     }

//     // 대소 비교를 위해 범위 지정
//     if (list[mid] > target) {
//       right = mid - 1;
//       continue;
//     }
//     left = mid + 1;
//   }

//   return -1;
// };

// console.log(binarySearch(sample, 4, 0, sample.length - 1));

let input = `5
4 1 5 2 -5
7
-1 0 1 2 3 4 5 
`
  .trim()
  .split("\n");

function solution(input) {
  const N = input.shift();
  const baseList = input
    .shift()
    .split(" ")
    .map((ele) => Number(ele))
    .sort((a, b) => a - b);

  const M = input.shift();
  const targetList = input
    .shift()
    .split(" ")
    .map((ele) => Number(ele));

  const result = [];

  for (let i = 0; i < M; i++) {
    result.push();
  }

  const binarySearch = (list, target, left, right) => {
    let mid = 0;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (target === list[mid]) {
        return 1;
      }

      if (target > list[mid]) {
        left = mid + 1;
        continue;
      }
      right = mid - 1;
    }
    return 0;
  };

  for (let i = 0; i < M; i++) {
    result.push(binarySearch(baseList, targetList[i], 0, baseList.length));
  }

  return result.join("\n");
}

console.log(solution(input));
