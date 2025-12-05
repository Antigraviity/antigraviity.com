# Ultimate Deployment Guide: React + Node.js on CyberPanel (OpenLiteSpeed)

This guide documents the complete process for deploying a React frontend with a Node.js backend to a CyberPanel VPS, including solutions to common errors encountered during the process.

## 1. Preparation (Local Machine)

### React App
1.  **API Paths**: Ensure your React app uses relative paths for API calls (e.g., `/api/contact`, not `http://localhost:5000/api/contact`).
2.  **Build**: Create the production build.
    ```bash
    npm run build
    ```

### Node.js Server
1.  **Serve Static Files**: Ensure your `server/index.js` serves the React build using `app.use` (NOT `app.get('*')`).
    ```javascript
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../build')));
    
    // Catch-all handler for React Router
    app.use((req, res, next) => {
        if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
            next();
        } else {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        }
    });
    ```
2.  **Dependencies**: Do **not** upload `node_modules`.

## 2. Server Setup (CyberPanel)

1.  **Create Website**: in CyberPanel, create a website for your domain.
2.  **File Structure**: Upload `build`, `server`, and `package.json` to `public_html`.
3.  **Install Dependencies**: Run `npm install` in `public_html`.

## 3. Process Management (PM2)

Start your Node.js server so it runs in the background.

```bash
PORT=5000 pm2 start server/index.js --name "antigraviity-backend"
pm2 save
pm2 startup
```

## 4. OpenLiteSpeed Configuration

**File Path**: `/usr/local/lsws/conf/vhosts/domain.com/vhost.conf`

Add these blocks:
```apache
extprocessor node_server {
  type                    proxy
  address                 127.0.0.1:5000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 node_server
  addDefaultCharset       off
}
```
**Restart Server**: `systemctl restart lsws`

## 5. CI/CD Setup (GitHub Actions)

To enable auto-deployment when you push to GitHub:

### A. Workflow File
Create `.github/workflows/deploy.yml` in your project:
```yaml
name: Deploy to CyberPanel
on:
  push:
    branches:
      - main
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
          cd /home/antigraviity.com/public_html
          git pull origin main
          npm install
          npm run build
          PORT=5000 pm2 restart antigraviity-backend --update-env
```

### B. Server Git Setup
Run this on your VPS once:
```bash
cd /home/antigraviity.com/public_html
git init
git remote add origin https://github.com/YOUR_USERNAME/REPO.git
git fetch
git reset --hard origin/main
```

### C. Server Keys
1.  **Generate Keys**: Run `ssh-keygen -t rsa -b 4096` locally.
2.  **Authorize**: Add the `public_key` content to `~/.ssh/authorized_keys` on the server.
3.  **Secrets**: Add `SSH_PRIVATE_KEY`, `HOST`, `USERNAME`, `PORT` to GitHub Repository Secrets.

## 6. Troubleshooting

### ❌ 503 Service Unavailable
*   **Cause**: Port mismatch. App running on 3000, Proxy looking for 5000.
*   **Fix**: `PORT=5000 pm2 restart antigraviity-backend --update-env`

### ❌ PathError / Server Crash
*   **Cause**: `app.get('*', ...)` syntax issues.
*   **Fix**: Use `app.use((req, res) => res.sendFile(...))` instead.

### ❌ Email "Invalid Login"
*   **Cause**: Regular password used.
*   **Fix**: Use Gmail **App Password** in `config.js`.
