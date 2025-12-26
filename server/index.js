const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

// Consolidate environment loading (Explicitly point to root .env)
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
    override: true
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
transporter.verify((error, success) => {
    if (error) {
        console.error('--- Email Verification Error ---');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('--------------------------------');
    } else {
        console.log('Email server ready to send messages');
    }
});

// API Route
app.post('/api/contact', async (req, res) => {
    const { name, email, company, budget, service, message } = req.body;

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
