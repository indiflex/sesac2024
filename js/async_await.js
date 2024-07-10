const promi = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve, 1000, 'xxx');
  });

async function f1() {
  // f1 = new Promise((resove, reject) => {
  //     promi().then(ret => resolve(ret))
  // })
  const ret = await promi();

  return ret;
}

console.log(await f1());
// console.log([1, 23].map(f1));
f1().next();
