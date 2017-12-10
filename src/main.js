const ora = require('ora');
const { join } = require('path');
const { green } = require('chalk');
const { read, write } = require('./json');
const precondition = require('./precondition');
const outdated = require('./outdated');
const prompt = require('./prompt');
const update = require('./update');
const Exception = require('./exception');

const cwd = process.cwd();
const filepath = join(cwd, 'package.json');

module.exports = async flags => {
  let progress = ora('fetching outdated modules...').start();

  try {
    const { wanted, latest } = flags;
    precondition({ wanted, latest });

    const packages = await outdated();
    progress.stop();

    if (packages && Object.keys(packages).length > 0) {
      const answers = await prompt(packages, flags);

      if (Object.keys(answers).length > 0) {
        const json = await read(filepath);
        const updated = update(json, answers);
        await write(filepath, updated);

        console.log('\n[fresh] updated dependencies!');
      }
    } else {
      console.log('\n[fresh] nothing to update!');
    }

    console.log(green('\n(づ｡◕‿‿◕｡)づ\n'));
  } catch (err) {
    progress.stop();
    /* eslint-disable no-process-exit */
    if (err instanceof Exception) {
      const { message, code } = err;
      console.log(`\n${message}\n`);
      process.exit(code);
    } else {
      console.log(err);
      process.exit(1);
    }
  }
};
