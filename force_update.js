const mongoose = require('mongoose');

// Use the URI directly since we know it now
const uri = "mongodb+srv://antigraviity_db:BreakingAntiBad%23123@cluster0.udkscmq.mongodb.net/?appName=Cluster0";

const employeeSchema = new mongoose.Schema({
    email: String,
    documents: [{
        type: { type: String },
        path: String,
        originalName: String
    }]
}, { collection: 'employees' });

const Employee = mongoose.model('Employee', employeeSchema);

const run = async () => {
    try {
        console.log('Connecting...');
        await mongoose.connect(uri);
        console.log('Connected.');

        const email = 'gokuls.1234@gmail.com';
        const employee = await Employee.findOne({ email });

        if (!employee) {
            console.log('User not found');
        } else {
            console.log('Found user. Updating documents...');

            // Loop through documents and add a fake originalName if missing
            let updated = false;
            employee.documents.forEach(doc => {
                if (!doc.originalName) {
                    console.log(`Updating doc type ${doc.type}...`);
                    doc.originalName = 'Manually Updated File.pdf';
                    updated = true;
                } else {
                    console.log(`Doc type ${doc.type} already has name: ${doc.originalName}`);
                }
            });

            if (updated) {
                await employee.save();
                console.log('Employee saved with manual names.');
            } else {
                console.log('No documents needed updating.');
            }
        }
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
run();
