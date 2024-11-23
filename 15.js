const test = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;

const test2 = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;

const input = `################################
##########.###.###..############
##########..##......############
#########...##....##############
######.....###..G..G############
##########..........############
##########.............#########
#######G..#.G...#......#########
#..G##....##..#.G#....#...######
##......###..##..####.#..#######
#G.G..#..#....#.###...G..#######
#.....GG##................######
#....G........#####....E.E.#####
#####G...#...#######........####
####.E#.G...#########.......####
#...G.....#.#########......#####
#.##........#########.......####
######......#########........###
######......#########..E.#....##
#######..E.G.#######..........##
#######E......#####............#
#######...G............E.......#
####............##............##
####..G.........##..........E.##
####.G.G#.....####E...##....#.##
#######.......####...####..#####
########....E....########..#####
##########.......#########...###
##########.......#########..####
##########....############..####
###########...##################
################################`;

const getNeighbors = (r, c, grid) => {
  const neighbors = [];
  if (r > 0) neighbors.push([r - 1, c]);
  if (c > 0) neighbors.push([r, c - 1]);
  if (r < grid.length - 1) neighbors.push([r + 1, c]);
  if (c < grid[0].length - 1) neighbors.push([r, c + 1]);
  return neighbors;
};

const getAttackTargets = (r, c, grid, unit) => {
  const targets = [];
  const enemies = unit === "G" ? "E" : "G";
  getNeighbors(r, c, grid).forEach(([nr, nc]) => {
    if (grid[nr][nc] === enemies) {
      targets.push([nr, nc]);
    }
  });
  return targets;
};

const getMoveTargets = (r, c, grid, unit) => {
  const targets = [];
  const enemies = unit === "G" ? "E" : "G";
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === enemies) {
        getNeighbors(r, c, grid).forEach(([nr, nc]) => {
          if (grid[nr][nc] === ".") {
            targets.push([nr, nc]);
          }
        });
      }
    });
  });
  return targets;
};

// N)TE: Needs to take obstacles into account!!!
// Yeah... very very similar to findTargetPosition.... oh well. This time need to track whole path.
const findShortestPaths = (r, c, target, grid, units) => {
  const visited = grid.map((row) => row.map((cell) => false));
  const queue = [[r, c, [[r, c]]]];
  visited[r][c] = true;
  const results = [];
  while (queue.length > 0) {
    const [r, c, steps] = queue.shift();
    if (r === target[0] && c === target[1]) {
      results.push([r, c, [...steps]]);
    }
    getNeighbors(r, c, grid).forEach(([nr, nc]) => {
      if (
        grid[nr][nc] === "." &&
        !visited[nr][nc] &&
        !units.some((u) => u.r === nr && u.c === nc)
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc, [...steps, [nr, nc]]]);
      }
    });
  }
  return results
    .sort((a, b) => {
      if (a[2] === b[2]) {
        if (a[0] === b[0]) {
          return a[1] - b[1];
        }
        return a[0] - b[0];
      }
      return a[2] - b[2];
    })
    .map(([r, c, steps]) => steps);
};

// NOTE: Needs to take obstacles into account!!! -- at least, other units.

// Takes a list of candidates, which are open squares next to enemies.
// Flood fill on grid from source, and find the shortest path to each candidate. (or infinite if does not exist)
// Return the target position that is closest, breaking ties with reading order.
const findTargetPosition = (r, c, candidates, grid, units) => {
  const visited = grid.map((row) => row.map((cell) => false));
  const queue = [[r, c, 0]];
  visited[r][c] = true;
  const results = [];
  while (queue.length > 0) {
    const [r, c, steps] = queue.shift();
    if (candidates.some(([nr, nc]) => nr === r && nc === c)) {
      results.push([r, c, steps]);
    }
    getNeighbors(r, c, grid).forEach(([nr, nc]) => {
      if (
        grid[nr][nc] === "." &&
        !visited[nr][nc] &&
        !units.some((u) => u.r === nr && u.c === nc)
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc, steps + 1]);
      }
    });
  }
  return results.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    }
    return a[2] - b[2];
  });
};

// Ahh right each unit will need some "identity", to keep track of health and such...
// Don't really want to have to track extra data...huh....
// Maybe we initialize grid once.... and put "." where units are... yeah...

class Unit {
  constructor(type, r, c) {
    this.type = type;
    this.r = r;
    this.c = c;
    this.hp = 200;
    this.attackPower = 3;
  }
}

function partOne() {
  const grid = input.split("\n").map((row) => row.split(""));

  let units = [];

  // Initialize grid and units
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "G" || cell === "E") {
        row[c] = ".";
        units.push(new Unit(cell, r, c));
      }
    });
  });

  function getPopulatedGrid() {
    const populatedGrid = grid.map((row) => row.slice());

    units.forEach((unit) => {
      populatedGrid[unit.r][unit.c] = unit.type;
    });
    return populatedGrid;
  }

  //   return units;

  let count = 0;

  while (true && count < 100) {
    count++;
    // New round starts

    console.log("round", count);

    let roundUnits = [...units];

    // Sort by reading order
    roundUnits = roundUnits.sort((a, b) => {
      if (a.r === b.r) {
        return a.c - b.c;
      }
      return a.r - b.r;
    });

    // Note: after each unit takes its turn, we need to update the grid.

    // Keep track of who got killed this round so we can skip them
    const killed = [];

    roundUnits.forEach((unit) => {
      // Account for any units that moved/etc during the round
      const grid = getPopulatedGrid();

      if (killed.includes(unit)) {
        console.log("skipping", unit);
        return;
      }

      function attack(attackTargets) {
        // attack -- reduce hit points by attack power, if below 0, remove. (and don't do its next turn!)
        // (and if it's the last enemy, stop the game)
        attackTargets.sort((a, b) => {
          const aUnit = units.find((u) => u.r === a[0] && u.c === a[1]);
          const bUnit = units.find((u) => u.r === b[0] && u.c === b[1]);
          if (aUnit.hp === bUnit.hp) {
            if (aUnit.r === bUnit.r) {
              return aUnit.c - bUnit.c;
            }
            return aUnit.r - bUnit.r;
          }
          return aUnit.hp - bUnit.hp;
        });
        const targetCoords = attackTargets[0];
        const targetUnit = units.find(
          (u) => u.r === targetCoords[0] && u.c === targetCoords[1]
        );
        targetUnit.hp -= unit.attackPower;
        if (targetUnit.hp <= 0) {
          killed.push(targetUnit);
          console.log("killed", targetUnit);
          units = units.filter((u) => u !== targetUnit);
        }
        // console.log("attacking", unit, targetUnit);
      }

      //   if (
      //     killed.some((k) => {
      //       return k.r === unit.r && k.c === unit.c;
      //     })
      //   ) {
      //     return;
      //   }

      // Oh wait..... "after moving, the unit attacks"....

      // Can attack any adjacent enemy, choose by fewest hit points, then reading order
      const attackTargets = getAttackTargets(unit.r, unit.c, grid, unit.type);
      const canAttack = attackTargets.length > 0 && !killed.includes(unit);

      if (canAttack) {
        attack(attackTargets);
      } else {
        // move

        // find all open squares in range of enemies
        const targets = getMoveTargets(unit.r, unit.c, grid, unit.type);

        // find shortest path to each target (discarding those that are unreachable).
        // choose the target that is closest, break ties with reading order. this selects a target square.
        const targetPositions = findTargetPosition(
          unit.r,
          unit.c,
          targets,
          grid,
          units
        );

        const targetPosition = targetPositions[0];

        if (!targetPosition) {
          return;
        }

        // console.log("moving", unit, targets, targetPositions, targetPosition);

        // then, find ALL shortest paths to target square,
        const shortestPaths = findShortestPaths(
          unit.r,
          unit.c,
          targetPosition,
          grid,
          units
        );

        // and among all steps on shortest paths to target square, choose the first step in reading order.
        const firstStep = shortestPaths[0][1];

        // move unit to that square
        unit.r = firstStep[0];
        unit.c = firstStep[1];

        // console.log("moving", unit, firstStep);

        // attack
        const attackTargets = getAttackTargets(unit.r, unit.c, grid, unit.type);
        const canAttack = attackTargets.length > 0 && !killed.includes(unit);
        if (canAttack) {
          attack(attackTargets);
        }
      }
    });

    // Remove all killed units
    units = units.filter((unit) => !killed.includes(unit));

    if (units.filter((u) => u.type === "G").length === 0) {
      break;
    }
    if (units.filter((u) => u.type === "E").length === 0) {
      break;
    }
  }

  console.log(units);

  return units.reduce((acc, unit) => acc + unit.hp, 0) * (count - 1);

  //   return map;
}

// Ooooomg we're SOOOOO CLOSE -- YES ATTACK AFTER MOVING -- wait... test2 is still wrong..... ah, number of rounds wrong... huh...
// well shit i suppose we can just guess between count and (count - 1)....
// argh no still too high (238008)
console.log(partOne());
