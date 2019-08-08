const { readFile, writeFile } = require('./utils');

exports.read = async filepath => {
  const stuff = await readFile(filepath);
  return JSON.parse(stuff);
};

exports.write = async (filepath, object = {}) => {
  const json = JSON.stringify(object, null, 2);
  await writeFile(filepath, json);
};
