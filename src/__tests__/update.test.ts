import update from '../update';

describe('update', () => {
  test('identity', () => {
    expect(update({}, {})).toEqual({});
  });

  test('changes', () => {
    const json = {
      dependencies: { abc: '0.0.0', foo: '1.0.0' },
      devDependencies: { bar: '2.0.0' },
      optionalDependencies: { xyz: '3.0.0' },
    };

    const changes = {
      foo: '1.2.3',
      bar: '2.3.4',
      xyz: '3.5.6',
    };

    expect(update(json, changes)).toEqual({
      dependencies: { abc: '0.0.0', foo: '^1.2.3' },
      devDependencies: { bar: '^2.3.4' },
      optionalDependencies: { xyz: '^3.5.6' },
    });
  });

  test('exact changes', () => {
    const json = {
      dependencies: { abc: '0.0.0', foo: '1.0.0' },
      devDependencies: { bar: '2.0.0' },
      optionalDependencies: { xyz: '3.0.0' },
    };

    const changes = {
      foo: '1.2.3',
      bar: '2.3.4',
      xyz: '3.5.6',
    };

    expect(update(json, changes, true)).toEqual({
      dependencies: { abc: '0.0.0', foo: '1.2.3' },
      devDependencies: { bar: '2.3.4' },
      optionalDependencies: { xyz: '3.5.6' },
    });
  });
});
