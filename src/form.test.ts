import { expect, test, vi } from 'vitest'
import HexletCode from './HexletCode.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' }

test('formFor returns default form without options', () => {
  const result = HexletCode.formFor(template, {}, () => {})
  expect(result).toBe('<form action="#" method="post"></form>')
})

test('formFor uses provided URL in action attribute', () => {
  const result = HexletCode.formFor(template, { url: '/users' }, () => {})
  expect(result).toBe('<form action="/users" method="post"></form>')
})

test('formFor always uses POST method', () => {
  const result1 = HexletCode.formFor(template, {}, () => {})
  const result2 = HexletCode.formFor(template, { url: '/update' }, () => {})
  expect(result1).toContain('method="post"')
  expect(result2).toContain('method="post"')
})

test('generates text input by default', () => {
  const html = HexletCode.formFor(template, {}, f => f.input('name'))
  expect(html).toContain('<input type="text" name="name" value="rob">')
})

test('generates textarea when specified', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea' }))
  expect(html).toContain('<textarea cols="20" rows="40" name="job">hexlet</textarea>')
})

test('overrides default textarea attributes', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea', rows: 50, cols: 50 }))

  expect(html).toContain(
    '<textarea cols="50" rows="50" name="job">hexlet</textarea>',
  )
})

test('test textarea', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea' }))
  expect(html).toBe('<form action="#" method="post"><textarea cols="20" rows="40" name="job">hexlet</textarea></form>')
})

test('throws error for non-existent field', () => {
  expect(() => {
    HexletCode.formFor(template, {}, f => f.input('age')) // Поле 'age' отсутствует
  }).toThrowError('Field \'age\' does not exist in the template.')
})

test('throws error for non-existent field', () => {
  const html = HexletCode.formFor(template, {}, f => f.submit('Save'))

  expect(html).toContain('<input type="submit" value="Save">')
})
