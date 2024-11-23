// Ahh fun multiple generations

// TEST

// let state = "#..#.#..##......###...###";

// const rules = `...## => #
// ..#.. => #
// .#... => #
// .#.#. => #
// .#.## => #
// .##.. => #
// .#### => #
// #.#.# => #
// #.### => #
// ##.#. => #
// ##.## => #
// ###.. => #
// ###.# => #
// ####. => #`.split("\n");

// REAL INPUT

let state =
  "#.##.##.##.##.......###..####..#....#...#.##...##.#.####...#..##..###...##.#..#.##.#.#.#.#..####..#";
const rules = input;

const r = {};
rules.forEach((rule) => {
  const [key, val] = rule.split(" => ");
  r[key] = val;
});

console.log(r);

function partOne() {
  const numGens = 20;

  for (let i = 0; i < numGens; i++) {
    // console.log("Gen", i, state);
    state = "...." + state + "....";
    let newState = "";
    for (let j = 0; j < state.length; j++) {
      // Ah, 5, not 4..
      if (j > state.length - 5) {
        continue;
      }
      const sub = state.slice(j, j + 5);
      //   console.log(sub, r[sub], j);
      const val = r[sub] ?? ".";
      newState += val;
      //   newState = state.slice(0, j + 2) + val + state.slice(j + 3);
    }
    state = newState;
    console.log(state.slice(numGens * 2, state.length - numGens * 2));
  }

  let count = 0;

  for (let i = 0; i < state.length; i++) {
    if (state[i] === "#") {
      count += i - numGens * 2;
    }
  }

  // 7455 is too high...
  // Ahhh and 3356 is too low. I thought we would fix it with moving state = newState...
  // Ok now we got there. We need to built up new state one char at a time.
  // Oh no now we have 2252..... oh that was 3 gens lol.
  // Yesssss 3903 finally
  return count;
}

console.log(partOne());

// Part two asks for 50 billion generations lol.
