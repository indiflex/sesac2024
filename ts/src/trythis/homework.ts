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

const users = [
  { id: 1, name: 'Hong' },
  { id: 2, name: 'Kim' },
  { id: 3, name: 'Lee' },
];

console.log(deleteArray(users, 2)); // [Hong, Kim]
console.log(deleteArray(users, 1, 2)); // [Hong, Lee]
console.log(deleteArray(users, 'id', 2)); // [Hong, Lee]
console.log(deleteArray(users, 'name', 'Lee')); // [Hong, Kim]
