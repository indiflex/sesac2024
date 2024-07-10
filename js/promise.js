const x = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('xxxx');
    // const r = Math.random() < 0.5;
    const r = Math.random() >= 0;
    if (r) resolve('OK');
    // else reject(new Error('EEEEEE'));
    else reject('EEEEEE');
  }, 1000);
});

const y = x.then(ret => {
  console.log('ret1=', ret, x);
  return 'YYY';
  // return new Promise((r1, r2) => r1('XXX'));
});
console.log('🚀  y:', y, x === y);

y.then(rrr => {
  console.log('rrr=', rrr);
  return 'ZZZ';
})
  .then(rrr2 => console.log('rrr2=', rrr2))
  .catch(err => console.error(err));
console.log('🚀  x:', x);

x.then(ret2 => console.log('ret2=', ret2));
x.then(ret3 => console.log('ret3=', ret3));

x.finally(() => console.log('finally', x));

class PromiseX {
  constructor(pfn) {
    pfn(this.resolve, this.reject);
  }

  then(cb, rj) {
    // this.cb = cb;
    // this.pfns.push(cb);
    // return Promise.resolve(cb); // 1
    return new Promise(cb, rj);
  }

  catch(f) {
    this.catch = f;
  }

  resolve(val) {
    // if (this.cb) this.cb(val);
    for (const cb of this.thenfns) {
      cb(val);
    }
  }

  reject(err) {
    if (this.catch) this.catch(err);
  }
}
