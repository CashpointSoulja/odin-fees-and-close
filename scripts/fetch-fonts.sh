#!/usr/bin/env bash
# fetch-fonts.sh - download the self-hosted webfonts this site needs.
#
# Font binaries are intentionally NOT committed to this repo. This script
# fetches the exact pinned files from fonts.gstatic.com (Google Fonts' CDN,
# the official distribution point for these families) and verifies each
# against a recorded SHA-256. Requires: curl, sha256sum.
#
# Both families are licensed under the SIL Open Font License 1.1:
#   - Inter Tight       (c) The Inter Project Authors      licenses/OFL-inter-tight.txt
#   - Instrument Serif  (c) The Instrument Serif Authors   licenses/OFL-instrument-serif.txt
# The license notices must accompany any redistribution of the font files.
set -euo pipefail
cd "$(dirname "$0")/../public/fonts"

fetch() { # url dest sha256
  echo "Fetching $2"
  curl -fsSL "$1" -o "$2"
  echo "$3  $2" | sha256sum -c -
}

fetch "https://fonts.gstatic.com/s/intertight/v9/NGSwv5HMAFg6IuGlBNMjxLsH8ahuQ2e8.woff2" \
      "inter-tight-var.woff2" \
      "83d548cd73ef2e039167db3adb5ea9d7a7870466ffc8a162c9820bc348938aaf"

fetch "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2" \
      "instrument-serif.woff2" \
      "60c06664b5a95c7de6cc3e00d1f9034d78bd1e40b564016b241674449a067d4d"

fetch "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2" \
      "instrument-serif-italic.woff2" \
      "6ee678c33f388dd7ba59700ebea635deb98821baafd817b09891f7927177f702"

echo "All fonts fetched and verified."
