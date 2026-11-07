#!/usr/bin/env bash
# Prints a hash of everything the built site depends on, so a scheduled run can skip an unchanged site.
# Usage: scripts/fingerprint.sh <repo>...
set -euo pipefail
owner=maks-sredniawa

{
  git rev-parse HEAD
  gh api "repos/$owner/pages-theme/commits/HEAD" -q .sha
  for repo in "$@"; do
    echo "$repo $(gh api "repos/$owner/$repo/commits?path=docs&per_page=1" -q '.[0].sha')"
  done
} | sha256sum | cut -c1-16
