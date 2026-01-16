const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage for Onboarding Documents
const onboardingStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'antigraviity/onboarding',
        allowed_formats: ['jpg', 'png', 'pdf'],
        resource_type: 'auto'
    }
});

// Configure Storage for Career Resumes
const careerStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'antigraviity/resumes',
        allowed_formats: ['pdf', 'doc', 'docx'],
        resource_type: 'auto'
    }
});

const uploadDocs = multer({ storage: onboardingStorage });
const uploadResumes = multer({ storage: careerStorage });

module.exports = {
    cloudinary,
    uploadDocs,
    uploadResumes
};
