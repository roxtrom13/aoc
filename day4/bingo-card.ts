import { SquareArray, BingoCard } from "./types";

export class Card {
  items: BingoCard;
  rows: {};
  cols: {};
  constructor(table: SquareArray) {
    this.items = [];
    this.rows = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, };
    this.cols = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, };
    for (let i = 0; i < table.length; i++) {
      let row = [];
      for (let j = 0; j < table[i].length; j++) {
        row.push({ marked: false, value: +table[i][j] });
      }
      this.items.push(row);
    }
  }

  markValues(num: string | number) {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items[i].length; j++) {
        if (+num == this.items[i][j].value) {
          this.items[i][j].marked = true;
          this.cols[j]++;
          this.rows[i]++;
          console.log("---------------------");
          console.log(this.cols);
          console.log(this.rows);
          console.log("---------------------");
        }
      }
    }
  }

  printValues() {
    for (let i = 0; i < this.items.length; i++) {
      let row = "";
      for (let j = 0; j < this.items[i].length; j++) {
        row = row + " " + this.items[i][j].value;
      }
      console.log(row);
    }
  }

  hasWon() {
    for (let i = 0; i < 5; i++) {
      if (this.rows[i] == 5) {
        return true;
      }
      if (this.cols[i] == 5) {
        return true;
      }
      return false;
    }
  }

  calcScore() {
    let result = 0;
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items[i].length; j++) {
        if (!this.items[i][j].marked) {
          result += this.items[i][j].value;
        }
      }
    }
    return result;
  }
}
