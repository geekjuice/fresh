const update = require('../update');

const input = {
  name: 'test',
  dependencies: {
    foo: '1.0.0',
  },
  devDependencies: {
    bar: '2.0.0',
  },
  optionalDependencies: {
    xyz: '3.0.0',
  },
};

const changes = {
  foo: '1.2.3',
  bar: '2.3.4',
  xyz: '3.5.6',
};

const output = {
  name: 'test',
  dependencies: {
    foo: '1.2.3',
  },
  devDependencies: {
    bar: '2.3.4',
  },
  optionalDependencies: {
    xyz: '3.5.6',
  },
};

test('update', () => {
  expect(update(input, changes)).toEqual(output);
});
