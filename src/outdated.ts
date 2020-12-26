import { run } from './utils';
import Exception from './exception';
import { Outdated } from './types';

const cwd = process.cwd();

const parse = (results: string): Outdated | null => {
  try {
    return JSON.parse(results);
  } catch (err) {
    return null;
  }
};

export default async (): Promise<Outdated> => {
  try {
    const { stdout } = await run(`npm outdated --json`, { cwd });
    const outdated = parse(stdout);
    return outdated || {};
  } catch ({ stdout }) {
    const outdated = parse(stdout);

    if (!stdout || outdated === null) {
      throw Exception();
    }

    return outdated;
  }
};
