console.log(input.slice(0, 3));

function analyze(lines) {
  const guards = {};

  // Yeah this was tricky, we have to sort first.
  // I bet he intentionally made it not matter for part one. Little devil.

  // THIS MAKES NO DIFFERENCE???? ahhhh we need to ignore the "[".... sure...
  lines.sort((a, b) => {
    const date1 = a[0]
      .split(" ")[0]
      .split("-")
      .map((x) => (x[0] === "[" ? parseInt(x.slice(1)) : parseInt(x)));
    const date2 = b[0]
      .split(" ")[0]
      .split("-")
      .map((x) => (x[0] === "[" ? parseInt(x.slice(1)) : parseInt(x)));
    if (date1[0] !== date2[0]) {
      return date1[0] - date2[0];
    } else if (date1[1] !== date2[1]) {
      return date1[1] - date2[1];
    } else if (date1[2] !== date2[2]) {
      return date1[2] - date2[2];
    } else {
      const time1 = a[0]
        .split(" ")[1]
        .split(":")
        .map((x) => parseInt(x));
      const time2 = b[0]
        .split(" ")[1]
        .split(":")
        .map((x) => parseInt(x));
      if (time1[0] !== time2[0]) {
        return time1[0] - time2[0];
      } else {
        return time1[1] - time2[1];
      }
    }
  });

  let currentGuard = -1;

  for (const line of lines) {
    const [date, event] = line;
    const minute = parseInt(date.split(" ")[1].split(":")[1]);
    const guard = event.split(" ")[1].replace("#", "");
    if (event.includes("Guard")) {
      currentGuard = guard;
      if (!guards[guard]) {
        guards[guard] = {
          // total: 0,
          minutes: new Array(60).fill(0),
        };
      }
    } else if (event.includes("falls asleep")) {
      guards[currentGuard].start = minute;
    } else if (event.includes("wakes up")) {
      // guards[guard].total += minute - guards[guard].start;
      for (let i = guards[currentGuard].start; i < minute; i++) {
        guards[currentGuard].minutes[i]++;
      }
    }
  }

  return guards;
}

// Find the guard who spent the most minutes asleep and which minute he was most often asleep.
function partOne() {
  const guards = analyze(input);
  //   return guards;

  const maxGuard = Object.keys(guards).sort((a, b) => {
    const v1 = guards[a].minutes.reduce((acc, x) => acc + x, 0);
    const v2 = guards[b].minutes.reduce((acc, x) => acc + x, 0);
    return v2 - v1;
  })[0];

  const { minutes } = guards[maxGuard];

  const maxMinutes = Math.max(...minutes);
  const maxMinute = minutes.indexOf(maxMinutes);

  //   return minutes;
  //   console.log(guards[maxGuard]);

  return maxGuard * maxMinute;
}

// Oooooooh.
// I think we failed to sort the list chronologically... yeah....
// But why did part one work lol.
// Just.... incredible coincidence??
// No... we got the right guard.... huh.... idk....

// Which guard is most frequently asleep at the same minute?
function partTwo() {
  const guards = analyze(input);
  let maxMinute = 0;
  let maxGuard = 0;
  let maxIdx = 0;
  console.log("call part two");

  // Huh... getting same answer as part one... not sure what's wrong....
  for (const guard in guards) {
    const minutes = guards[guard].minutes;
    const max = Math.max(...minutes);
    if (max > maxMinute) {
      maxMinute = max;
      maxGuard = guard;
      maxIdx = minutes.indexOf(max);
    }
  }
  console.log(maxGuard, maxIdx, maxMinute, guards[maxGuard]);

  return parseInt(maxGuard, 10) * maxIdx;
}

console.log(partOne());

console.log(partTwo());
