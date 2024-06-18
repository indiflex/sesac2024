function Dogf(name) {
  console.log('arguments=', arguments, arguments.length);
  console.log(name, new.target);
  this.name = name;
}
// (arguments) => void;
// (argumenst) => void;
const lucy = {};
Dogf.bind(lucy)('Lucy');
lucy.constructor = Dogf;
// lucy.constructor('LUCY');
console.log('🚀  lucy:', lucy);

const x = new Dogf('XXX');
console.log('🚀  x:', x);

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const maxx = new Dog('Max');
console.log(maxx);

function fx() {}
console.log('fx.name=', fx.name);

function printFnReturnValue(fn) {
  console.log(fn.name, fn());
}
const ret = printFnReturnValue(hello);
console.log(ret); // cf. throw or infinite-loop

function hello() {
  return 'Hello, World!';
}

const obj = { id: 1, name: 'Hong' };

console.log('🚀  obj:', obj.length);

const f3 = () => {};

const xx = function f() {
  return function () {};
};
xx();

(function login() {
  const i = 1;
  let j = 2;
  console.log('iife', i, j);
})();

function promi() {
  return new Promise(resolve => {
    console.log('***************');
    setTimeout(() => resolve(1), 1000);
  });
}

(async function af() {
  const p = await promi();
  console.log('🚀  p:', p);
})();

function useEffect(fn, darr) {}

useEffect(() => {
  (async function af() {
    const p = await promi();
    console.log('🚀  p:', p);
  })();
}, []);
