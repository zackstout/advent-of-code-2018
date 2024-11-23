const test = "aaaaa-bbb-z-y-x-123[abxyz]";

function isRealRoom(str) {
  const parts = str.split("-");
  const last = parts.pop();
  const id = parseInt(last.split("[")[0]);
  const checksum = last.split("[")[1].slice(0, -1);

  const counts = {};
  parts.forEach((part) => {
    for (let i = 0; i < part.length; i++) {
      if (part[i] in counts) {
        counts[part[i]]++;
      } else {
        counts[part[i]] = 1;
      }
    }
  });

  const sorted = Object.keys(counts).sort((a, b) => {
    if (counts[a] === counts[b]) {
      return a < b ? -1 : 1;
    }
    return counts[b] - counts[a];
  });

  return sorted.slice(0, 5).join("") === checksum;
}

function run() {
  //   const input = `aaaaa-bbb-z-y-x-123[abxyz]`;
  //   return isRealRoom(input);

  const lines = input.split("\n");
  return lines
    .filter(isRealRoom)
    .concat(["qzmt-zixmtkozy-ivhz-343"])
    .map((room) => {
      const parts = room.split("-");
      const last = parts.pop();
      const id = parseInt(last.split("[")[0]);
      // return { id, room };
      return {
        id,
        message: parts.reduce((acc, val) => {
          return (
            acc +
            " " +
            val
              .split("")
              .map((char) => {
                return String.fromCharCode(
                  ((char.charCodeAt(0) - 97 + id) % 26) + 97
                );
              })
              .join("")
          );
        }, ""),
      };
    })
    .filter((room) => room.message.includes("northpole"));
}

console.log(run());
