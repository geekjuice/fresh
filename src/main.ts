import ora from 'ora';
import { green } from 'chalk';
import { join } from 'path';
import { pad } from './format';
import { read, write } from './json';
import outdated from './outdated';
import prompt from './prompt';
import update from './update';
import { Flags } from './types';

const cwd = process.cwd();
const filepath = join(cwd, 'package.json');

export default async ({ exact, global, ...flags }: Flags): Promise<void> => {
  const progress = ora('fetching outdated modules...').start();

  try {
    const packages = await outdated(global);
    progress.stop();

    if (Object.keys(packages).length > 0) {
      const answers = await prompt(packages, flags);

      if (Object.keys(answers).length > 0) {
        const json = await read(filepath);
        const updated = update(json, answers, exact);
        await write(filepath, updated);

        console.log(pad.top('[fresh] updated dependencies!'));
      }
    } else {
      console.log(pad.top('[fresh] nothing to update!'));
    }

    console.log(pad.both(green('(づ｡◕‿‿◕｡)づ')));
  } catch (err) {
    progress.stop();
    throw err;
  }
};
