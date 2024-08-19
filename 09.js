function playGame(numPlayers, lastValue) {
  const scores = Array(numPlayers).fill(0);

  const circle = [0];

  let curr = 1;
  let last = 0;

  while (curr < lastValue) {
    // Which player is playing (whose score to increment)
    const p = curr % numPlayers;

    if (curr % 23 === 0 && curr > 0) {
      scores[p] += curr;
      const removeIndex =
        (circle.indexOf(curr - 1) - 7 + circle.length) % circle.length;
      scores[p] += circle[removeIndex];
      circle.splice(removeIndex, 1);
      last = circle[removeIndex];
      //   console.log("Removed", removeIndex, circle[removeIndex], scores);
    } else {
      const next = (circle.indexOf(last) + 2) % circle.length;

      if (next === 0) {
        circle.push(curr);
      } else {
        circle.splice(next, 0, curr);
      }
      last = curr;
    }
    // console.log(circle);

    curr++;
  }

  return scores.sort((a, b) => b - a)[0];
}

// Phew! Lot of tiny errors lol
function partOne() {
  // 424 players, last marble worth 71482 points
  //   console.log(playGame(9, 25));
  //   return playGame(9, 25);
  //   return playGame(10, 1618);
  return playGame(424, 714820);
}

console.log(partOne());
