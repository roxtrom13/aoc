import { readFileSync } from "fs";
import { CubeArray } from "./types";
import { stringToChunks, tableSeparator } from "./table-utils";
import { Card } from "./bingo-card";

const data = readFileSync("./main2.txt", "utf-8").trim().split("\n");
const numbers = data.splice(0, 1)[0].split(",").map(e => +e);
const tables = stringToChunks(data.splice(1, data.length));

let tableArrays = [] as CubeArray;

for (let i = 0; i < tables.length; i++) {
  tableArrays[i] = tableSeparator(tables[i]);
}

let bingoCards = [] as Array<Card>;

for (let i = 0; i < tableArrays.length; i++) {
  bingoCards[i] = new Card(tableArrays[i]);
}

let theresWinner = false;

let winnerNum: number;
let winnerScore: number;
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < bingoCards.length; j++) {
    bingoCards[j].markValues(numbers[i]);
    if (bingoCards[j].hasWon()) {
      bingoCards[j].printValues();
      theresWinner = true;
      winnerScore = bingoCards[j].calcScore();
      console.log("board ", j, " wins");
    }
  }
  if (theresWinner) {
    winnerNum = numbers[i];
    console.log({ winnerNum });
    console.log({ winnerScore });
    console.log( winnerNum * winnerScore );
    break;
  }
}
