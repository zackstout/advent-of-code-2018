const operations = {
  addr: (a, b, c, registers) => {
    registers[c] = registers[a] + registers[b];
    return registers;
  },
  addi: (a, b, c, registers) => {
    registers[c] = registers[a] + b;
    return registers;
  },
  mulr: (a, b, c, registers) => {
    registers[c] = registers[a] * registers[b];
    // console.log("multiply", registers, a, b, c);
    return registers;
  },
  muli: (a, b, c, registers) => {
    registers[c] = registers[a] * b;
    return registers;
  },
  banr: (a, b, c, registers) => {
    registers[c] = registers[a] & registers[b];
    return registers;
  },
  bani: (a, b, c, registers) => {
    registers[c] = registers[a] & b;
    return registers;
  },
  borr: (a, b, c, registers) => {
    registers[c] = registers[a] | registers[b];
    return registers;
  },
  bori: (a, b, c, registers) => {
    registers[c] = registers[a] | b;
    return registers;
  },
  setr: (a, b, c, registers) => {
    registers[c] = registers[a];
    return registers;
  },
  seti: (a, b, c, registers) => {
    registers[c] = a;
    return registers;
  },
  gtir: (a, b, c, registers) => {
    registers[c] = a > registers[b] ? 1 : 0;
    return registers;
  },
  gtri: (a, b, c, registers) => {
    registers[c] = registers[a] > b ? 1 : 0;
    return registers;
  },
  gtrr: (a, b, c, registers) => {
    registers[c] = registers[a] > registers[b] ? 1 : 0;
    return registers;
  },
  eqir: (a, b, c, registers) => {
    registers[c] = a === registers[b] ? 1 : 0;
    return registers;
  },
  eqri: (a, b, c, registers) => {
    registers[c] = registers[a] === b ? 1 : 0;
    return registers;
  },
  eqrr: (a, b, c, registers) => {
    registers[c] = registers[a] === registers[b] ? 1 : 0;
    return registers;
  },
};

const input = `#ip 3
  addi 3 16 3
  seti 1 2 5
  seti 1 3 2
  mulr 5 2 1
  eqrr 1 4 1
  addr 1 3 3
  addi 3 1 3
  addr 5 0 0
  addi 2 1 2
  gtrr 2 4 1
  addr 3 1 3
  seti 2 5 3
  addi 5 1 5
  gtrr 5 4 1
  addr 1 3 3
  seti 1 2 3
  mulr 3 3 3
  addi 4 2 4
  mulr 4 4 4
  mulr 3 4 4
  muli 4 11 4
  addi 1 6 1
  mulr 1 3 1
  addi 1 21 1
  addr 4 1 4
  addr 3 0 3
  seti 0 3 3
  setr 3 4 1
  mulr 1 3 1
  addr 3 1 1
  mulr 3 1 1
  muli 1 14 1
  mulr 1 3 1
  addr 4 1 4
  seti 0 3 0
  seti 0 7 3`
  .split("\n")
  .map((x) => x.trim());

console.log(input.slice(0, 3));

function partOne() {
  // part two, just change register 0 to start with 1
  let registers = [0, 0, 0, 0, 0, 0];

  // WHICH register holds the instruction pointer
  const ip = parseInt(input[0].split(" ")[1]);

  while (true) {
    const instruction = input[registers[ip] + 1].split(" ");
    const op = instruction[0];
    const a = parseInt(instruction[1]);
    const b = parseInt(instruction[2]);
    const c = parseInt(instruction[3]);

    registers = operations[op](a, b, c, registers);

    registers[ip] = registers[ip] + 1;

    if (registers[ip] >= input.length) {
      break;
    }
    // console.log(registers[ip]);
  }

  return registers[0];
}

// Nice!!! Took a couple seconds.
console.log(partOne());
