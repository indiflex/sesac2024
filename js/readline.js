const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

// const rl = readline.createInterface({ input, output });
const rl = readline.createInterface({ input });

// rl.question('What do you think of Node.js? ', answer => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   // rl.close();
// });

function* add() {
  const a = yield '첫 번째 수는?';
  const b = yield '두 번째 수는?';
  return a + b;
}

const itAdd = add();
console.log(itAdd.next().value);

rl.on('line', answer => {
  // console.log('line.answer>>', answer, answer === 'bye');
  // if (answer === 'bye') rl.close();
  const { value, done } = itAdd.next(+answer);
  if (done) {
    console.log('Total:', value);
    rl.close();
  } else {
    console.log(value);
  }
}).on('close', () => {
  process.exit();
});
