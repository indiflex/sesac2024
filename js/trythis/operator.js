for (let i = 0.1; i < 1; i = i + 0.1) {
  // console.log(Number(i.toFixed(1)));
  // console.log(+i.toFixed(1));
  // console.log(+i.toPrecision(1));
}
// for (let i = 1; i < 10; i = i + 1) {
for (let i = 1; i < 10; i += 1) {
  const root = Math.sqrt(i);
  if (root % 1 === 0) continue;
  console.log(+root.toFixed(3)); // (가)
  // console.log(Math.round(root * 1000) / 1000); // (나)
}

console.log('--------------------------');
const WEEK_NAMES = '일월화수목금토';
function getWeekName(date) {
  // return WEEK_NAMES[date.getDay()];
  switch (date?.getDay()) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    // ... 생략...
    case 6:
      return '토';
    default:
      throw new Error('Not a valid date!!');
  }
}

try {
  const ret3 = getWeekName(new Date());
  // const ret3 = getWeekName();
  console.log('🚀 ret3:', ret3);
} catch (error) {
  console.error('ERROR:', error.message);
}

console.log('===========================');
function getPointLength(x) {
  return x?.toString().length - 2;
}

function addPoints(a, b) {
  let aLen = getPointLength(a);
  let bLen = getPointLength(b);

  // (가)
  // const bigLen = aLen > bLen ? aLen : bLen;
  // console.log(+(a + b)?.toFixed(bigLen));

  // (나)
  // console.log(+(a + b)?.toFixed(aLen > bLen ? aLen : bLen));

  // (다)
  console.log(+(a + b)?.toFixed(Math.max(aLen, bLen)));
}

addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
