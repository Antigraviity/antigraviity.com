const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');

// Configure multer for file uploads
const { uploadResumes } = require('./utils/cloudinary');

// Ensure uploads directory exists (Keep for now, but not needed for careers/onboarding)
if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/');
}

// Consolidate environment loading (Explicitly point to root .env)
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
    override: false
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/antigraviity';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => {
        console.error('--- MongoDB Connection Error ---');
        console.error(err);
        console.error('--------------------------------');
    });

const config = require('./config');

// Strictly clean credentials
if (config.email.user) config.email.user = config.email.user.trim();
if (config.email.pass) {
    // Remove all whitespace from the App Password
    config.email.pass = config.email.pass.replace(/\s/g, '');
}

console.log('--- Server Auth Status ---');
console.log('User:', config.email.user ? `[${config.email.user}]` : 'MISSING');
console.log('Pass:', config.email.pass ? `${config.email.pass.substring(0, 3)}...` : 'MISSING', `(Length: ${config.email.pass ? config.email.pass.length : 0})`);
console.log('-------------------------');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
const onboardingRoutes = require('./routes/onboarding');
app.use('/api/onboarding', onboardingRoutes);

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
