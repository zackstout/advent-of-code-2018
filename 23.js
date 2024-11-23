const lines = input.split("\n").map((line) => {
  const [x, y] = line.split(" ");
  return {
    pos: x.split(",").map(Number),
    radius: Number(y),
  };
});

function partOne() {
  const strongest = lines.sort((a, b) => b.radius - a.radius)[0];

  let inRange = 0;

  for (let i = 0; i < lines.length; i++) {
    const distance = lines[i].pos.map((x, j) => Math.abs(x - strongest.pos[j]));
    const sum = distance.reduce((a, b) => a + b, 0);

    if (sum <= strongest.radius) {
      inRange++;
    }
  }

  return inRange;
}

console.log(partOne());
