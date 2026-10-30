# Fees & Close

An independent concept by Ayo Ahmed, built as a working artifact for Odin's Founding Growth Associate process. **Not affiliated with or endorsed by Odin.**

A single-page briefing for syndicate leads and new fund managers: every fee Odin publishes, quoted in the currency Odin published it, with sources - plus the questions to ask Odin where the numbers are not published (fee floors/caps, follow-on reductions).

Live: https://odin-deal-planner.ayoahmed-49d.workers.dev

## Ground rules baked into the code

- Only published figures are quoted, in their source currency. No currency conversion anywhere.
- No "cheapest route", winner, break-even or minimum-viable-deal claims: Odin caps and floors its deal fees but does not publish the amounts, so derived comparisons would be ungrounded.
- The "Your numbers" panel applies the published percentage tiers (4%, 3.5%) to the user's own raise as illustrative arithmetic, clearly labelled as not a quote.
- All maths runs in the browser. No data is collected, stored or sent; there is no backend endpoint beyond static assets.

## Sources (checked 30 Oct 2026)

- https://www.joinodin.com/products/spv - SPV one-off from $6,000; always-on from $12,000/yr; minimum investor ticket $1,000
- https://help.joinodin.com/hc/en-gb/articles/29312414835985-Glossary-of-Terms - Syndicate 4% deal fee; Syndicate Plus 3.5% + £3,000 setup; reduced minimums for follow-on deals; platform fee minimum/cap definitions
- https://help.joinodin.com/hc/en-gb/articles/27884030966289-My-Syndicate-Lead-has-asked-me-to-pay-Odin-s-fees-How-does-that-work-and-what-is-Odin-s-pricing - "Deal fees are capped at both ends, with a floor price and a ceiling price."
- https://help.joinodin.com/hc/en-gb/articles/25424077583377-Closing-a-Primary-deal - fee paid by lead, company or investors pro-rata; one payer only; fixed-percentage carry; optional cash fee

## Develop

Static site in `public/`, tiny Cloudflare Worker in `src/worker.js` (security headers + asset serving).

```
node tests/calc.test.js   # 14 unit tests
npx wrangler deploy       # needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
```

Nothing here is a quote, and nothing here is legal, tax or investment advice.

## Fonts

Font binaries are not committed. Run `./scripts/fetch-fonts.sh` (needs `curl` + `sha256sum`) to download the exact pinned woff2 files from fonts.gstatic.com (Google Fonts' official CDN) into `public/fonts/`; every file is verified against a recorded SHA-256 and the script fails on any mismatch.

- Inter Tight (variable) and Instrument Serif (regular + italic) are open-licensed substitutes for Odin's commercial brand fonts (Die Grotesk A, MD Thermochrome), which are not redistributable.
- Both are SIL Open Font License 1.1. License texts: `licenses/OFL-inter-tight.txt`, `licenses/OFL-instrument-serif.txt`; the notices must accompany any redistribution.
