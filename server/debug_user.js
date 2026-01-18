const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Employee = require('./models/Employee');

function cleanURI(uri) {
    if (!uri) return '';
    let cleaned = uri.trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) cleaned = cleaned.slice(1, -1).trim();
    if (cleaned.startsWith("'") && cleaned.endsWith("'")) cleaned = cleaned.slice(1, -1).trim();
    if (cleaned.startsWith('mongodb+srv://') || cleaned.startsWith('mongodb://')) {
        try {
            const parts = cleaned.split('://');
            const protocol = parts[0];
            const rest = parts[1];
            if (rest.includes('@')) {
                const authParts = rest.split('@');
                const credentials = authParts[0];
                const hostPart = authParts.slice(1).join('@');
                if (credentials.includes(':')) {
                    const [user, ...passParts] = credentials.split(':');
                    const pass = passParts.join(':');
                    const encodedPass = encodeURIComponent(pass);
                    cleaned = `${protocol}://${user}:${encodedPass}@${hostPart}`;
                }
            }
        } catch (e) { console.error('URI Clean Error:', e); }
    }
    return cleaned;
}

const connectDB = async () => {
    try {
        console.log('Loading .env from:', path.join(__dirname, '../.env'));
        const rawURI = process.env.MONGODB_URI;
        console.log('Raw URI Type:', typeof rawURI);
        console.log('Raw URI Length:', rawURI ? rawURI.length : 0);

        const uri = cleanURI(rawURI);
        console.log('Cleaned URI (masked):', uri.replace(/:\/\/.*@/, '://****:****@'));

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const employees = await Employee.find({ email: { $ne: 'hr@antigraviity.com' } }).select('-password');
        console.log(`Found ${employees.length} candidates`);
        employees.forEach(emp => {
            console.log(`Candidate: ${emp.email} | Status: '${emp.onboardingStatus}' | Stage: ${emp.stage}`);
        });

    } catch (err) {
        console.error(err);
    }
    process.exit();
};

connectDB();
