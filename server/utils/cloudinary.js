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
// Configure Storage for Onboarding Documents
const onboardingStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folderName = 'antigraviity/onboarding/unknown';

        try {
            if (req.user && req.user.id) {
                // Lazy load model to ensure connection is ready and avoid circular deps
                const Employee = require('../models/Employee');
                const employee = await Employee.findById(req.user.id);

                if (employee) {
                    const name = employee.personalInfo?.fullName || 'candidate';
                    // Sanitize name: remove special chars, replace spaces with underscores
                    const sanitizedName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    folderName = `antigraviity/onboarding/${sanitizedName}_${employee._id}`;
                }
            }
        } catch (err) {
            console.error('[Cloudinary] Error generating dynamic folder:', err);
        }

        // Generate public_id
        const originalName = file.originalname.split('.')[0];
        const sanitizedFileName = originalName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const publicId = `${sanitizedFileName}_${Date.now()}`;

        return {
            folder: folderName,
            resource_type: 'auto', // Auto-detect: PDFs will be treated as images
            format: 'pdf',
            public_id: publicId
        };
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
