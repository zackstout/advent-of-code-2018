const testInput = `/->-M        
|   |  /----M
| /-+--+-M  |
| | |  | v  |
M-+-/  M-+--/
  M------/   `.split("\n");

const testInput2 = `/>-<M  
|   |  
| /<+-M
| | | v
M>+</ |
  |   ^
  M<->/`.split("\n");

// input = testInput2;

// NOTE: Replaced all "\" with "M" to avoid escaping issues
// console.log(input.map((l) => l.length));

// console.log(input[1]);

// NOTE: only do this for real input, not test input
input.slice(0).forEach((line, idx) => {
  if (idx === 0) return;
  input[idx] = input[idx].slice(2);
});

// console.log(input.map((l) => l));

function partOne() {
  const m = {};
  const carts = {};
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== " ") {
        m[`${i},${j}`] = input[i][j];
        if (/[<>^v]/.test(input[i][j])) {
          carts[`${i},${j}`] = {
            dir: input[i][j],
            turns: 0,
            pos: `${i},${j}`,
          };
        }
      }
    }
  }

  //   return Object.keys(m);

  let times = 0;

  const dirs = {
    "^": ["<", "^", ">"],
    ">": ["^", ">", "v"],
    v: [">", "v", "<"],
    "<": ["v", "<", "^"],
  };

  // We have to have memory for each cart, to know how many intersections it has seen.

  while (true) {
    // const allCarts = Object.keys(m).filter((k) => /[<>^v]/.test(m[k]));

    // const allCarts = Object.keys(carts);

    // Does processing them in order really matter? Doesn't seem like it for part one..
    // ******* Ah yes it DOES make a difference,
    // IF YOU ALSO return from cart collision DURING THE SAME TICK. Tricky stuff....
    const allCarts = Object.keys(carts).sort((a, b) => {
      const [a1, a2] = carts[a].pos.split(",").map(Number);
      const [b1, b2] = carts[b].pos.split(",").map(Number);
      if (a1 === b1) {
        return a2 - b2;
      }
      return a1 - b1;
    });

    const forwardSlashDir = {
      "^": ">",
      ">": "^",
      v: "<",
      "<": "v",
    };

    const backSlashDir = {
      "^": "<",
      ">": "v",
      v: ">",
      "<": "^",
    };

    const dsDir = {
      "^": [0, -1],
      ">": [1, 0],
      v: [0, 1],
      "<": [-1, 0],
    };

    let isDone = false;
    let cartPositions = [];

    allCarts.forEach((cart) => {
      if (isDone) return;
      const { dir, turns, pos } = carts[cart];
      const [y, x] = pos.split(",").map(Number);
      const ds = dsDir[dir];
      const newPos = [y + ds[1], x + ds[0]];
      const newKey = newPos.join(",");
      if (m[newKey] === "+") {
        const next = dirs[dir][turns % 3];

        carts[cart] = {
          dir: next,
          turns: turns + 1,
          pos: newKey,
        };
      } else {
        if (m[newKey] === "/") {
          carts[cart] = {
            dir: forwardSlashDir[dir],
            turns,
            pos: newKey,
          };

          // remember we replaced backslash with M
        } else if (m[newKey] === "M") {
          carts[cart] = {
            dir: backSlashDir[dir],
            turns,
            pos: newKey,
          };
        } else {
          carts[cart] = {
            dir,
            turns,
            pos: newKey,
          };
        }

        // m[cart] = m[newKey];
      }

      // Check for collision
      cartPositions = Object.values(carts).map((c) => c.pos);
      isDone = [...new Set(cartPositions)].length !== cartPositions.length;
    });

    if (isDone) {
      return cartPositions;
    }

    // // Check for collision
    // const cartPositions = Object.values(carts).map((c) => c.pos);
    // const collided =
    //   [...new Set(cartPositions)].length !== cartPositions.length;

    // if (collided) {
    //   return cartPositions;
    // }

    // console.log(cartPositions);
    times++;
  }

  return carts;
}

// Woo, got there!
// Yeah, had to sort the carts in order for it to work, and also had to return from the loop when a collision was detected, even if mid-tick.
// Actually pretty easy to see why that made it fail, easy to think of example where cart gets out of way of another that would/should have collided with it.
// const colls = partOne();
// console.log(colls, colls.length, [...new Set(colls)].length);

// console.log(partOne());

function partTwo() {
  // input = testInput2;

  const m = {};
  const carts = {};
  let cartId = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== " ") {
        m[`${i},${j}`] = input[i][j];
        if (/[<>^v]/.test(input[i][j])) {
          carts[cartId] = {
            dir: input[i][j],
            turns: 0,
            pos: `${i},${j}`,
            cartId: cartId++, // keep this to increment but also to be able to delete
          };
        }
      }
    }
  }

  let times = 0;

  const dirs = {
    "^": ["<", "^", ">"],
    ">": ["^", ">", "v"],
    v: [">", "v", "<"],
    "<": ["v", "<", "^"],
  };

  while (true && times < 1_000_000) {
    const allCartKeys = Object.keys(carts).sort((a, b) => {
      const [a1, a2] = carts[a].pos.split(",").map(Number);
      const [b1, b2] = carts[b].pos.split(",").map(Number);
      if (a1 === b1) {
        return a2 - b2;
      }
      return a1 - b1;
    });

    const forwardSlashDir = {
      "^": ">",
      ">": "^",
      v: "<",
      "<": "v",
    };

    const backSlashDir = {
      "^": "<",
      ">": "v",
      v: ">",
      "<": "^",
    };

    const dsDir = {
      "^": [0, -1],
      ">": [1, 0],
      v: [0, 1],
      "<": [-1, 0],
    };

    allCartKeys.forEach((cartId) => {
      if (!carts[cartId]) {
        return;
      }

      const { dir, turns, pos } = carts[cartId];

      const [y, x] = pos.split(",").map(Number);
      const ds = dsDir[dir];
      const newPos = [y + ds[1], x + ds[0]];
      const newKey = newPos.join(",");
      if (m[newKey] === "+") {
        const next = dirs[dir][turns % 3];

        carts[cartId] = {
          dir: next,
          turns: turns + 1,
          pos: newKey,
          cartId,
        };
      } else {
        if (m[newKey] === "/") {
          carts[cartId] = {
            dir: forwardSlashDir[dir],
            turns,
            pos: newKey,
            cartId,
          };

          // remember we replaced backslash with M
        } else if (m[newKey] === "M") {
          carts[cartId] = {
            dir: backSlashDir[dir],
            turns,
            pos: newKey,
            cartId,
          };
        } else {
          carts[cartId] = {
            dir,
            turns,
            pos: newKey,
            cartId,
          };
        }
      }

      // Check for collision
      const cartPositions = Object.values(carts).filter(
        (c) => c.pos === newKey
      );
      if (cartPositions.length > 1) {
        // console.log("Removing carts", cartPositions);
        cartPositions.forEach((c) => {
          console.log("deleted", c.cartId);

          delete carts[c.cartId];
        });
      }
    });

    if (Object.keys(carts).length === 1) {
      return {
        result: Object.values(carts)[0].pos,
        times,
        cart: Object.values(carts)[0],
      };
    }

    times++;
  }

  return carts;
}

// what???? 3,24 was wrong????
// OOOOH hahaha because we reversed answer.... it's actually 3, 42 hahaha
console.log("Part two", partTwo());
