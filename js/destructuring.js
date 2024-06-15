const user = { id: 1, name: 'Hong', addr: { city: 'Seoul' } };

const cpUser = { ...user };
cpUser.addr = { ...user.addr };

user.addr.city = 'Pusan';
console.log('🚀  cpUser:', cpUser);

const cpUser2 = JSON.parse(JSON.stringify(user));
console.log('🚀  cpUser2:', cpUser2);

const obj = { i: 1, j: 2, l: 3, m: 4, n: 5 };
// let { j, i, k = i * j * n } = obj;
// const { k = i * 10, i, j } = obj;

let q, s, r;
({ r = q * 10, q, s } = { q: 10, s: 20 }); // q = ?, s = ?, r = ?
console.log(r, q, s);

function fn(arg1, { id, name }, arg2) {
  console.log(arg1, id, name, arg2);
}

fn(10, user, 20);

function f(...args) {
  console.log(args);
}

f(1, 2, 3);

let un;
const [a] = [un]; // const [a] = [undefined];
console.log('🚀  a:', a);

function fn({ age }) {
  return age;
}

const fn2 = function ({ age }) {
  return age;
};

const fn3 = ({ age }) => {
  return age;
};
const fn4 = ({ age }) => age;

function differenceInMilliseconds(date1, date2) {
  // const { getTime: getTime1 } = new Date(date1);
  // const { getTime: getTime2 } = new Date(date2);
  // console.log('🚀  getTime:', getTime1, getTime2);
  // return getTime1() - getTime2();
  const t1 = new Date(date1).getTime();
  const t2 = new Date(date2).getTime();
  const { getTime } = new Date();
  console.log('🚀  t:', t1, t2, getTime);
  return t1 - t2;
}

differenceInMilliseconds('2021-01-01', '2021-01-02');

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
const { name: aa, fn: fnnn, getName } = lucy;
console.log('🚀  aa:', aa, sfn(), fnnn(), getName);
