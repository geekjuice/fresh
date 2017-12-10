const { readFile, writeFile } = require('./utils');

exports.read = async filepath => {
  try {
    const stuff = await readFile(filepath);
    return JSON.parse(stuff);
  } catch (err) {
    throw err;
  }
};

exports.write = async (filepath, object = {}) => {
  try {
    const json = JSON.stringify(object, null, 2);
    await writeFile(filepath, json);
  } catch (err) {
    throw err;
  }
};
