const { exec } = require('./utils');
const Exception = require('./exception');

const cwd = process.cwd();

const parse = json => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
};

module.exports = async () => {
  try {
    await exec(`npm outdated --json`, { cwd });
  } catch ({ stdout }) {
    const outdated = parse(stdout);

    if (!stdout || outdated === null) {
      throw Exception();
    }

    return outdated;
  }
};
