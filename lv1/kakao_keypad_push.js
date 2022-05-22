// 풀긴 했지만 너무 억지로 푼 것 같은 문제
// 조금 더 짧고 보기쉬운 코드로 작성해 볼 만 할 것 같다.

function solution(numbers, hand) {
  const keypad = [
    [10, 7, 4, 1],
    [0, 8, 5, 2],
    [10, 9, 6, 3],
  ];

  let left = [0, 0];
  let right = [2, 0];

  const result = [];

  for (let number of numbers) {
    if (keypad[0].includes(number)) {
      result.push("L");
      left = [0, keypad[0].indexOf(number)];
      continue;
    }
    if (keypad[2].includes(number)) {
      result.push("R");
      right = [0, keypad[2].indexOf(number)];
      continue;
    }
    // 중간 범위
    let targetX = 1;
    let targetY = keypad[1].indexOf(number);
    let distanceLeft =
      Math.abs(left[0] - targetX) + Math.abs(left[1] - targetY);
    let distanceRight =
      Math.abs(right[0] - targetX) + Math.abs(right[1] - targetY);

    if (distanceLeft < distanceRight) {
      result.push("L");
      left = [1, keypad[1].indexOf(number)];
      continue;
    }
    if (distanceLeft > distanceRight) {
      result.push("R");
      right = [1, keypad[1].indexOf(number)];
      continue;
    }
    if (hand === "left") {
      result.push("L");
      left = [1, keypad[1].indexOf(number)];
      continue;
    }

    result.push("R");
    right = [1, keypad[1].indexOf(number)];
  }

  return result.join("");
}
