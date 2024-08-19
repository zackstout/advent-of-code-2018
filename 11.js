const SERIAL_NUMBER = 2694;

function getPowerLevel(x, y) {
  let level = x + 10;
  level *= y;
  level += SERIAL_NUMBER;
  level *= x + 10;
  //   level %= 100;
  level = Math.floor(level / 100) % 10; // Get the hundreds digit
  level -= 5;
  return level;
}

function partOne() {
  const m = {};

  for (let y = 1; y <= 300; y++) {
    for (let x = 1; x <= 300; x++) {
      m[`${x},${y}`] = getPowerLevel(x, y);
    }
  }

  let max = -Infinity;
  let maxCoord = "";
  for (let y = 1; y <= 300 - 2; y++) {
    for (let x = 1; x <= 300 - 2; x++) {
      let total = 0;
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          total += m[`${x + i},${y + j}`];
        }
      }
      if (total > max) {
        max = total;
        maxCoord = `${x},${y}`;
      }
    }
  }

  return maxCoord;
}

// 41,99 is wrong.... nice we were doing hundred's digit step wrong.
console.log(partOne());

// Ah nice, part 2 looks like DP. Can use any size grid now.
