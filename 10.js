console.log(input.slice(0, 3));

// Nice, part two is just counting times until the letters are readable
function partOne() {
  let m = {};
  let i = 0;
  for (const [pos, vel] of input) {
    m[i] = { pos, vel };
    i++;
  }

  let times = 0;

  while (true) {
    times++;
    const newMap = {};
    Object.keys(m).forEach((k) => {
      const { pos, vel } = m[k];
      const newPos = [pos[0] + vel[0], pos[1] + vel[1]];
      newMap[k] = { pos: newPos, vel };
    });

    const minY = Math.min(...Object.values(newMap).map((item) => item.pos[1]));
    const maxY = Math.max(...Object.values(newMap).map((item) => item.pos[1]));

    // If they are all within 10 y units of each other, assume they are readable
    if (maxY - minY < 10) {
      const minX = Math.min(
        ...Object.values(newMap).map((item) => item.pos[0])
      );
      const maxX = Math.max(
        ...Object.values(newMap).map((item) => item.pos[0])
      );

      console.log("Found it!", times, minX, maxX);

      // BXJXJAEX -- nice!
      for (let y = minY; y <= maxY; y++) {
        let row = "";
        for (let x = minX; x <= maxX; x++) {
          let found = false;
          for (const { pos } of Object.values(newMap)) {
            if (pos[0] === x && pos[1] === y) {
              found = true;
              break;
            }
          }
          row += found ? "#" : ".";
        }
        console.log(row);
      }
      break;
    }

    m = newMap;
  }

  return m;
}

// console.log(partOne());

partOne();
