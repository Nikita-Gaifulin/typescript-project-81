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
let form = new HexletCode().formFor(template, {}, () => {})
// <form action="#" method="post"></form>

console.log(form);

form = new HexletCode().formFor(template, {url: '/users'}, () => {});
// <form action="/users" method="post"></form>


console.log(form)
