// 1. loop로 작성하시오.
function loopFactorial(n) {
  let ret = 1;
  for (let i = n; i > 0; i -= 1) {
    ret *= i;
  }

  return ret;
}

// 2. 순수 재귀함수로 작성하시오.
function recurFactorial(n) {
  if (n <= 1) return 1;

  return n * recurFactorial(n - 1);
}

// 3. memoization하여 작성하시오.
function memoized(fn) {
  const memoizedTable = {};
  return n => memoizedTable[n] || (memoizedTable[n] = fn(n));
}

const memoizedFactorial = memoized(function (n) {
  if (n <= 1) return 1;
  return n * memoizedFactorial(n - 1);
});

// -- 이하 테스트용 (이 부분은 제출 대상 아님) --
const TestBed = [3, 5, 7];
function test(fn) {
  const fname = fn.name || 'memoizedFactorial';
  for (const t of TestBed) {
    console.log(`${fname}(${t})=`, fn(t));
  }
  console.log('---------------------------');
}

test(loopFactorial);
test(recurFactorial);
test(memoizedFactorial);
