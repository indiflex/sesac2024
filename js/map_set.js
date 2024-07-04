// WeakMap vs Map
const wm = new WeakMap();
const m = new Map();
{
  let obj1 = { id: 1 };
  const obj2 = { id: 2 };

  wm.set(obj1, 1);
  wm.set(obj2, 2);
  // obj1 = null; // obj1 주소 변경!
  console.log(wm, wm.has(obj1));

  m.set(obj1, 1);
  // obj1 = null;
  m.set(obj2, 2);
  console.log('Map', m, m.has(obj1));
} // wm만 전역이라면 obj1, obj2는 GC!!

console.log(m.size, wm.size);
console.log('------------------');
console.log(wm, m);
