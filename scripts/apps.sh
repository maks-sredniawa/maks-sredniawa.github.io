#!/usr/bin/env bash
# Lists the public repos whose docs/ is an app site on the MaksForge pages theme.
set -euo pipefail
owner=maks-sredniawa
err=$(mktemp)
trap 'rm -f "$err"' EXIT

# Archived repos stay in: their apps may still be on Play, linking to the privacy policy.
gh api "users/$owner/repos?type=owner&per_page=100" --paginate \
  -q '.[] | select((.private or .fork) | not) | .name' |
while read -r repo; do
  if ! config=$(gh api "repos/$owner/$repo/contents/docs/_config.yml" -H 'Accept: application/vnd.github.raw' 2>"$err"); then
    grep -q 'HTTP 404' "$err" && continue
    echo "$repo: $(cat "$err")" >&2
    exit 1
  fi
  if grep -q "^remote_theme: *$owner/pages-theme" <<<"$config"; then
    echo "$repo"
  fi
done
