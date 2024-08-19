function partOne() {
  //   const times = 18;
  const times = 293801;
  const arr = [3, 7];
  let elf1 = 0;
  let elf2 = 1;

  while (arr.length < times + 10) {
    const sum = arr[elf1] + arr[elf2];
    if (sum >= 10) {
      arr.push(1);
      arr.push(sum - 10);
    } else {
      arr.push(sum);
    }

    elf1 = (elf1 + 1 + arr[elf1]) % arr.length;
    elf2 = (elf2 + 1 + arr[elf2]) % arr.length;
  }

  return arr.slice(times, times + 10).join("");
}

console.time("one");
console.log(partOne());
console.timeEnd("one");

function partTwo() {
  const arr = [3, 7];
  let elf1 = 0;
  let elf2 = 1;

  //   let times = 0;
  while (true) {
    const sum = arr[elf1] + arr[elf2];
    if (sum >= 10) {
      arr.push(1);
      arr.push(sum - 10);
    } else {
      arr.push(sum);
    }

    elf1 = (elf1 + 1 + arr[elf1]) % arr.length;
    elf2 = (elf2 + 1 + arr[elf2]) % arr.length;
    // times++;

    if (arr.slice(-6).join("") === "293801") {
      break;
    }
  }

  return arr.length - 6;
}

// 107073195 is too high.... and took 22 seconds...
console.time("two");
console.log(partTwo());
console.timeEnd("two");
