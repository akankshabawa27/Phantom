/* Slide 03 — builds the scoring matrix table */
(function () {
  var data = [
    {param: 'Adoption Speed',        scores: [5, 3, 4, 4]},
    {param: 'Usage Frequency',       scores: [5, 4, 3, 2]},
    {param: 'Ease of Distribution',  scores: [5, 3, 3, 4]},
    {param: 'Virality Potential',    scores: [5, 3, 4, 4]},
    {param: 'Willingness to Pay',    scores: [3, 4, 4, 5]},
    {param: 'Emotional Intensity',   scores: [4, 4, 5, 5]}
  ];

  var colClasses = ['col-zoe', 'col-max', 'col-kai', 'col-tom'];
  var totals     = [27, 21, 23, 24];
  var tbody      = document.getElementById('matrixBody');

  data.forEach(function (row, ri) {
    var tr = document.createElement('tr');
    tr.style.opacity   = '0';
    tr.style.animation = 'fadeUp 0.5s ease-out ' + (0.8 + ri * 0.1) + 's forwards';

    var tdParam = document.createElement('td');
    tdParam.textContent = row.param;
    tr.appendChild(tdParam);

    row.scores.forEach(function (score, ci) {
      var td   = document.createElement('td');
      td.className = colClasses[ci];
      var dots = document.createElement('div');
      dots.className = 'score-dots';
      for (var d = 1; d <= 5; d++) {
        var dot = document.createElement('div');
        dot.className = 'score-dot' + (d <= score ? ' filled' : '');
        dots.appendChild(dot);
      }
      td.appendChild(dots);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  /* Total row */
  var totalTr = document.createElement('tr');
  totalTr.className    = 'total-row';
  totalTr.style.opacity   = '0';
  totalTr.style.animation = 'fadeUp 0.5s ease-out 1.5s forwards';

  var totalLabel = document.createElement('td');
  totalLabel.textContent = 'Total';
  totalTr.appendChild(totalLabel);

  totals.forEach(function (total, ci) {
    var td = document.createElement('td');
    td.className = colClasses[ci];
    td.innerHTML = '<span class="total-score">' + total + '<span class="out-of"> / 30</span></span>';
    totalTr.appendChild(td);
  });

  tbody.appendChild(totalTr);
})();
