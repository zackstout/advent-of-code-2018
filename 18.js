const grid = `...........|.|#......|.||.....#|..#.|...#..|#.....
..#..|....##...#....||..##...|...#..#..#|..#..|.|.
#.....#.##...##|##..#.##.#.#|.|.....#||.|.#.|...##
.##|.####.....|#.||.#...|##|.|.||.|.||.........|##
..#..#.#.##||..#....##..#.|.|...#...||.|#.|.......
|.|#...|#.#|#...||#...##.||.|#..|.#....#..|#||...#
...|#...#|#.......|.#..|..##.#...|...|##.....|.||#
|.............|....#...#....#.#..##...#|......#|.#
.#..|...|.|..|..#...#.#|.|...|#...|..##...|..|.|.#
.#.....|........#...||.#....|.....#.|..##....#....
.|.....#|.#....|..#|.#..|#..#..|.|.|....#..||.#|..
..|#..|..||...#.|.|||......#.#|..#...|..|#.##....#
.||.#|...|.|.|....|.|##.#....#|##||##.#......|..##
|.|.|.|#|...|#||.|#....#...|.|###|.#.......#.||#..
#|..|..#..#..|....|...#.#||#||..#.|....#.|.#.##|.|
|...###.|.|..#.|....|#.|....#.|..|##.|.#.....|.|..
#.|.||.#.|#|.|||#.#.|#........##.....#...|...|....
#..#..#.|....|.#||..|.|.#.#..|##|#....|.|....|.##.
|.#...|#..|#..##.||.....#|....||#|.|...|..|.|..#..
#..#........#|..|....|#.##...#...|..|||..#||.#..|#
...|#.|#.....#..#.....#.|.#..||...||...#....##.|..
.#...|.|.......#.#...|##||..#|...||..|#||......#..
.|.|..|.........|#.|#....||......||.|#.#.#...#..|#
.#..|#.##|||.....#|.....|.|...|..##.......|.......
..#|.|.|.#.........#..|||#.....|....|.|.|#..##.|.|
...||#..|.#||...#.#..##.#....#.|....|...#...##.#.|
...|#.#.|#..#...##..#.|#|.#.#...|#..|.|||.|..#.|.#
..|..|..#..|.#.|...|#..|.#.|.......|..##..#..#...#
.#....|...#|.|||#.|...||.##|....###.#...|##...#|##
....|||.|#.#..........#.|..##|....|.#...##..##....
.#..|.....|.#....#..||.#||..#....|.#||.#...#.##|..
|#.|.....|#..||.......|||.|.......||.|.........|#.
||.|..#..|||..||...........|.|#.|#......|.|.|....|
....#.#|.##...##|#..#.#..|.#.|...#|..|.#.||....#.|
.|..#|.......#.|..|..|....#..#|##..|..|.||....#...
..#|..#..#....#........|#..#......#.#.#....|......
...|..|..|#|..#.|....|.|..#..#..|#...#|.#.#.#|....
...#|##...#.....#..#...|..#...#.|.##..#..#.#.#|.|.
.||......|.|..#.##|..#|#..|.|.|.#.|...||...|#..#..
.##......|...##.|.##...|...|#||.|#...|...##..|#..#
#|..|.#.#.|.|#||.....#.|............|..|..|.#....#
.#..#||....#....#.##|#|.|.....#.#.#.|#.|##........
...#.|.|#.|.|..|##..|#.......||#..|....#|..|..##.#
.#|.#..#.##....#..#.|....#|#.|....#|...|.|.|#.....
....#..|||..|....|..|#|..#.#.##..##|..|##|#.#...#|
.|...|...|..#|#.|##.##..|...#....#.#.||..#|.......
#|.#|#.#.|.##....|...|..........|..#..#.|.|.....|.
..|#.##...|...|..#..#..#.|.|.#.#.|#||#....|.||..#.
|..##......#..#..#...##.|...|..|#.#|##......#..#||
....|||.#.###....#.##..|.|##...|.......##..#.||...`
  .split("\n")
  .map((l) => l.split(""));

const testGrid = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`
  .split("\n")
  .map((l) => l.split(""));

// Game of life!

// Ugh had these backwrds...
function get(grid, y, x) {
  return grid[y]?.[x] || "";
}

function count(str, char) {
  return str.split(char).length - 1;
}

// function count(arr, char) {
//   return arr.reduce((acc, curr) => (curr === char ? acc + 1 : acc), 0);
// }

function partOne() {
  let g = grid;
  //   console.log(testGrid.slice(0, 3).map((l) => l.length));

  //   console.log(g);
  for (let i = 0; i < 10; i++) {
    // Need to spread inner too.... to not mutate the original array...
    const newGrid = [...g.map((l) => [...l])];
    for (let y = 0; y < g.length; y++) {
      for (let x = 0; x < g[y].length; x++) {
        const current = g[y][x];
        const adj =
          get(g, y - 1, x - 1) +
          get(g, y - 1, x) +
          get(g, y - 1, x + 1) +
          get(g, y, x - 1) +
          get(g, y, x + 1) +
          get(g, y + 1, x - 1) +
          get(g, y + 1, x) +
          get(g, y + 1, x + 1);

        // console.log(current, adj);
        // Oh this is a nice way of counting number of "|" characters.. Ah but it was wrong lol, off by one
        // No.... that changed nothing....

        // Ahhh it's because we're trying to set string char like r[c] = .... that won't work....
        // must be arrays...
        if (current === "." && count(adj, "|") >= 3) {
          //   console.log("set tree from clear");
          newGrid[y][x] = "|";
        } else if (current === "|") {
          //   console.log("set lumber from tree");

          if (count(adj, "#") >= 3) {
            newGrid[y][x] = "#";
          } else {
            newGrid[y][x] = "|"; // Remaining tree -- yeah this was crucial
          }
        } else if (
          current === "#" &&
          count(adj, "#") >= 1 &&
          count(adj, "|") >= 1
        ) {
          //   console.log("set lumber from lumber");
          newGrid[y][x] = "#";
        } else {
          //   console.log("set empty");
          newGrid[y][x] = ".";
        }
      }
    }

    g = newGrid;
  }

  //   return g.map((l) => l.join("")).join("\n");
  //   return;

  let trees = 0;
  let lumberyards = 0;
  for (let y = 0; y < g.length; y++) {
    for (let x = 0; x < g[y].length; x++) {
      if (g[y][x] === "|") trees++;
      if (g[y][x] === "#") lumberyards++;
    }
  }

  // 459 is too low
  return trees * lumberyards;
}

// console.log(partOne());

// So we crank up to like 1000000000 and see what happens...
// We need to find a cycle in the grid... and then we can just skip to the end of the cycle...
// We could store the grid at each step and then compare to see if we've seen it before...
// I guess we do have to do that, rather than just compare with original grid.
// Because it's not invertible: multiple states can lead to the same state. I am pretty sure at least.
function partTwo() {
  let g = grid;
}

// console.log(partTwo());

function iterate(g) {
  // Need to spread inner too.... to not mutate the original array...
  const newGrid = [...g.map((l) => [...l])];
  for (let y = 0; y < g.length; y++) {
    for (let x = 0; x < g[y].length; x++) {
      const current = g[y][x];
      const adj =
        get(g, y - 1, x - 1) +
        get(g, y - 1, x) +
        get(g, y - 1, x + 1) +
        get(g, y, x - 1) +
        get(g, y, x + 1) +
        get(g, y + 1, x - 1) +
        get(g, y + 1, x) +
        get(g, y + 1, x + 1);

      // console.log(current, adj);
      // Oh this is a nice way of counting number of "|" characters.. Ah but it was wrong lol, off by one
      // No.... that changed nothing....

      // Ahhh it's because we're trying to set string char like r[c] = .... that won't work....
      // must be arrays...
      if (current === "." && count(adj, "|") >= 3) {
        //   console.log("set tree from clear");
        newGrid[y][x] = "|";
      } else if (current === "|") {
        //   console.log("set lumber from tree");

        if (count(adj, "#") >= 3) {
          newGrid[y][x] = "#";
        } else {
          newGrid[y][x] = "|"; // Remaining tree -- yeah this was crucial
        }
      } else if (
        current === "#" &&
        count(adj, "#") >= 1 &&
        count(adj, "|") >= 1
      ) {
        //   console.log("set lumber from lumber");
        newGrid[y][x] = "#";
      } else {
        //   console.log("set empty");
        newGrid[y][x] = ".";
      }
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(newGrid);
    }, 50);
  });
}

// Nice!
async function animate() {
  let g = grid;

  while (true) {
    console.clear();
    console.log(g.map((l) => l.join("")).join("\n"));
    g = await iterate(g);
  }
}

animate();
