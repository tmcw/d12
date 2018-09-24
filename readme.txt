
      _ _ ____  
  __| / |___ \ 
 / _` | | __) |
| (_| | |/ __/ 
 \__,_|_|_____|
               
                 

d12 - dx spec implementation experiment

| this is an experiment that may or may not
| become a successor to documentation.js. i want to build
| a successor to documentation.js, because i think jsdoc's
| time has passed, the documentation.js approach is
| complex in certain irreducible ways, and that hosted documentation
| and dynamic documentation (autocomplete-based) should be
| solved.

the ideas so far are:

- let javascript itself define hierarchy and type
- prioritize runtime documentation access
- simplify, simplify, simply
- be opinionated when it helps us simplify
- host early


deal with later:

- documentation format. let's just get basic comments working first.


--------------------------------------------------------------------------------


                          _______
                         | ___  o|
                         |[_-_]_ |
      ______________     |[_____]|
     |.------------.|    |[_____]|
     ||            ||    |[====o]|
     ||            ||    |[_.--_]|
     ||            ||    |[_____]|
     ||            ||    |      :|
     ||____________||    |      :|
 .==.|""  ......    |.==.|      :|
 |::| '-.________.-' |::||      :|
 |''|  (__________)-.|''||______:|
 `""`_.............._\""`______
    /:::::::::::'':::\`;'-.-.  `\
   /::=========.:.-::"\ \ \--\   \
   \`""""""""""""""""`/  \ \__)   \
jgs `""""""""""""""""`    '========'


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


--------------------------------------------------------------------------------


harsh requirements:

- on the topic of building for the future, i'm building for the future. that
  means that 'legacy' module formats - including much-loved commonjs -
  are not particularly well-supported. my expectation is that you set up your
  modules such that they're consumable to MICROBUNDLE, with the following
  crucial stipulation:

  > the 'source' field of package.json is a entry point into the raw source
  > of the module, in es6 format, using only stable features and stage 4 (finalized)
  > javascript features.
