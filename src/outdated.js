const { exec } = require('./utils');
const Exception = require('./exception');

const cwd = process.cwd();

module.exports = async () => {
  try {
    await exec(`npm outdated`, { cwd });
  } catch ({ stdout }) {
    if (!stdout || !/^package/i.test(stdout)) {
      throw new Exception();
    }

    const [, ...lines] = stdout.split('\n').filter(Boolean);
    return lines.reduce((memo, line) => {
      const [name, current, wanted, latest] = line.split(/\s+/g);
      return {
        ...memo,
        [name]: {
          current,
          wanted,
          latest,
        },
      };
    }, {});
  }
};
