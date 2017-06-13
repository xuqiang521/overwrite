import el from './element'
import diff from './diff'
import patch from './patch'
// console.log(diff);

let ul = el('ul', { id: 'list', class: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
])
let ul1 = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 4'])
])
let ulRoot = ul.render()
let patches = diff(ul, ul1);
document.body.appendChild(ulRoot);

patch(ulRoot, patches)
