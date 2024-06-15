function discount() {
  // cf. currying
  const dcRate = 0.1;
  let dcLeftCnt = 100;
  return function (price) {
    dcLeftCnt--;
    return [price * dcRate, dcLeftCnt];
  };
}

function getFunctionName(fn) {
  console.log('functionName=', fn.name);
}
getFunctionName(discount);

const items = [
  { item: '상품 A', price: 32000 },
  { item: '상품 B', price: 45000 },
];
const dc = discount();
for (const { item, price: orgPrice } of items) {
  const [dcPrice, leftCnt] = dc(orgPrice);
  const salePrice = orgPrice - dcPrice; // 실제 판매 금액
  console.log(
    `${item}: ${orgPrice}원 --> ${salePrice.toLocaleString()}원 (left count is ${leftCnt})`
  );
}

console.log('=======================');
let memoizedFactorialRunCnt = 0;
const table = {};
function factorial(n) {
  memoizedFactorialRunCnt += 1;
  if (n === 1) return 1;
  // return n * memoizedFactorial(n - 1);
  return table[n] || (table[n] = n * factorial(n - 1));
}

function memoizedFactorial(fn) {
  const table = {}; // 5: 120, 6: 720
  // return n => table[n] || (table[n] = fn(n));
  return function (n) {
    if (table[n]) return table[n];
    table[n] = fn(n);
    return table[n];
  };
}

const mf = memoizedFactorial(function (n) {
  memoizedFactorialRunCnt += 1;
  console.log('🚀 memoizedFactorialRunCnt:', memoizedFactorialRunCnt, n);
  if (n === 1) return 1;
  // return n * factorial(n - 1);
  try {
    return n * mf(n - 1);
  } catch (err) {
    console.log('ERROR!!', err.message, n);
  }
});

// console.log(factorial(3), memoizedFactorialRunCnt);
// memoizedFactorialRunCnt = 0;
// console.log(factorial(5), memoizedFactorialRunCnt);
// memoizedFactorialRunCnt = 0;
// console.log(factorial(5), memoizedFactorialRunCnt);
// console.log('-----------------');
// memoizedFactorialRunCnt = 0;
// console.log(mf(3), memoizedFactorialRunCnt);
// memoizedFactorialRunCnt = 0;
// console.log(mf(5), memoizedFactorialRunCnt);
// memoizedFactorialRunCnt = 0;
console.log(mf(5000), memoizedFactorialRunCnt);
