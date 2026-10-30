/* Fees & Close - page wiring. Reads the user's inputs, applies the published
   percentage tiers, renders. No network calls, no storage, no sharing. */
(function () {
  'use strict';
  var C = window.FeesClose;
  var raiseEl = document.getElementById('raise');
  var ccyEl = document.getElementById('currency');
  var lpsEl = document.getElementById('lps');
  var outSyndicate = document.getElementById('out-syndicate');
  var outPlus = document.getElementById('out-plus');
  var outSetup = document.getElementById('out-setup');
  var outPerLp = document.getElementById('out-perlp');
  var outNote = document.getElementById('out-note');

  function render() {
    var raise = parseFloat(raiseEl.value);
    var ccy = ccyEl.value;
    var lps = parseInt(lpsEl.value, 10);

    var synd = C.pctOf(raise, C.SYNDICATE_RATE);
    var plus = C.pctOf(raise, C.SYNDICATE_PLUS_RATE);

    outSyndicate.textContent = synd === null ? '-' : C.formatMoney(synd, ccy) + '  (4% of ' + C.formatMoney(raise, ccy) + ')';
    outPlus.textContent = plus === null ? '-' : C.formatMoney(plus, ccy) + '  (3.5% of ' + C.formatMoney(raise, ccy) + ')';

    var setup = C.plusSetupForCurrency(ccy);
    if (setup !== null && plus !== null) {
      outSetup.textContent = C.formatMoney(setup, 'GBP') + ' one-off (published in GBP), so Plus lands around ' + C.formatMoney(plus + setup, ccy) + ' before floors/caps';
    } else {
      outSetup.textContent = '£3,000 one-off, published in GBP - shown unconverted because this page does not convert currencies';
    }

    if (synd !== null && isFinite(lps) && lps > 0) {
      outPerLp.textContent = C.formatMoney(synd / lps, ccy) + ' per LP at the 4% tier, if investors paid pro-rata';
    } else {
      outPerLp.textContent = '-';
    }

    outNote.textContent = 'Illustrative arithmetic on published starting rates, not a quote. Odin says its deal fees have a floor and a cap; the amounts were not found in public sources checked 30 Oct 2026, so the actual fee can be higher or lower - ask Odin.';
  }

  [raiseEl, ccyEl, lpsEl].forEach(function (el) {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });
  render();
})();
