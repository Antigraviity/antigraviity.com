try {
    console.log('[Vercel Bridge] Loading server...');
    const app = require('../server/index');
    console.log('[Vercel Bridge] Server loaded successfully.');
    module.exports = app;
} catch (err) {
    console.error('[Vercel Bridge] CRITICAL ERROR during server load:');
    console.error(err);
    // Explicitly re-throw to ensure Vercel sees the failure
    throw err;
}
