'use strict'

var params = {
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  flag: false
};
var getCss = function(b, a) {
  return b.currentStyle ? b.currentStyle[a] : document.defaultView.getComputedStyle(b, false)[a]
};
var drag = function(a) {
  if (getCss(a, "left") !== "auto") {
    params.left = getCss(a, "left")
  }
  if (getCss(a, "top") !== "auto") {
    params.top = getCss(a, "top")
  }
  a.onmousedown = function(c) {
    params.flag = true;
    if (!c) {
      c = window.event;
      a.onselectstart = function() {
        return false
      }
    }
    var d = c;
    params.currentX = d.clientX;
    params.currentY = d.clientY
  };
  document.onmouseup = function() {
    params.flag = false;
    if (getCss(a, "left") !== "auto") {
      params.left = getCss(a, "left")
    }
    if (getCss(a, "top") !== "auto") {
      params.top = getCss(a, "top")
    }
  };
  document.onmousemove = function(h) {
    var i = h ? h : window.event;
    if (params.flag) {
      var d = i.clientX,
        c = i.clientY;
      var g = d - params.currentX,
        f = c - params.currentY;
      a.style.left = parseInt(params.left) + g + "px";
      a.style.top = parseInt(params.top) + f + "px"
    }
  }
};

