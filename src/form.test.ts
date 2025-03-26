import { expect, test, vi } from 'vitest'
import Form from '../src/Form.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
  
test('formFor returns default form without options', () => {
  const result = new Form().formFor(template, {}, () => {});
  expect(result).toBe('<form action="#" method="post"></form>');
});

test('formFor uses provided URL in action attribute', () => {
  const result = new Form().formFor(template, { url: '/users' }, () => {});
  expect(result).toBe('<form action="/users" method="post"></form>');
});

test('formFor ignores callback argument', () => {
  const mockCallback = vi.fn(); // Создаем mock-функцию
  const result = new Form().formFor(template, {}, mockCallback);
  expect(result).toBeDefined();
  expect(mockCallback).not.toHaveBeenCalled(); // Callback не должен вызываться
});

test('formFor always uses POST method', () => {
  const result1 = new Form().formFor(template, {}, () => {});
  const result2 = new Form().formFor(template, { url: '/update' }, () => {});
  expect(result1).toContain('method="post"');
  expect(result2).toContain('method="post"');
});