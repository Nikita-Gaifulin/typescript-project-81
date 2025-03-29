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

test('formFor always uses POST method', () => {
  const result1 = new Form().formFor(template, {}, () => {});
  const result2 = new Form().formFor(template, { url: '/update' }, () => {});
  expect(result1).toContain('method="post"');
  expect(result2).toContain('method="post"');
});

test('generates text input by default', () => {
  const html = new Form().formFor(template, {}, (f) => f.input('name'));
  expect(html).toContain('<input type="text" name="name" value="rob">');
});

test('generates textarea when specified', () => {
  const html = new Form().formFor(template, {}, (f) => 
    f.input('job', { as: 'textarea' }));
  expect(html).toContain('<textarea cols="20" rows="40" name="job">hexlet</textarea>');
});

test('overrides default textarea attributes', () => {
  const html = new Form().formFor(template, {}, (f) => 
    f.input('job', { as: 'textarea', rows: 50, cols: 50 }))
  
  expect(html).toContain(
    '<textarea cols="50" rows="50" name="job">hexlet</textarea>'
  )
})

test('test textarea', () => {
  const html = new Form().formFor(template, {}, (f) =>
    f.input('job', { as: 'textarea' }))
  expect(html).toBe('<form action="#" method="post">\n<textarea cols="20" rows="40" name="job">hexlet</textarea>\n</form>');
})

test('throws error for non-existent field', () => {
  expect(() => {
    new Form().formFor(template, {}, (f) => f.input('age')); // Поле 'age' отсутствует
  }).toThrowError("Field 'age' does not exist in the template.");
});

test('throws error for non-existent field', () => {
  const html = new Form().formFor(template, {}, (f) => f.submit('Save'))

  expect(html).toContain('<input type="submit" value="Save">')
});