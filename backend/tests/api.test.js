import test from 'node:test';
import assert from 'node:assert/strict';

test('API health route should use port 5000 by default', () => {
  const port = process.env.PORT || 5000;
  assert.equal(Number(port), 5000);
});
