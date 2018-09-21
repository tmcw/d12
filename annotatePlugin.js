const transform = require('./transform');
const { createFilter } = require('rollup-pluginutils');

module.exports = function annotate(options = {}) {
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


