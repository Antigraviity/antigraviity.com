const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    onboardingStatus: {
        type: String,
        enum: ['Draft', 'Submitted', 'Offered', 'Accepted', 'In-Process', 'Pending Verification', 'Approved', 'Completed'],
        default: 'Draft'
    },
    stage: { type: Number, default: 1 }, // 1: Pre Offer, 2: Interview Assessment, 3: Post offer
    progressPercentage: { type: Number, default: 0 },

    // Stage 1: Pre-Offer Details
    // Section A: Basic Candidate Information
    personalInfo: {
        fullName: String,
        personalEmail: String,
        mobileNumber: String,
        dob: String,
        currentCity: String,
        currentAddress: String,
        schoolName: String  // NEW: Higher Secondary School Name
    },

    // Section B: Education
    education: {
        highestQualification: String,
        institutionName: String,  // NEW
        institutionLocation: String  // NEW
    },

    // Section C: Experience Summary
    experienceSummary: {
        totalExperience: String,  // Fresher / 1-2 years / 2-5 years / 5+ years
        currentEmployer: String,
        relevantExperience: String,
        currentDesignation: String,
        currentCtc: String,  // Moved from employmentDetails
        expectedCtc: String,  // Moved from employmentDetails
        resumePath: String
    },

    // Section D: Employment Details (Offer Inputs)
    employmentDetails: {
        position: String,
        workMode: String,
        joiningDate: String,
        preferredLocation: String,  // NEW: Bangalore / Chennai
        noticePeriod: String
    },

    // Stage 2: Post-Offer Details
    legalFinancial: {
        panNumber: String,
        aadhaarNumber: String,
        bankAccount: String,
        ifscCode: String,
        bankAccountName: String,
        bankName: String,
        taxRegime: String,
        ifscSwiftCode: String,
        accountNumber: String
    },

    emergencyContact: {
        name: String,
        phone: String,
        relationship: String
    },

    documents: [{
        type: { type: String }, // e.g., 'aadhaar', 'pan', 'degree'
        path: String,
        originalName: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

// Hash password before saving
employeeSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

employeeSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
