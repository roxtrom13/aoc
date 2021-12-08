import { SquareArray, BingoCard } from "./types";

export class Card {
  items: BingoCard;
  winner = false;
  rows: {};
  cols: {};
  constructor(table: SquareArray) {
    this.items = [];
    this.rows = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, };
    this.cols = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, };
    this.winner = false;
    for (let i = 0; i < table.length; i++) {
      let row = [];
      for (let j = 0; j < table[i].length; j++) {
        row.push({ marked: false, value: +table[i][j] });
      }
      this.items.push(row);
    }
  }

  markValues(num: string | number) {
    if (!this.winner) {
      for (let i = 0; i < this.items.length; i++) {
        for (let j = 0; j < this.items[i].length; j++) {
          if (+num == this.items[i][j].value) {
            this.items[i][j].marked = true;
            this.cols[j]++;
            this.rows[i]++;
          }
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

  printMarkeds() {
    for (let i = 0; i < this.items.length; i++) {
      let row = "";
      for (let j = 0; j < this.items[i].length; j++) {
        if (!this.items[i][j].marked) row = row + "     ";
        else row = row + " " + this.items[i][j].marked;
      }
      console.log(row);
    }
  }

  printCard() {
    for (let i = 0; i < this.items.length; i++) {
      let row = "";
      for (let j = 0; j < this.items[i].length; j++) {
        let num = "" + this.items[i][j].value;
        if (this.items[i][j].value < 10) {
          num = " " + this.items[i][j].value;
        }
        if (this.items[i][j].marked) {
          num = `\x1B[31m|${num}|\x1b[0m`;
        } else {
          num = ` ${num} `;
        }
        row += num;
      }
      console.log(row);
    }
  }

  hasWon() {
    if (!this.winner) {
      for (let i = 0; i < 5; i++) {
        if (this.rows[i] == 5) {
          this.winner = true;
          return true;
        }
        if (this.cols[i] == 5) {
          this.winner = true;
          return true;
        }
      }
      return false;
    } else {
      return this.winner;
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

  didWin() {
    return this.winner;
  }
}
