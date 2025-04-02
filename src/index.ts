import Tag from './Tag.js'
import HexletCode from './HexletCode.js'

console.log(new Tag('br').toString())
// <br>

console.log(new Tag('img', { src: 'path/to/image' }).toString())
// <img src="path/to/image">

console.log(new Tag('input', { type: 'submit', value: 'Save' }).toString())
// <input type="submit" value="Save">

// Для парных тегов надо придумать как лучше
console.log(new Tag('label', {}, 'Email').toString())
// <label>Email</label>

console.log(new Tag('label', { for: 'email' }, 'Email').toString())
// <label for="email">Email</label>

console.log(new Tag('div').toString())
// <div></div>

const template = { name: 'rob', job: 'hexlet', gender: 'm' }
let form = HexletCode.formFor(template, {}, () => {})
// <form action="#" method="post"></form>

console.log(form)

form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name')
  f.input('job')
  f.submit('Wow')
})

console.log(form)

form = HexletCode.formFor(template, { url: '/users' }, () => {})
// <form action="/users" method="post"></form>

console.log(form)

form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name')
  f.input('job', { as: 'textarea' })
})

console.log(form)

form = HexletCode.formFor(template, {}, (f) => {
  f.input('name', { class: 'user-input' })
  f.input('job')
})
console.log(form)

form = HexletCode.formFor(template, {}, f =>
  f.input('job', { as: 'textarea' }))

// <form action="#" method="post">
//   <textarea name="job" cols="20" rows="40">hexlet</textarea>
// </form>
console.log(form)

form = HexletCode.formFor(template, { url: '#' }, f =>
  f.input('job', { as: 'textarea', rows: 50, cols: 50 }))

console.log(form)

form = HexletCode.formFor(template, { url: '/users' }, (f) => {
  f.input('name')
  f.input('job', { as: 'textarea' })
  f.input('age')
})

console.log(form)
