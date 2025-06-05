import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeDishName } from '../src/utils/sanitize'

describe('sanitizeDishName', () => {
  it('strips HTML tags from dish name', () => {
    const input = '<img src=x onerror=alert(1)>Chicken Rice';
    const sanitized = sanitizeDishName(input);
    assert.equal(sanitized, 'Chicken Rice');
  })
})
