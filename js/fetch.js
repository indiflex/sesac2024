const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';
const myFetch = url => fetch(url).then(res => res.json());

const myFetch2 = async url => {
  const res = await fetch(url);
  // const data = await res.json();
  // return data;
  return res.json();
};

// myFetch를 이용하는 코드
// const resultOfJson = myFetch2(sampleUrl);
// console.log('🚀  rrr:', resultOfJson);
// resultOfJson.then(result => console.log(result));

new Promise(resolve => setTimeout(resolve, 2000));
const result = await myFetch2(sampleUrl);
console.log('result=', result);

// myFetch(sampleUrl).then(user => {
//   console.log('user>>>', user);
// });

// const promiseFn = (id = 1) =>
//   new Promise((resolve, reject) => {
//     console.log('id>>', id);
//     if (id < 7) resolve(id + 1);
//     else reject(new Error('어디로?' + id));
//   });

// promiseFn(1)
//   .then(res => {
//     console.log('res1>>', res);
//     // promiseFn(res); // Need Return the Promise Object!!
//   })
//   .then(res => {
//     console.log('res2>>', res); // undefined ⇒ 여기서 throw 하면 될까?
//     //return promiseFn(res ?? 3);
//     if (!res || res instanceof Promise) {
//       throw new Error('No Promise!!');
//       // Promise.reject('No Promise!!');
//     }
//   })
//   .catch(err => console.log('Error!!>>', err));
