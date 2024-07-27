// function f(cb: (input: string | number) => number) {
//   return cb(1) + cb('str');
//   //     f1(1) + f1('str')
// }

// function f1(x: string | number | boolean | Symbol) {
//   return typeof x === 'string' ? x.length : x.toString()?.length;
// }

// f(f1);

// const shared = 'Cher';

// type Member = {
//   name: string;
//   addr: string;
//   discountRate: number;
// };
// type Guest = {
//   name: string;
//   age: number;
//   x: number;
// };

// type Customer = Member | Guest | [];
// let customer: Customer;

// customer = {
//   name: '홍길동',
//   age: 26,
//   x: 1,
//   addr: '용산구',
// };

// function add(a: number, b: number) {
//   if (Math.random() > 0.5) return a + b;
//   return `${a}+${b}`;
// }

// let n: number = 0;

// const obj = { id: 1, name: 'Hong' };

// if ('age' in customer) console.log(customer.age);
// // customer.hasOwnProperty = function()
// if (customer.hasOwnProperty('age')) console.log(customer.age);

// if (customer instanceof Array) customer.length;
// if (Array.isArray(customer)) customer.length;

// // if (Number.isNaN(customer)) console.log('xxx');
// if (isNaN(10)) console.log('xxx');

// if (Number.isSafeInteger(n)) console.log('safe');

// function fnBad<const T extends string[]>(args: T): void {
//   console.log(args.length);
// }

// // 'T' is still 'string[]' since 'readonly ["a", "b", "c"]' is not assignable to 'string[]'
// fnBad(['a', 'b', 'c']);
// let x = 1;

// type TUser = { id: number; name: string };
// const kim = { id: 1, name: 'Kim', addr: 'xx' };
// // const kim: TUser = { id: 1, name: 'Kim' };
// // const arr = [{ id: 2, addr: 'seoul' }, kim];
// // const y1: TUser[] = arr;
// // const xxx = [{ id: 2, addr: 'seoul' }, kim];
// const y1: TUser[] = [{ id: 2, name: 'park', addr: 'seoul' }, kim];
// // const y1 = [{ id: 2, name: 'park', addr: 'seoul' }, kim];

// // const y11: TUser[] = [];
// // y11[0] = kim;
// // y11[1] = { id: 2, name: 'Park', addr: 'seoul' };

// // const y2: [TUser, TUser] = [{ id: 2, name: 'Park', addr: 'seoul' }, kim];

// // type TUser2 = { id: number; name: string; addr?: string };
// // const lee: TUser2 = { id: 1, name: 'Lee', addr: 'Seoul' };
// // const xx1: (TUser | TUser2)[] = [kim, lee];
// // const xx2 = [lee, kim];
// // const xx3: [TUser, TUser2] = [kim, lee];
// // let partner: TUser = { ...lee, id: 2, name: 'Kim' }; // ?

// // const hong: TUser = { id: 1, name: 'Hong', addr: 'Pusan' }; // ?
// // let partner2: TUser = { ...hong, id: 3, addr: 'Daejeon' };

// // const users: TUser[] = [{ id: 2, name: 'Park', addr: 'seoul' }];

type O<T> = Omit<T, 'id' | 'age'>;

type User = { id: number; name: string };
type OO = Partial<User>;
type OO2 = Required<OO>;
