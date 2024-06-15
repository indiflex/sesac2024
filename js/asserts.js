// // var assert = require('assert'); // CJS
// import assert from 'assert';
// import isStrictMode, { add } from './strict.js';
// // import * as stric from './strict.js';
// // import * as react from 'react'; // every exports
// // import react from 'react'; // only default exports

// const a = 1;
// const b = 1;
// assert.ok(a, 'AAA');
// assert.ok(b, 'BBB');
// assert.equal(a, b, 'A != B');
// assert.strictEqual(a, b, 'A !== B');

// assert.strictEqual(add(1, 2), 3);
// assert.strictEqual(add(0.1, 0.2), 0.3);

// const hong = { id: 1, name: 'Hong' };
// const kim = { id: 2, name: 'Kim', addr: { city: 'Seoul' } };
// const kim2 = { id: 2, name: 'Kim', addr: { city: 'Seoul' } };
// const kim3 = { id: '2', name: 'Kim', addr: { city: 'Seoul' } };

// console.time('S');

// assert.notEqual(hong, kim);
// assert.equal(kim, kim);
// assert.deepEqual(kim, kim3);
// assert.deepStrictEqual(kim, kim2);

// function fa() {
//   const x = false; //Math.random() > 0.5;
//   console.log('🚀  x:', x);
//   if (x) throw new Error('Test Error!');
// }

// if (a > 2) assert.fail();

// assert.doesNotThrow(fa, 'FA Throwed!!');

// console.timeEnd('S');

// console.log(isStrictMode());

// function fff() {
//   console.log(this);
// }
// fff.apply('x');

/* bind ...
function f() {
  console.log(this?.x);
}

const ff1 = f.bind({ x: 1 }).bind({ x: 5 });
ff1(); // f 실행 시 this를 { x: 1 }
const ff2 = ff1.bind({ x: 2 });
ff2();

f();
ff1();
*/

// const obj1 = { f: f, bind: { x: 1 } };
// const obj2 = { f: ff1, bind: { x: 2 } };
// obj2.f.apply({ x: 2 });

// f.apply({ x: 3 });

function fn() {
  let l1 = 1;
  var v1 = 2;
  function ifn() {
    return (this?.x ?? 0) + l1;
  }
  if (v1 > 1) {
    let l2 = 3;
    var v2 = 4;
  }

  return ifn;
}

var y = fn().bind({ x: 10 });
let x = 1;
console.log(y(), x); // ifn.call({ x: 10 }, [])

// function fnx(a, b) {
//   console.log('::>>', this, a, b);
// }

// const yx = fnx.bind('X', 1, 2);
// yx();

// function f(n, prev) {
//   // ...
//   // return n * f(n - 1);
//   return f(n - 1, n);
// }
