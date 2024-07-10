class Cls {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name} (${this.age})`;
  }

  getInfo3 = () => {
    return this.getInfo();
  };

  getFullInfo() {
    return {
      name: this.name,
      getInfo: this.getInfo,
      getInfo2: () => {
        return `${this.name} (${this.age})`;
      },
    };
  }
}

const c = new Cls('Hong', 33);
console.log('🚀  c:', c.getInfo());
const obj = c.getFullInfo();
console.log('🚀  obj:', obj);
console.log('🚀  obj.info:', obj.getInfo());
console.log('🚀  obj.info2:', obj.getInfo2());
console.log('🚀  obj.info3:', c.getInfo3());
