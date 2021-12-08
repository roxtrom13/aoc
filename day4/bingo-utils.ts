import { SquareArray, CubeArray } from "./types";
export const assertWinner = (table: SquareArray) => {
  let row = true;
  let col = true;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (typeof table[i][j] == "number") {
        row = false;
      }
      if (typeof table[i][j] == "number") {
        col = false;
      }
    }
    console.log(table);
    if (row || col) {
      return true;
    }
  }
  return false;
};

export const calcScore = (table: SquareArray): number => {
  let sum = 0;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (typeof table[i][j] == "number") {
        sum += +table[i][j];
      }
    }
  }

  return sum;
}

export const markCoincidences = (numbers: Array<string>, table: CubeArray) => {
  for (let h = 0; h < numbers.length; h++) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        for (let k = 0; k < table[i][j].length; k++) {
          if (numbers[h] == table[i][j][k]) {
            table[i][j][k] = table[i][j][k] + "";
          }
        }
        let winner = assertWinner(table[j]);
        if (winner) {
          console.log("-------------------------------------------");
          console.log("table: ", table[i][j]);
          console.log("number: ", numbers[h]);
          console.log(calcScore(table[i]) * +numbers[h]);
          return;
        }
      }
    }
  }
};
