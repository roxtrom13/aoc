import { readFileSync } from "fs";
import { CubeArray, ICard, SquareArray } from "./types";

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

export const tableSeparator = (table: Array<string>): SquareArray => {
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

const loadData = (file: string): Array<string> => {
  let data = readFileSync(file, "utf-8").trim().split("\n");
  return data;
};

export const getTables = (
  file: string
): { numbers: Array<number>; tables: CubeArray } => {
  const response = {
    numbers: [],
    tables: [],
  };
  let data = loadData(file);

  response.numbers = data
    .splice(0, 1)[0]
    .split(",")
    .map((e) => +e);

  const tables = stringToChunks(data.splice(1, data.length));

  let tableArrays = [] as CubeArray;

  for (let i = 0; i < tables.length; i++) {
    tableArrays[i] = tableSeparator(tables[i]);
  }

  response.tables = tableArrays;

  return response;
};

export const tableToBingo = (table: SquareArray): ICard => {
  let response = {} as ICard;
  response.items = [];
  response.rows = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  response.cols = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  for (let i = 0; i < table.length; i++) {
    let row = [];
    for (let j = 0; j < table[i].length; j++) {
      row.push({ marked: false, value: +table[i][j] });
    }
    response.items.push(row);
  }
  response.winner = false;
  return response;
};

export const markValues = (num: number, card: ICard) => {
  if (!card.winner) {
    for (let i = 0; i < card.items.length; i++) {
      for (let j = 0; j < card.items.length; j++) {
        if (num == card.items[i][j].value) {
          card.items[i][j].marked = true;
          card.rows[i]++;
          card.cols[j]++;
        }
      }
    }
  }
};

export const didCardWin = (card: ICard) => {
  if (card.winner) {
    return card.winner;
  }
  for (let i = 0; i < 5; i++) {
    if (card.rows[i] == 5) {
      card.winner = true;
    }
    if (card.cols[i] == 5) {
      card.winner = true;
    }
  }
  return card.winner;
};

export const cardScore = (card: ICard) => {
  let result = 0;
  for (let i = 0; i < card.items.length; i++) {
    for (let j = 0; j < card.items[i].length; j++) {
      if (!card.items[i][j].marked)
        result += card.items[i][j].value;
    }
  }

  return result;
};

export const printCard = (card: ICard) => {
  for (let i = 0; i < card.items.length; i++) {
    let row = "";
    for (let j = 0; j < card.items[i].length; j++) {
      let num = "" + card.items[i][j].value;
      if (card.items[i][j].value < 10) {
        num = " " + card.items[i][j].value;
      }
      if (card.items[i][j].marked) {
        num = `\x1B[31m|${num}|\x1b[0m`;
      } else {
        num = ` ${num} `;
      }
      row += num;
    }
    console.log(row);
  }
};
