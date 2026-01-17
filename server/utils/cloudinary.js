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
        resource_type: 'auto',
        access_mode: 'public',
        public_id: (req, file) => {
            // Remove extension and sanitize filename
            const originalName = file.originalname.split('.')[0];
            const sanitized = originalName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            return `${sanitized}_${Date.now()}`;
        }
    }
});

// Configure Storage for Career Resumes
const careerStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'antigraviity/resumes',
        allowed_formats: ['pdf', 'doc', 'docx'],
        resource_type: 'auto',
        access_mode: 'public',
        type: 'upload'
    }
});

const uploadDocs = multer({ storage: onboardingStorage });
const uploadResumes = multer({ storage: careerStorage });

module.exports = {
    cloudinary,
    uploadDocs,
    uploadResumes
};
