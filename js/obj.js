const user = {
  '': 1,
  ' ': 1,
  123: 1,
  '12345n': 2,
  true: 1,
  id: 2,
  [`name`]: 'Hong',
  [Symbol('org')]: 'HongSym',
  [`${new Date()}`]: 365,
  'my-friends': ['Han', 'Kim'],
  getInfo: () => `${this.id}-${this.name}`,
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};

console.log('🚀  user:', user);

console.log(Object.keys(user));
console.log(Reflect.ownKeys(user));
console.log(user['true'], user.name);

for (const k of Reflect.ownKeys(user)) {
  console.log('🚀  k:', k, typeof k);
  if (typeof k === 'symbol') console.log(user[k]);
}

const sym = Symbol('sym');
user[sym] = 'HongSym2';
console.log('🚀  sym:', user[sym]);
console.log('obj.getOwnPropSym>', Object.getOwnPropertySymbols(user)); // [ Symbol() ]

// delete user.id;
console.log(user.hasOwnProperty('id'));
console.log(Reflect.has(user, 'id'));
console.log('id' in user);
console.log('----------------');
Object.defineProperty(user, 'id', {
  value: 3,
  writable: false,
  enumerable: true,
  configurable: false,
});
user.id = 555;
console.log('values', Object.values(user));
console.log('entries', Object.entries(user));

console.log(Object.getOwnPropertyDescriptor(user, 'id'));
// console.log(Object.getOwnPropertyDescriptors(user));

const map = new Map([
  ['id', 1],
  ['name', 'Hong2'],
]);
console.log('🚀  map:', map);

let hong = Object.fromEntries(map);
console.log('🚀  hong:', hong);

Object.assign(hong, user);
console.log('🚀  user.name:', user.id);
console.log('🚀  hong:', hong);

hong = { ...hong, ...user };
console.log('🚀  hong:', hong);

console.log(1 === Number(1));
console.log(user === Object(user));
console.log(user === new Object(user));
console.log(user === Object.create(user));

console.log('********************');
// Object.create는 prototype에!!
const u1 = Object.assign({}, user);
const u2 = { ...user };
const u3 = new Object(user);
const u4 = Object.create(user);
// const u4 = Object.create({}, { p: { value: 42 }, q: { value: 55 } });
console.log('u1=', user === u1);
console.log('u2=', user === u2);
console.log('u3=', user === u3); // true!!
console.log('u4=', u4, user === u4);
console.log('u4.proto=', Object.getPrototypeOf(u4));
console.log(Object.getPrototypeOf(user));

const arr = [1, 2, 3];
console.log('🚀  arr:', arr);
console.log('🚀  arr:', Array(1, 2, 3));
Array.prototype.first = function () {
  return this[0];
};
console.log('🚀  arr:', arr.first());

obj = {
  id: 2,
  addr: {
    city: 'Seoul',
  },
};

Object.freeze(obj);
obj.id = 555;
obj.addr.city = 'Pusan';
console.log('🚀  obj:', obj);

const obj2 = { ...obj };
obj.addr.city = 'Daegu';
console.log('🚀  obj:', obj);
console.log('🚀  obj2:', obj2);
