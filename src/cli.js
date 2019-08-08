const { blue, magenta, red } = require('chalk');
const debug = require('debug');
const meow = require('meow');
const { pad } = require('./format');
const precondition = require('./precondition');

const { flags } = meow(
  `
  usage: ${magenta('fresh')} [options]

  options:
    ${blue('--wanted')}   use wanted versions
    ${blue('--latest')}   use latest versions
    ${blue('--force')}    skip confirmation

`,
  {
    flags: {
      wanted: {
        type: 'boolean',
      },
      latest: {
        type: 'boolean',
      },
      yes: {
        type: 'boolean',
      },
    },
  }
);

try {
  precondition(flags);
  require('./main')(flags);
} catch (error) {
  if (error instanceof Error) {
    console.log(pad.both(error));
    debug('fresh:error')(error);
  } else {
    console.log(pad.both(error));
  }

  console.log(red('(╯°□°）╯︵ ┻━┻'));

  process.exitCode = 1;
}
