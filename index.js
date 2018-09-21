const acorn = require('acorn');
const rollup = require('rollup');
const escodegen = require('escodegen');
const walk = require('acorn-walk')
const fs = require('fs');
const MagicString = require('magic-string');
const { createFilter } = require('rollup-pluginutils');

function transform(code) {
  const s = new MagicString(code);
  const comments = [];
  const tokens = [];
  const ast = acorn.parse(code, {
    sourceType: 'module',
    ranges: true,
    onComment: comments,
    onToken: tokens
  });
  escodegen.attachComments(ast, comments, tokens);
  s.appendLeft(0, `export const d11n = new WeakMap(); // D11N\n\n`);
  walk.ancestor(ast, {
    FunctionDeclaration(node) {
      const id = node.id.name;
      const commentInformation = JSON.stringify(node.leadingComments[0].value);
      s.appendLeft(node.end, `\nd11n.set(${id}, ${commentInformation}); // D11N\n`);
    },
    ClassDeclaration(node) {
      const id = node.id.name;
      const commentInformation = JSON.stringify(node.leadingComments[0].value);
      s.appendLeft(node.end, `\nd11n.set(${id}, ${commentInformation}); // D11N\n`);
    },
    MethodDefinition(node, ancestors) {
      // TODO: assert that this is a class? or is that just... automatic?
      let c = ancestors[ancestors.length - 3];
      // TODO: this will break on keys that don’t work in . chains, like those with spaces
      const id = `${c.id.name}.prototype.${node.key.name}`;
      const commentInformation = JSON.stringify(node.leadingComments[0].value);
      s.appendLeft(c.end, `\nd11n.set(${id}, ${commentInformation}); // D11N\n`);
    }
  });
  return s.toString();
}

function myPlugin(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  return {
    transform(code, id) {
      if (!filter(id)) return;
      return {
        code: transform(code)
      };
    }
  };
}


rollup.rollup({
  input: './fixture.js',
  plugins: [
    myPlugin()
  ]
}).then(bundle => {
  return bundle.generate({
    format: 'iife',
    name: 'd11nOutput'
  });
}).then(output => {
  const e = eval;
  console.log(output.code);
  eval(output.code);
  return d11nOutput;
}).then(exp => {
  const {d11n} = exp;
  const docs = new Map();

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

  Object.getOwnPropertyNames(exp).forEach(key => {
    if (key !== 'd11n') traverse(exp[key], [key]);
  });

  return docs;
}).then(docs => {
  console.log(docs);
});
