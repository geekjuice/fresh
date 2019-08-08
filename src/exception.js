const { red } = require('chalk');

const flip = red('(╯°□°）╯︵ ┻━┻');

class Exception extends Error {
  constructor(message, code = 1) {
    super(message || flip);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
  }
}

module.exports = (...args) => new Exception(...args);
