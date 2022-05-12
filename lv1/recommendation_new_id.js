// 각각의 단계를 함수로 구분하여 단계별 함수를 모두 호출하는 방식
// 코드의 양이 어마어마하다..

// 조금 더 줄일 수 없을까?
function solution(new_id) {
  const maxLength = 15;
  const minLength = 3;

  let recommendationID = replaceUppercaseToLowercase(new_id);
  recommendationID = deleteUnallowedString(recommendationID);
  recommendationID = changeNextToPeriod(recommendationID);
  recommendationID = deleteFirstAndEndPeriod(recommendationID);
  recommendationID = replaceStringtoMaxLength(recommendationID).join("");
  return checkEmptyString(recommendationID);
  // lv.1
  function replaceUppercaseToLowercase(text) {
    return text.toLowerCase();
  }

  // lv.2 정규표현식 쓰니깐 개편하네.....
  function deleteUnallowedString(text) {
    const resultText = text.split("").filter((string) => {
      const customRegExp = /[a-z0-9._-]/;
      if (customRegExp.test(string)) {
        return string;
      }
    });
    return resultText;
  }

  // lv. 3
  function changeNextToPeriod(text) {
    const stack = [];
    for (let string of text) {
      if (string === ".") {
        if (stack[stack.length - 1] === ".") {
          continue;
        }
      }
      stack.push(string);
    }
    return stack;
  }
  // lv.4 , lv.6-2
  function deleteFirstAndEndPeriod(text) {
    if (text[0] == ".") text.shift();
    if (text[text.length - 1] === ".") text.pop();
    return text;
  }
  // lv. 5
  function checkEmptyString(string) {
    if (string === "") string = "a";
    if (string.length < minLength) {
      for (let i = string.length; i < minLength; i++) {
        string += string[string.length - 1];
      }
    }
    return string;
  }
  // lv.6
  function replaceStringtoMaxLength(string) {
    if (string.length >= maxLength) {
      string.splice(maxLength, string.length - maxLength);
      return deleteFirstAndEndPeriod(string);
    }
    return string;
  }
}

// ------- ------- ------- ------- ------- -------
// 정규식을 이용한 풀이 ❗❗🌞
// 대박.. 짧게 사용가능하다.
function solution(new_id) {
  const newId = new_id
    .toLowerCase() // 1
    .replace(/[^\w-_.]/g, "") // 2
    .replace(/\.+/g, ".") // 3
    .replace(/^\.|\.$/g, "") //4
    .replace(/^$/g, "a")
    .slice(0, 15)
    .replace(/\.$/, "");

  return newId.padEnd(3, newId[newId.length - 1]);
}
