// 'use strict';
var aa = 1;
// delete aa;
console.log(aa);

function f1(a) {
  console.log('f1', aa);
}

// NaN = 1;
// Infinite = 1;

{
  var aa = 2;
  function f1() {
    console.log('inner-f1', aa);
  }
}

f1();

export function add(x, y) {
  return +(x + y).toFixed(1);
}

export default function isStrict() {
  let ret = false;
  try {
    Infinity = 1;
  } catch (Err) {
    ret = true;
  }

  return ret;
}

console.log(isStrict());
