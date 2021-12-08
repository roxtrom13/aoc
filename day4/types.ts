export interface CardElement {
  marked: boolean;
  value: number;
}
export type CubeArray = Array<Array<Array<number | string>>>;
export type SquareArray = Array<Array<number | string>>;
export type BingoCard = Array<Array<CardElement>>;
