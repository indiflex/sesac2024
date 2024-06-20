setTimeout(() => console.log('timeout', new Date()), 1000);

let intervalCount = 1;
const f10 = () =>
  (() => {
    console.log('interval', new Date());
    if ((intervalCount += 1) > 10) {
      clearInterval(inter);
    }
  })();

const inter = setInterval(f10, 100);
