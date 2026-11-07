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
cp -r index.html 404.html assets "$out"/

for repo in "$@"; do
  git clone -q --depth 1 --filter=blob:none --sparse "https://github.com/$owner/$repo.git" "$work/$repo"
  git -C "$work/$repo" sparse-checkout set docs
  PAGES_REPO_NWO="$owner/$repo" JEKYLL_ENV=production bundle exec jekyll build -q \
    --source "$work/$repo/docs" --destination "$out/$repo" --baseurl "/$repo"
done
