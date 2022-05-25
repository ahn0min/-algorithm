function solution(nums) {
  let answer = 0;
  let max = nums.length;

  for (let i = 0; i < max - 2; i++) {
    let number = 0;

    for (let j = i + 1; j < max - 1; j++) {
      for (let k = j + 1; k < max; k++) {
        number = nums[i] + nums[j] + nums[k];

        if (sosu(number)) answer++;
      }
    }
  }

  function sosu(number) {
    for (let z = 2; z <= Math.floor(Math.sqrt(number)); z++) {
      if (number % z === 0) return false;
    }

    return true;
  }
  return answer;
}
