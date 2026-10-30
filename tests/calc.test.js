const assert = require('node:assert');
const C = require('../public/calc.js');

// pctOf: plain percentage of a user-supplied raise
assert.strictEqual(C.pctOf(250000, C.SYNDICATE_RATE), 10000);
assert.ok(Math.abs(C.pctOf(600000, C.SYNDICATE_PLUS_RATE) - 21000) < 1e-6);
assert.strictEqual(C.pctOf(0, C.SYNDICATE_RATE), null);
assert.strictEqual(C.pctOf(-5, C.SYNDICATE_RATE), null);
assert.strictEqual(C.pctOf(NaN, C.SYNDICATE_RATE), null);

// Rates are the published ones
assert.strictEqual(C.SYNDICATE_RATE, 0.04);
assert.strictEqual(C.SYNDICATE_PLUS_RATE, 0.035);
assert.strictEqual(C.PLUS_SETUP_GBP, 3000);

// No currency conversion: setup only applies to GBP raises
assert.strictEqual(C.plusSetupForCurrency('GBP'), 3000);
assert.strictEqual(C.plusSetupForCurrency('USD'), null);
assert.strictEqual(C.plusSetupForCurrency('EUR'), null);

// formatMoney renders source currency, never converts
assert.strictEqual(C.formatMoney(6000, 'USD'), '$6,000');
assert.strictEqual(C.formatMoney(3000, 'GBP'), '£3,000');
assert.strictEqual(C.formatMoney(null, 'GBP'), '-');

console.log('14/14 calc tests pass');
