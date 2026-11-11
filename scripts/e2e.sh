#!/usr/bin/env bash
# Usage: scripts/e2e.sh [playwright test options, e.g. --grep "home page"]
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(node -p "JSON.parse(require('fs').readFileSync('node_modules/@playwright/test/package.json')).version")
docker run --rm --ipc=host \
  --user "$(id -u):$(id -g)" -e HOME=/tmp -e CI \
  -v "$PWD:/repo" -w /repo/tests/e2e \
  "mcr.microsoft.com/playwright:v$version-noble" \
  node /repo/node_modules/@playwright/test/cli.js test "$@"
