const afterTime = sec =>
  new Promise(resolve => setTimeout(resolve, sec * 1000, sec));

function* pAfterTime(sec) {
  return yield afterTime(sec);
}

// const obj = {
//   *xx(sec) {
//     return yield afterTime(sec);
//   },
// };

// const pAfterTime = (sec) => yield afterTime(sec);
// const pAfterTime = function* (sec) {
//   return yield afterTime(sec);
// };

async function* asyncAfterTime(sec) {
  return await afterTime(sec);
}

const pat = pAfterTime(1);
// console.log('promise>>', pat);
console.log('promise>>', pat.next());
// const p = pat.next();
// let cnt = 0;
// const intl = setInterval(() => {
//   console.log(`promise${cnt++}>>`, p);
//   if (cnt > 5) clearInterval(intl);
// }, 300);

const aat = asyncAfterTime(1);
console.log('async>>', await aat.next());

// const promi = new Promise(r => r('XXX'));
// const promi = Promise.resolve('YYY');
// console.log('🚀  promi:', promi);
