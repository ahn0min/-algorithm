const input = `5 20
4 42 40 26 46
`
  .trim()
  .split("\n");

function solution(input) {
  const [N, M] = input
    .shift()
    .split(" ")
    .map((ele) => Number(ele));

  const trees = input[0]
    .split(" ")
    .map((ele) => Number(ele))
    .sort((a, b) => a - b);

  const binaraySearch = (list, target) => {
    let mid = Number.MIN_SAFE_INTEGER;
    let left = 0;
    let right = list[list.length - 1];
    let answer = Number.MIN_SAFE_INTEGER;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      // 잘랐을 떄의 Sum 값
      let sum = 0;
      for (let tree of trees) {
        let wood = tree - mid;
        if (wood > 0) sum += wood;
      }

      if (sum === target) {
        return mid;
      }

      if (sum >= target) {
        if (mid > answer) answer = mid;
      }

      if (sum > target) {
        left = mid + 1;
        continue;
      }
      right = mid - 1;
      // Sum 값이 목표를 넘었을 경우
      // 지금까지 검토했을 때 가장 높은 높이인 answer 보다 더 높은 높이라면 변경해준다.
    }
    return answer;
  };

  return binaraySearch(trees, M);
}

console.log(solution(input));
