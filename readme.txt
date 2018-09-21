
     _ _ _       
  __| / / |_ __  
 / _` | | | '_ \ 
| (_| | | | | | |
 \__,_|_|_|_| |_|
                 

d11n - dx spec implementation experiment

example in:

  // Hi
  function hello() {}
  // This class is pretty cool
  class A {
    // This function is pretty cool
    b() {}
  }
  export {hello, A};

example out:

  export const d11n = new WeakMap(); // D11N
  // Hi
  function hello() {}
  d11n.set(hello, " Hi"); // D11N
  // This class is pretty cool
  class A {
    // This function is pretty cool
    b() {}
  }
  d11n.set(A.prototype.b, " This function is pretty cool"); // D11N
  d11n.set(A, " This class is pretty cool"); // D11N
  export {hello, A};

the ideas so far are:

- let javascript itself define hierarchy
- prioritize runtime documentation access

deal with later:

- documentation format. let's just get basic comments working first.


--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

speculative future:

- proposal-import-meta may provide a way forward to standardize the way that
  this information is passed around
