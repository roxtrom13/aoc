import { readFileSync } from "fs";

let data = readFileSync("./data.example", "utf-8").trim().split(" |\n");

let rightChunks = data[0].split(" ");
let wrongChunks = data[1].split(" ");

const map = [
  [" ", ".", ".", ".", ".", " "],
  [".", " ", " ", " ", " ", "."],
  [".", " ", " ", " ", " ", "."],
  [" ", ".", ".", ".", ".", " "],
  [".", " ", " ", " ", " ", "."],
  [".", " ", " ", " ", " ", "."],
  [" ", ".", ".", ".", ".", " "],
];

const printMap = (map: Array<Array<string>>) => {
  for (let i = 0; i < map.length; i++) {
    let chars = "";
    for (let j = 0; j < map[i].length; j++) {
      chars += map[i][j];
    }
    console.log(chars);
  }
  console.log();
};

const setLine = (str: string, map: Array<Array<string>>) => {
  switch (str) {
    case "a":
      for (let i = 1; i < 5; i++) {
        map[0][i] = "a";
      }
      break;
    case "b":
      map[1][0] = "b";
      map[2][0] = "b";
      break;
    case "c":
      map[1][5] = "c";
      map[2][5] = "c";
      break;
    case "d":
      for (let i = 1; i < 5; i++) {
        map[3][i] = "d";
      }
      break;
    case "e":
      map[4][0] = "e";
      map[5][0] = "e";
      break;
    case "f":
      map[4][5] = "f";
      map[5][5] = "f";
      break;
    case "g":
      for (let i = 1; i < 5; i++) {
        map[6][i] = "g";
      }
      break;
  }
};

for (let i = 0; i < rightChunks.length; i++) {
  let localMap = [
    [" ", ".", ".", ".", ".", " "],
    [".", " ", " ", " ", " ", "."],
    [".", " ", " ", " ", " ", "."],
    [" ", ".", ".", ".", ".", " "],
    [".", " ", " ", " ", " ", "."],
    [".", " ", " ", " ", " ", "."],
    [" ", ".", ".", ".", ".", " "],
  ];

  for (let j = 0; j < rightChunks[i].length; j++) {
    setLine(rightChunks[i][j], localMap);
  }
  printMap(localMap);
}

console.log("-----------------------------");

for (let i = 0; i < wrongChunks.length; i++) {
  let localMap = [
    [" ", ".", ".", ".", ".", " "],
    [".", " ", " ", " ", " ", "."],
    [".", " ", " ", " ", " ", "."],
    [" ", ".", ".", ".", ".", " "],
    [".", " ", " ", " ", " ", "."],
    [".", " ", " ", " ", " ", "."],
    [" ", ".", ".", ".", ".", " "],
  ];

  for (let j = 0; j < wrongChunks[i].length; j++) {
    setLine(wrongChunks[i][j], localMap);
  }
  printMap(localMap);
}
