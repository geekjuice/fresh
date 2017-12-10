const { prompt, Separator } = require('inquirer');
const { bold, gray, cyan } = require('chalk');
const Exception = require('./exception');

const line = new Separator();

module.exports = async (packages, { wanted, latest, force }) => {
  let changes;
  if (wanted || latest) {
    const type = wanted ? 'wanted' : 'latest';
    changes = Object.keys(packages).reduce(
      (memo, name) => ({
        ...memo,
        [name]: packages[name][type],
      }),
      {}
    );
  } else {
    changes = await prompt(
      Object.keys(packages).map(name => ({
        name,
        type: 'list',
        message: `pick a version for [${name}]:`,
        choices: [
          {
            value: packages[name].current,
            name: `current: ${packages[name].current}`,
          },
          {
            value: packages[name].wanted,
            name: `wanted: ${packages[name].wanted}`,
          },
          {
            value: packages[name].latest,
            name: `latest: ${packages[name].latest}`,
          },
        ],
        default: packages[name].current,
      }))
    );
  }

  const review = Object.keys(changes)
    .map(name =>
      [
        `${bold(name)}:`,
        `${gray(packages[name].current)}`,
        `->`,
        `${cyan(changes[name])}`,
      ].join(' ')
    )
    .join('\n');

  console.log([line, review, line].join('\n'));

  let confirm;
  if (force) {
    confirm = true;
  } else {
    ({ confirm } = await prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message: 'update dependencies?',
        default: false,
      },
    ]));
  }

  if (!confirm) {
    throw new Exception();
  }

  return changes;
};
