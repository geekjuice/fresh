import outdated from '../outdated';
import * as utils from '../utils';

describe('outdated', () => {
  let run: jest.SpyInstance;

  beforeEach(() => {
    run = jest.spyOn(utils, 'run');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('outdated modules', async () => {
    run.mockRejectedValue({
      stdout: JSON.stringify({
        fresh: {
          current: '1.0.0',
          wanted: '1.5.0',
          latest: '2.0.0',
        },
      }),
    });

    const actual = outdated();
    await expect(actual).resolves.toEqual({
      fresh: {
        current: '1.0.0',
        wanted: '1.5.0',
        latest: '2.0.0',
      },
    });
  });

  test('up-to-date modules', async () => {
    run.mockResolvedValue({ stdout: '', stderr: '' });

    const actual = outdated();
    await expect(actual).resolves.toEqual({});
  });

  test('invalid outdated output', async () => {
    run.mockRejectedValue(null);

    const actual = outdated();
    await expect(actual).rejects.toBeInstanceOf(Error);
  });
});
