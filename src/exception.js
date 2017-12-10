const { red } = require('chalk');

const flip = red('(╯°□°）╯︵ ┻━┻');

module.exports = class Exception extends Error {
  constructor(message, code = 1) {
    super(message ? `[error] ${message}\n\n${flip}` : flip);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
  }
};
