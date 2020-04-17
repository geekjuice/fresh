/* eslint-disable no-process-exit */

import { blue, magenta, red } from 'chalk';
import meow from 'meow';
import { Exception } from './exception';
import { pad } from './format';
import main from './main';
import precondition from './precondition';
import { Flags } from './types';

const cli = meow(
  `
  usage: ${magenta('fresh')} [options]

  options:
    ${blue('--global')}   check global packages
    ${blue('--wanted')}   use wanted versions
    ${blue('--latest')}   use latest versions
    ${blue('--exact')}    use exact versions
    ${blue('--force')}    skip confirmation

`,
  {
    flags: {
      global: {
        type: 'boolean',
      },
      wanted: {
        type: 'boolean',
      },
      latest: {
        type: 'boolean',
      },
      exact: {
        type: 'boolean',
      },
      force: {
        type: 'boolean',
      },
    },
  }
);

const flags = cli.flags as Flags;

(async (): Promise<void> => {
  try {
    precondition(flags);
    await main(flags);
  } catch (error) {
    console.log(pad.top(red('(╯°□°）╯︵ ┻━┻')));
    if (error instanceof Exception) {
      const { code, message } = error;
      console.log(pad.top(red(message)));
      process.exit(code);
    } else {
      process.exit(1);
    }
  }
})();
