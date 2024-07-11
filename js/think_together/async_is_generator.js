const promi = val =>
  new Promise(resolve => {
    setTimeout(resolve, val * 500, val + 1);
  });

// async function gener() {... await promi();}
function* gener() {
  const r1 = yield promi(1);
  console.log('🚀  r1:', r1);
  const r2 = yield promi(r1);
  return r1 + r2;
}

const g = gener();
const { value: ret1 } = g.next();
console.log('🚀  ret1:', ret1);
// await ret1;
ret1
  .then(rrr1 => {
    console.log('🚀  rrr1:', rrr1);
    const { value: ret2 } = g.next(rrr1);
    console.log('🚀  ret2:', ret2);
    return ret2;
  })
  .then(rrr2 => {
    console.log('🚀  rrr2:', rrr2, typeof rrr2);
    const result = g.next(rrr2);
    console.log('🚀  result:', result);
  });

// [1, 2, 3].map( await (async () => { await })   )
