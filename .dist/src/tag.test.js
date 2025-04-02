import { expect, test } from 'vitest';
import Tag from '../src/Tag.js';
test('<br> tag layout', () => {
    expect(new Tag('br').toString()).toBe('<br>');
});
test('<img> tag layout', () => {
    expect(new Tag('img', { alt: 'someImg', class: 'someImg', atr: 'test' }).toString()).toBe('<img alt="someImg" class="someImg" atr="test">');
});
test('<div> tag layout', () => {
    expect(new Tag('div', {}, 'test').toString()).toBe('<div>test</div>');
});
