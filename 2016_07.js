function supportsSSL(str) {
  // the part of the string within [] brackets must contain an "aba" sequence.
  // and the reverse of that sequence must be in the non-bracketed part of the string.

  const bracketed = str.match(/\[(.*?)\]/g);
  // Ah nice this is clever
  const nonBracketed = str.replace(/\[(.*?)\]/g, " ").split(" ");

  let found = false;
  bracketed.forEach((bracket) => {
    if (found) return;
    for (let i = 0; i < bracket.length - 2; i++) {
      if (bracket[i] === bracket[i + 2] && bracket[i] !== bracket[i + 1]) {
        const aba = bracket.slice(i, i + 3);
        if (
          nonBracketed.some((non) => non.includes(aba[1] + aba[0] + aba[1]))
        ) {
          found = true;
        }
      }
    }
  });
  return found;
}

console.log(input.split("\n").filter(supportsSSL).length);
