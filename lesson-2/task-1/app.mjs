import { argv } from "node:process";
import readline from "node:readline";

function isValidNum(val) {
  if (typeof val !== 'string') return false
  if (val.trim() === '') return false

  const num = Number(val)
  if (!Number.isFinite(num) || num <= 0 || num > 120) return false

  return true
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const params = argv.slice(2);

if (params.length !== 1) {
  console.log("Specify one parameter using the: node app.mjs --pension=age");
  process.exit(1)
}

const argTuple = new URLSearchParams(params[0]);
const arg = argTuple.get("--pension");

if (!isValidNum(arg)) {
  console.log("Age must be a positive number (1-120)");
  process.exit(1)
}

const pensionAge = Number(arg)

function askAge(pensionAge) {
  rl.question("Your age: ", (ans) => {
    if (!isValidNum(ans)) {
      console.log("Age must be a positive number (1-120)")
      askAge(pensionAge)
    }
    else {
      if (Number(ans) >= pensionAge) console.log('You are of retirement age');
      else console.log('You are younger than retirement age');
      rl.close();
    }
  });
}

// rl.on('SIGINT', () => {
//   rl.question('Exit? (y/n)', (ans) => {
//     if(ans === 'y') rl.pause()
//   })
// })

askAge(pensionAge)

// console.log(argTuple);
// console.log(arg);
