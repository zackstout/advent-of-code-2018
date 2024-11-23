input = input
  .map((line) => {
    return line.split(" ").map((item, index) => {
      if (index === 2) {
        return item.split(",").map((x) => parseInt(x));
      }
      if (index === 3) {
        return item.split("x").map(Number);
      }
      return item;
    });
  })
  .map((x) => {
    return {
      x: x[2][0],
      y: x[2][1],
      w: x[3][0],
      h: x[3][1],
    };
  });

function partOne() {
  const m = new Map();
  console.log(input.slice(0, 5));

  // There's no need for this... we can just iterate through cells...
  const minX = Math.min(...input.map((item) => item.x));
  const maxX = Math.max(...input.map((item) => item.x + item.w));
  const minY = Math.min(...input.map((item) => item.y));
  const maxY = Math.max(...input.map((item) => item.y + item.h));
  console.log(minX, maxX, minY, maxY);

  for (let i = minX; i < maxX; i++) {
    for (let j = minY; j < maxY; j++) {
      m.set(`${i},${j}`, 0);
    }
  }

  input.forEach((item) => {
    for (let i = item.x; i < item.x + item.w; i++) {
      for (let j = item.y; j < item.y + item.h; j++) {
        m.set(`${i},${j}`, m.get(`${i},${j}`) + 1);
      }
    }
  });

  // 134097 is too high... Ah we needed < instead of <=
  return [...m.keys()].filter((key) => m.get(key) > 1).length;
}

function overlaps(r1, r2) {
  // You start before I end and vice versa, for both directions
  return !(
    r1.x + r1.w <= r2.x ||
    r2.x + r2.w <= r1.x ||
    r1.y + r1.h <= r2.y ||
    r2.y + r2.h <= r1.y
  );
}

// console.log(partOne());

function partTwo() {
  //   console.log(input.slice(0, 3));

  //   while (input.length > 1) {
  //     const first = input.shift();
  //     let overlap = false;
  //     for (let i = 0; i < input.length; i++) {
  //       const second = input[i];
  //       if (overlaps(first, second)) {
  //         console.log("overlap");
  //         overlap = true;
  //         // This guy had an overlap, we should remove him
  //         input.splice(i, 1);
  //         i--;

  //         // Don't break -- we want to remove all the guys that overlap with first
  //         // break;
  //       }
  //     }
  //     if (!overlap) {
  //       console.log("no overlap", input.length);
  //       return first;
  //     }
  //   }

  // ========================================================

  // Ok, yeah, no need to overcomplicate lol
  for (let i = 0; i < input.length; i++) {
    const first = input[i];
    let overlap = false;
    for (let j = 0; j < input.length; j++) {
      const second = input[j];
      if (overlaps(first, second) && i !== j) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      return first;
    }
  }
}

console.log(partTwo());
