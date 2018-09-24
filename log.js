module.exports = function(arg) {
  if (process.env.DEBUG) console.log(arg);
  return arg;
}
