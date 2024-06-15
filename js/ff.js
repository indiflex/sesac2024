var PqPq = 0x101010101010;
var R = "RRR";
var xq = 77777;
const yyy = 1;
const obj = {
  id: 1,
  name: "Hong",
};

//var g = 1;
g = 7;
h = 8;
function gg() {
  var oo = obj;
  var p = q + 26 - oo.id * 2;
  console.log("p=", p);
  var o = p + 7;
  var q = xq;
  var y = PqPq;
  var z = 2 + h;
  var x = q + y + z;
  return g + x + R;
  //return g + obj.id + obj.name;
}
console.log(gg.bind({})(5));
var g = 99999;
var h = 88888;
var q = 97;

function ff() {
  let count = 0;
  console.log(count, x);
  var x = 2 + g;
  for (let i = 0; i < 100000; i++) {
    const c = x + 1;
    const d = c + g;
  }
  return function () {
    return ++count + x + obj.id;
  };
}
ff();
