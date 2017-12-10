const Exception = require('./exception');

module.exports = ({ wanted, latest }) => {
  if (wanted && latest) {
    throw new Exception('cannot use both wanted and latest');
  }
};
