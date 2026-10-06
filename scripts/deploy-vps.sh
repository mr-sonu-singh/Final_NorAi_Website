#!/usr/bin/env bash
# NorAI production deploy. Invoked by GitHub Actions over SSH.
# Deliberately lives OUTSIDE the app checkout so a `git reset --hard`
# inside the app can never remove the script that drives the deploy.
set -euo pipefail

APP_DIR=/var/www/official-website/Final_NorAi_Website
BRANCH=main
PM2_APP=official-website
HEALTH_URL="http://127.0.0.1:3000"
HEALTH_ATTEMPTS=30
HEALTH_INTERVAL=2
LOCK=/var/lock/norai-deploy.lock

log() { printf '[deploy %s] %s\n' "$(date -u +%H:%M:%S)" "$*"; }

# Only one deploy at a time; a queued Actions run that overlaps a slow
# build exits quietly instead of racing on the same working tree.
exec 9>"$LOCK"
flock -n 9 || { log "another deploy already in progress; skipping"; exit 0; }

cd "$APP_DIR"
PREV_COMMIT="$(git rev-parse HEAD 2>/dev/null || echo none)"
log "HEAD is $PREV_COMMIT"

rollback() {
  log "DEPLOY FAILED -- rolling back to $PREV_COMMIT"
  git reset --hard --quiet "$PREV_COMMIT" || true
  npm ci --no-audit --no-fund || true
  npm run build || true
  pm2 restart "$PM2_APP" --update-env || true
  log "rollback finished; previous version is serving"
}

git fetch --quiet origin "$BRANCH"
TARGET="$(git rev-parse "origin/$BRANCH")"

if [ "$TARGET" = "$PREV_COMMIT" ] && curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then
  log "already at $TARGET and serving healthy traffic; nothing to do"
  exit 0
fi

log "deploying $TARGET"
# .env is gitignored, so reset --hard leaves it in place. We never run
# `git clean`, which is the command that would actually endanger it.
git reset --hard --quiet "$TARGET"

log "installing dependencies"
npm ci --no-audit --no-fund || { rollback; exit 1; }

log "building"
npm run build || { rollback; exit 1; }

log "restarting pm2"
pm2 restart "$PM2_APP" --update-env || { rollback; exit 1; }

for i in $(seq 1 "$HEALTH_ATTEMPTS"); do
  if curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then
    log "healthy after ${i} probe(s) -- $TARGET is live"
    exit 0
  fi
  sleep "$HEALTH_INTERVAL"
done

rollback
exit 1
