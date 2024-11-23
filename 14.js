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

  let times = 0;
  let curr = "";

  function setCurr(val) {
    curr += val;
    if (curr.length > 6) {
      curr = curr.slice(-6);
    }
  }

  while (true) {
    const sum = arr[elf1] + arr[elf2];
    if (sum >= 10) {
      arr.push(1);
      setCurr(1);
      if (curr === "293801") return arr.length - 6;

      // ahhh of course we have to check HERE!
      // yep that was it!
      // similar trick got me on day 13 too
      arr.push(sum - 10);
      setCurr(sum - 10);
    } else {
      arr.push(sum);
      setCurr(sum);
    }
    if (curr === "293801") return arr.length - 6;

    elf1 = (elf1 + 1 + arr[elf1]) % arr.length;
    elf2 = (elf2 + 1 + arr[elf2]) % arr.length;
    times++;

    // Ok nice this did take it down to 10 seconds. Still same (wrong) answer though...
    // curr += sum;
    // if (curr.length > 6) {
    //   curr = curr.slice(-6);
    // }
    // // console.log("curr", curr);
    // if (curr === "515891" || times === 14) {
    //   break;
    // }

    // if (arr.slice(-6).join("") === "293801") {
    //   break;
    // }
  }

  return arr.length - 6;
}

// 107073195 is too high.... and took 22 seconds...
console.time("two");
console.log("Part two:", partTwo());
console.timeEnd("two");
