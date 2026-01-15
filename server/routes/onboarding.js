const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../data/employees.json');

// Ensure database file exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'));
}
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

const getEmployees = () => JSON.parse(fs.readFileSync(DB_PATH));
const saveEmployees = (employees) => fs.writeFileSync(DB_PATH, JSON.stringify(employees, null, 2));

// Configure multer for doc uploads
const storage = multer.diskStorage({
    destination: 'uploads/docs/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

console.log('Loading onboarding.js route file...');

// Check email existence
router.post('/check-email', (req, res) => {
    console.log('Received /check-email request:', req.body);
    const { email } = req.body;
    if (!email) return res.json({ exists: false });
    const employees = getEmployees();
    const exists = employees.some(e => e.email.toLowerCase().trim() === email.toLowerCase().trim());
    res.json({ exists });
});

// Register/Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let employees = getEmployees();
        let normalizedEmail = email.toLowerCase().trim();
        let employee = employees.find(e => e.email.toLowerCase().trim() === normalizedEmail);

        if (!employee) {
            // Auto-register
            const hashedPassword = await bcrypt.hash(password, 10);
            employee = {
                id: Date.now().toString(),
                email: normalizedEmail,
                password: hashedPassword,
                onboardingStatus: 'Draft',
                stage: 1,
                progressPercentage: 0,
                personalInfo: {},
                legalFinancial: {},
                emergencyContact: {},
                documents: [],
                createdAt: new Date()
            };
            employees.push(employee);
            saveEmployees(employees);
        } else {
            const isMatch = await bcrypt.compare(password, employee.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, employee });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    const employee = getEmployees().find(e => e.id === req.user.id);
    if (!employee) return res.status(404).json({ message: 'User not found' });

    // Migration/Normalization: ensure stage exists and is consistent with status
    if (!employee.stage) {
        if (employee.onboardingStatus === 'Pending Verification' || employee.onboardingStatus === 'Approved') {
            employee.stage = 2;
        } else if (employee.onboardingStatus === 'Completed') {
            employee.stage = 3;
        } else {
            employee.stage = 1;
        }
    }

    // Sanity Check: If status is Completed but stage is not 3, they need verification for Stage 2
    if (employee.onboardingStatus === 'Completed' && employee.stage === 2) {
        employee.onboardingStatus = 'Pending Verification';
    }

    const { password, ...rest } = employee;
    res.json(rest);
});

router.post('/update', auth, async (req, res) => {
    const { personalInfo, employmentDetails, experienceSummary, legalFinancial, emergencyContact, isFinalSubmission } = req.body;
    try {
        let employees = getEmployees();
        const index = employees.findIndex(e => e.id === req.user.id);
        if (index === -1) return res.status(404).json({ message: 'User not found' });

        const employee = employees[index];

        // Merge updates for allowed sections
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
            // Update progress based on filled sections (Rough estimate)
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

        employees[index] = employee;
        saveEmployees(employees);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all candidates (HR View)
router.get('/candidates', auth, (req, res) => {
    try {
        console.log('[API] GET /candidates requested');
        const employees = getEmployees();
        console.log(`[API] Found ${employees.length} total employees`);

        // Filtering out passwords and the HR account itself, and sanitizing statuses
        const safeEmployees = employees
            .filter(e => {
                const isHR = e.email === 'hr@antigraviity.com';
                if (isHR) console.log(`[API] Filtering out HR account: ${e.email}`);
                return !isHR;
            })
            .map(e => {
                const { password, ...rest } = e;
                // Sanity check for status consistency
                if (rest.onboardingStatus === 'Completed' && rest.stage === 2) {
                    rest.onboardingStatus = 'Pending Verification';
                }
                return rest;
            });

        console.log(`[API] Returning ${safeEmployees.length} candidates`);
        res.json(safeEmployees);
    } catch (err) {
        console.error('[API] GET /candidates error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Simulation endpoint for HR Approval (Directly moves to Stage 2)
router.post('/hr-approve/:id', auth, async (req, res) => {
    const { id } = req.params;
    console.log(`[API] POST /hr-approve/${id} requested`);
    try {
        let employees = getEmployees();
        const index = employees.findIndex(e => e.id === id);

        if (index === -1) {
            console.error(`[API] User with ID ${id} not found in database`);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`[API] Approving user: ${employees[index].email} (Current Stage: ${employees[index].stage || 1})`);

        if (employees[index].stage === 2) {
            // Stage 2 Approval -> Completion
            employees[index].stage = 3;
            employees[index].onboardingStatus = 'Completed';
            employees[index].progressPercentage = 100;
        } else {
            // Stage 1 Approval -> Move to Stage 2 (Post-Offer)
            employees[index].stage = 2;
            employees[index].onboardingStatus = 'Approved';
            employees[index].progressPercentage = 50;
        }

        saveEmployees(employees);
        console.log(`[API] Approval saved for ${employees[index].email}`);

        res.json({ success: true, employee: employees[index] });
    } catch (err) {
        console.error(`[API] POST /hr-approve/${id} error:`, err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/upload', auth, upload.single('document'), async (req, res) => {
    try {
        let employees = getEmployees();
        const index = employees.findIndex(e => e.id === req.user.id);
        const employee = employees[index];

        employee.documents.push({
            type: req.body.type,
            path: req.file.path
        });

        employees[index] = employee;
        saveEmployees(employees);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
