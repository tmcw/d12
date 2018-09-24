const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const fs = require('fs');
const transformPlugin = require('./transformPlugin');
const e = eval;

module.exports = async function d12(input) {

  const docs = new Map();
  const bundle = await rollup.rollup({
    input,
    plugins: [
      nodeResolve(),
      commonjs(),
      transformPlugin()
    ]
  });
  const output = await bundle.generate({
    format: 'iife',
    name: 'd12Output'
  });
  const {d12, ...exports} = e(output.code.substring(15));

  function traverse(obj, path) {
    const doc = d12.get(obj);
    if (doc) docs.set(path, doc);
    try {
      if (obj.toString().startsWith('class')) {
        const doc = d12.get(obj.prototype.constructor);
        if (doc) docs.set(path.concat(['prototype', 'constructor']), doc);
      }
    } catch {}
    try {
      Reflect.ownKeys(obj).forEach(key => {
        if (key !== 'prototype') traverse(obj[key], path.concat(key));
      });
      Reflect.ownKeys(obj.prototype).forEach(key => {
        if (key !== 'constructor') traverse(obj.prototype[key], path.concat(['prototype', key]));
      });
    } catch {}
  }

  Object.keys(exports).forEach(key => {
    traverse(exports[key], [key]);
  });

  return docs;
}
