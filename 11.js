let SERIAL_NUMBER = 2694;

// SERIAL_NUMBER = 18;

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

// function partTwo() {
//   const m = {};

//   let totalProcessed = 0;

//   for (let y = 1; y <= 300; y++) {
//     for (let x = 1; x <= 300; x++) {
//       m[`${x},${y}`] = getPowerLevel(x, y);
//     }
//   }

//   let max = -Infinity;
//   let maxCoord = "";
//   let maxSquareSize = -Infinity;

//   for (let y = 1; y <= 300; y++) {
//     for (let x = 1; x <= 300; x++) {
//       const maxPossibleSquareSize = Math.min(300 - x, 300 - y);

//       for (let s = 1; s <= maxPossibleSquareSize; s++) {
//         let total = 0;
//         for (let j = 0; j < s; j++) {
//           for (let i = 0; i < s; i++) {
//             total += m[`${x + i},${y + j}`];
//           }
//         }

//         totalProcessed++;
//         if (totalProcessed % 1000 === 0) {
//           console.log(totalProcessed);
//         }
//         if (total > max) {
//           max = total;
//           maxCoord = `${x},${y}`;
//         }
//       }
//     }
//   }

//   return `${maxCoord},${maxSquareSize}`;
// }

function partTwo() {
  const m = {};
  for (let y = 1; y <= 300; y++) {
    for (let x = 1; x <= 300; x++) {
      m[`${x},${y}`] = getPowerLevel(x, y);
    }
  }
  const summedAreaTable = {};
  for (let y = 1; y <= 300; y++) {
    for (let x = 1; x <= 300; x++) {
      const key = `${x},${y}`;
      const val = m[key];
      const left = summedAreaTable[`${x - 1},${y}`] ?? 0;
      const top = summedAreaTable[`${x},${y - 1}`] ?? 0;
      const topLeft = summedAreaTable[`${x - 1},${y - 1}`] ?? 0;
      summedAreaTable[key] = val + left + top - topLeft;
    }
  }

  function getArea(x, y, size) {
    const topLeft = summedAreaTable[`${x},${y}`] ?? 0;
    const topRight = summedAreaTable[`${x + size},${y}`] ?? 0;
    const bottomLeft = summedAreaTable[`${x},${y + size}`] ?? 0;
    const bottomRight = summedAreaTable[`${x + size},${y + size}`] ?? 0;
    return bottomRight + topLeft - topRight - bottomLeft;
  }

  let max = -Infinity;
  let maxCoord = "";
  let maxSquareSize = -Infinity;

  for (let y = 1; y <= 300; y++) {
    for (let x = 1; x <= 300; x++) {
      const maxPossibleSquareSize = Math.min(300 - x, 300 - y);

      for (let s = 1; s <= maxPossibleSquareSize; s++) {
        const total = getArea(x, y, s);

        if (total > max) {
          max = total;
          maxCoord = `${x},${y}`;
          maxSquareSize = s;
        }
      }
    }
  }

  return `${maxCoord},${maxSquareSize}`;
}

// NOTE have to actually add 1 to each coord, but yep, this works, in 7.5 seconds, nice!
console.time("partTwo");
console.log(partTwo());
console.timeEnd("partTwo");

// Ok huh.... brute force is wrong.
// There is a "summed-area table".... Oh wow this is really cool and makes a lot of sense... feels like Euclid: https://en.wikipedia.org/wiki/Summed-area_table
// Or a "convolution"...???
