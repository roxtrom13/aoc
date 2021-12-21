import { readFileSync } from "fs";

const data = readFileSync("./data", "utf-8")
  .trim()
  .split(",")
  .map((e) => +e);

const recursiveSum = (num: number) => {
  if (num == 0) {
    return 0;
  } else {
    return num + recursiveSum(num - 1);
  }
};

const getCostFuel = (positions: Array<number>, position: number): number => {
  let cost = 0;
  for (let i = 0; i < positions.length; i++) {
    let diff = Math.abs(positions[i] - position);
    cost += recursiveSum(diff);
  }
  return cost;
};

const orderedData = data.sort((a, b) => {
  return a - b;
});

const computeData = (data: Array<number>): Array<number> => {
  let results = [];

  let start = data[0];
  let end = data[data.length - 1];

  for (start; start <= end; start++) {
    results.push(getCostFuel(data, start));
  }
  return results;
};

console.log(computeData(orderedData).sort((a, b) => a - b)[0]);
