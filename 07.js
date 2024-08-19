const input = `T C
V C
Y H
R U
B J
Q O
W O
S X
I N
X H
M L
A F
G P
U E
Z E
H L
P C
K F
O C
C F
D L
L F
N E
J F
F E
I A
Z J
I P
T E
R F
U H
K E
D N
U C
D J
N F
C J
U J
A O
H N
P O
I E
G F
O J
Q F
G J
X E
S D
R P
K L
R Q
L N
Q C
C D
C N
O E
W F
K D
T H
M D
Y Z
J E
S F
G U
V S
Y F
G H
T Q
S U
V D
W M
M E
A H
B F
B N
D F
W K
P E
B X
Q U
Q X
X N
M Z
G Z
S G
P F
I O
R A
L J
B I
C E
B W
P N
H C
K J
Y M
Z P
I K
V E
Y P
T R`
  .split("\n")
  .map((l) => l.split(" "));

const test = `C A
C F
A B
A D
B E
D E
F E`
  .split("\n")
  .map((l) => l.split(" "));

// Rules are of the form "Step T must be completed before step C can begin."

// Nice! Topological Sort!

// console.log(test);

function partOne() {
  // So we want a structure to store...
  // - List of nodes that depend on this node
  // - Number of nodes that this node depends on.
  const g = {};
  for (const [before, after] of input) {
    if (!g[after]) {
      g[after] = {
        children: [],
        count: 0,
      };
    }
    if (!g[before]) {
      g[before] = {
        children: [],
        count: 0,
      };
    }
    // Think we had these backwards... yeah that was source of issue
    g[before].children.push(after);
    g[after].count++;
  }

  let res = "";

  //   return g;

  while (true) {
    // Find the next node to process (the one with no dependencies)
    // Should pick alphabetically first one, via sort
    // But need to do it backwards because we reverse at end.. nvm we were backwards elsewhere
    const nextArr = Object.keys(g).filter((k) => g[k].count === 0);

    // const next = nextArr.sort()[nextArr.length - 1];
    const next = nextArr.sort()[0];

    if (!next) {
      break;
    }
    // console.log(next);
    res += next;

    // Everyone who depends on next, well, you now have one less dependency.
    g[next].children.forEach((c) => {
      g[c].count--;
    });

    delete g[next];
  }

  //   return res.split("").reverse().join("");
  return res;
}

// BITRAVSGQUXYHWMZPOCKDLJNFE is wrong.....
// BITRAQVSGUWKXYHMZPOCDLJNFE is right!
// console.log("Result", partOne());

// whoa part 2 seems hard.... multiple workers processing in parallel and each step has time cost.

// function partTwo() {
// const allLetters = partOne();
// const timeLeft = {};
// allLetters.split("").forEach((c) => {
//   // A takes 61 seconds, B takes 62, etc.
//   timeLeft[c] = 60 + c.charCodeAt(0) - 64;
//   // console.log(c, timeLeft[c]);
// });
// // Repeat this from part one:
// const g = {};
// for (const [before, after] of input) {
//   if (!g[after]) {
//     g[after] = {
//       children: [],
//       count: 0,
//     };
//   }
//   if (!g[before]) {
//     g[before] = {
//       children: [],
//       count: 0,
//     };
//   }
//   // Think we had these backwards... yeah that was source of issue
//   g[before].children.push(after);
//   g[after].count++;
// }
// let time = 0;
// // Each tick: process all current jobs by one second.
// // If any complete, handle that. (compute new jobs with 0 dependencies, add to queue)
// // Then assign jobs in toProcess queue to available workers if possible.
// let toProcess = Object.keys(g)
//   .filter((k) => g[k].count === 0)
//   .sort();
// const jobs = [];
// while (true && time < 100) {
//   time++;
//   jobs.forEach((c) => {
//     timeLeft[c]--;
//     // Job done!
//     if (timeLeft[c] === 0) {
//       console.log("completed", c);
//       // Everyone who depends on next, well, you now have one less dependency.
//       g[c].children.forEach((ch) => {
//         g[ch].count--;
//       });
//       delete g[c];
//     }
//   });
//   const nextArr = Object.keys(g)
//     .filter((k) => g[k].count === 0)
//     .filter((k) => !jobs.includes(k));
//   toProcess = [...toProcess, ...nextArr];
//   console.log("nextarr", nextArr);
//   while (jobs.length < 5 && toProcess.length > 0) {
//     jobs.push(toProcess.shift());
//   }
//   console.log(jobs);
// }
// return allLetters;
// }

console.log("Result", partTwo());

// =================================================

// For each tick, we need to:
// - process all tasks by one second
// - if any complete, remove them from activeTasks.
// - compute any new tasks that become possible (& sort entire list).
// - assign any awaiting tasks to free workers.

// ===================================================

// Second attempt at Part two

// For each tick:
// Find any tasks with 0 dependencies, and assign them to free workers.
// Process all assigned tasks by one second.
// Any that are complete, go ahead and process that.

// YES, WE GOT THERE!

function partTwo() {
  // Values will be [task, timeLeft]
  const workers = new Map();
  for (let i = 0; i < 5; i++) {
    workers.set(i, null);
  }

  // Set up the graph stuff
  const g = {};
  for (const [before, after] of input) {
    if (!g[after]) {
      g[after] = {
        dependents: [],
        numDependencies: 0,
      };
    }
    if (!g[before]) {
      g[before] = {
        dependents: [],
        numDependencies: 0,
      };
    }
    // Think we had these backwards... yeah that was source of issue
    g[before].dependents.push(after);
    g[after].numDependencies++;
  }

  let time = 0;
  let completed = "";

  while (completed.length < Object.keys(g).length) {
    // Find any tasks with 0 dependencies, and assign them to free workers.
    // Filter out assigned tasks
    const assigned = [...workers].map((k) => k[1]?.[0]);
    // console.log("Assigned", assigned);

    const nextArr = Object.keys(g)
      .filter((k) => g[k].numDependencies === 0)
      .filter((k) => !assigned.includes(k))
      .filter((k) => !completed.includes(k))
      .sort();

    // console.log(nextArr);

    // Assign tasks to free workers
    for (const next of nextArr) {
      const worker = [...workers].find(([_, task]) => task === null);
      if (worker) {
        // A takes 61 seconds, B takes 62, etc.
        workers.set(worker[0], [next, 60 + next.charCodeAt(0) - 64]);
        // console.log("Assigned", next, time, workers.get(worker[0]));

        // delete g[next];
      }
    }

    // Process all assigned tasks by one second.
    for (const [worker, task] of workers) {
      if (task) {
        workers.set(worker, [task[0], task[1] - 1]);
        // console.log("Processing", worker, time, task[0], task[1]);

        // Ahhh off by one...
        if (task[1] - 1 === 0) {
          // Task complete!
          // console.log("Completed", task[0], time);

          // Everyone who depends on next, well, you now have one less dependency.
          g[task[0]].dependents.forEach((ch) => {
            g[ch].numDependencies--;
          });
          // delete g[task[0]];
          completed += task[0];

          // Free the worker
          workers.set(worker, null);
        }
      }
    }

    time++;
  }

  return time;
}
