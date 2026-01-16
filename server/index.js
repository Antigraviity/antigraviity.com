console.log('[Startup] Phase 0: Script loaded.');
const path = require('path');
const fs = require('fs');
console.log('[Startup] Phase 1: Core modules loaded.');

// 1. Initialize environment variables ASAP
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
    override: true // Final truth comes from .env or Vercel injects
});

console.log('[Startup] Phase 1.1: Loading express...');
const express = require('express');
console.log('[Startup] Phase 1.2: Loading nodemailer...');
const nodemailer = require('nodemailer');
console.log('[Startup] Phase 1.3: Loading cors...');
const cors = require('cors');
console.log('[Startup] Phase 1.4: Loading axios...');
const axios = require('axios');
console.log('[Startup] Phase 1.5: Loading multer...');
const multer = require('multer');
console.log('[Startup] Phase 1.6: Loading mongoose...');
const mongoose = require('mongoose');
console.log('[Startup] Phase 1.7: Core dependencies loaded.');

// 2. Import internal modules AFTER environment is loaded
console.log('[Startup] Phase 2: Loading inline configuration...');
const config = {
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    port: process.env.PORT || 5000
};

console.log('[Startup] Phase 2.1: Loading cloudinary utils...');
const { uploadResumes } = require('./utils/cloudinary');

// Ensure uploads directory exists (Only in local dev or writable environments)
try {
    if (!fs.existsSync('uploads/')) {
        console.log('[Startup] Creating uploads directory...');
        fs.mkdirSync('uploads/');
    }
} catch (err) {
    console.warn('[Startup] Warning: Could not create uploads directory (expected on Vercel):', err.message);
}

// 3. MongoDB Connection with better error handling
let MONGODB_URI = (process.env.MONGODB_URI || '').trim();

if (!MONGODB_URI) {
    console.warn('--- WARNING: MONGODB_URI is missing! Defaulting to localhost (Local Dev Only) ---');
} else if (MONGODB_URI.startsWith('mongodb+srv://')) {
    console.log('[Startup] Cleaning mongodb+srv URI (Length:', MONGODB_URI.length, ')...');

    // 1. Remove any port (Atlas doesn't support them)
    // Robustly remove :port if present, even without trailing slash
    MONGODB_URI = MONGODB_URI.replace(/:(\d+)(?=[/?]|$)/g, '');

    // 2. Encode '#' as '%23' in any part of the string (usually password)
    if (MONGODB_URI.includes('#')) {
        console.log('[Startup] Encoding # in MONGODB_URI...');
        MONGODB_URI = MONGODB_URI.replace(/#/g, '%23');
    }

    // 3. Crucial Truncation Check: Atlas URIs MUST have an '@' followed by a cluster host
    if (!MONGODB_URI.includes('@')) {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.error('CRITICAL ERROR: MONGODB_URI is TRUNCATED / BROKEN.');
        console.error('Expected format: mongodb+srv://user:pass@cluster.mongodb.net/db');
        console.error('Current value (masked):', MONGODB_URI.replace(/:\/\/.*@/, '://****:****@'));
        console.error('The "#" in your password has likely cut off the rest of the URI.');
        console.error('PLEASE WRAP YOUR MONGODB_URI IN DOUBLE QUOTES IN THE VERCEL DASHBOARD.');
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
}

// Masked URI for log verification
const maskedURI = MONGODB_URI.replace(/:\/\/.*@/, '://****:****@');
console.log('[Startup] Final URI (masked):', maskedURI);

mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/antigraviity')
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => {
        console.error('--- MongoDB Connection Error ---');
        console.error('Message:', err.message);
        console.error('URI Provided:', MONGODB_URI ? `${MONGODB_URI.substring(0, 20)}...` : 'NONE');
        console.error('--------------------------------');
    });

// 4. Strictly clean credentials
console.log('[Startup] Phase 3: Cleaning credentials...');
if (config.email.user) config.email.user = config.email.user.trim();
if (config.email.pass) {
    // Remove all whitespace from the App Password
    config.email.pass = config.email.pass.replace(/\s/g, '');
}

console.log('--- Server Startup Status ---');
console.log('MongoDB URI:', MONGODB_URI ? 'Present (First 20 chars: ' + MONGODB_URI.substring(0, 20) + '...)' : 'MISSING');
console.log('Email User:', config.email.user ? 'LOADED' : 'MISSING');
console.log('Email Pass:', config.email.pass ? 'LOADED (Length: ' + config.email.pass.length + ')' : 'MISSING');
console.log('---------------------------');

console.log('[Startup] Phase 4: Initializing Express app...');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log('[Startup] Phase 5: Setting up Nodemailer...');
// Email Transporter (Standard Service Mode)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    debug: true,
    logger: true
});
console.log('[Startup] Phase 6: Core services ready.');

// Verify Transporter
// Verify Transporter (Skipped to prevent startup crash on invalid creds)
// transporter.verify((error, success) => {
//     if (error) {
//         console.error('--- Email Verification Error (Non-fatal) ---');
//         console.error('Code:', error.code);
//         console.error('Message:', error.message);
//         console.error('--------------------------------');
//     } else {
//         console.log('Email server ready to send messages');
//     }
// });
console.log('--- Email Verification Skipped (Startup Stability) ---');

// API Route
app.post('/api/contact', async (req, res) => {
    const { name, email, company, budget, service, message, recaptchaToken } = req.body;

    // Verify reCAPTCHA
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );

        const { success, score } = response.data;

        if (!success || score < 0.5) {
            return res.status(400).json({
                success: false,
                message: 'ReCAPTCHA verification failed. Please try again.'
            });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error verifying reCAPTCHA'
        });
    }

    const mailOptions = {
        from: `"AntiGraviity Contact" <${config.email.user}>`,
        to: config.email.user,
        subject: `New Contact Form Submission: ${name} - ${service}`,
        html: `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Service Interest:</strong> ${service}</p>
      <p><strong>Budget Range:</strong> ${budget}</p>
      <br/>
      <h3>Message:</h3>
      <p>${message}</p>
    `,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Onboarding Routes
console.log('[Startup] Phase 4: Registering Onboarding routes...');
const onboardingRoutes = require('./routes/onboarding');
app.use('/api/onboarding', onboardingRoutes);
console.log('[Startup] Onboarding routes registered successfully.');

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'running' });
});

// Career Route
app.post('/api/career', uploadResumes.single('resume'), async (req, res) => {
    const { name, email, phone, linkedin, message, position, recaptchaToken } = req.body;
    const resumeFile = req.file;

    // Verify reCAPTCHA
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );

        const { success, score } = response.data;

        if (!success || score < 0.5) {
            return res.status(400).json({
                success: false,
                message: 'ReCAPTCHA verification failed. Please try again.'
            });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error verifying reCAPTCHA'
        });
    }

    const mailOptions = {
        from: `"AntiGraviity Careers" <${config.email.user}>`,
        to: 'careers@antigraviity.com',
        subject: `New Job Application: ${name} - ${position}`,
        html: `
      <h2>New Job Application</h2>
      <p><strong>Position:</strong> ${position}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>LinkedIn/Portfolio:</strong> ${linkedin || 'N/A'}</p>
      <br/>
      <h3>Cover Letter / Message:</h3>
      <p>${message}</p>
    `,
        replyTo: email,
        attachments: resumeFile ? [
            {
                filename: resumeFile.originalname,
                path: resumeFile.path // For Cloudinary, this is the URL
            }
        ] : []
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Application sent successfully' });
    } catch (error) {
        console.error('Error sending application email:', error);
        res.status(500).json({ success: false, message: 'Failed to send application' });
    }
});

// Robust manual file serving for candidate documents
app.get('/candidate-docs/*', (req, res) => {
    try {
        // Decode the URL segment to handle spaces and special chars
        const relativePath = decodeURIComponent(req.params[0]);
        const absolutePath = path.join(process.cwd(), 'uploads', relativePath);

        console.log(`[Docs] Request for: ${req.url}`);
        console.log(`[Docs] Attempting to serve: ${absolutePath}`);

        if (fs.existsSync(absolutePath)) {
            // Use res.sendFile with absolute path for Windows compatibility
            return res.sendFile(absolutePath);
        } else {
            console.error(`[Docs] 404 - File Not Found: ${absolutePath}`);
            return res.status(404).json({ error: 'Document not found' });
        }
    } catch (err) {
        console.error(`[Docs] Server Error:`, err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
    console.log(`[CatchAll] Route mismatch for: ${req.method} ${req.url}. Serving index.html`);
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
