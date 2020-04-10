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
    await run(`npm outdated --json`, { cwd });
    return {};
  } catch ({ stdout }) {
    const outdated = parse(stdout);

    if (!stdout || outdated === null) {
      throw Exception();
    }

    return outdated;
  }
};
