const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { uploadDocs } = require('../utils/cloudinary');

console.log('[Onboarding] Initializing routes...');
const Employee = require('../models/Employee');
console.log('[Onboarding] Employee model loaded successfully.');
// uploadDocs already required at the top
console.log('[Onboarding] Cloudinary utilities verified successfully.');

console.log('[Onboarding] Registering check-email route...');

// Check email existence
router.post('/check-email', async (req, res) => {
    console.log('[API] /check-email received data:', req.body);
    const { email } = req.body;

    if (!email) {
        console.warn('[API] /check-email: Missing email in request');
        return res.json({ exists: false });
    }

    try {
        console.log('[API] Searching for employee:', email);
        const employee = await Employee.findOne({ email: email.toLowerCase().trim() });
        console.log('[API] Search complete. Found:', !!employee);
        res.json({ exists: !!employee });
    } catch (err) {
        console.error('[API] /check-email error:', err);
        res.status(500).json({
            message: 'Internal server error during email check',
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Register/Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        let normalizedEmail = email.toLowerCase().trim();
        let employee = await Employee.findOne({ email: normalizedEmail });

        if (!employee) {
            // Auto-register
            employee = new Employee({
                email: normalizedEmail,
                password: password, // Hashing happens in the model pre-save hook
                onboardingStatus: 'Draft',
                stage: 1,
                progressPercentage: 0
            });
            await employee.save();
        } else {
            const isMatch = await employee.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, employee });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            message: 'Internal server error during login',
            error: err.message
        });
    }
});

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        console.warn('[AUTH] No token provided in header');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        console.log(`[AUTH] Token verified for user ID: ${decoded.id}`);
        req.user = decoded;
        next();
    } catch (e) {
        console.error('[AUTH] Token verification failed:', e.message);
        res.status(400).json({ message: 'Token is not valid' });
    }
};

router.get('/me', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.user.id).select('-password');
        if (!employee) return res.status(404).json({ message: 'User not found' });

        // Migration/Normalization: ensure stage exists and is consistent with status
        let changed = false;
        if (!employee.stage) {
            if (employee.onboardingStatus === 'Pending Verification' || employee.onboardingStatus === 'Approved') {
                employee.stage = 2;
            } else if (employee.onboardingStatus === 'Completed') {
                employee.stage = 3;
            } else {
                employee.stage = 1;
            }
            changed = true;
        }

        if (employee.onboardingStatus === 'Completed' && employee.stage === 2) {
            employee.stage = 3;
            changed = true;
        }

        if (changed) {
            await employee.save();
        }

        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/update', auth, async (req, res) => {
    const { personalInfo, employmentDetails, experienceSummary, legalFinancial, emergencyContact, isFinalSubmission } = req.body;
    try {
        const employee = await Employee.findById(req.user.id);
        if (!employee) return res.status(404).json({ message: 'User not found' });

        // Merge updates
        if (personalInfo) employee.personalInfo = { ...employee.personalInfo, ...personalInfo };
        if (employmentDetails) employee.employmentDetails = { ...employee.employmentDetails, ...employmentDetails };
        if (experienceSummary) employee.experienceSummary = { ...employee.experienceSummary, ...experienceSummary };
        if (legalFinancial) employee.legalFinancial = { ...employee.legalFinancial, ...legalFinancial };
        if (emergencyContact) employee.emergencyContact = { ...employee.emergencyContact, ...emergencyContact };

        if (isFinalSubmission) {
            if (employee.stage === 1) {
                employee.onboardingStatus = 'Pending Verification';
                employee.progressPercentage = 50;
            } else if (employee.stage === 2) {
                employee.onboardingStatus = 'Pending Verification';
                employee.progressPercentage = 100;
            }
        } else {
            // Update progress based on filled sections
            let sectionsFilled = 0;
            if (employee.personalInfo && Object.keys(employee.personalInfo).length > 2) sectionsFilled++;
            if (employee.employmentDetails && Object.keys(employee.employmentDetails).length > 2) sectionsFilled++;
            if (employee.experienceSummary && Object.keys(employee.experienceSummary).length > 2) sectionsFilled++;

            if (employee.stage === 1) {
                employee.progressPercentage = Math.min(45, sectionsFilled * 15);
                employee.onboardingStatus = 'In-Process';
            } else if (employee.stage === 2) {
                let legalFilled = 0;
                if (employee.legalFinancial && Object.keys(employee.legalFinancial).length > 2) legalFilled = 1;
                let emergencyFilled = 0;
                if (employee.emergencyContact && Object.keys(employee.emergencyContact).length > 1) emergencyFilled = 1;

                employee.progressPercentage = 50 + (legalFilled * 20) + (emergencyFilled * 20);
                employee.onboardingStatus = 'In-Process';
            }
        }

        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all candidates (HR View)
router.get('/candidates', auth, async (req, res) => {
    try {
        console.log('[API] GET /candidates requested');
        const employees = await Employee.find({ email: { $ne: 'hr@antigraviity.com' } }).select('-password');
        console.log(`[API] Found ${employees.length} candidates`);
        res.json(employees);
    } catch (err) {
        console.error('[API] GET /candidates error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Simulation endpoint for HR Approval
router.post('/hr-approve/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: 'User not found' });

        if (employee.stage === 2) {
            employee.stage = 3;
            employee.onboardingStatus = 'Completed';
            employee.progressPercentage = 100;
        } else {
            employee.stage = 2;
            employee.onboardingStatus = 'Approved';
            employee.progressPercentage = 50;
        }

        await employee.save();
        res.json({ success: true, employee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/upload', auth, uploadDocs.single('document'), async (req, res) => {
    try {
        const employee = await Employee.findById(req.user.id);
        if (!employee) return res.status(404).json({ message: 'User not found' });

        employee.documents.push({
            type: req.body.type,
            path: req.file.path // For Cloudinary, path is the URL
        });

        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const employee = await Employee.findOne({ email: email.toLowerCase().trim() });
        if (!employee) {
            // To prevent email harvesting, don't reveal if email exists
            return res.json({ success: true, message: 'If an account with that email exists, a reset link has been sent.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        employee.resetPasswordToken = token;
        employee.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await employee.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS?.replace(/\s/g, '')
            }
        });

        const resetUrl = `${req.protocol}://${req.get('host')}/hr/reset-password?token=${token}`;
        console.log(`[PASS_RESET] Reset link for ${email}: ${resetUrl}`);

        const mailOptions = {
            to: employee.email,
            from: `"AntiGraviity HR Portal" <${process.env.EMAIL_USER}>`,
            subject: 'HR Portal Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `${resetUrl}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Reset link sent to your email.' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
    try {
        const employee = await Employee.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!employee) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        employee.password = password; // Hashing happens in pre-save hook
        employee.resetPasswordToken = undefined;
        employee.resetPasswordExpires = undefined;
        await employee.save();

        res.json({ success: true, message: 'Password has been reset successfully.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
