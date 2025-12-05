# Master Guide: Auto-Deploy to CyberPanel VPS with GitHub Actions

**Goal:** Automatically deploy changes to your live server whenever you push to GitHub.
**Stack:** React + Node.js (or any Node.js app) on CyberPanel (OpenLiteSpeed).

---

## Phase 1: Server Preparation (Run ONCE on VPS)

**1. Initialize Git on Server**
Log into your VPS terminal (PuTTY or SSH) and navigate to your website folder.
```bash
cd /home/YOUR_DOMAIN.com/public_html

# Initialize Git
git init

# Add your GitHub repository as 'origin'
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Fetch the code (this doesn't change files yet)
git fetch

# FORCE reset to match GitHub (WARNING: Deletes local file changes, which is what we want for sync)
git reset --hard origin/main
```

**2. Install Dependencies**
```bash
npm install
```

**3. Setup Process Manager (PM2)**
Start your server with the correct PORT (usually 5000 for OpenLiteSpeed proxy).
```bash
# Start the app
PORT=5000 pm2 start server/index.js --name "my-app-backend"

# Save list so it restarts on reboot
pm2 save
pm2 startup
```

---

## Phase 2: SSH Keys (The "Handshake")

**1. Generate Keys (On Local Machine)**
Open your VS Code terminal (Git Bash or Powershell):
```bash
# Generate a new key pair named 'deploy_key'
ssh-keygen -t rsa -b 4096 -f deploy_key -C "github-actions"

# IMPORTANT: Press Enter for passphrase (leave it empty!)
```
This creates:
*   `deploy_key` (Private Key - Goes to GitHub)
*   `deploy_key.pub` (Public Key - Goes to Server)

**2. Add Public Key to Server**
Run this command ON YOUR VPS to allow the key access:
```bash
# Create directory if missing
mkdir -p ~/.ssh

# Append your public key content to the authorized list
echo "PASTE_CONTENT_OF_deploy_key.pub_HERE" >> ~/.ssh/authorized_keys

# Secure the permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

---

## Phase 3: GitHub Secrets (The "Passcards")

Go to your **GitHub Repo > Settings > Secrets and variables > Actions > New repository secret**.
Add these 4 secrets:

| Name | Value |
| :--- | :--- |
| `HOST` | Your VPS IP Address (e.g., `72.60.x.x`) |
| `USERNAME` | Your VPS Username (usually `root` for CyberPanel) |
| `PORT` | `22` (Default SSH port) |
| `SSH_PRIVATE_KEY` | Paste the **entire** content of the `deploy_key` file (starts with `-----BEGIN OPENSSH...`) |

---

## Phase 4: Workflow File (The Automation Script)

Create a file in your project: `.github/workflows/deploy.yml`

```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - main  # Trigger on push to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy via SSH
      uses: appleboy/ssh-action@v1.0.0
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        port: ${{ secrets.PORT }}
        script: |
          # 1. Go to project folder
          cd /home/YOUR_DOMAIN.com/public_html
          
          # 2. Pull latest code
          git fetch --all
          git reset --hard origin/main
          
          # 3. Install dependencies
          npm install
          
          # 4. Build React (if applicable)
          npm run build
          
          # 5. Restart Backend (Force PORT 5000)
          PORT=5000 pm2 restart my-app-backend --update-env
```

---

## Phase 5: Critical Fixes & "Gotchas" (READ THIS!)

### 1. The `config.js` / `.env` Trap
**Problem:** Files with passwords (like `server/config.js`) are usually in `.gitignore`, so they **don't** get uploaded to GitHub or the server automatically.
**Fix:** You must manually upload this file to the server **once** (and whenever keys change).
*   **Method A (SCP):** `scp server/config.js root@IP:/home/DOMAIN/public_html/server/`
*   **Method B (Nano):** SSH into server, `nano server/config.js`, paste content, save.
*   **Method C (CyberPanel File Manager):** Upload via browser.

### 2. Gmail SMTP "From" Header
**Problem:** Emails fail with "Message rejected" or no error log.
**Reason:** Gmail blocks emails if the `from` address is different from the authenticated user.
**Fix:** In your `nodemailer` code:
```javascript
// BAD ❌
from: userProvidedEmail, // Gmail blocks this!

// GOOD ✅
from: process.env.EMAIL_USER, // Must match your login email
replyTo: userProvidedEmail,   // Use this so you can reply to them
```

### 3. "Handshake Failed" Error
**Reason:** GitHub Actions can't login to your server.
**Fixes:**
*   Check if `SSH_PRIVATE_KEY` in GitHub Secrets was copied fully.
*   Check if `deploy_key.pub` was added to `~/.ssh/authorized_keys` on server.
*   Ensure you are using `root` user (or the correct user).

### 4. Port Conflicts (503 Error)
**Reason:** Node runs on port 3000 by default, but CyberPanel/LiteSpeed expects 5000.
**Fix:** Always force the port in your PM2 command:
`PORT=5000 pm2 restart app-name`
