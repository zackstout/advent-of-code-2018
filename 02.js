const getCount = (str) => {
  const res = {};
  str.split("").forEach((c) => {
    if (res[c]) {
      res[c]++;
    } else {
      res[c] = 1;
    }
  });
  return res;
};

// Find a checksum based on frequency counts.
function partOne() {
  let two = 0;
  let three = 0;
  input.forEach((str) => {
    const count = getCount(str);
    const hasTwo = Object.values(count).includes(2);
    const hasThree = Object.values(count).includes(3);
    if (hasTwo) {
      two++;
    }
    if (hasThree) {
      three++;
    }
  });
  console.log(two * three);
}

partOne();

// Find the two strings that differ in exactly one character
function partTwo() {
  outer: for (let i = 0; i < input.length; i++) {
    const str1 = input[i];

    for (let j = i; j < input.length; j++) {
      const str2 = input[j];

      let diff = 0;
      let common = "";
      for (let k = 0; k < str1.length; k++) {
        if (str1[k] !== str2[k]) {
          diff++;
        } else {
          common += str1[k];
        }
      }

      if (diff === 1) {
        return common;
      }
    }
  }
}

console.log(partTwo());
