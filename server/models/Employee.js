const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    onboardingStatus: {
        type: String,
        enum: ['Draft', 'Submitted', 'Offered', 'Accepted', 'In-Process', 'Completed'],
        default: 'Draft'
    },
    stage: { type: Number, default: 1 }, // 1: Pre-Offer, 2: Post-Offer
    progressPercentage: { type: Number, default: 0 },

    // Stage 1: Pre-Offer Details
    personalInfo: {
        fullName: String,
        currentAddress: String,
        highestQualification: String,
        totalExperience: String
    },

    // Stage 2: Post-Offer Details
    legalFinancial: {
        panNumber: String,
        aadhaarNumber: String,
        bankAccount: String,
        ifscCode: String
    },

    emergencyContact: {
        name: String,
        phone: String,
        relationship: String
    },

    documents: [{
        type: { type: String }, // e.g., 'aadhaar', 'pan', 'degree'
        path: String,
        uploadedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Hash password before saving
employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

employeeSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
