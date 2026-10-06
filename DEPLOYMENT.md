# NorAI Deployment Architecture & Operations Guide (`DEPLOYMENT.md`)

This guide documents the production deployment architecture, security model, automation pipeline, and operational playbook for **norai.tech**.

---

## 1. The Mental Model

Three distinct components, each with a single, dedicated responsibility:

```
① YOUR LAPTOP              ② GITHUB                 ③ VPS
   you write code    ──push──▶  origin (private)  ──SSH──▶  build + pm2 restart
                              your repo              pull       │
                                                                ▼
                              final (public)  ◀──push──      norai.tech live
                            partner's mirror
                              (reference only)
```

> [!IMPORTANT]
> **The mirror is not in the deploy path.**
> You push to two places, but only one triggers production changes. That separation ensures a broken or stale mirror can never take the live site down.

---

## 2. What Was Broken & Why

Before this setup was established, four separate issues existed:

| Problem | Reality | Impact |
| :--- | :--- | :--- |
| **No automation** | No deploy workflow, cron, systemd timer, or webhook | Manual, error-prone deploys |
| **Site frozen 2 weeks** | Live build stayed at the Sep 22 commit despite subsequent commits | Production was stale |
| **Repos unrelated** | No shared git ancestry between private and partner repos | Every push required `--force` |
| **Broken footer links** | Footer pointed to `/privacy` & `/terms` instead of `/privacy-policy` & `/terms-of-service` | 404s despite green builds |

> [!NOTE]
> A repo can deploy successfully 50 times while every footer link 404s. A green deploy says the build succeeded, not that the application is correct.

---

## 3. Layer 1 — The Git History Fix

### The Problem
Two repositories with no common merge base. The partner repo was initialized fresh (`Initial commit`), so git saw no shared ancestry:

```
Before:  origin/main ●────●────●───●  (110 commits)
                   ╳  no common ancestor
         final/main  ●──●──●──●──●    (5 commits)

After:   origin/main ●────●────●───●───●  (115 commits)
         final/main                └──●  ← same commit, single unified history
```

### The Solution
Force-aligned once using `--force-with-lease`:
```bash
git push --force-with-lease final main:main
```

- **Why `--force-with-lease` instead of bare `--force`**: `--force` indiscriminately overwrites the remote. `--force-with-lease` aborts if the remote ref changed since your last fetch, preventing you from clobbering unpulled work.
- **Aftermath**: Every subsequent push is a clean fast-forward.
- **Safety**: Partner's previous work is archived at `legacy/pre-sync-2026-10` on their repo. Never force-push without archiving first.

---

## 4. Layer 2 — Two SSH Keys, Two Opposite Directions

There are two separate trust relationships running in opposite directions. Each requires its own dedicated key pair:

```
   ① GitHub Actions ─────────▶ VPS        "let Actions log in and trigger deploy"
      Key: norai_actions_deploy          (Private key stored in GitHub secret: VPS_SSH_KEY)

   ② VPS            ─────────▶ GitHub     "let the server pull your private repo"
      Key: norai_git_deploy              (Public key registered as repo Deploy Key)
```

### Why not reuse one key?
**Blast radius.**
- If the GitHub Actions secret leaks: Attacker gains server shell access.
- If the VPS key leaks: Attacker only gains read access to the repository.
- Separating them ensures compromising one doesn't automatically compromise both.

### Least Privilege
The VPS ↔ GitHub key is registered as a **Deploy Key** with **"Allow write access" unchecked**. Even in the event of VPS compromise, the key cannot push or alter git history.

### VPS SSH Configuration (`/root/.ssh/config`)
```sshconfig
Host github.com
    IdentityFile /root/.ssh/norai_git_deploy
    IdentitiesOnly yes
```
`IdentitiesOnly yes` ensures SSH uses only the dedicated deploy key rather than attempting every key present in `/root/.ssh`.

---

## 5. Layer 3 — The Server Deploy Script

The deploy script lives outside the repository directory at `/var/www/official-website/deploy.sh` (mirrored in repo at [`scripts/deploy-vps.sh`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/scripts/deploy-vps.sh)).

> [!CAUTION]
> The script must live **outside** the app checkout because it executes `git reset --hard`. If placed inside the checkout, a reset could delete the deploy runner itself mid-execution.

### Execution Sequence
```bash
flock -n 9                          # 1. Concurrency lock: only one deploy at a time
git fetch origin main               # 2. Fetch latest commits
git reset --hard origin/main        # 3. Match remote commit exactly

npm ci                              # 4. Install exact dependencies from lockfile
npm run build                       # 5. Compile production Next.js build

pm2 restart official-website        # 6. Swap in new build process

for i in {1..30}; do                # 7. Health check: poll localhost:3000 for up to 60s
  curl -fsS http://127.0.0.1:3000 && exit 0
  sleep 2
done
rollback                            # 8. Unhealthy after timeout -> automatic rollback
```

### Key Engineering Decisions
1. **`git reset --hard` over `git pull --ff-only`**:
   Guarantees the server state matches the repository commit exactly, eliminating file drift (e.g. modified `package-lock.json`).
2. **`reset --hard` is safe for `.env`, but `git clean` is NOT**:
   `git reset --hard` only alters tracked files. Because `.env` is gitignored, it remains untouched. `git clean -fd` deletes untracked files and would permanently wipe production secrets. **Never include `git clean` in deploy scripts.**
3. **`flock` concurrency protection**:
   Prevents overlapping deploy jobs from colliding on the same directory tree. Any concurrent job exits cleanly without corrupting the build.
4. **`npm ci` instead of `npm install`**:
   `npm ci` installs strict lockfile versions and fails immediately if `package.json` and `package-lock.json` diverge, catching issues before build.
5. **Automated Health Check & Rollback**:
   Next.js takes several seconds to bind port 3000. 30 probes at 2s intervals tolerate normal boot latency while guaranteeing that a failed build reverts within ~90s instead of leaving a corrupted `.next` artifact live.

---

## 6. Layer 4 — The GitHub Actions Workflow

Workflow file: [`.github/workflows/deploy.yml`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/.github/workflows/deploy.yml)

### Concurrency
```yaml
concurrency:
  group: deploy-production
  cancel-in-progress: false
```
`cancel-in-progress: false` ensures in-flight deployments are never killed midway through a restart or build. Queued deploys wait for their turn.

### Pipeline Structure
1. **Preflight Gate (`Typecheck`)**: Runs `npx tsc --noEmit` in ~40s. Type errors fail fast before server SSH is initiated.
2. **Key Validation**: Verifies `VPS_SSH_KEY` contains the OpenSSH private key header before attempting SSH connection.
3. **Remote Trigger**:
```bash
ssh -i ~/.ssh/norai_deploy \
    -o IdentitiesOnly=yes \
    -o StrictHostKeyChecking=accept-new \
    -p 22 root@200.141.11.215 \
    'bash /var/www/official-website/deploy.sh'
```

All build and swap work happens directly on the VPS, ensuring rollback logic remains unified on the host.

---

## 7. Known Issues & Diagnostic Lessons

### 1. Host Key Verification Failure
**Symptom**: VPS failed to pull from GitHub over SSH.  
**Cause**: `/root/.ssh/known_hosts` had no entry for `github.com`.  
**Fix**:
```bash
ssh-keyscan github.com >> /root/.ssh/known_hosts
```
*Note: Always verify the fingerprint against GitHub's official keys (`SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU`).*

### 2. Missing Newline in `authorized_keys`
**Symptom**: Newly added key did not work.  
**Cause**: Appending directly to a file without a trailing newline resulted in concatenated lines (`ssh-ed25519 AAAA...user@gmail.comssh-ed25519 AAAA...actions`).  
**Lesson**: Always inspect `authorized_keys` formatting and explicitly test authentication after adding keys.

### 3. SSH Exit Code 255 (The Public Key Trap)
**Symptom**: CI deploy step failed within 5 seconds with generic `exit code 255`.  
**Cause**: The public key (`.pub`) was accidentally pasted into the `VPS_SSH_KEY` secret instead of the OpenSSH private key.  
**Rule**:
- **Public key (`.pub`)**: Goes on the destination server (`authorized_keys` or GitHub Deploy Keys).
- **Private key**: Stored as a secret in GitHub Actions or your local machine.
- The workflow now contains preflight validation to detect this immediately:
```bash
if ! grep -q 'BEGIN OPENSSH PRIVATE KEY' ~/.ssh/norai_deploy; then
  echo "::error::VPS_SSH_KEY has no BEGIN OPENSSH PRIVATE KEY marker."
  exit 1
fi
```

---

## 8. Operations Manual

### Standard Release
```bash
# 1. Push to main -> triggers Typecheck -> Build -> Live deploy (~90s)
git push origin main

# 2. Update partner mirror for visibility
git push final main
```

### Emergency Deploy (Bypassing GitHub Actions)
If GitHub Actions is down or quota is exhausted, deploy directly from your local machine using [`scripts/deploy-now.sh`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/scripts/deploy-now.sh):
```bash
bash scripts/deploy-now.sh
```

### Verifying Production State
Check the active commit SHA running on the VPS:
```bash
ssh root@200.141.11.215 \
  'git -C /var/www/official-website/Final_NorAi_Website log -1 --format=%h'
```

### Diagnostic Order When Troubleshooting
1. **Did the GitHub Actions workflow go green?**  
   If red, inspect the failing step (Typecheck vs SSH vs Server build).
2. **Is the VPS checkout HEAD matching remote?**  
   If not, check if `git fetch` failed or if `flock` blocked execution.
3. **Is PM2 running?**  
   ```bash
   pm2 list
   ```
4. **Did the Next.js process crash?**  
   ```bash
   pm2 logs official-website --lines 50
   ```
5. **Is the fault in the Next.js app or Nginx?**  
   ```bash
   curl -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000
   ```
   - If `http://127.0.0.1:3000` fails: Node/Next.js issue.
   - If `http://127.0.0.1:3000` returns `200` but public URL fails: Nginx / SSL certificate / firewall issue.

---

## 9. Generalizing to Future Projects

The standard pattern for headless Next.js VPS deployments:
1. Provide server with a **read-only Deploy Key** to the private repository.
2. Provide CI with a dedicated **private key** whose public half is in the server's `authorized_keys`.
3. Store the deploy script **outside** the repo checkout.
4. Sequence: `flock` -> `fetch` -> `reset --hard` -> `npm ci` -> `build` -> `pm2 restart` -> health check loop -> `rollback`.
5. Run a lightweight typecheck / lint gate in CI before opening the SSH connection.
6. **Never** use `git clean`, **never** use unleased `--force`, and **never** reuse private keys across roles.
