const holiday = '한글날';
const month = 10,
  day = 9;
`${holiday}은 ${month}월 ${day}일입니다.`; // 한글날은 10월 9일입니다.
const fret = f`휴일은 ${holiday}은 ${month}월 ${day}..${1 + 2}`;
console.log('🚀  fret:', fret);

function f(tmplstrs, ...args) {
  console.log('🚀  templstrs:', tmplstrs);
  console.log('🚀  args:', args);
  let ret = tmplstrs[0];
  for (let i = 0; i < tmplstrs.length - 1; i += 1) {
    ret += args[i] + tmplstrs[i + 1];
  }

  return ret;
}

console.log('===================');
console.log(`c:\name\table`);
console.log(String.raw`c:\name\table`);
