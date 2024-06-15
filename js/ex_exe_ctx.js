var gg = 1;
let bb = 2;
function f1(x, y) {
  // cf. const f1 = function(x,y) { …
  var gg = 11;
  let bb = 22;
  console.log('f1>', gg, bb, zz, f2, f2.length); // 3
  f2('first'); // t,u,v 실행 (이 시점에 nested f2는 hoisting됐지만 <f.o>로 정의되지 않은 상태!) ← inner2
  {
    const xx = 99; // f1 평가 시 xx는 notInitializedYet(uninitialized) 상태로 block상단에 hoisting.
    let lll = 0; // hoisting되는 이유는 뒤에서 선언했는지 여부를 개발자에게 알려줘야 중복 선언 안함!
    f2('nest-first'); // no error? which call f2(inner) or f2(nested) ?
    var zz = 88; // f1 평가 시 f1 상단에 undefined로 hoisting.
    function f2(t) {
      console.log(t, 'nested', xx, zz, lll);
    } // hoisting은 undefined로?!
  } // 평가시점에 f1 scope로 hoisting.
  function f2(t, u) {
    console.log(t, 'inner', xx, zz);
  } // f1 평가 시 f1 상단에 <f.o>로 hoisting
  function f2(t, u, v) {
    console.log(t, 'inner2', xx, zz);
  } // hoisting 시, 위 라인의 f2를 덮어씀!
  var zz = 800;
  f2('second'); // call 'nested'(파랑) & f2는 block을 가리킨다!
}
function f2(g) {
  console.log(g, 'global f2>', gg, bb, xx, kk); // ?
}
let xx = 9;
if (gg > 0) {
  var kk = 33;
  const yy = 9;
}
f1(1, 2);
console.log(kk); // ? yy is not defined in global scope
f2('third'); // global f2 실행

let userFn;
{
  const privateUser = { id: 1, name: 'Hong' };
  userFn = () => privateUser; // 이 user 변수가 하위(Block) 스코프의 privateUser를 참조
}
// block은 끝나서 이 block의 BlockExecutionContext는 사라졌지만,
// privateUser를 user가 계속 참조하고 있어 BlockLexicalEnvironment는 사라질 수 없다!!

userFn().age = 30; // user refer to privateUser ⇒ 실제로 privateUser가 변경!
console.log(userFn()); // { id: 1, name: 'Hong', age: 30 }
