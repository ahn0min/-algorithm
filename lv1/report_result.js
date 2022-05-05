function solution(id_list, report, k) {
  // 중복이 없어야한다.
  const reportSetList = [...new Set(report)].map(ele => ele.split(' '));
  // 내가 몇번 신고받았는지 구한다.
  const badCounts = new Map();
  
  reportSetList.forEach(([reporter, reported]) => {
      // 신고당한 횟수의 초기값을 1 또는 현재값 + 1
      badCounts.set(reported, badCounts.get(reported) + 1 || 1)
  })
  
  // 내가 신고한 사람중에 몇명이 정지당했는지 알 수 있는 Map
  const myCounts = new Map();
  reportSetList.forEach(([reporter, reported]) => {
      if (badCounts.get(reported) >= k) {
          myCounts.set(reporter, myCounts.get(reporter) + 1 || 1)
      }
  })
  
  const reportResult = id_list.map(id => myCounts.get(id) || 0);
  
  return reportResult
}