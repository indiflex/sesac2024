// Array.prototype.forEach = function (f) {
//   for (let i = 0; i < this.length; i += 1) f(this[i] + 100, i, this);
// };
function isOdd(n) {
  let ret = false;
  if (n % 2 === 1) ret = true;
  console.log(n, ret);
}

const isEven = n => n % 2 === 0;

const arr = [1, 2, 3, 4, 5];
for (const val of arr) {
  isOdd(val);
}

// arr.forEach((val, i, arr) => isOdd(val));
arr.forEach((val, i) => isOdd(val, i));

arr.forEach(isOdd);

const evenResults = arr.map(isEven);
console.log('🚀  evenResults:', evenResults);
const evens = arr.filter(isEven);
console.log('🚀  evens:', evens);

console.log('+++++++++++++++++');
const arr2 = [1, 2, 3, 4, 5];
// ex1) [2,3]을 추출
console.log('[2,3]을 추출', arr2.slice(1, 3));

// ex2) [3]부터 모두 다 추출
console.log('[3]부터 모두 다 ', arr2.slice(3));

// ex3) [2,3,4] 제거하기
console.log('[2,3,4] 제거하기', arr2.splice(1, 3));
console.log('🚀  arr2:', arr2);

// ex4) 복원하기
console.log('복원', arr2.splice(1, 0, 2, 3, 4));
console.log('🚀  arr2:', arr2);

// ex5) [3] 부터 끝까지 제거하기
console.log('[3] 부터 끝까지 제거하기', arr2.splice(3));
console.log('🚀  arr2:', arr2);

// ex6) 복원하기
console.log('복원', arr2.splice(3, 0, 4, 5));
console.log('🚀  arr2:', arr2);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
console.log('복원', arr2.splice(2, 1, 'X', 'Y', 'Z'));
console.log('🚀  arr2:', arr2);

console.log('복원', arr2.splice(2, 3, 3));
console.log('🚀  arr2:', arr2);

// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
const xyz = ['X', 'Y', 'Z'];
// const r80 = [arr2[0], arr2[1], 'X', 'Y', 'Z', arr2[3], arr2[4]];
const r80 = [arr2[0], arr2[1], ...xyz, arr2[3], arr2[4]];
console.log('🚀  r8:', r80);

const r81 = [...arr2.slice(0, 2), ...xyz, ...arr2.slice(3)];
console.log('🚀  r81:', r81);

const r82 = arr2.join('').split(3);
console.log('🚀  r82:', [...(r82[0] + 'XYZ' + r82[1])]);

const r83 = arr2
  .map((a, i) => {
    if (i === 2) return xyz;
    return a;
  })
  .flat();
console.log('🚀  r83:', r83);

console.log('--------------------------');
const assert = require('assert');
const objs = [{ id: 1 }, { name: 'Hong' }, { addr: 'Seoul', id: 5 }];
//  ⇒⇒⇒ {id: 5, name: 'Hong', addr: 'Seoul'}
// const obj = objs.reduce((acc, user) => Object.assign(acc, user), {});
const obj = objs.reduce((acc, user) => ({ ...acc, ...user }), {});
console.log('🚀  obj:', obj);
assert.deepStrictEqual(obj, { id: 5, name: 'Hong', addr: 'Seoul' });
