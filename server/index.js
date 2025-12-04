const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

// Verify Transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Email server connection error:', error);
    } else {
        console.log('Email server ready to send messages');
    }
});

// API Route
app.post('/api/contact', async (req, res) => {
    const { name, email, company, budget, service, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${email}>`,
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
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
