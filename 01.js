const ints = input;

// Part one
const result = ints.reduce((acc, val) => acc + val, 0);

console.log(result);

// Part two
const hash = {};

// Ah, I see, it may have to repeat.
let r = 0;
outerloop: while (true) {
  for (let i = 0; i < ints.length; i++) {
    const val = ints[i];
    r += val;
    // console.log(r, val);

    if (hash[r]) {
      console.log("Done", r);
      break outerloop;
    }
    hash[r] = true;
  }
}
