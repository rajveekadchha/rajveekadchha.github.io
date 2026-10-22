#!/bin/sh
# Regenerates the link-preview images in public/og/ (1200×630 JPEGs) from the
# hidden /og-card page. Run after changing names, titles or page summaries:
#
#   npm run build && npx serve out -l 3000   # in another terminal
#   sh scripts/make-og.sh                     # then rebuild and push
#
# macOS only (uses Google Chrome headless + sips).
set -e
BASE="${1:-http://localhost:3000}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/og"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

shot() { # name, query
  "$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=4000 \
    --user-data-dir="$TMP/profile" --screenshot="$TMP/$1.png" "$BASE/og-card$2" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 84 "$TMP/$1.png" --out "$OUT/$1.jpg" >/dev/null
  echo "public/og/$1.jpg  $(du -k "$OUT/$1.jpg" | cut -f1) KB"
}

shot home ""
for slug in work projects about resume contact instagram; do
  shot "$slug" "?disc=$slug"
done
rm -rf "$TMP"
