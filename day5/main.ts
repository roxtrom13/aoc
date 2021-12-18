import { readFileSync } from "fs";

type MapType = Array<Array<number>>;
interface ICoordinate {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const data = readFileSync("./data2.txt", "utf-8").trim();

let parsedData = data.split("\n");

let coordinates = [] as Array<ICoordinate>;

parsedData.map((e) => {
  let element = {} as ICoordinate;
  let split = e.split(" -> ");
  let chunk = [
    ...split[0].split(",").map((e) => +e),
    ...split[1].split(",").map((e) => +e),
  ];
  element.x1 = chunk[0];
  element.y1 = chunk[1];
  element.x2 = chunk[2];
  element.y2 = chunk[3];

  coordinates.push(element);
});

let map = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

const is45 = (cord: ICoordinate) => {
  return Math.abs(cord.y2 - cord.y1) === Math.abs(cord.x2 - cord.x1);
};

const getDirection = (cord: ICoordinate): { x: number; y: number } => {
  let x = 0;
  let y = 0;
  cord.x1 - cord.x2 > 0 ? (x = -1) : (x = 1);
  cord.y1 - cord.y2 > 0 ? (y = -1) : (y = 1);

  return { x: x, y: y };
};

const printMap = (map: MapType) => {
  console.log("---------------------");
  for (let row = 0; row < map.length; row++) {
    let rowStr = "";
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == 0) {
        rowStr += ".";
      } else {
        rowStr += map[row][col];
      }
    }
    console.log(rowStr);
  }
  console.log("---------------------");
};

const computeVents = (map: MapType, coordinates: Array<ICoordinate>) => {
  for (let i = 0; i < coordinates.length; i++) {
    let cord = coordinates[i];
    if (cord.x1 != cord.x2 && cord.y1 != cord.y2) {
      if (is45(cord)) {
        let diffy = cord.y2 - cord.y1;
        let diffx = cord.x2 - cord.x1;
        console.log(
          `paint from (${cord.x1}, ${cord.y1}) to (${cord.x2}, ${cord.y2}), ${
            diffy / diffx
          }`
        );
        let diff = Math.abs(cord.x1 - cord.x2);
        let dir = getDirection(cord);
        for (let i = 0; i < diff + 1; i++) {
          let y = cord.y1 + i * dir.y;
          let x = cord.x1 + i * dir.x;
          console.log(x,y);
          map[y][x]++;
        }
      }
    } else if (cord.x1 != cord.x2) {
      console.log( `paint from (${cord.x1}, ${cord.y1}) to (${cord.x2}, ${cord.y2})`);
      let x1 = cord.x1;
      let diff = cord.x1 - cord.x2;
      if (diff > 0) {
        for (x1; x1 != cord.x2 - 1; x1--) {
          map[cord.y1][x1]++;
        }
      } else if (diff < 0) {
        for (x1; x1 - 1 != cord.x2; x1++) {
          map[cord.y1][x1]++;
        }
      }
    } else {
      console.log( `paint from (${cord.x1}, ${cord.y1}) to (${cord.x2}, ${cord.y2})`);
      let y1 = cord.y1;
      let diff = cord.y1 - cord.y2;
      if (diff > 0) {
        for (y1; y1 != cord.y2 - 1; y1--) {
          map[y1][cord.x1]++;
        }
      } else if (diff < 0) {
        for (y1; y1 - 1 != cord.y2; y1++) {
          map[y1][cord.x1]++;
        }
      }
    }
  }
};

const calcScore = (map: MapType) => {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] > 1) {
        result++;
      }
    }
  }
  return result;
};

computeVents(map, coordinates);
printMap(map);
console.log(calcScore(map));
// bad answer: 21384
