const test = "R8, R4, R4, R8";
const input = `R2, L3, R2, R4, L2, L1, R2, R4, R1, L4, L5, R5, R5, R2, R2, R1, L2, L3, L2, L1, R3, L5, R187, R1, R4, L1, R5, L3, L4, R50, L4, R2, R70, L3, L2, R4, R3, R194, L3, L4, L4, L3, L4, R4, R5, L1, L5, L4, R1, L2, R4, L5, L3, R4, L5, L5, R5, R3, R5, L2, L4, R4, L1, R3, R1, L1, L2, R2, R2, L3, R3, R2, R5, R2, R5, L3, R2, L5, R1, R2, R2, L4, L5, L1, L4, R4, R3, R1, R2, L1, L2, R4, R5, L2, R3, L4, L5, L5, L4, R4, L2, R1, R1, L2, L3, L2, R2, L4, R3, R2, L1, L3, L2, L4, L4, R2, L3, L3, R2, L4, L3, R4, R3, L2, L1, L4, R4, R2, L4, L4, L5, L1, R2, L5, L2, L3, R2, L2`;

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
