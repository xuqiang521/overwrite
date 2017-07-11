function createXHR() {
  if (typeof XMLHttpRequest !== "undefined") {
    return new XMLHttpRequest();
  }
  else if (typeof ActiveXObject !== "undefined") {
    if (typeof arguments.callee.activeXString !== 'String') {
      var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
      var i, len;
      for (i = 0, len = version.length; i < len; i++) {
        try {
          new ActiveXObject(version[i]);
          arguments.callee.activeXString = version[i];
          break;
        } catch(e) {
          // statements
          console.log(e);
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  }
  else {
    throw new Error('No XHR Object available.')
  }
}
