const input = `311, 74
240, 84
54, 241
99, 336
53, 244
269, 353
175, 75
119, 271
267, 301
251, 248
216, 259
327, 50
120, 248
56, 162
42, 278
309, 269
176, 74
305, 86
93, 359
311, 189
85, 111
255, 106
286, 108
233, 228
105, 211
66, 256
213, 291
67, 53
308, 190
320, 131
254, 179
338, 44
88, 70
296, 113
278, 75
92, 316
274, 92
147, 121
71, 181
113, 268
317, 53
188, 180
42, 267
251, 98
278, 85
268, 266
334, 337
74, 69
102, 227
194, 239`
  .split("\n")
  .map((l) => l.split(", ").map(Number));

console.log(input.slice(0, 5));

// Oh fun, like Voronoi
function getRegionAreas(x1, x2, y1, y2) {
  let regions = {};
  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      let minDist = Infinity;
      let minDistIndex = -1;
      for (let i = 0; i < input.length; i++) {
        let dist = Math.abs(x - input[i][0]) + Math.abs(y - input[i][1]);
        if (dist < minDist) {
          minDist = dist;
          minDistIndex = i;
        } else if (dist === minDist) {
          minDistIndex = -1;
        }
      }
      if (minDistIndex !== -1) {
        regions[minDistIndex] = (regions[minDistIndex] || 0) + 1;
      }
    }
  }
  return regions;
}

// Nice!
function partOne() {
  // To find finite area regions, we can compute 2 different boundary zones. And see which regions don't change.
  const regions = getRegionAreas(0, 400, 0, 400);
  const regions2 = getRegionAreas(-100, 500, -100, 500);

  const poss = [];

  for (const key in regions) {
    if (regions[key] === regions2[key]) {
      poss.push(regions[key]);
    }
  }
  return poss.sort((a, b) => b - a)[0];
}

// console.log(partOne());

// Nice!
function partTwo() {
  // Find all the spots that are within 10000 of all the points in input list.
  let x1 = 0;
  let y1 = 0;
  let x2 = 400;
  let y2 = 400;
  let safe = {};
  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      let d = 0;
      for (let i = 0; i < input.length; i++) {
        let dist = Math.abs(x - input[i][0]) + Math.abs(y - input[i][1]);
        d += dist;
      }
      if (d < 10000) {
        safe[`${x},${y}`] = true;
      }
    }
  }
  return Object.keys(safe).length;
}

console.log(partTwo());
