import { readFileSync } from "fs";

let data = readFileSync("./data.example", "utf-8").trim().split("\n");
let input = [];
let output = [];
data.map(e => {
  let values = e.split(" | ");
  input.push(values[0]);
  output.push(values[1]);
})

// take a string and turns in into boolean
const toLines = (str: string): string => {
  let value = 0;
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case "a": value += 1; break;
      case "b": value += 10; break;
      case "c": value += 100; break;
      case "d": value += 1000; break;
      case "e": value += 10000; break;
      case "f": value += 100000; break;
      case "g": value += 1000000; break;
    }
  }
  let strValue = "" + value;
  if (strValue.length < 7) {
    strValue = "0".repeat(7 - strValue.length) + strValue;
  }
  return strValue;
};

// get numbers of lines that it has turned on
const getLinesOn = (binStr: string): number => {
  let res = 7;
  for (let i = 0; i < binStr.length; i++) {
    if (binStr[i] == "0") res--;
  }
  return res;
}

// get a list of ordered boolean value, each index corresponds with its real value
const getUniqueValues = (binStr: Array<string>): Array<string> => {
  let values = [];
  let count = 0;
  for (let idx = 0; idx <= count; idx++) {
    let excluded = [7, 3, 4, 2];
    console.log(getLinesOn(binStr[idx]));
    for (let i = 0; i < binStr.length; i++) {
      let linesOn = getLinesOn(binStr[idx]);
      if (linesOn == 7) {
        values[8] = binStr[i];
        count++;
      }
      if (linesOn == 3) {
        values[7] = binStr[i];
        count++;
      }
      if (linesOn == 4) {
        values[4] = binStr[i];
        count++;
      }
      if (linesOn == 2) {
        values[1] = binStr[i];
        count++;
      }
    }

    for (let i = 0; i < binStr.length; i++) {
      if (excluded.includes(getLinesOn(binStr[i]))) continue;
      if ((binStr[i] && values[4]) == values[4]) {
        values[9] == binStr[i];
        count++;
      }
      if ((binStr[idx][i] && values[7]) == values[7]) {
        if (getLinesOn(binStr[i]) == 6) {
          values[0] == binStr[i];
          count++;
        } else {
          values[3] = binStr[i];
          count++;
        }
      }
    }
    for (let i = 0; i < binStr.length; i++) {
      if (values.includes(binStr)) continue;
      if (getLinesOn(binStr[i]) == 6) {
        values[6] = binStr[i];
        count++;
      } else if ((binStr[i] || values[1]) == values[9]) {
        values[5] = binStr[i];
        count++;
      } else {
        values[2] = binStr[i];
        count++;
      }
    }
  }
  return values;
}

let inputLine = input[0].split(" ");
let outputLine = output[0].split(" ");
let binInput = [];
let binOutput = [];
for (let j = 0; j < inputLine.length; j++) {
  binInput.push(toLines(inputLine[j]));
}
for (let j = 0; j < outputLine.length; j++) {
  binOutput.push(toLines(inputLine[j]));
}
console.log(input);
console.log(binInput);
console.log(binOutput);
let correctValues = getUniqueValues(binInput);
console.log(correctValues);
