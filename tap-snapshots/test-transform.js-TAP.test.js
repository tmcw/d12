/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/transform.js TAP transform > undefined 1`] = `
export const d12 = new WeakMap(); // D11N

export const a = 1;
`

exports[`test/transform.js TAP transform > undefined 2`] = `
export const d12 = new WeakMap(); // D11N

// Wow!
function a() {}
d12.set(a, " Wow!"); // D11N


// Oh!
class B {
  // Do it.
  constructor() {}

  // Doh!
  c() { }
}
d12.set(B.prototype.constructor, " Do it."); // D11N

d12.set(B.prototype.c, " Doh!"); // D11N

d12.set(B, " Oh!"); // D11N


// That's baz for you!
let baz = () => {},
 // And bar.
 bar = () => {};
d12.set(baz, " That's baz for you!"); // D11N


export {a, B, baz};
`
