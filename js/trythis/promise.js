import assert from 'assert';
// const depthTimer = cnt =>
//   new Promise((resolve, reject) => {
//     console.log(`depth${cnt}`, new Date());
//     if (cnt >= 3) reject(new Error('Alreade 3-depth'));
//     setTimeout(resolve, 1000 * Math.random(), cnt + 1);
//   });

// depthTimer(1)
//   .then(depthTimer)
//   .then(depthTimer)
//   .then(depthTimer)
//   .then(depthTimer)
//   .catch(err => console.log(err));

// console.log('START', new Date());

// const promiseFn = (id = 1) =>
//   new Promise((resolve, reject) => {
//     console.log('id>>', id);
//     if (id < 7) resolve(id + 1);
//     else reject(new Error('어디로?' + id));
//   });

// promiseFn(1)
//   .then(res => {
//     console.log('res1>>', res);
//     promiseFn(res); // Need Return the Promise Object!!
//   })
//   .then(res => {
//     console.log('res2>>', res); // undefined ⇒ 여기서 throw 하면 될까?
//     // if (!(res instanceof Promise)) throw new Error('XXXX');
//     return Promise.reject('XXXX');
//   })
//   .then(rrr => console.log('****>>', 5555))
//   .catch(err => console.log('Error!!>>', err));

const vals = [1, 2, 3];
const randTime = val =>
  new Promise(resolve => setTimeout(resolve, val * 1000, val));

// const promiseAll = arr =>
//   new Promise((resolve, reject) => {
//     const results = [];

//     (async () => {
//       for (let i = 0; i < arr.length; i += 1) {
//         // await arr[i].then(res => results.push(res));
//         results.push(await arr[i]);
//       }
//       resolve(results);
//     })();
//   });

const promiseAll = async promiseArr => {
  for (const promise of promiseArr) {
    if (promise.constructor.name === 'Promise') {
      promise.then(val => val).catch(err => err);
    }
  }

  const ret = [];
  let index = 0;

  for (const promise of promiseArr) {
    ret[index++] = await promise;
  }

  return ret;
};

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then(arr => {
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

promiseAll([randTime(3), Promise.reject('ERROR'), randTime(5)])
  .then(arr => {
    console.log('여긴 과연 호출될까?!', arr);
  })
  .catch(err => {
    console.log('reject!!!!!!:', err);
  });
