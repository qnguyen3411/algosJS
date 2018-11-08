function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function padEntries(arr) {
  return arr.map(entry => pad(entry, 3))
}

let arr = [
  [5,16,10,5,4],
  [20,11,5,13,1],
  [4,8,9,10,9],
  [7,8,12,13,18],
  [19,20,11,13,14]
].map(padEntries)

console.log(arr.join('\n').replace(/,/g, "  "))

function rotateArray(arr) {
  const dim = arr.length;
  const numLayers = Math.floor(dim / 2);
  // Rotate each layer
  for(let i = 0; i < numLayers; i++) {

    // For each layer, start the rotation for each entry in 1st row
    for(let j = i; j < dim - 1 - i; j++) {
      let start = { x: i, y: j };
      let temp = arr[start.y][start.x];
      for(let k = 0; k < 4; k++) {
        const dest = { x: start.y, y: dim - 1 - start.x };
        const temp2 = temp;
        temp = arr[dest.y][dest.x];
        arr[dest.y][dest.x] = temp2;
        start = dest;
      }
    }
  }
  console.log("HERE IT IS")
  return arr;
}
console.log(rotateArray(arr).join('\n').replace(/,/g, "  "))