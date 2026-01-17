const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    email: String,
    documents: [{
        type: { type: String },
        path: String,
        originalName: String
    }]
}, { collection: 'employees' }); // Force collection name to match

const Employee = mongoose.model('Employee', employeeSchema);

const run = async () => {
    try {
        // Hardcoded URI from user environment context if available, or .env loading
        require('dotenv').config();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const email = 'gokuls.1234@gmail.com';
        const doc = await Employee.findOne({ email });

        if (!doc) console.log('Not Found');
        else console.log(JSON.stringify(doc.documents, null, 2));

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
run();
