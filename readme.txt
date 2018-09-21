
     _ _ _       
  __| / / |_ __  
 / _` | | | '_ \ 
| (_| | | | | | |
 \__,_|_|_|_| |_|
                 

d11n - dx spec implementation experiment


the ideas so far are:

- let javascript itself define hierarchy and type
- prioritize runtime documentation access
- simplify, simplify, simply
- be opinionated when it helps us simplify


deal with later:

- documentation format. let's just get basic comments working first.


--------------------------------------------------------------------------------


how it works so far:

1. uses rollup to start with an entry point and
   traverse dependencies

2. uses a transform to associate comments with objects
   in an exported map

3. traverses the exported surface of the module to
   produce static documentation


--------------------------------------------------------------------------------


speculative future:

- proposal-import-meta may provide a way forward
  to standardize the way that this information is
  passed around

- runtime access ideally relies on a runtime
  transformation, which is tbd


--------------------------------------------------------------------------------


non-goals:

- i don't think that i want to support babel
  anymore. it was fun for a while, but the infinite
  configurations weigh heavily one me, and on
  node_modules. i want something with near-zero
  configuration that can be shared by as many people as
  possible.
