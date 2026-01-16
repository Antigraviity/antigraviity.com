const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Employee = require('./models/Employee');

const DB_PATH = path.join(__dirname, 'data/employees.json');

const migrate = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            console.error('MONGODB_URI not found in .env');
            process.exit(1);
        }

        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for migration...');

        if (!fs.existsSync(DB_PATH)) {
            console.log('No local employees.json found. Skipping migration.');
            process.exit(0);
        }

        const localEmployees = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        console.log(`Found ${localEmployees.length} employees to migrate.`);

        for (const localEmp of localEmployees) {
            const exists = await Employee.findOne({ email: localEmp.email.toLowerCase().trim() });
            if (!exists) {
                const newEmp = new Employee({
                    ...localEmp,
                    _id: new mongoose.Types.ObjectId() // Generate a new ID for MongoDB
                });
                // Remove the old string 'id' if it exists to avoid conflict
                delete newEmp.id;
                await newEmp.save();
                console.log(`Migrated: ${localEmp.email}`);
            } else {
                console.log(`Skipped (already exists): ${localEmp.email}`);
            }
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

migrate();
