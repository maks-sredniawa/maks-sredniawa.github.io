#!/usr/bin/env bash
# Builds maksforge.com into _site: the home page at the root and each app's docs/ at /<repo>/.
# Usage: scripts/build.sh <repo>...
set -euo pipefail
owner=maks-sredniawa
out=_site
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

rm -rf "$out"
mkdir -p "$out"
cp -r index.html 404.html assets _headers robots.txt "$out"/

mkdir -p "$out/.well-known"
cat > "$out/.well-known/security.txt" <<EOF
Contact: mailto:security@maksforge.com
Expires: $(date -u -d '+1 year' +%Y-%m-%dT00:00:00Z)
Preferred-Languages: en, pl
Canonical: https://maksforge.com/.well-known/security.txt
EOF

for repo in "$@"; do
  git clone -q --depth 1 --filter=blob:none --sparse "https://github.com/$owner/$repo.git" "$work/$repo"
  git -C "$work/$repo" sparse-checkout set docs
  PAGES_REPO_NWO="$owner/$repo" JEKYLL_ENV=production bundle exec jekyll build -q \
    --source "$work/$repo/docs" --destination "$out/$repo" --baseurl "/$repo"
done

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  (cd "$out" && find . -name '*.html' ! -name 404.html | sort) |
    sed -E 's#^\./##; s#(^|/)index\.html$#\1#; s#\.html$##' |
    python3 -c 'import html, sys, urllib.parse
for path in sys.stdin.read().splitlines():
    print(f"  <url><loc>https://maksforge.com/{html.escape(urllib.parse.quote(path))}</loc></url>")'
  echo '</urlset>'
} > "$out/sitemap.xml"
