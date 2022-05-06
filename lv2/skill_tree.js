

// 2번째 풀이
function solution(skill, skillTrees) {
  const skillOrder = skill.split('');

  function countCorrectSkillTree() {
    let count = 0;

    skillTrees.forEach((skillTree) => {
      const filteredSkills = skillTree.split('').filter(skill => skillOrder.includes(skill));
      const correctSkillTree = filteredSkills.every((skill, idx) => skill === skillOrder[idx]);
      count += correctSkillTree
    })
    return count
  }

  return countCorrectSkillTree()
}

console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]))