// ex1)
const hong = { id: 1, name: 'Hong' };
const lee = { id: 2, name: 'Lee', addr: 'Seoul' };

var f2 = function ({ id, name } = {}) {
  console.log(id, name);
};

var f3 = ({ id, name }) => console.log(id, name);
f3(hong);
f3(lee);
f2();
f1(hong);
function f1({ id, name }) {
  console.log(id, name);
}

// ex2)
const user = { id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul' };
const { passwd, ...userInfo } = user;
console.log(userInfo);

// ex3)
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;

// ex4)
const user4 = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };
function getValueExceptInitial(k) {
  const { [k]: v } = user4;
  const [, ...r] = v;
  // return si.splice(1).join('');

  return r.join('');
}

console.log(getValueExceptInitial('name'));
console.log(getValueExceptInitial('passwd'));
console.log(getValueExceptInitial('addr'));

// ex5)
function getDiffMillis(dt1, dt2) {
  const { getTime: getTime1 } = new Date(dt1);
  const { getTime: getTime2 } = new Date(dt2);
  // console.log('🚀  getTime:', getTime1, getTime2);
  return getTime1.apply(new Date(dt1)) - getTime2.apply(new Date(dt2));
  // return Math.abs(new Date(dt1).getTime() - new Date(dt2).getTime());
}
const ret5 = getDiffMillis('2021-01-01', '2021-01-02');
console.log('🚀  ret5:', ret5);

// -------------
class Dog {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  fn() {
    return 'FN';
  }

  static sfn() {
    return 'SFN';
  }
}
const lucy = new Dog('Lucy');
const { sfn } = Dog;
console.log(sfn(), Dog.sfn());

const { name: aa, fn: fnnn, getName } = lucy;
console.log('🚀  aa:', aa);

console.log(fnnn(), lucy.fn()); // ?
console.log(getName); // ?
// getName(); // Error!!

// 결론: this를 참조하는 함수는 destructuring 했을 경우 bind 후 실행!

console.log(this, global === globalThis);
