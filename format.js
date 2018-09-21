module.exports = function(doc) {
  let out = '';
  for (let [k, v] of doc.entries()) {
    out += `### ${k}
${v}\n\n`;
  }
  return out;
}
