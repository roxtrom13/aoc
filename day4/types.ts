export interface CardElement {
  marked: boolean;
  value: number;
}
export type CubeArray = Array<Array<Array<number | string>>>;
export type SquareArray = Array<Array<number | string>>;
export type BingoCard = Array<Array<CardElement>>;

export interface ICard {
  items: BingoCard;
  winner: boolean;
  rows: {0: number, 1: number, 2: number, 3: number, 4: number};
  cols: {0: number, 1: number, 2: number, 3: number, 4: number};
}
