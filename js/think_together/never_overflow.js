function mainFacto() {
  let stopN = 0;
  const table = {};

  const main = function A(n) {
    if (n <= 1) return 1;
    // clear
    Object.keys(table)
      .filter(a => a > n)
      .forEach(a => delete table[a]);
    stopN = 0;

    try {
      // if (n === 3) throw new Error('Maximum call stack!!');
      return table[n] || (table[n] = n + A(n - 1));
    } catch (error) {
      const { message } = error;
      if (message?.includes('Maximum call stack')) {
        console.error(error.message, n);
        stopN = n;

        return 0;
        // return A(n);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  };

  const getStop = () => stopN;
  const getTable = () => table;
  return [main, getStop, getTable];
}

const [facto, getStop, getTable] = mainFacto();

function factorial(n) {
  let ret = 0;
  let stop = 0;
  do {
    ret += facto(stop || n);
    stop = getStop();
  } while (stop > 0);
  // console.log('stop=', stop);
  return ret;
}

// console.log(factorial(7000));
console.log(factorial(10000)); //
console.log(factorial(10000));
console.log(factorial(20000));
let sum = 0;
for (let i = 1; i <= 20000; i += 1) {
  sum += i;
}
console.log('🚀  sum:', sum);

// console.log(factorial(3));
// console.log(factorial(5));

// console.log('🚀  table:', getTable());
