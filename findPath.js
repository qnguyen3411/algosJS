function getPathValue(rowInd, colInd) {
  if (rowInd == 0 || colInd == 0) {
    return 1;
  }
  return getPathValue(rowInd - 1, colInd) + getPathValue(rowInd, colInd - 1);
}

let fiveByFive = Array(5).fill().map(() => Array(5).fill(0));

let pathMap = fiveByFive
  .map((row, rowInd) => 
    row.map(( _ , colInd) => getPathValue(rowInd, colInd)))

console.log(pathMap)