const { dependencies } = require('./constants');

module.exports = (json = {}, changes = {}) =>
  dependencies.filter(field => json[field]).reduce(
    (updated, field) => ({
      ...updated,
      [field]: Object.keys(changes).reduce(
        (memo, name) => ({
          ...memo,
          ...(json[field][name]
            ? {
                [name]: changes[name],
              }
            : {}),
        }),
        json[field]
      ),
    }),
    json
  );
