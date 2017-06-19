var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
// 空操作
function noop() {};
/**
 * @class Promise
 * @param {[type]} resolver [function]
 */
function Promise(resolver) {
  this._state = PENDING;
  this._result = undefined;
  this._subscribers = [];
  // 初始化跑一遍resolver()
  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
};
Promise.prototype = {
  constructor: Promise,
  then: then,
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};
function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor')
}
function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}
/**
 * [initializePromise 初始化Promise并执行resolver回调]
 * @param  {[type]} promise  [Promise对象]
 * @param  {[type]} resolver [resolver回调]
 */
function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}
/**
 * [_resolve resolve处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _resolve (promise, value) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._result = value;
    promise._state = FULFILLED;
}
/**
 * [_resolve reject处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._result = reason;
  promise._state = REJECTED;
}
function ErrorObject () {
  this.error = null;
}
var TRY_CATCH_ERROR = new ErrorObject();
/**
 * [then 异步回调]
 * @param  {[function]} resolve [resolve回调]
 * @param  {[function]} reject  [reject回调]
 */
function then (resolve, reject) {
  var _arguments = arguments;
  var parent = this;
  var child = new this.constructor(noop);

  var _state = parent._state;
  var callback = _arguments[_state - 1];
  if (child._state !== PENDING) {
    // noop
  }else if (_state === FULFILLED) {
    _resolve(child, parent._result);
  }else if (_state === REJECTED) {
    _reject(child, parent._result);
  }
  if (typeof callback === 'function') {
    try {
      nextTick(callback, parent._result);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }
  return child;
}

function resolve (object) {
  var Constructor = this;
  // 如果传进来的参数是一个Promise对象，则直接返回该参数
  if (object && type of object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop)
  _resolve(promise, object);
  return promise;
}

function reject (reason) {
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise
}

/**
 * [nextTick 下一进程处理]
 * @param  {Function} callback [回调函数]
 * @param  {[type]}   value    [回调参数值]
 */
function nextTick (callback, value) {
  setTimeout(callback, 0, value);
}
