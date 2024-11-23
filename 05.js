function findPair(str) {
  let prev = -1;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // Detect whether they are uppercase/lowercase pair
    if (Math.abs(code - prev) === 32) {
      return i - 1;
    }
    prev = code;
  }
  return -1;
}

function partOne(arg) {
  //   return input.length;
  let line = arg;

  let x = findPair(line);

  // Nice!
  while (x !== -1) {
    line = line.slice(0, x) + line.slice(x + 2);
    x = findPair(line);
  }

  return line.length;
}

// console.log(partOne());

// What?? Again we get same answer as part one??? Just like 04.js??? Oh because didn't accept arg for partOne haha
function partTwo() {
  const chars = new Set(input.toLowerCase());

  let min = Infinity;

  for (const c of chars) {
    // console.log(c);
    const newLine = input
      .split("")
      .filter((x) => x.toLowerCase() !== c)
      .join("");

    const l = partOne(newLine);
    if (l < min) {
      min = l;
    }
  }

  return min;
}

// 12.5 seconds
console.time("two");
console.log(partTwo());
console.timeEnd("two");
