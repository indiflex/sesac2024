const once1 = f => {
  let didRun = false;
  return (...args) => {
    if (didRun) return undefined;
    didRun = true;
    return f(...args);
  };
};

const once2 = f => {
  let didRun = false;
  return (...args) => {
    if (!didRun) {
      didRun = true;
      return f(...args);
    }
  };
};

const once = f => {
  let didRun = false;
  return (...args) => (didRun ? undefined : ((didRun = true), f(...args)));
};

const once4 = f => {
  let didRun = false;
  return function (...args) {
    return didRun ? undefined : ((didRun = true), f.bind(this)(...args));
  };
};

var fivePart1 = (x, y) => `${x}, ${y}, this.id: ${this.id}`;
var fivePart = function (x, y) {
  return `${x}, ${y}, this.id: ${this.id}`;
};

const fn = once(fivePart);
// const fn = once(fivePart.bind({ id: 33 }));

// console.log(fn.bind({ id: 11 })(1, 6));
// console.log(fn.bind({ id: 12 })(2, 7));

console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined
return;

function onceTimer1(func) {
  let exectued = false;
  return function (n1, n2) {
    if (exectued) return undefined;
    exectued = true;
    setTimeout(() => {
      exectued = false;
    }, 1000);
    return func(n1, n2);
  };
}

const onceTimer = (fn, delay = 1000) => {
  let timer;
  let done = false;
  return (...args) => {
    if (timer) return;
    if (!done) {
      done = true;
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
        done = false;
      }, delay);
      return fn.apply(this, args);
    }
  };
};

// const fn = once(fivePart);
// const fn = once(fivePart.bind({ id: 33 }));

// console.log(fn.bind({ id: 11 })(1, 6));
// console.log(fn.bind({ id: 12 })(2, 7));

const fn2 = onceTimer(fivePart);
let cnt = 0;
const intl = setInterval(() => {
  const x = Math.round(Math.random() * 10) % 10;
  const y = (x + 5) % 10;
  console.log(fn2(x, y));
  if ((cnt += 1) > 16) clearInterval(intl);
}, 200);
