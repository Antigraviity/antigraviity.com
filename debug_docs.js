require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./server/models/Employee');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB');

        const email = 'gokuls.1234@gmail.com';
        const employee = await Employee.findOne({ email });

        if (!employee) {
            console.log('User not found');
        } else {
            console.log('User Found. Documents:', JSON.stringify(employee.documents, null, 2));
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
