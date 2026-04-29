/* Slide 01 — card lifecycle: stars (90) + particles + 7-phase state machine */
(function () {
var sc   = document.getElementById('stars');
var sctx = sc.getContext('2d');
sc.width = 1280; sc.height = 720;

var starField = Array.from({length: 90}, function () {
  return {
    x: Math.random() * 1280, y: Math.random() * 720,
    r: 0.5 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.8
  };
});

function drawStars(t) {
  sctx.clearRect(0, 0, 1280, 720);
  starField.forEach(function (s) {
    var a = (Math.sin(s.phase + t * 0.001 * s.speed) + 1) / 2 * 0.7;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fillStyle = 'rgba(255,255,255,' + a + ')';
    sctx.fill();
  });
}

/* Particle burst */
var pc       = document.getElementById('particleCanvas');
var pctx     = pc.getContext('2d');
var particles = [];
var COLORS   = ['#8b5cf6','#d946ef','#c4b5fd','#f9a8d4','#22d3ee','#fbbf24','#a78bfa','#f472b6'];

function spawnParticles() {
  particles.length = 0;
  for (var i = 0; i < 80; i++) {
    var angle = Math.random() * Math.PI * 2;
    var spd   = 1.5 + Math.random() * 4;
    particles.push({
      x: 170 + (Math.random() - 0.5) * 280,
      y: 120 + (Math.random() - 0.5) * 160,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      r: 1.5 + Math.random() * 3.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      decay: 0.008 + Math.random() * 0.012,
      delay: Math.random() * 30
    });
  }
}

function drawParticles() {
  pctx.clearRect(0, 0, 500, 350);
  particles.forEach(function (p) {
    if (p.delay > 0) { p.delay--; return; }
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.98; p.vy *= 0.98;
    p.life -= p.decay;
    if (p.life <= 0) return;
    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
    pctx.fillStyle = p.color;
    pctx.globalAlpha = p.life * 0.85;
    pctx.fill();
    pctx.globalAlpha = 1;
    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r * p.life * 2.5, 0, Math.PI * 2);
    pctx.fillStyle = p.color;
    pctx.globalAlpha = p.life * 0.15;
    pctx.fill();
    pctx.globalAlpha = 1;
  });
}

/* DOM refs */
var card    = document.getElementById('cardContainer');
var status  = document.getElementById('statusLabel');
var beam    = document.getElementById('beam');
var check   = document.getElementById('checkmark');
var amount  = document.getElementById('amountText');
var ghost   = document.getElementById('ghostText');
var cardNum = document.getElementById('cardNumber');

var NUMBERS = [
  '4832 •••• •••• 7291',
  '5104 •••• •••• 3658',
  '4917 •••• •••• 0442',
  '5382 •••• •••• 1876'
];
var numIdx = 0;

var PHASES = [
  {name: 'summon',     duration: 1500},
  {name: 'solid',      duration: 800 },
  {name: 'processing', duration: 1800},
  {name: 'approved',   duration: 1800},
  {name: 'dissolve',   duration: 2200},
  {name: 'gone',       duration: 1500},
  {name: 'pause',      duration: 600 }
];

var phaseIdx = 0, phaseStart = 0;

function enterPhase(idx, now) {
  phaseIdx = idx; phaseStart = now;
  var p = PHASES[idx].name;

  if (p === 'summon') {
    numIdx = (numIdx + 1) % NUMBERS.length;
    cardNum.textContent = NUMBERS[numIdx];
    ghost.style.opacity = '0';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) rotateY(-10deg)';
    card.style.filter = 'blur(6px)';
    status.textContent = '✦ Summoning Card...';
    status.style.color = '#8b5cf6';
    status.style.opacity = '1';
    amount.style.opacity = '0';
    check.classList.remove('show');
    requestAnimationFrame(function () {
      card.style.transition = 'transform 1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease, filter 0.8s ease';
      card.style.opacity = '1';
      card.style.transform = 'scale(1) rotateY(0deg)';
      card.style.filter = 'blur(0px)';
    });
  }
  if (p === 'solid') {
    status.textContent = '✦ Card Ready';
    status.style.color = '#c4b5fd';
  }
  if (p === 'processing') {
    status.textContent = '⟡ Processing €49.99...';
    status.style.color = '#fbbf24';
    amount.style.opacity = '0.8';
    beam.style.transition = 'none';
    beam.style.left = '-100%';
    beam.style.opacity = '1';
    requestAnimationFrame(function () {
      beam.style.transition = 'left 1.4s ease-in-out';
      beam.style.left = '100%';
    });
  }
  if (p === 'approved') {
    status.textContent = '✓ Payment Approved';
    status.style.color = '#34d399';
    beam.style.opacity = '0';
    check.classList.add('show');
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'scale(1.03)';
    setTimeout(function () { card.style.transform = 'scale(1)'; }, 300);
  }
  if (p === 'dissolve') {
    status.textContent = '⇝ Card Disappearing...';
    status.style.color = '#d946ef';
    check.classList.remove('show');
    amount.style.opacity = '0';
    card.style.transition = 'transform 1.8s ease-in, opacity 1.6s ease-in, filter 1.8s ease-in';
    card.style.opacity = '0';
    card.style.transform = 'scale(1.1)';
    card.style.filter = 'blur(10px)';
    spawnParticles();
  }
  if (p === 'gone') {
    status.textContent = '';
    status.style.opacity = '0';
    ghost.style.opacity = '0.7';
  }
  if (p === 'pause') {
    ghost.style.opacity = '0';
  }
}

function tick(now) {
  drawStars(now);
  drawParticles();
  if (now - phaseStart >= PHASES[phaseIdx].duration) {
    enterPhase((phaseIdx + 1) % PHASES.length, now);
  }
  requestAnimationFrame(tick);
}

requestAnimationFrame(function (now) {
  phaseStart = now;
  enterPhase(0, now);
  requestAnimationFrame(tick);
});
})();
