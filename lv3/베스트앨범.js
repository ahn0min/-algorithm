// Map, 고차함수를 통해 해결한 문제 (해시테이블 유형)

function solution(genres, plays) {
  // key 값을 이용하기 위해 Map을 생성
  const genresMap = new Map();
  // 곡에 대한 정보를 배열로 생성 [ 장르, 플레이 횟수 ] : map
  // 곡 정보가 담기 배열을 순회 : forEach
  // 장르 : { total(장르의 총 플레이 횟수), songs(장르와 일치하는 곡정보 배열이 담긴 배열) } 을 생성할 것이다.

  // 생성할 때부터 play 횟수를 통해 내림차순으로 정렬
  // 2곡만 수록할 것이기 때문에 0, 1 index 만 자른다.
  genres
    .map((genre, index) => [genre, plays[index]])
    .forEach(([genre, play], index) => {

      const data = genresMap.get(genre) || { total : 0, songs : [] };
      genresMap.set(genre, {
        total: data.total + play,
        songs: [ ...data.songs, { index, play }]
          .sort((a, b) => b.play - a.play)
          .slice(0, 2)
      })
    })

  // 어떤 장르를 앞에서 부터 수록할 지 total 을 통해 내림차순으로 정렬
  // flatMap을 이용하여 Map의 장르별 곡들만 담기도록 1차원 배열로 생성한다.

  // map 함수를 이용해 곡 각자의 index 번호만 담긴 배열을 생성하여 최종 return 받는다.
  return [...genresMap.entries()]
      .sort((a, b) => b[1].total - a[1].total)
      .flatMap(ele => ele[1].songs)
      .map(ele => ele.index)
}

console.log(solution(["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]))