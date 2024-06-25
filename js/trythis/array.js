const assert = require('assert');

const deleteArray = (arr, keyOrIndex, valOrIndex) => {
  console.log('🚀  keyOrIndex:', keyOrIndex, valOrIndex, arr[keyOrIndex]);
  if (typeof keyOrIndex === 'number' && arr[keyOrIndex]) {
    return arr.filter(
      (_, i) => i < keyOrIndex || i >= (valOrIndex ?? arr.length)
    );
  }

  return arr.filter(a => a[keyOrIndex] !== valOrIndex);
};

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
// assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
// assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
let users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);

const popX = (arr, deleteCnt = 1) => {
  const ret = arr.slice(-`${deleteCnt}`);
  return ret.length == 1 ? ret[0] : ret;
};

const pop = (arr, cnt = 1) => arr.slice(cnt * -1);
console.log(pop(arr));
console.log(pop(arr, 2));

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
users = [kim, lee, park]; // 오염되면 안됨!!

console.log('============================');
// users.addUserx = function (data) {
//   const ret = [this, data];
//   console.log('🚀  ret:', ret);
// };

// users.addUser = data => [...users, data];
// Object.defineProperties(users, {
//   addUser: function (data) {
//     return [...this, data];
//   },
// });
function addUser(obj) {
  return [...this, obj];
}
function removeUser(obj) {
  return this.filter(a => a.id !== obj.id);
}
Object.defineProperty(users, 'addUser', { value: addUser });
Object.defineProperty(users, 'removeUser', { value: removeUser });
// users.addUser = function (data) {
//   return [...this, data];
// };
// Object.defineProperty(users, 'addUser', { enumerable: false });
// Object.prototype.addUser = function (data) {
//   return [...this, data];
// };

console.log('🚀  users:', Object.keys(users));
console.log('🚀  users:', Reflect.ownKeys(users));
console.log(users.addUser(hong)); // [kim, lee, park, hong]
console.log(users.removeUser(lee)); // [kim, park]
// console.log(users.changeUser(kim, choi)); // [choi, lee, park]

console.log('users>>', users);
// console.log('--------------');
// const o = {
//   [Symbol.iterator]() {
//     return {
//       next() {
//         return {
//           done: true,
//           value: 1,
//         };
//       },
//     };
//   },
// };
// console.log('xxx>>', o.addUser('a'));

const classNames = (...args) =>
  args.reduce((acc, cur) => `${acc}${acc && cur && ' '}${cur}`, '');
const ret2 = classNames('', 'a b c', 'd', '', 'e');
console.log('🚀  ret2:', ret2);
assert.strictEqual(ret2, 'a b c d e');

console.log('**************************');
const reduceH = (array, fn, acc = 0, thisArg) => {
  array.forEach(e => {
    acc = fn(acc, e, thisArg);
  });
  return acc;
};

const reduce = (array, fn, initValue) => {
  let i = 0;
  let acc = initValue ?? ((i = 1), array[0]);
  for (; i < array.length; i += 1) {
    acc = fn(acc, array[i]);
  }

  return acc;
};

assert.deepStrictEqual(
  reduce([1, 2, 3], (acc, cur) => acc + cur, 0),
  6
);
assert.deepStrictEqual(
  reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur),
  15
);
assert.deepStrictEqual(
  reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur, 1),
  120
);
assert.deepStrictEqual(
  reduce([2, 2, 2], (acc, cur) => acc * cur, 1),
  8
);
assert.deepStrictEqual(
  reduce([3, 3, 3], (acc, cur) => acc * cur, 0),
  0
);

const a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
assert.deepStrictEqual(
  reduce(a10, (acc, cur) => acc + cur, 0),
  a10.reduce((acc, cur) => acc + cur, 0)
);

assert.deepStrictEqual(
  reduce(users, (acc, user) => acc + user.name),
  users.reduce((acc, user) => acc + user.name)
);

// console.log(reduce(users, (acc, user) => acc + user.name));
console.log(users.reduce((acc, user) => acc + user.name));

console.log('u=', users);
const rrr = (a, b) => users.map(user => (user.id === a.id ? b : user));
console.log('🚀  rrr:', rrr(kim, choi));

console.log('==================================');
const square = n => n ** 2;
const sqrt = n => Math.sqrt(n);
const cube = n => n ** 3;

arr.push(5);
console.log('arr=', arr);

const cal1 = [square, sqrt, cube].reduce((result, fn) => {
  return arr.map(fn);
}, arr);

console.log('cal1=', cal1);
const cal11 = arr.reduce((acc, a) => [...acc, cube(sqrt(square(a)))], []);
console.log('cal2:', cal11);

// const cal12 = [square, sqrt, cube].reduce((acc, fn) => arr
// console.log('🚀  cal12:', cal12);

const robotOld = n => [square, sqrt, cube].reduce((acc, fn) => fn(n));
console.log('🚀  robotOld(3):', robotOld(3));

const robotRetro = arr => arr.map(robotOld);
console.log('🚀  robotRetro:', robotRetro(arr));

const robot = (arr, fns) => arr.map(a => fns.reduce((acc, fn) => fn(a)));
console.log('🚀  robot1:', robot(arr, [square, sqrt, cube]));
console.log('🚀  robot2:', robot(arr, [sqrt, cube, square]));

console.log('============================');
/*
* rule f(s, e, step)
 - step 기본값 = s > e ? -1 : 1
 - step === 0 || s === e ? [s]
 - e 가 없다면,
  ⇒ s > 0 ? e = s, s = 1
  ⇒ s < 0 ? e = -1
  ⇒ s === 0 ? [0]
- 비정상
  ⇒ s > e && step > 0 ? []
  ⇒ s < e && setp < 0 ? []
  즉, (s - e) * step > 0
*/

const range = (s, e, step = s > e ? -1 : 1) => {
  // console.log('🚀 s e step:', s, e, step);
  if (step === 0 || s === e) return [s];

  const t = s;
  e = e ?? (s > 0 ? ((s = 1), (e = t)) : s < 0 ? -1 : 0);
  // if (e === undefined) {
  //   if (s > 0) {
  //     e = s;
  //     s = 1;
  //   } else if (s < 0) {
  //     e = -1;
  //   } else {
  //     return [0];
  //   }
  // }

  if ((s - e) * step > 0) return [];

  const results = [];
  // const cond = (i) => s > e ? i >= e : i <= e;
  for (let i = s; s > e ? i >= e : i <= e; i += step) {
    results.push(i);
  }

  return results;
};

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(
  range(50),
  Array.from({ length: 50 }, (_, i) => i + 1)
);
assert.deepStrictEqual(
  range(1, 150, 3),
  Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);
