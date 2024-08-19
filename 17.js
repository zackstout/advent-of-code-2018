const testInput = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`
  .split("\n")
  .map((line) => line.split(", "));

console.log(testInput);

const m = new Map();
for (const [a, b] of testInput) {
  const [aKey, aValue] = a.split("=");
  const [bKey, bValue] = b.split("=");

  const r1 = parseInt(bValue.split("..")[0], 10);
  const r2 = parseInt(bValue.split("..")[1], 10);

  for (let i = r1; i <= r2; i++) {
    if (aKey === "x") {
      m.set(`${aValue},${i}`, "#");
    } else {
      m.set(`${i},${aValue}`, "#");
    }
  }
}

console.log(m);

function print(map) {
  const x = Array.from(map.keys()).map((item) => item.split(",")[0]);
  const y = Array.from(map.keys()).map((item) => item.split(",")[1]);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  for (let i = minY; i <= maxY; i++) {
    let row = ".";
    for (let j = minX; j <= maxX; j++) {
      row += map.get(`${j},${i}`) ?? ".";
    }
    row += ".";
    console.log(row);
  }
}

print(m);

// Ahhh sand simulation, fun.

function simulate() {
  // Idea. Start from bottom row, left to right, up to source.
  // For each water, try to move down, then left, then right.
  // And then go to next water. Previous space may have just been cleared for him.

  let water = ["500,0"];
  let prevWater = [];

  while (water.length !== prevWater.length) {}
}
