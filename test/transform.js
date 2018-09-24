const { test } = require('tap');
const transform = require('../transform');

test('transform', async t => {
  t.matchSnapshot(transform(`export const a = 1;`));
  t.matchSnapshot(transform(`// Wow!
function a() {}

// Oh!
class B {
  // Do it.
  constructor() {}

  // Doh!
  c() { }
}

// That's baz for you!
let baz = () => {},
 // And bar.
 bar = () => {};

export {a, B, baz};`));

});
