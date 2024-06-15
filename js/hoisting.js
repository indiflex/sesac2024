let i = undefined;
console.log('i=', i); // error
i = 1;
console.log('x=', x);
var x = 1;
console.log('ff=', ff, f, 'x' in this, 'x' in globalThis);
// f(); // error
{
  function f() {
    console.log('f>', x, xx);
  }
  f();
  var x = 2;
  const b = 1;
}
f();
function ff() {
  console.log('ff>', y);
}
if (x >= 2) {
  var y = 5;
  let yy = 55;
}
var xx = 100;
ff();
