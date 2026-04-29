(function () {
  var prev  = document.body.dataset.prev  || '';
  var next  = document.body.dataset.next  || '';
  var label = document.body.dataset.label || '';

  var nav = document.createElement('div');
  nav.id = 'phantom-nav';
  nav.innerHTML =
    '<button class="pnav-btn" id="pnav-prev">&#8592;</button>' +
    '<span class="pnav-label">' + label + '</span>' +
    '<button class="pnav-btn" id="pnav-next">&#8594;</button>';
  document.body.appendChild(nav);

  var btnPrev = document.getElementById('pnav-prev');
  var btnNext = document.getElementById('pnav-next');

  if (!prev) btnPrev.disabled = true;
  if (!next) btnNext.disabled = true;

  btnPrev.addEventListener('click', function () { if (prev) location.href = prev; });
  btnNext.addEventListener('click', function () { if (next) location.href = next; });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft'  && prev) location.href = prev;
    if (e.key === 'ArrowRight' && next) location.href = next;
  });
})();
