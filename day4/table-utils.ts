export const stringToChunks = (arr: Array<string>) => {
  let separatorCount = 0;
  let valCounter = 0;
  let results = [];
  let subVal = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != "") {
      subVal[valCounter] = arr[i];
      valCounter++;
    } else {
      results[separatorCount] = subVal;
      subVal = [];
      separatorCount++;
      valCounter = 0;
    }
  }
  results[separatorCount] = subVal;
  return results;
};

export const tableSeparator = (table: Array<string>) => {
  let tableTable = [];
  for (let i = 0; i < table.length; i++) {
    let row = table[i].split(/\s+/);
    let row2 = [];
    row.map((e) => {
      if (e != "") {
        row2.push(+e);
      }
    });
    tableTable[i] = row2;
  }
  return tableTable;
};
