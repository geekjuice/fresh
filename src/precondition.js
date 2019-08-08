const Exception = require('./exception');

module.exports = ({ wanted, latest }) => {
  if (wanted && latest) {
    throw Exception('cannot use both wanted and latest');
  }
};
