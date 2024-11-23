const test = "R8, R4, R4, R8";

function partTwo() {
  const visited = new Map();
  const curr = [0, 0];
  visited.set(curr.join(","), 1);
  let dir = 0;
  const insts = input.split(", ");

  while (insts.length > 0) {
    const inst = insts.shift();
    const turn = inst[0];
    const steps = parseInt(inst.slice(1));
    if (turn === "R") {
      dir = (dir + 1) % 4;
    } else {
      dir = (dir + 3) % 4;
    }
    for (let i = 0; i < steps; i++) {
      switch (dir) {
        case 0:
          curr[1]++;
          break;
        case 1:
          curr[0]++;
          break;
        case 2:
          curr[1]--;
          break;
        case 3:
          curr[0]--;
          break;
      }
      const key = curr.join(",");
      console.log(key);
      if (visited.has(key)) {
        return Math.abs(curr[0]) + Math.abs(curr[1]);
      }
      visited.set(key, 1);
    }
  }
}

console.log(partTwo());
