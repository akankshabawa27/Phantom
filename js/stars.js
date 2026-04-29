(function () {
  var canvas = document.getElementById('stars');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  canvas.width = 1280;
  canvas.height = 720;

  var stars = Array.from({length: 60}, function () {
    return {
      x: Math.random() * 1280,
      y: Math.random() * 720,
      r: 0.4 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.6
    };
  });

  function draw(t) {
    ctx.clearRect(0, 0, 1280, 720);
    stars.forEach(function (s) {
      var a = (Math.sin(s.phase + t * 0.001 * s.speed) + 1) / 2 * 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
