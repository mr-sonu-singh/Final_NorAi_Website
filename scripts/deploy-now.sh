#!/usr/bin/env bash
# Ship the current main to norai.tech from a local machine.
#
# This is the no-CI path. It runs the exact same server-side script that
# .github/workflows/deploy.yml runs, so behaviour is identical; it just
# does not depend on GitHub Actions being enabled or having quota.
#
#   bash scripts/deploy-now.sh          # run in the foreground
#   bash scripts/deploy-now.sh --wait   # same, but stream via the log
#
# Override the target with VPS_HOST / VPS_USER / VPS_SSH_PORT if it moves.
set -euo pipefail

VPS_HOST="${VPS_HOST:-200.141.11.215}"
VPS_USER="${VPS_USER:-root}"
VPS_SSH_PORT="${VPS_SSH_PORT:-22}"
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/norai_actions_deploy}"
REMOTE_SCRIPT="/var/www/official-website/deploy.sh"

if [ ! -f "$DEPLOY_KEY" ]; then
  echo "error: deploy key not found at $DEPLOY_KEY" >&2
  echo "       set DEPLOY_KEY=/path/to/key, or see scripts/deploy-vps.sh" >&2
  exit 1
fi

ssh -i "$DEPLOY_KEY" \
    -o IdentitiesOnly=yes \
    -o StrictHostKeyChecking=accept-new \
    -p "$VPS_SSH_PORT" \
    "$VPS_USER@$VPS_HOST" \
    "bash $REMOTE_SCRIPT"
