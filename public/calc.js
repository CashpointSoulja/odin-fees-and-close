/* Fees & Close - calc helpers.
   Only operations allowed here:
   - multiply a user-supplied raise by a PUBLISHED percentage rate (4% or 3.5%)
   - format money in the user's chosen currency
   Deliberately absent: currency conversion, cross-tier comparison, winner
   selection, break-even or minimum-viable-deal logic. Odin's fee floors and
   caps are unpublished, so derived comparisons would be ungrounded. */
(function (root) {
  'use strict';
  var SYNDICATE_RATE = 0.04;      // Odin Glossary: "Syndicate pricing incurs deal fees of 4%"
  var SYNDICATE_PLUS_RATE = 0.035; // Odin Glossary: "Syndicate Plus pricing incurs deal fees of 3.5%"
  var PLUS_SETUP_GBP = 3000;       // Odin Glossary: "a one-off £3,000 setup fee" (published in GBP only)

  function pctOf(raise, rate) {
    if (!isFinite(raise) || raise <= 0) return null;
    return raise * rate;
  }

  // The Plus setup fee is published in GBP. We never convert currencies, so
  // it can only be added to a GBP raise; otherwise the caller shows it separately.
  function plusSetupForCurrency(currency) {
    return currency === 'GBP' ? PLUS_SETUP_GBP : null;
  }

  function formatMoney(amount, currency) {
    if (amount === null || amount === undefined || !isFinite(amount)) return '-';
    try {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency, maximumFractionDigits: 0, currencyDisplay: 'narrowSymbol' }).format(amount);
    } catch (e) {
      return amount.toFixed(0) + ' ' + currency;
    }
  }

  var api = {
    SYNDICATE_RATE: SYNDICATE_RATE,
    SYNDICATE_PLUS_RATE: SYNDICATE_PLUS_RATE,
    PLUS_SETUP_GBP: PLUS_SETUP_GBP,
    pctOf: pctOf,
    plusSetupForCurrency: plusSetupForCurrency,
    formatMoney: formatMoney
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.FeesClose = api;
})(typeof window !== 'undefined' ? window : globalThis);
