import precondition from '../precondition';

const check = (wanted: boolean, latest: boolean) => (): void =>
  precondition({ wanted, latest });

describe('precondition', () => {
  test('valid precondition', () => {
    expect(check(false, false)).not.toThrow();
    expect(check(true, false)).not.toThrow();
    expect(check(false, true)).not.toThrow();
  });

  test('invalid precondition', () => {
    expect(check(true, true)).toThrow();
  });
});
