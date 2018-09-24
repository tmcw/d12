const d12 = require('./index');
const format = require('./format');

const input = process.argv[2];

async function run() {
  const doc = await d12(input);
  console.log(format(doc));
}

run(input)
