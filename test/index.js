const { test } = require('tap');
const d12 = require('../');
const os = require('os');
const fs = require('fs');
const path = require('path');

const name = path.join(os.tmpdir(), 'd12.example.js');

test('nothing exported', async t => {
  fs.writeFileSync(name, 
  `// Compute luminance
  function computeLuminance(a, b) {}`);
  const docs = await d12(name);
  t.matchSnapshot(docs);
});

test('single export', async t => {
  fs.writeFileSync(name, 
  `// Compute luminance
  function computeLuminance(a, b) {}
  export {computeLuminance};`);
  const docs = await d12(name);
  t.matchSnapshot(docs);
});

test('class with methods', async t => {
  fs.writeFileSync(name, 
  `// Compute luminance
  class Lum {
    // This is a function
    a() {}
  }
  export {Lum};`);
  const docs = await d12(name);
  t.matchSnapshot(docs);
});
