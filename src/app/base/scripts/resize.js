/**
 * Created by ChunZuJun on 2015/9/30.
 *
 */
(function () {
  var MAX_WIDTH = 640;
  var resizing = null;

  window.onresize = function() {
    if (resizing) {
      clearTimeout(resizing);
    }
    resizing = setTimeout(adjustBase, 100);
  };

  function adjustBase() {
    var clientWidth = document.body.clientWidth, winHeight = window.innerHeight;
    if (clientWidth > MAX_WIDTH) {
      clientWidth = MAX_WIDTH;
    }

    document.body.style.minHeight = (winHeight + 280) + 'px';
    document.querySelector('html').style['font-size'] = (clientWidth / 1080) * 62.5 + '%';
    resizing = null;
  }

  adjustBase();
})();
