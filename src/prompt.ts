import prompts, { Choice } from 'prompts';
import { bold, cyan, dim, gray } from 'chalk';
import Exception from './exception';
import { Dependencies, Outdated, Flags } from './types';

const SIGINT_CODE = 130;

const LINE = dim('──────────────');

const onCancel = (): void => {
  throw Exception('ok...', SIGINT_CODE);
};

const option = (name: string, value: string): Choice => ({
  title: `${name}: ${value}`,
  value,
});

export default async (
  outdated: Outdated,
  { wanted, latest, force }: Omit<Flags, 'exact' | 'global'>
): Promise<Dependencies> => {
  const packages = Object.entries(outdated);

  let changes: Dependencies = {};
  if (wanted || latest) {
    const type = wanted ? 'wanted' : 'latest';
    changes = packages.reduce(
      (memo, [name, version]) => ({
        ...memo,
        [name]: version[type],
      }),
      {}
    );
  } else {
    changes = await prompts(
      packages.map(([name, { current, wanted, latest }]) => ({
        name,
        type: 'select',
        message: `pick a version for [${name}]:`,
        choices: [
          option('latest', latest),
          option('wanted', wanted),
          option('current', current),
        ],
      })),
      { onCancel }
    );
  }

  const review = Object.keys(changes)
    .map((name) =>
      [
        `${bold(name)}:`,
        `${gray(outdated[name].current)}`,
        `->`,
        `${cyan(changes[name])}`,
      ].join(' ')
    )
    .join('\n');

  console.log([LINE, review, LINE].join('\n'));

  if (force) {
    return changes;
  }

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: 'update dependencies?',
    initial: false,
  });

  if (!confirm) {
    throw Exception();
  }

  return changes;
};
