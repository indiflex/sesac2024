// const dog = {
//   name: 'Maxx',
//   showMyName() {
//     console.log(`My name is ${this.name}.`);
//   },
//   whatsYourName() {
//     // setTimeout(this.showMyName, 1000); // global
//     // setTimeout(this.showMyName.bind(this), 1000);
//     setTimeout(() => this.showMyName(), 0);
//   },
// };

// dog.whatsYourName();

// console.log('------------------');

// const WEEKS = '일월화수목금토';
// const getWeekName = weekNo => (() => `${WEEKS[weekNo]}요일`)();

// const day = new Date().getDay();
// console.log(`오늘은 ${getWeekName(day)}입니다!`);

// console.log('------------------------');
// // var i;
// // for (i = 0; i < 5; i += 1) {
// //   setTimeout(() => console.log(i), 100); // (나)
// // }

// // for (let i = 0; i < 5; i += 1) {
// //   setTimeout(() => console.log(i), 100); // (나)
// // }

// Array.prototype.mapX = function (fn, thisArgs) {
//   const rets = [];
//   for (let i = 0; i < this.length; i += 1) {
//     rets.push(fn.apply(thisArgs, [this[i], i, this]));
//   }
//   return rets;
// };

// const arr = [1, 2, 3];
// function f(val, index, t) {
//   console.log('x=', val, index, t, this.id);
//   return val + index;
// }
// const ret = arr.map(f, { id: 100 });
// console.log('🚀  ret:', ret);
// const retX = arr.mapX(f, { id: 100 });
// console.log('🚀  retX:', retX);

// console.log('----------------------------');
// // function f2(f) { return function (...args) { console.log.. } }
// const f2 =
//   f =>
//   (...args) =>
//     console.log(f.name, f(...args));

// const ff = f2(Math.max);
// ff(1, 3, 2, 5, 4);

// console.log('----------------------------');
const pi1 = parseInt('111', 2, ['1']);
console.log('🚀  pi1:', pi1);
const arr = ['1', '0', '101', '101'];

console.log('plen=', parseInt.length);

const rets = arr.map((a, i) => parseInt(a, i));
// parseInt('1', 0);
// parseInt('2', 1);
parseInt('2', 2);
console.log(rets); // [ 1, NaN, NaN ]

// function unary(f) {
//   if (f.length > 1) return a0 => f(a0);
//   else return f;
// }

const unary = f => (f.length > 1 ? a0 => f(a0) : f);

const unaryParseInt = unary(parseInt);
const uret1 = arr.map(unaryParseInt);
console.log('🚀  uret1:', uret1);

// const unary2 = fn => fn.length === 1
//    ? fn
//    : (arg) => fn(arg);

// const rets2 = arr.map(unary(parseInt));
// console.log(rets2);   // [ 1, 2, 3 ]
