import el from './element'
import diff from './diff'
import patch from './patch'


let ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item', key: 1 }, ['Item 1']),
  el('li', { class: 'item', key: 2 }, ['Item 2']),
  el('li', { class: 'item', key: 3 }, ['Item 3'])
])
let ul1 = el('ul', { id: 'list' }, [
  el('li', { class: 'item', key: 3 }, ['Item 3']),
  el('li', { class: 'item', key: 1 }, ['Item 1']),
  el('li', { class: 'item', key: 2 }, ['Item 2'])
])
let ulRoot = ul.render()
let patches = diff(ul, ul1);

console.log(patches)
document.body.appendChild(ulRoot);

patch(ulRoot, patches)
