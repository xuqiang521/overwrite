// function def(obj, key, val, enumerable) {
//   Object.defineProperty(obj, key, {
//     value: val,
//     enumerable: !!enumerable,
//     writable: true,
//     configurable: true
//   });
// }
function $(id) {
  return document.getElementById(id);
}
function observer(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    depObserver(obj, key, obj[key]);
  })
}
function depObserver(obj, key, val) {
  // let dep = new Dep();
  observer(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val;
    },
    set: function(newVal) {
      if (val === newVal || (newVal !== newVal && val !== val)) {
        return;
      }
      val = newVal;
      $('test').innerHTML = val;
      // dep.notify();
      // console.log(newVal);
    }
  });
}
// function Dep() {
//   this.subs = [];
// }
// Dep.target = null;
// Dep.prototype.addSub = function addSub(sub) {
//   this.subs.push(sub);
// }
// Dep.prototype.notify = function notify() {
//   this.subs.forEach(sub => {
//     sub.update();
//   });
// }
// function Watcher(vm, exp, cb) {
//   this.vm = vm;
//   this.exp = exp;
//   this.cb = cb;
//   this.value = this.get();
// }
// Watcher.prototype.update = function update() {
//   this.run();
// }
// Watcher.prototype.run = function run() {
//   let newVal = this.get();
//   let oldVal = this.value;
//   if (newVal === oldVal) {
//     return;
//   }
//   this.value = newVal;
//   this.cb.call(this.vm, value, oldVal);
// }
// Watcher.prototype.get = function get() {
//   Dep.target = this;
//   let value = this.vm[exp];
//   Dep.target = null;
//   return value;
// }
