// Hi
function hello() {}

// This class is pretty cool
class A {
  // Yep, it is constructed
  constructor() {
    this.truth = 42;
  }
  // This function is pretty cool
  b() {
    // This is not exported or in any export path.
    function yep() {}
    return yep;
  }
}

export {hello, A};
