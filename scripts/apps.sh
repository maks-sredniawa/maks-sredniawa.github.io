#!/usr/bin/env bash
# Lists the public repos whose docs/ is an app site on the MaksForge pages theme.
set -euo pipefail
owner=maks-sredniawa

gh api "users/$owner/repos?type=owner&per_page=100" --paginate \
  -q '.[] | select((.private or .archived or .fork) | not) | .name' |
while read -r repo; do
  config=$(gh api "repos/$owner/$repo/contents/docs/_config.yml" -H 'Accept: application/vnd.github.raw' 2>/dev/null) || continue
  grep -q "^remote_theme: *$owner/pages-theme" <<<"$config" && echo "$repo"
done
