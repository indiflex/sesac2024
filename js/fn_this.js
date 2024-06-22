console.log(this);
globalThis.name = 'GlobalName';
globalThis.age = 20;
this.name = 'ModuleName';
this.age = 30;

const obj = {
  name: 'ObjName',
  bark1() {
    console.log('1=', this.name);
    const self = this;
    setTimeout(
      function (a, b) {
        console.log('11=', this); // Timeout
        console.log('12=', this.name, a, b); //
      },
      // }.bind(this, 1, 2),
      1000
    );
    console.log('xxxx');
  },
  bark2() {
    console.log('2=', this.name);
    var self = this;
    setTimeout(() => {
      console.log('22=', this.name);
      console.log('23=', self.name);
    }, 1000);
  },
  bark3() {
    console.log(this.name);
    function innerFn() {
      console.log(this.name); // ?
    }
    innerFn();
  },
  bark4: () => {
    console.log(this.name); // ?
  },
  bark5: function () {
    // ES5
    // <==> bark5() {...}
    console.log(this.name); // ?
  },
};

// obj.bark1();
// obj.bark2();
// obj.bark3();
obj.bark4();
obj.bark5();

var x = obj.bark1;
var y = obj.bark2;
var z = obj.bark5;
// x();
// y();
z();

console.log('+++++++++++++');

function P() {}

function Fn() {
  this.xxx = 1;
  console.log(this, new.target);
}

Object.assign(Fn, P);

class Fn2 {
  constructor() {
    this.xxx = 1;
    console.log(this, new.target);
  }
}

f1 = new Fn();
f2 = new Fn2();

console.log('=========================')

// ⇔ function declareFn(name) {
// const expressFn = function(nameX) {
function expressFn(nameX) {
  // 'use strict';
  // globalThis.name = nameX;
  // console.log('expression>>', this, new.target, globalThis.name);
  
  console.log('🚀 exp name:', name)
  console.log('🚀 exp age:', age)
}


const arrowFn = (nameY) => {
  // this.name = name;
  console.log('arrow>>', this, new.target, this.name, nameY);
  console.log('🚀 arrow name:', name)
  console.log('🚀 arrow name:', age)
}

expressFn('expfnxxx');
arrowFn('afnyyy');

// const dfn = new expressFn('D');
// const afn = new arrowFn('A'); // error!

console.log('-------------------------')
const Cat = (name) => {
  console.log('>>>', this, new.target);
  this.name = name;
  this.bark = function () {
  console.log('***bark=', new.target, this.name, name);
  };
  this.bark2 = () =>
    console.log('bark2=', new.target, this.name, name);

  return this;
}

const cat = Cat('Coco');
// const cat = new Cat(''); // error!!
cat.bark(); // ?
cat.bark2(); // ?
this.bark(); // ?
console.log('type=', typeof cat); // ? 

// cf. arrow function's this (p.60)
console.log('*****************************')
const Dog = function (name) {
  'use strict';
  console.log(this, new.target, 
              this instanceof Dog);
  this.name = name;
  this.bark = function () {
  console.log('bark=', new.target, this.name, name);
  };
  this.bark2 = () =>
    console.log('bark2=', new.target, this.name, name);
}

const dog = Dog('Doggy');
const lucy = new Dog('Lucy');
// Dog.bark(); // ?
lucy.bark(); // ?
lucy.bark2(); // ?
console.log('type=', typeof dog); // ?
console.log('type=', typeof lucy); // ?
