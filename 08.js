function partOne() {
  const nums = input.split(" ").map(Number);

  function process(n) {
    let children = n.shift();
    let metadata = n.shift();
    let sum = 0;
    for (let i = 0; i < children; i++) {
      sum += process(n);
    }
    for (let i = 0; i < metadata; i++) {
      sum += n.shift();
    }
    return sum;
  }

  // Shit that's right!
  // Copilot helped with this one...
  return process(nums);
}

const test = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";

function partTwo() {
  const nums = input.split(" ").map(Number);

  function process(n) {
    let children = n.shift();
    let metadata = n.shift();
    let sum = 0;
    const childValues = [];
    for (let i = 0; i < children; i++) {
      // sum += process(n);
      childValues.push(process(n));
    }
    const metaValues = [];
    for (let i = 0; i < metadata; i++) {
      metaValues.push(n.shift());
    }

    if (childValues.length === 0) {
      return metaValues.reduce((a, v) => a + v, 0);
    }

    return metaValues.reduce((a, v) => a + (childValues[v - 1] ?? 0), 0);
  }

  return process(nums);

  // Oh the same kind of approach won't work because we have to know when we finish a child.. and where next starts..

  // BOOM!
  // no way!
  // the same approach did work!!!!!
}

console.log(partTwo());
