import {
  getTables,
  tableToBingo,
  markValues,
  didCardWin,
  cardScore,
  printCard,
} from "./table-utils";
import { ICard } from "./types";

const data = getTables("./data.txt");

let cards = [] as Array<ICard>;

// Creating cards
for (let i = 0; i < data.tables.length; i++) {
  cards.push(tableToBingo(data.tables[i]));
}

let winnerCards = [] as Array<ICard>;
let winnerNumbers = [];

// Game begins
//
// loop for generated numbers
for (let i = 0; i < data.numbers.length; i++) {
  for (let j = 0; j < cards.length; j++) {
    markValues(data.numbers[i], cards[j]);
    if (didCardWin(cards[j])) {
      winnerCards.push(cards[j]);
      winnerNumbers.push(data.numbers[i]);
      break;
    }
  }
  if (winnerCards.length >= cards.length) break;
}

for (let i = 0; i < 3; i++) {
  printCard(winnerCards[i]);
  console.log("");
}

//let winnerLen = winnerCards.length;
//console.log(winnerLen);

//printCard(winnerCards[winnerCards.length - 1]);
//let lastCard = winnerCards[winnerLen - 1];
//let lastNumber = data.numbers[winnerLen - 1];
//console.log(cardScore(lastCard) * lastNumber);
