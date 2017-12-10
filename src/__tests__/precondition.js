const precondition = require('../precondition');

const check = (wanted, latest) => () => precondition({ wanted, latest });

test('valid precondition', () => {
  expect(check(false, false)).not.toThrow();
  expect(check(true, false)).not.toThrow();
  expect(check(false, true)).not.toThrow();
});

test('valid precondition', () => {
  expect(check(true, true)).toThrow();
});
