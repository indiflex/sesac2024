export function isOdd(n) {
  let ret = false;
  if (n % 2 === 1) ret = true;
  console.log(n, ret);
}

export const isEven = n => n % 2 === 0;

const n = 1;
console.log(isOdd(n));
console.log(isEven(n));
