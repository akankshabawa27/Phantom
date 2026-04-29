(function () {
  function scale() {
    var s = document.querySelector('.slide');
    if (!s) return;
    var sc = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    s.style.transform = 'scale(' + sc + ')';
    s.style.transformOrigin = 'center center';
  }

  window.addEventListener('resize', scale);
  window.addEventListener('orientationchange', function () { setTimeout(scale, 200); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scale);
  } else {
    scale();
  }
})();
