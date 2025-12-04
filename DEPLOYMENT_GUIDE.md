# Ultimate Deployment Guide: React + Node.js on CyberPanel (OpenLiteSpeed)

This guide documents the complete process for deploying a React frontend with a Node.js backend to a CyberPanel VPS, including solutions to common errors encountered during the process.

## 1. Preparation (Local Machine)

### React App
1.  **API Paths**: Ensure your React app uses relative paths for API calls (e.g., `/api/contact`, not `http://localhost:5000/api/contact`).
2.  **Build**: Create the production build.
    ```bash
    npm run build
    ```
    *This creates a `build` folder.*

### Node.js Server
1.  **Serve Static Files**: Ensure your `server/index.js` serves the React build.
    ```javascript
    const path = require('path');
    // ...
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

1.  **Create Website**: In CyberPanel, create a website for your domain (e.g., `antigraviity.com`).
2.  **File Structure**:
    *   Go to File Manager: `public_html`.
    *   Upload the `build` folder from your local machine.
    *   Upload the `server` folder.
    *   Upload `package.json`.
    *   **Result**:
        ```
        /home/domain.com/public_html/
        ├── build/
        ├── server/
        ├── package.json
        ```

3.  **Install Dependencies**:
    *   Open Terminal in CyberPanel (or SSH).
    *   Navigate to your folder: `cd /home/domain.com/public_html`
    *   Install: `npm install`

## 3. Process Management (PM2)

Start your Node.js server so it runs in the background.

```bash
pm2 start server/index.js --name "my-app"
pm2 save
pm2 startup
```
*Check status: `pm2 status`*

## 4. OpenLiteSpeed Configuration (The Critical Part)

OpenLiteSpeed needs to know how to talk to your Node app (Reverse Proxy). **Do not rely on .htaccess for this.**

### Step A: Edit vHost Config
You need to edit the configuration file directly.
**File Path**: `/usr/local/lsws/conf/vhosts/domain.com/vhost.conf`

Run:
```bash
nano /usr/local/lsws/conf/vhosts/domain.com/vhost.conf
```

### Step B: Add External App & Context
Add the following blocks to the bottom of the file (before the closing `}` if inside a block, or at the end):

```apache
# 1. Define the Node.js App
extprocessor node_server {
  type                    proxy
  address                 127.0.0.1:5000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

# 2. Map traffic to the App
context / {
  type                    proxy
  handler                 node_server
  addDefaultCharset       off
}
```
*Note: Replace `127.0.0.1:5000` with your actual port.*

### Step C: Restart Server
```bash
systemctl restart lsws
```

## 5. SSL & Security

1.  **Issue SSL**: In CyberPanel > Websites > List Websites > Issue SSL.
2.  **Force HTTPS**: Edit `/home/domain.com/public_html/.htaccess`:
    ```apache
    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    ```
3.  **Restart Again**: `systemctl restart lsws` (Required for SSL to take effect).

## 6. Troubleshooting Common Errors

### ❌ 500 Internal Server Error
*   **Cause**: Usually a conflict in `.htaccess`.
*   **Fix**: Check `.htaccess` for lines like `RewriteRule ... [P]`. OpenLiteSpeed does **not** support the `[P]` flag in .htaccess. **Delete those lines.** The proxy is handled in `vhost.conf` (Step 4).

### ❌ 403 Forbidden
*   **Cause**: The proxy context exists, but the `extprocessor` (External App) is missing or named incorrectly.
*   **Fix**: Ensure the `handler` name in `context /` matches the `extprocessor` name exactly (e.g., `node_server`).

### ❌ React Router "PathError" / Server Crashes
*   **Cause**: `app.get('*', ...)` can sometimes fail with newer Express/Path-to-Regexp versions.
*   **Fix**: Use `app.use(...)` for the catch-all route instead of `app.get`.

### ❌ Email "Invalid Login"
*   **Cause**: Using a regular Gmail password.
*   **Fix**:
    1.  Enable 2FA on Google Account.
    2.  Generate an **App Password**.
    3.  Update `server/config.js` with the 16-char App Password.
    4.  Restart app: `pm2 restart my-app`.
