const { promisify } = require('util');
const { exec } = require('child_process');
const { readFile, writeFile } = require('fs');

exports.exec = promisify(exec);
exports.readFile = promisify(readFile);
exports.writeFile = promisify(writeFile);
