const isStringNumber = (value: unknown): value is [string, number] =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'string' &&
  typeof value[1] === 'number';

const f1 = (value: number | string | boolean | [string, number]) => {
  if (isStringNumber(value)) {
    console.log(value[0].toUpperCase(), value[1].toFixed());
  }
};

interface Animal {}
interface Dog extends Animal {
  name: string;
}
interface Cat extends Animal {
  punch(): void;
}
class Retriever implements Dog {
  readonly isDog = true;
  constructor(public name: string) {}
}

class Poppy implements Cat {
  constructor(public name: string) {}
  punch(): void {
    console.log('kukkuki');
  }
}

function isDog(a: Animal): a is Dog {
  // console.log(typeof a, a.constructor.name, 'isDog' in a);
  // return 'name' in a;
  // return a instanceof Dog;
  // return typeof a
  return typeof a === 'object' && 'isDog' in a && (a['isDog'] as boolean);
  // return typeof a === 'object' && 'isDog' in a && !!a['isDog'];
}

const maxx = new Retriever('Maxx');
const poppy = new Poppy('Poppy');
if (isDog(maxx)) console.log('maxx is a Dog', maxx.name);
if (isDog(poppy)) console.log('poppy is a Dog', poppy.name);

const constCart = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

type T3 = 1 | 2 | 3;
type T4 = (typeof constCart)[keyof typeof constCart];

class AError {
  constructor(public message: string) {}
}

const isMessageError = (
  err: unknown
): err is {
  message: string;
} => !!err && typeof err === 'object' && 'message' in err;

try {
  // throw new AError('AError Occurs!!');
  // throw new Error('some error!!!!'); // 가
  // throw 'some string error!!!'; // 나
  throw ['some', 'array', 'error']; // 다
} catch (error) {
  if (isMessageError(error)) console.log(error.message); // (라)
  else console.log(JSON.stringify(error));
}

// ------------------------
type TPropertyKeyType = string | number | symbol;
type TUser = { [key: string]: string | number };

function deleteArray<T>(
  arr: T[],
  startOrKey: number | keyof T,
  endOrValue?: number | T[keyof T]
) {
  if (typeof startOrKey === 'number') {
    return arr.filter(
      (_, i) =>
        i < startOrKey ||
        i >
          (typeof endOrValue === 'number'
            ? endOrValue - 1
            : Number.MAX_SAFE_INTEGER)
    );
  }

  return arr.filter(
    a => a && typeof a === 'object' && a[startOrKey] !== endOrValue
  );
}

const arr = [1, 2, 3, 4];
console.log(deleteArray(arr, 2)); // [1, 2]
console.log(deleteArray(arr, 1, 3)); // [1, 4]
console.log(arr); // [1, 2, 3, 4]

const usersx = [
  { id: 1, name: 'Hong' },
  { id: 2, name: 'Kim' },
  { id: 3, name: 'Lee' },
];

console.log(deleteArray(usersx, 2)); // [Hong, Kim]
console.log(deleteArray(usersx, 1, 2)); // [Hong, Lee]
console.log(deleteArray(usersx, 'id', 2)); // [Hong, Lee]
console.log(deleteArray(usersx, 'name', 'Lee')); // [Hong, Kim]

console.log('------------------------------');

interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

// type X = keyof (IUser & IDept);
// type Y = keyof IUser & keyof IDept;

type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends K ? U : T[k];
};

type DeptCaptain = Change<IDept, 'captain', IUser>;
type DeptCaptain2 = Change<IDept, 'id' | 'captain', IUser>;
// type Err = Change<IDept, 'somekey', IUser>; // Error!!!

type Combine<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};

type ICombined = Combine<IUser, IDept>;

console.log('=================');
type Item = { item: string; price: number };
type ItemPrice<T, U> = {
  [k in keyof T]: k extends 'item' ? keyof U : T[k];
};

const stock = { X: 1, Y: 2, Z: 30 };

const itemPrices: ItemPrice<Item, typeof stock>[] = [
  { item: 'X', price: 1000 },
  { item: 'Y', price: 2000 },
  { item: 'Z', price: 3000 },
];

const total = itemPrices.reduce(
  (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
  0
);

console.log('--------------------------------');
function add(a: number, b: string) {
  return `${a} - ${b}`;
}
const pow = (a: number) => a ** 2;

type FirstArgs<F> = F extends (...args: infer I) => unknown ? I[0] : never;
// type FirstArgs<F> = F extends (a: infer I, ...args: any) => any ? I : never;

type SecondArgs<F> = F extends (...args: infer I) => unknown ? I[1] : never;

type Args<F> = F extends (...args: infer I) => unknown ? I[number] : never;

type A = FirstArgs<typeof add>; // number
type AA = FirstArgs<typeof pow>; // number
type B = SecondArgs<typeof add>; // string
type BB = SecondArgs<typeof pow>; // string
type C = Args<typeof add>; // number | string

type AX = Args<typeof String.prototype.endsWith>;
// ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;
// ⇒ number

let users = [{ name: 'Hong' }, { age: 23 }, { id: 1, addr: 'Seoul' }];

type Users = (typeof users)[number];

// every (array of object)
type MergeArrayObject<T extends unknown[]> = {
  [k in keyof T[number]]: T[number][k];
};

type FullUser = MergeArrayObject<typeof users>;

type FullUser1 = Partial<Record<keyof (typeof users)[number], string | number>>; // OK

type FullUser2 = {
  [k in keyof (typeof users)[number]]: (typeof users)[number][k];
};

// type FullUser = Record<string, string | number | undefined>;
// type FullUser = Record<keyof Users, string | number | undefined>;
const ret: FullUser = users.reduce(
  (acc, user) => ({
    ...acc,
    ...user,
  }),
  {}
);

console.log('------------------------');
function registUserObj({ name, age }: { name: string; age: number }) {
  const id = 100;
  return { id, name, age };
}

type RegistUserObj = Parameters<typeof registUserObj>[number];

const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);

console.log('------------------------');
function debounce<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
}

const throttle = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    if (timer) return;
    timer = setTimeout(cb, delay, ...args);
  };
};

// test
const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, 'abc'); // 15

const thro = throttle((a: number) => a + 1, 1000);
for (let i = 10; i < 15; i++) thro(i); // 11
