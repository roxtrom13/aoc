import { a } from "./data";
const list = a.split("\n");

let old = list[0];
let count = 0;
for (let i = 1; i < list.length; i++) {
  if (+old < +list[i]) {
    count++;
  }
  old = list[i];
}

console.log(count);
