function chunk(arr, size) {
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += size)
    R.push(arr.slice(i, i + size));
  return R;
}

// Oh boy, register simulation....

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

function sameArray(a, b) {
  return a.every((v, i) => v === b[i]);
}

function evaluateCode(init, code, after) {
  let registers = init.slice();

  //   console.log("eval", init, code, after);

  let count = 0;

  // Ignore first element which is op code
  // -- but not for part two!
  const args = code.split(" ").map(Number).slice(1);

  const ops = [];
  const opCode = code.split(" ").map(Number)[0];

  Object.keys(operations).forEach((op) => {
    const fn = operations[op];

    // Have to reset, duh
    registers = init.slice();

    // console.log("fn", op, fn);

    const res = fn(...args, registers);
    // console.log("res", res);
    if (sameArray(res, after)) {
      //   console.log(op, args, registers);
      count++;
      ops.push(op);
    }
  });

  return { count, ops, opCode };
}

function partOne() {
  // So we are given a list of "Before, Instruction, After"
  // and we need to figure out how many of the instructions could have been executed to produce such output.

  const lines = input.split("\n");
  const chunks = chunk(lines, 4);
  console.log(chunks.slice(-2));

  // PART ONE -- WORKS
  return chunks.filter((chunk) => {
    let [before, code, after] = chunk;
    before = before.match(/\d+/g).map(Number);
    after = after.match(/\d+/g).map(Number);

    return evaluateCode(before, code, after).count >= 3;
  }).length;

  return evaluateCode([3, 2, 1, 1], "9 2 1 2", [3, 2, 2, 1]);
}

// 527 is too low... Ah we just missed an operation
console.log(partOne());

// Ahh part two should be fun to figure out... We have to map each op code to an operation
// and run the test program.

const program = `9 2 0 1
9 0 1 0
9 3 0 3
10 3 1 1
8 1 1 1
14 1 2 2
7 2 2 1
9 1 3 3
9 1 2 0
9 3 0 2
8 3 2 3
8 3 1 3
14 3 1 1
7 1 3 2
9 1 2 3
8 0 0 0
0 0 2 0
8 1 0 1
0 1 3 1
15 3 0 0
8 0 3 0
8 0 2 0
14 2 0 2
7 2 1 1
9 1 2 2
8 0 0 0
0 0 3 0
9 0 3 3
1 0 2 2
8 2 1 2
14 2 1 1
7 1 0 2
8 2 0 3
0 3 2 3
9 2 1 0
9 3 3 1
4 0 3 0
8 0 3 0
14 0 2 2
9 1 1 3
9 1 2 1
9 1 0 0
14 1 3 0
8 0 1 0
14 0 2 2
9 2 1 1
9 2 2 0
6 0 3 1
8 1 2 1
8 1 2 1
14 1 2 2
7 2 2 1
9 1 0 0
8 1 0 3
0 3 0 3
9 3 0 2
12 3 2 0
8 0 3 0
8 0 1 0
14 0 1 1
9 1 2 0
8 3 0 3
0 3 1 3
9 0 0 2
8 0 2 2
8 2 2 2
14 1 2 1
9 2 0 0
8 0 0 2
0 2 2 2
6 0 3 0
8 0 1 0
8 0 3 0
14 0 1 1
7 1 0 3
9 2 3 0
9 3 3 2
9 3 0 1
1 1 2 2
8 2 2 2
14 3 2 3
7 3 3 0
9 0 1 2
9 0 1 1
9 3 1 3
1 3 2 2
8 2 3 2
14 0 2 0
7 0 0 3
9 2 2 0
9 1 1 1
9 3 2 2
13 0 2 1
8 1 2 1
8 1 2 1
14 3 1 3
7 3 0 1
9 2 2 3
9 0 1 2
12 2 3 2
8 2 1 2
14 1 2 1
8 1 0 2
0 2 2 2
9 1 2 3
8 2 0 0
0 0 1 0
7 0 2 0
8 0 3 0
8 0 2 0
14 1 0 1
7 1 0 0
8 3 0 2
0 2 1 2
9 1 3 1
14 1 3 3
8 3 1 3
8 3 3 3
14 0 3 0
9 2 1 1
9 0 1 3
9 2 3 3
8 3 2 3
8 3 3 3
14 0 3 0
7 0 2 1
9 1 2 3
9 2 1 0
6 0 3 2
8 2 3 2
14 1 2 1
7 1 2 3
9 1 1 0
9 2 1 2
9 3 1 1
0 0 1 2
8 2 2 2
14 2 3 3
7 3 1 0
9 2 1 3
8 0 0 2
0 2 3 2
9 0 0 1
9 2 1 2
8 2 3 2
8 2 3 2
14 0 2 0
7 0 1 2
9 1 2 3
9 2 3 1
9 3 2 0
10 0 1 0
8 0 2 0
14 2 0 2
7 2 0 3
8 2 0 2
0 2 3 2
9 2 1 0
8 1 0 1
0 1 3 1
10 1 0 1
8 1 2 1
8 1 3 1
14 1 3 3
7 3 2 0
9 1 0 1
9 1 3 3
9 2 3 1
8 1 2 1
14 1 0 0
7 0 3 2
9 2 3 0
9 3 0 3
9 2 1 1
10 3 0 1
8 1 3 1
14 2 1 2
7 2 0 0
9 3 0 2
9 3 0 1
9 2 1 3
10 1 3 3
8 3 2 3
14 3 0 0
7 0 0 2
9 1 3 3
9 2 0 0
9 1 1 1
6 0 3 0
8 0 1 0
14 0 2 2
7 2 0 3
8 2 0 0
0 0 1 0
9 2 0 2
9 2 3 1
7 0 2 0
8 0 2 0
14 0 3 3
9 3 2 1
9 1 0 2
9 1 0 0
0 0 1 0
8 0 2 0
14 3 0 3
7 3 3 1
9 2 2 3
9 2 0 2
9 1 3 0
7 0 2 3
8 3 3 3
8 3 2 3
14 1 3 1
9 0 3 2
9 3 3 3
8 0 2 3
8 3 2 3
8 3 2 3
14 3 1 1
8 1 0 0
0 0 0 0
9 1 3 3
9 3 0 2
8 3 2 2
8 2 2 2
14 1 2 1
7 1 0 2
9 2 0 0
9 0 2 1
9 2 1 3
5 0 3 3
8 3 1 3
8 3 3 3
14 2 3 2
9 1 2 3
9 1 0 1
15 3 0 0
8 0 2 0
14 0 2 2
7 2 0 0
9 1 2 2
9 2 0 3
15 1 3 2
8 2 1 2
14 2 0 0
9 0 0 3
8 3 0 2
0 2 2 2
9 0 1 1
5 2 3 1
8 1 1 1
8 1 3 1
14 0 1 0
9 3 2 2
9 3 0 1
9 2 2 3
1 1 2 2
8 2 3 2
14 2 0 0
7 0 1 3
9 2 3 2
9 2 2 0
11 0 1 2
8 2 1 2
14 3 2 3
7 3 0 1
9 2 3 2
9 1 1 0
9 3 3 3
7 0 2 3
8 3 1 3
14 1 3 1
9 3 3 2
8 1 0 3
0 3 3 3
8 3 0 0
0 0 2 0
13 0 2 2
8 2 2 2
8 2 2 2
14 1 2 1
9 2 2 2
9 1 3 3
6 0 3 2
8 2 3 2
14 1 2 1
7 1 0 2
9 3 3 1
9 1 0 0
0 3 1 1
8 1 3 1
14 2 1 2
7 2 1 1
9 2 1 0
8 3 0 3
0 3 3 3
9 3 3 2
3 0 2 2
8 2 1 2
8 2 1 2
14 2 1 1
7 1 2 2
8 2 0 3
0 3 1 3
9 0 1 1
6 0 3 1
8 1 1 1
14 2 1 2
9 0 3 1
9 3 2 0
9 2 3 3
10 0 3 1
8 1 2 1
8 1 2 1
14 2 1 2
7 2 3 3
9 0 1 2
9 1 0 0
9 3 3 1
8 0 2 1
8 1 1 1
14 3 1 3
7 3 1 2
9 2 0 1
9 0 2 3
9 2 3 0
5 1 3 1
8 1 3 1
8 1 1 1
14 1 2 2
7 2 0 1
9 3 2 0
8 0 0 2
0 2 0 2
9 3 2 3
13 2 0 0
8 0 3 0
14 1 0 1
8 3 0 2
0 2 2 2
8 1 0 0
0 0 1 0
7 0 2 2
8 2 3 2
8 2 1 2
14 1 2 1
7 1 2 2
9 0 0 3
8 2 0 1
0 1 1 1
14 0 0 0
8 0 2 0
14 2 0 2
7 2 3 3
8 2 0 0
0 0 3 0
8 0 0 1
0 1 3 1
9 0 0 2
1 0 2 0
8 0 1 0
14 0 3 3
7 3 2 1
9 1 2 3
9 2 1 0
6 0 3 0
8 0 2 0
8 0 3 0
14 0 1 1
7 1 0 3
9 2 0 2
9 1 1 0
8 2 0 1
0 1 2 1
7 0 2 1
8 1 2 1
8 1 3 1
14 3 1 3
9 1 1 1
7 0 2 1
8 1 1 1
14 1 3 3
7 3 3 2
9 2 0 3
9 3 1 1
0 0 1 0
8 0 1 0
14 2 0 2
7 2 0 3
8 0 0 2
0 2 1 2
9 2 0 0
1 1 2 1
8 1 1 1
14 1 3 3
7 3 1 2
9 1 2 1
9 2 0 3
15 1 3 0
8 0 2 0
14 0 2 2
9 3 2 3
9 2 0 0
9 3 2 1
11 0 1 0
8 0 3 0
14 0 2 2
7 2 3 3
9 3 1 0
9 3 3 2
9 1 2 1
8 1 2 1
8 1 1 1
8 1 3 1
14 3 1 3
7 3 0 0
9 2 2 2
8 1 0 3
0 3 0 3
9 0 2 1
2 3 2 1
8 1 1 1
14 1 0 0
7 0 0 1
9 2 1 0
9 3 2 2
12 3 2 2
8 2 3 2
14 2 1 1
7 1 0 2
8 0 0 1
0 1 3 1
9 2 3 3
10 1 3 1
8 1 2 1
14 1 2 2
7 2 2 1
9 1 0 2
5 0 3 0
8 0 1 0
14 0 1 1
7 1 3 3
9 3 3 2
9 2 0 0
9 3 1 1
13 0 2 2
8 2 3 2
8 2 1 2
14 3 2 3
9 3 3 2
8 2 0 1
0 1 0 1
3 0 2 1
8 1 3 1
8 1 3 1
14 1 3 3
7 3 2 1
9 1 3 3
13 0 2 2
8 2 2 2
14 2 1 1
7 1 2 0
9 2 1 3
9 1 0 1
9 2 0 2
5 2 3 3
8 3 1 3
14 0 3 0
8 1 0 3
0 3 2 3
9 3 1 1
10 1 3 1
8 1 3 1
8 1 1 1
14 0 1 0
9 3 3 1
9 3 2 3
11 2 1 1
8 1 2 1
8 1 1 1
14 1 0 0
7 0 0 1
9 0 2 2
8 2 0 0
0 0 3 0
8 1 0 3
0 3 2 3
13 2 0 3
8 3 3 3
14 3 1 1
9 1 1 2
8 1 0 3
0 3 1 3
14 3 3 3
8 3 3 3
14 3 1 1
7 1 3 3
9 3 0 2
9 1 0 1
9 2 1 0
8 0 1 0
8 0 2 0
14 0 3 3
7 3 3 2
8 3 0 0
0 0 2 0
8 3 0 1
0 1 3 1
9 1 1 3
6 0 3 0
8 0 2 0
14 2 0 2
9 1 0 1
9 2 1 3
9 0 2 0
15 1 3 1
8 1 3 1
14 2 1 2
7 2 3 1
9 1 3 0
9 3 1 2
9 0 0 3
12 3 2 3
8 3 1 3
14 3 1 1
7 1 1 2
9 1 1 3
9 2 3 0
9 0 1 1
15 3 0 0
8 0 2 0
14 0 2 2
7 2 3 0
8 1 0 1
0 1 2 1
9 0 2 3
9 2 2 2
2 3 2 3
8 3 3 3
14 0 3 0
7 0 0 2
9 3 3 0
9 2 2 3
3 1 0 1
8 1 1 1
14 1 2 2
9 0 1 1
10 0 3 0
8 0 1 0
8 0 2 0
14 0 2 2
8 3 0 0
0 0 2 0
4 0 3 3
8 3 3 3
14 3 2 2
7 2 3 0
8 0 0 3
0 3 1 3
9 3 2 1
9 2 0 2
14 3 3 1
8 1 3 1
14 1 0 0
7 0 1 2
9 1 0 0
9 2 0 3
9 3 0 1
10 1 3 3
8 3 2 3
14 2 3 2
7 2 2 1
8 3 0 3
0 3 0 3
9 2 1 2
8 3 0 0
0 0 3 0
11 2 0 3
8 3 1 3
8 3 1 3
14 1 3 1
9 1 0 3
9 3 2 2
9 2 0 0
13 0 2 3
8 3 2 3
14 3 1 1
8 3 0 3
0 3 3 3
8 0 0 0
0 0 1 0
8 0 2 0
8 0 3 0
14 1 0 1
7 1 1 3
9 1 3 1
9 2 1 0
13 0 2 0
8 0 2 0
8 0 2 0
14 3 0 3
7 3 3 0
8 0 0 3
0 3 3 3
9 0 2 1
1 3 2 2
8 2 2 2
14 2 0 0
9 3 2 2
9 3 1 1
1 3 2 1
8 1 3 1
8 1 1 1
14 1 0 0
7 0 2 2
9 3 3 1
9 1 2 0
9 1 0 3
0 0 1 1
8 1 3 1
14 2 1 2
7 2 3 1
8 3 0 2
0 2 3 2
8 3 0 0
0 0 2 0
9 2 1 3
4 0 3 0
8 0 1 0
14 0 1 1
9 3 1 3
9 2 3 2
9 2 0 0
10 3 0 0
8 0 3 0
14 1 0 1
8 0 0 3
0 3 0 3
9 1 0 0
7 0 2 2
8 2 1 2
14 1 2 1
9 3 0 0
8 2 0 2
0 2 0 2
13 2 0 2
8 2 3 2
14 1 2 1
9 3 0 2
9 2 2 3
9 2 2 0
3 0 2 3
8 3 2 3
14 3 1 1
7 1 2 2
9 2 0 3
8 1 0 1
0 1 1 1
4 0 3 3
8 3 3 3
8 3 1 3
14 3 2 2
7 2 2 1
9 3 0 0
8 0 0 2
0 2 0 2
9 2 1 3
13 2 0 2
8 2 3 2
14 1 2 1
7 1 1 2
9 0 1 1
9 1 0 0
8 3 0 3
0 3 3 3
0 0 1 1
8 1 1 1
14 1 2 2
7 2 3 1
9 2 3 0
9 2 1 3
9 2 0 2
4 0 3 3
8 3 3 3
14 1 3 1
9 1 1 3
8 1 0 2
0 2 0 2
6 0 3 3
8 3 3 3
14 3 1 1
7 1 1 3
9 1 2 0
9 3 0 1
9 3 1 2
0 0 1 0
8 0 1 0
14 0 3 3
7 3 3 1
8 1 0 0
0 0 1 0
9 2 2 3
9 2 0 2
7 0 2 0
8 0 2 0
14 0 1 1
7 1 0 2
9 1 0 3
9 2 1 1
9 1 1 0
14 0 0 1
8 1 1 1
8 1 2 1
14 1 2 2
7 2 1 3
9 2 3 0
9 3 1 2
9 2 3 1
13 0 2 0
8 0 3 0
14 3 0 3
7 3 0 2
9 3 1 1
9 1 0 3
9 2 2 0
11 0 1 3
8 3 1 3
14 2 3 2
7 2 2 1
8 2 0 0
0 0 1 0
9 2 1 2
9 1 3 3
7 0 2 3
8 3 3 3
14 3 1 1
7 1 2 0
9 0 1 3
9 1 1 1
2 3 2 2
8 2 1 2
14 2 0 0
7 0 3 3
9 3 0 1
9 1 3 0
8 3 0 2
0 2 2 2
0 0 1 1
8 1 2 1
14 1 3 3
7 3 1 2
9 2 1 1
9 1 2 3
9 2 1 0
6 0 3 0
8 0 1 0
8 0 3 0
14 0 2 2
9 2 1 3
9 1 3 1
9 2 1 0
4 0 3 1
8 1 3 1
8 1 1 1
14 1 2 2
7 2 3 1
9 1 3 2
9 3 3 0
9 0 2 3
9 2 0 2
8 2 1 2
14 2 1 1
9 3 2 3
8 1 0 2
0 2 0 2
9 2 2 0
10 3 0 3
8 3 2 3
14 1 3 1
9 0 1 3
9 2 1 2
2 3 2 0
8 0 2 0
14 1 0 1
7 1 0 3
9 3 0 0
9 0 3 1
11 2 0 0
8 0 2 0
14 3 0 3
9 3 3 2
9 3 2 0
9 2 1 1
1 0 2 0
8 0 3 0
14 3 0 3
7 3 0 2
8 1 0 0
0 0 2 0
9 1 0 3
8 0 0 1
0 1 0 1
6 0 3 3
8 3 2 3
8 3 1 3
14 3 2 2
7 2 0 3
9 3 2 2
13 0 2 2
8 2 1 2
14 3 2 3
7 3 3 1
8 0 0 3
0 3 1 3
9 3 1 0
9 2 0 2
11 2 0 3
8 3 1 3
14 3 1 1
9 0 1 3
9 0 1 0
2 3 2 2
8 2 2 2
8 2 2 2
14 2 1 1
7 1 3 3
9 0 2 2
9 3 1 1
1 1 2 2
8 2 3 2
14 2 3 3
7 3 3 0`;

function partTwo() {
  const lines = input.split("\n");
  const chunks = chunk(lines, 4);
  console.log(chunks.slice(-2));

  const data = chunks
    .map((chunk) => {
      let [before, code, after] = chunk;
      before = before.match(/\d+/g).map(Number);
      after = after.match(/\d+/g).map(Number);

      return evaluateCode(before, code, after);
    })
    .sort((a, b) => a.count - b.count);
  // .length
  // .slice(0, 100)

  const opCodes = {};

  // Yes! yay
  while (Object.keys(opCodes).length < 16) {
    data.forEach((d) => {
      if (d.ops.length === 1) {
        const op = d.ops[0];
        opCodes[d.opCode] = op;
        data.forEach((d2) => {
          d2.ops = d2.ops.filter((o) => o !== op);
        });
      }
    });
  }

  // Evaluate the program
  const programLines = program.split("\n");
  let registers = [0, 0, 0, 0];
  programLines.forEach((line) => {
    const [opCode, ...args] = line.split(" ").map(Number);
    registers = operations[opCodes[opCode]](...args, registers);
  });

  // return opCodes;
  return registers[0];
}

console.log(partTwo());
