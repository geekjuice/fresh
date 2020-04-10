import { blue, magenta, red } from 'chalk';
import meow from 'meow';
import { Exception } from './exception';
import { pad } from './format';
import main from './main';
import precondition from './precondition';
import { Flags } from './types';

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
      exact: {
        type: 'boolean',
      },
      force: {
        type: 'boolean',
      },
    },
  }
);

(async (): Promise<void> => {
  try {
    precondition(flags);
    await main(flags as Flags);
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
