(function () {
  function scale() {
    var s = document.querySelector('.slide');
    if (!s) return;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var sc, tr;

    if (vw < vh && vw < 768) {
      // Portrait mobile: rotate slide into landscape orientation
      // Fit the 1280×720 slide (visually 720×1280 after -90° rotation) into vw×vh
      sc = Math.min(vw / 720, vh / 1280);
      tr = 'rotate(-90deg) scale(' + sc + ')';
    } else {
      sc = Math.min(vw / 1280, vh / 720);
      tr = 'scale(' + sc + ')';
    }

    s.style.transform = tr;
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
