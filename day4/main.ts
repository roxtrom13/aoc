import { readFileSync } from "fs";
import { CubeArray } from "./types";
import { stringToChunks, tableSeparator } from "./table-utils";
import { Card } from "./bingo-card";

const data = readFileSync("./data.txt", "utf-8").trim().split("\n");
const numbers = data
  .splice(0, 1)[0]
  .split(",")
  .map((e) => +e);
const tables = stringToChunks(data.splice(1, data.length));

let tableArrays = [] as CubeArray;

for (let i = 0; i < tables.length; i++) {
  tableArrays[i] = tableSeparator(tables[i]);
}

let bingoCards = [] as Array<Card>;
let bingoCards2 = [] as Array<Card>;

for (let i = 0; i < tableArrays.length; i++) {
  bingoCards[i] = new Card(tableArrays[i]);
}

for (let i = 0; i < tableArrays.length; i++) {
  bingoCards2[i] = new Card(tableArrays[i]);
}

let theresWinner = false;

let winnerNum: number;
let winnerScore: number;
let winnerTable: number;
for (let i = 0; i < numbers.length; i++) {
  if (theresWinner) break;
  let hasWon = false;
  for (let j = 0; j < bingoCards.length; j++) {
    bingoCards[j].markValues(numbers[i]);
    hasWon = bingoCards[j].hasWon();
    if (hasWon) {
      theresWinner = true;
      winnerScore = bingoCards[j].calcScore();
      winnerTable = j+1;
    }
  }
  if (theresWinner) {
    winnerNum = numbers[i];
    console.log({ winnerNum });
    console.log({ winnerScore });
    console.log({ winnerTable });
    console.log(winnerNum * winnerScore);
  }
}

console.log("______________________________________");

let winnerList = [];

theresWinner = false;

let winnerNum2: number;
let winnerScore2: number;
let winnerTable2: number;
for (let i = 0; i < numbers.length; i++) {
  let hasWon = false;
  for (let j = 0; j < bingoCards2.length; j++) {
    let alreadyWin = bingoCards2[j].didWin();
    bingoCards2[j].markValues(numbers[i]);
    hasWon = bingoCards2[j].hasWon();
    if (hasWon) {
      theresWinner = true;
      winnerScore2 = bingoCards2[j].calcScore();
      winnerTable2 = j+1;
      if (!alreadyWin) {
        winnerList.push(bingoCards2[j]);
      }
    }
  }
  if (theresWinner) {
    winnerNum2 = numbers[i];
    console.log({ winnerNum2 });
    console.log({ winnerScore2 });
    console.log({ winnerTable2 });
    console.log(winnerNum2 * winnerScore2);
  }
  if (winnerList.length == bingoCards2.length) break;
}
