const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const fs = require('fs');
const annotatePlugin = require('./annotatePlugin');
const e = eval;

module.exports = async function d11n(input) {

  const docs = new Map();
  const bundle = await rollup.rollup({
    input,
    plugins: [
      nodeResolve(),
      commonjs(),
      annotatePlugin()
    ]
  });
  const output = await bundle.generate({
    format: 'iife',
    name: 'd11nOutput'
  });
  const {d11n, ...exports} = e(output.code.substring(16));

  function traverse(obj, path) {
    const doc = d11n.get(obj);
    if (doc) docs.set(path, doc);
    try {
      if (obj.toString().startsWith('class')) {
        const doc = d11n.get(obj.prototype.constructor);
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