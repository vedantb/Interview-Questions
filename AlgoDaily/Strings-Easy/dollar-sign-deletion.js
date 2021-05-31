const str = "f$stcarss$";
// const temp = [];
// for (let i = 0; i < str.length; i++) {
//   if (str[i + 1] === "$") {
//     i = i + 1;
//   } else {
//     temp.push(str[i]);
//   }
// }
// console.log(temp);

function isDollarDeleteEqual(arr) {
  const finalArr = arr.map((str) => getFinalStr(str));
  return finalArr.every((str) => str === finalArr[0]);
}

function getFinalStr(str) {
  let count = 0;
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "$") count++;
    else if (count > 0) {
      count--;
    } else {
      result += str[i];
    }
  }
  return result;
}

const input = ["f$st", "st"];
console.log(isDollarDeleteEqual(input));
