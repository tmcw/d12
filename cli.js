const d11n = require('./index');
const format = require('./format');

const input = process.argv[2];

async function run() {
  const doc = await d11n(input);
  console.log(format(doc));
}

run(input)
