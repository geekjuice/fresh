const using = type => stdout =>
  jest.doMock('../utils', () => ({
    exec: jest.fn(() => Promise[type]({ stdout })),
  }));

const mock = {
  resolve: using('resolve'),
  reject: using('reject'),
};

beforeEach(jest.resetModules);

test('outdated modules', async () => {
  const stdout = [
    'Package  Current  Wanted  Latest  Location',
    'fresh      1.0.0   1.5.0   2.0.0  @geekjuice/fresh',
  ].join('\n');
  mock.reject(stdout);
  const outdated = require('../outdated');
  await expect(outdated()).resolves.toEqual({
    fresh: {
      current: '1.0.0',
      wanted: '1.5.0',
      latest: '2.0.0',
    },
  });
});

test('up-to-date modules', async () => {
  mock.resolve();
  const outdated = require('../outdated');
  await expect(outdated()).resolves.toBeUndefined();
});

test('invalid outdated output', async () => {
  mock.reject(null);
  const outdated = require('../outdated');
  await expect(outdated()).rejects.toBeInstanceOf(Error);
});
