function partOne() {
  // Test
  const target = { x: 10, y: 10 };
  const depth = 510;

  //   const target = { x: 7, y: 782 };
  //   const depth = 11820;

  const grid = [...new Array(target.y + 1)].map((_, y) =>
    [...new Array(target.x + 1)].map((_, x) => undefined)
  );

  const indices = [...new Array(target.y + 1)].map((_, y) =>
    [...new Array(target.x + 1)].map((_, x) => {
      if (x === 0 && y === 0) {
        return 0;
      }
      if (y === 0) {
        return x * 16807;
      }
      if (x === 0) {
        return y * 48271;
      }
      return 0;
    })
  );

  for (let y = 1; y <= target.y; y++) {
    for (let x = 1; x <= target.x; x++) {
      indices[y][x] = (indices[y][x - 1] * indices[y - 1][x]) % 20183;
      if (x === target.x && y === target.y) {
        indices[y][x] = 0;
      }
    }
  }

  let totalErosion = 0;

  for (let y = 0; y <= target.y; y++) {
    for (let x = 0; x <= target.x; x++) {
      const xx = ((indices[y][x] + depth) % 20183) % 3;
      grid[y][x] = xx;
      totalErosion += xx;
    }
  }

  //   return grid;
  return totalErosion;
}

// 6257 is too low.... huh
// and 6362 is too high! Damn
console.log(partOne());
