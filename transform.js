const MagicString = require('magic-string');
const escodegen = require('escodegen');
const acorn = require('acorn');
const walk = require('acorn-walk');

function getComment(node) {
  if (!node.leadingComments) return false;
  return JSON.stringify(node.leadingComments[node.leadingComments.length - 1].value);
}

module.exports = function transform(code) {
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
  s.appendLeft(0, `export const d12 = new WeakMap(); // D11N\n\n`);
  walk.ancestor(ast, {
    ExportNamedDeclaration(node) {
      const c = getComment(node);
      if (!c) return;
      const id = node.declaration.id.name;
      s.appendLeft(node.end, `\nd12.set(${id}, ${c}); // D11N\n`);
    },
    FunctionDeclaration(node) {
      const c = getComment(node);
      if (!c) return;
      const id = node.id.name;
      s.appendLeft(node.end, `\nd12.set(${id}, ${c}); // D11N\n`);
    },
    ClassDeclaration(node) {
      const c = getComment(node);
      if (!c) return;
      const id = node.id.name;
      s.appendLeft(node.end, `\nd12.set(${id}, ${c}); // D11N\n`);
    },
    VariableDeclaration(node) {
      const c = getComment(node);
      if (!c) return;
      let {declarations: [decl]} = node;
      const id = decl.id.name;
      s.appendLeft(node.end, `\nd12.set(${id}, ${c}); // D11N\n`);

    },
    MethodDefinition(node, ancestors) {
      const c = getComment(node);
      if (!c) return;
      // TODO: assert that this is a class? or is that just... automatic?
      let klass = ancestors[ancestors.length - 3];
      // TODO: this will break on keys that don’t work in . chains, like those with spaces
      const id = `${klass.id.name}.prototype.${node.key.name}`;
      s.appendLeft(klass.end, `\nd12.set(${id}, ${c}); // D11N\n`);
    }
  });
  return s.toString();
}
