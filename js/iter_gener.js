const arr = [1, 2, 3];
for (let i = 0; i < 5; i += 1) {
  f(i);
}

function f(x) {
  // 1
  return console.log(x, x ** 2);
}

const itArr = arr[Symbol.iterator]();
console.log('itArr>>', itArr.next());
console.log('itArr>>', itArr.next());

const itObj1 = {
  name: 'ABC',
  // iterator() {
  //   return this[Symbol.iterator]();
  // },

  // [Symbol.iterator]() {
  //   let i = 0;
  //   return {
  //     next: () => ({
  //       value: this.name[i],
  //       done: ((i += 1), i > this.name.length),
  //     }),
  //   };
  // },

  *[Symbol.iterator]() {
    for (let i = 0; i < this.name.length; i += 1) yield this.name[i];
  },

  values() {
    return this[Symbol.iterator]();
  },
};
console.log('🚀  itObj1:', Symbol.iterator in itObj1);
console.log('🚀  itObj1:', typeof itObj1[Symbol.iterator]);

// itObj1.iterator();
const it1 = itObj1[Symbol.iterator]();
console.log('🚀  it1:', it1.next());
console.log('🚀  it1:', it1.next());
console.log('🚀  it1:', it1.next());
console.log('🚀  it1:', it1.next());
console.log('-------------------------');
function* genFn() {
  const name = 'ABC';
  console.log('&&&&&&&&&&&&&&&&&&');
  let i = 0;
  // for (let i = 0; i < 3; i += 1) {
  //   yield i;
  // }

  for (let i = 0; i < 3; i += 1) {
    yield name[i];
  }
}

const it2 = genFn();
console.log('🚀  it2:', it2.next());
console.log('🚀  it2:', it2.next());
console.log('🚀  it2:', it2.next());
console.log('🚀  it2:', it2.next());

console.log('+++++++++++++++++++++++++++++');
function* route() {
  const start = yield; // yield가 있으므로 caller에게 제어권 넘김. yield뒤는 그냥 메시지!
  const end = yield '도착 역은?';
  return `${start}역에서 출발하여 ${end}역에 도착합니다.`;
}
const caller = route(); // next() 함수가 있는것으로 볼 때, "내 안에 이터레이터 있다!"
console.log(caller.next());
console.log(caller.next('문래'));
console.log(caller.next('신림'));

const itStr = [...'ABC'].values();
console.log('🚀  itStr:', itStr, arr.keys());
console.log('x=', itStr.next());
console.log('x=', itStr.next());
console.log('x=', itStr.next());
console.log('x=', itStr.next());
