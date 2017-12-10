#!/usr/bin/env node

const meow = require('meow');
const { magenta, blue } = require('chalk');

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

require('./src/main')(flags);
