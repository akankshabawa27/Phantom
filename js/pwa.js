/* Touch swipe navigation */
(function () {
  var sx = 0, sy = 0;

  document.addEventListener('touchstart', function (e) {
    sx = e.changedTouches[0].clientX;
    sy = e.changedTouches[0].clientY;
  }, {passive: true});

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    var dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      var id  = dx < 0 ? 'pnav-next' : 'pnav-prev';
      var btn = document.getElementById(id);
      if (btn && !btn.disabled) btn.click();
    }
  }, {passive: true});
})();

/* Service worker — registered from slides/ so path is ../sw.js */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('../sw.js').catch(function () {});
  });
}
