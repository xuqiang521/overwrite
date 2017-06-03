// write toArray()
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

// 定义观察者
var Observer = function () {
  this._events = Object.create(null);
}
/**
 * [$on 发布消息]
 * @param  {[type]}   event [事件别名]
 * @param  {Function} fn    [事件回调]
 */
Observer.prototype.$on = function (event, fn) {
  var this$1 = this;

  var self = this;
  if (Array.isArray(event)) {
    for (var i = 0, l = event.length; i < l; i++) {
      this$1.$on(event[i], fn);
    }
  }
  else {
    (self._events[event] || (self._events[event] = [])).push(fn);
  }
  return self;
}
/**
 * [$once 仅发布一次消息]
 * @param  {[type]}   event [事件别名]
 * @param  {Function} fn    [事件回调]
 */
Observer.prototype.$once = function (event, fn) {
  var self = this;
  function on() {
    self.$off(event, on);
    fn.apply(self, arguments);
  }
  // on.fn = fn;
  self.$on(event, on);
  return self;
}
/**
 * [$off 取消发布]
 * @param  {[type]}   event [事件别名]
 * @param  {Function} fn    [事件回调]
 */
Observer.prototype.$off = function (event, fn) {
  var this$1 = this;

  var self = this;
  // clear all
  if (!arguments.length) {
    this._events = Object.create(null);
    return self;
  }
  // clear array of events
  if (Array.isArray(event)) {
    for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
      this$1.$off(event[i$1], fn);
    }
    return self;
  }
  // special event
  var cbs = self._events[event];
  if (!cbs) {
    return self;
  }
  if (arguments.length === 1) {
    this._events[event] = null;
    return self;
  }
  // special handler
  var cb;
  var i = cbs.length;
  while (i--) {
    cb = cbs[i];
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1);
      break;
    }
  }
  return self;
}

/**
 * [$emit 订阅触发]
 * @param  {[type]} event [事件别名]
 */
Observer.prototype.$emit = function (event) {
  var self = this;
  var cbs = this._events[event];

  if (cbs) {
    cbs = cbs.length > 1 ? toArray(cbs) : cbs;
    var args = toArray(arguments, 1);
    for (var i = 0, l = cbs.length; i < l; i++) {
      cbs[i].apply(self, args);
    }
  }
  return self;
};
