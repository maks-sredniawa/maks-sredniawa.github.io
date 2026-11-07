#!/usr/bin/env bash
# Runs the screenshot tests inside the Playwright image, so the pixels match on every machine.
# Usage: scripts/visual.sh [playwright test options, e.g. --update-snapshots]
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(node -p "JSON.parse(require('fs').readFileSync('node_modules/@playwright/test/package.json')).version")
docker run --rm --ipc=host \
  --user "$(id -u):$(id -g)" -e HOME=/tmp -e CI \
  -v "$PWD:/repo" -w /repo/tests/visual \
  "mcr.microsoft.com/playwright:v$version-noble" \
  node /repo/node_modules/@playwright/test/cli.js test "$@"
