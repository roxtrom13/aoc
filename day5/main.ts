import { readFileSync } from "fs";

type MapType = Array<Array<number>>;
interface ICoordinate {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const data = readFileSync("./data.txt", "utf-8").trim();

let parsedData = data.split("\n");

let coordinates = [] as Array<ICoordinate>;

parsedData.map((e) => {
  let element = {} as ICoordinate;
  let split = e.split(" -> ");
  let chunk = [...split[0].split(",").map(e => +e), ...split[1].split(",").map(e => +e)]
  element.x1 = chunk[0];
  element.y1 = chunk[1];
  element.x2 = chunk[2];
  element.y2 = chunk[3];

  coordinates.push(element);
});

let map = Array(10).fill(0).map(()=>Array(10).fill(0))

const is45 = (cord: ICoordinate) => {
  return Math.abs(cord.y2 - cord.y1) == Math.abs(cord.x2 - cord.x1);
}

const printMap = (map: MapType) => {
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
}

const computeVents = (map: MapType, coordinates: Array<ICoordinate>) => {
  let score = 0;
  for (let i = 0; i < coordinates.length; i++) {
    let cord = coordinates[i];
    if (cord.x1 != cord.x2 && cord.y1 != cord.y2) {
      if (is45(cord)) {
        let diffX = cord.x1 - cord.x2;
        let diffY = cord.y2 - cord.y2;
        let x = cord.x1;
        let y = cord.x2;
        for (let i = 0; i < Math.abs(diffX); i++) {
          console.log(`x: ${x}, y: ${y}`);
          map[x][y]++;
          if (diffX < 0) {
            x++;
          } else x--;
          if (diffY < 0) {
            y++;
          } else y--;
        }
      } else {
        continue;
      }
    } else if (cord.x1 != cord.x2) {
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
      } else {
        map[cord.y1][cord.x1]++;
      }
    } else {
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
      } else {
        map[cord.y1][cord.x1]++;
      }
    }
  }
}

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
}

computeVents(map, coordinates);
console.log(calcScore(map));
printMap(map);
