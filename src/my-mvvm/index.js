import {Observer, observe} from './observer/observer.js'

console.log(observe, 'index')

let test = [1, 2]
new Observer(test);

console.log(test)