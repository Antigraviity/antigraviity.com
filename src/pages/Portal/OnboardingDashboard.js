import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomSelect from '../../components/CustomSelect';


const CheckIcon = ({ className = "w-5 h-5 text-green-500" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const UploadIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const UserIcon = ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LogoutIcon = ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const Confetti = () => {
    const particles = Array.from({ length: 50 });
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .confetti-piece {
                    position: absolute;
                    width: 8px;
                    height: 16px;
                    background: #000;
                    top: -20px;
                    animation: fall var(--duration) linear infinite;
                    left: var(--left);
                    animation-delay: var(--delay);
                    background-color: var(--color);
                }
            `}</style>
            {particles.map((_, i) => {
                const left = Math.random() * 100 + '%';
                const delay = Math.random() * 5 + 's';
                const duration = Math.random() * 3 + 2 + 's';
                const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                    <div
                        key={i}
                        className="confetti-piece"
                        style={{
                            '--left': left,
                            '--delay': delay,
                            '--duration': duration,
                            '--color': color
                        }}
                    />
                );
            })}
        </div>
    );
};

const VerifiedDocItem = ({ label, type, getDocPath, getFileUrl }) => {
    const path = getDocPath(type);
    return (
        <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-[11px] font-bold text-gray-900 truncate max-w-[150px]">{path ? path.split(/\\|\//).pop() : 'Not Uploaded'}</p>
                </div>
            </div>
            {path && (
                <a
                    href={getFileUrl(path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-black hover:text-white rounded-lg transition-all text-black border border-black/10"
                    title="View Document"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </a>
            )}
        </div>
    );
};

const SectionHeader = ({ number, title }) => (
    <div className="flex items-center gap-3 mb-6 mt-2">
        <span className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-900 text-[10px]">{number}</span>
        <h3 className="text-xs font-bold text-gray-900 capitalize tracking-wide">{title}</h3>
        <div className="h-px bg-gray-200 flex-grow" />
    </div>
);

const InputField = ({ label, name, value, onChange, placeholder, type = "text", mdSpan = 1, isTextArea = false, disabled = false, required = false }) => (
    <div className={`space-y-1.5 ${mdSpan === 2 ? 'md:col-span-2' : ''}`}>
        <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group overflow-hidden rounded-xl">
            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows="3"
                    disabled={disabled}
                    required={required}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none focus:bg-white focus:border-black transition-all duration-300 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none focus:bg-white focus:border-black transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                />
            )}
            {!disabled && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />}
        </div>
    </div>
);

const OnboardingDashboard = () => {
    const [showVerifiedInfo, setShowVerifiedInfo] = useState(false);
    const [showPostOfferVerified, setShowPostOfferVerified] = useState(false);
    const [showAllDetails, setShowAllDetails] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // A. Basic Info
        fullName: '',
        personalEmail: '',
        mobileNumber: '',
        currentCity: '',
        dob: '',

        // B. Employment Details
        position: '',
        workMode: '',
        joiningDate: '',
        currentCtc: '',
        expectedCtc: '',
        noticePeriod: '',

        // C. Education & Experience
        highestQualification: '',
        totalExperience: '',
        relevantExperience: '',
        currentEmployer: '',
        currentDesignation: '',

        // Post-Offer (Stage 2)
        currentAddress: '',
        panNumber: '',
        aadhaarNumber: '',
        bankAccount: '',
        ifscCode: '',
        emergencyName: '',
        emergencyPhone: '',
        emergencyRelationship: '',

        // New Stage 2 Fields
        bankAccountName: '',
        bankName: '',
        taxRegime: '',
        ifscSwiftCode: '',
        accountNumber: '',

        // Files
        resume: null,
        signedOfferLetter: null,
        aadhaarCopy: null,
        addressProof: null,
        panCopy: null,
        passportPhoto: null,
        degreeCert: null,
        markSheets: null,
        proCerts: null,
        passbookCopy: null
    });

    const [showResponse, setShowResponse] = useState(false);
    const navigate = useNavigate();

    // Derived State (Move up for scope)
    const currentStatus = employee ? (employee.onboardingStatus || 'Draft') : 'Draft';
    const currentStage = (currentStatus === 'Completed') ? 3 : (employee ? (Number(employee.stage) || 1) : 1);
    const isFresher = formData.totalExperience === 'Fresher';
    const isReadOnly = currentStatus === 'Pending Verification' || currentStatus === 'Completed';

    const stages = [
        { id: 1, title: 'Pre-Offer', desc: 'Basic info' },
        { id: 2, title: 'Post-Offer', desc: 'Legal docs' },
        { id: 3, title: 'Completed', desc: 'Onboarded' }
    ];

    const hasDocument = (type) => {
        return employee?.documents?.some(doc => doc.type === type);
    };

    const getDocPath = (type) => {
        return employee?.documents?.find(doc => doc.type === type)?.path;
    };

    const getFileUrl = (path) => {
        if (!path) return '#';
        const API_BASE_URL = 'http://localhost:5000';
        const normalizedPath = path.replace(/\\/g, '/');
        const cleanPath = normalizedPath.startsWith('uploads/') ? normalizedPath.slice(8) : normalizedPath;
        const encodedPath = cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
        return `${API_BASE_URL}/candidate-docs/${encodedPath}`;
    };

    const UploadIndicator = ({ type }) => {
        if (!hasDocument(type)) return null;
        return (
            <div className="flex items-center gap-2 mt-2 ml-4 animate-in fade-in slide-in-from-left-2 duration-500">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md border border-green-100">
                    <CheckIcon className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">File Uploaded</span>
                </div>
            </div>
        );
    };

    const fetchMe = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/onboarding/me', {
                headers: { 'x-auth-token': token }
            });
            setEmployee(res.data);

            // Populate Form Data
            const p = res.data.personalInfo || {};
            const emp = res.data.employmentDetails || {};
            const exp = res.data.experienceSummary || {};
            const leg = res.data.legalFinancial || {};
            const emg = res.data.emergencyContact || {};

            setFormData(prev => ({
                ...prev,
                // A
                fullName: p.fullName || '',
                personalEmail: p.personalEmail || '',
                mobileNumber: p.mobileNumber || '',
                currentCity: p.currentCity || '',
                dob: p.dob || '',
                // B
                position: emp.position || '',
                workMode: emp.workMode || '',
                joiningDate: emp.joiningDate || '',
                currentCtc: emp.currentCtc || '',
                expectedCtc: emp.expectedCtc || '',
                noticePeriod: emp.noticePeriod || '',
                // C
                highestQualification: exp.highestQualification || '',
                totalExperience: exp.totalExperience || '',
                relevantExperience: exp.relevantExperience || '',
                currentEmployer: exp.currentEmployer || '',
                currentDesignation: exp.currentDesignation || '',
                // Stage 2
                panNumber: leg.panNumber || '',
                aadhaarNumber: leg.aadhaarNumber || '',
                bankAccount: leg.bankAccount || '',
                ifscCode: leg.ifscCode || '',
                emergencyName: emg.name || '',
                emergencyPhone: emg.phone || '',
                emergencyRelationship: emg.relationship || '',
                // New Stage 2 Fields
                bankAccountName: leg.bankAccountName || '',
                bankName: leg.bankName || '',
                taxRegime: leg.taxRegime || '',
                ifscSwiftCode: leg.ifscSwiftCode || '',
                accountNumber: leg.accountNumber || ''
            }));
        } catch (err) {
            navigate('/candidate/login');
        }
    };

    useEffect(() => {
        fetchMe();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Numeric Only Validation
        if (name === 'mobileNumber' || name === 'emergencyPhone' || name === 'bankAccount' || name === 'accountNumber' || name === 'aadhaarNumber') {
            if (value && !/^\d+$/.test(value)) return;
        }

        // Length Limits
        if (name === 'mobileNumber' || name === 'emergencyPhone') {
            if (value.length > 10) return;
        }
        if (name === 'aadhaarNumber' && value.length > 12) return;
        if (name === 'panNumber') {
            if (value.length > 10) return;
            // PAN is typically alphanumeric and uppercase
            const upperValue = value.toUpperCase();
            if (value && !/^[A-Z0-9]*$/.test(upperValue)) return;
            setFormData({ ...formData, [name]: upperValue });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [name]: file }));
        }
    };

    const handleSubmit = async (e, isFinal = false) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // 1. Handle File Uploads first
            const fileFields = [
                'resume', 'signedOfferLetter', 'aadhaarCopy', 'addressProof',
                'panCopy', 'passportPhoto', 'degreeCert', 'markSheets',
                'proCerts', 'passbookCopy'
            ];

            for (const fieldName of fileFields) {
                if (formData[fieldName] && formData[fieldName] instanceof File) {
                    const fileData = new FormData();
                    fileData.append('document', formData[fieldName]);
                    fileData.append('type', fieldName);

                    await axios.post('/api/onboarding/upload', fileData, {
                        headers: {
                            'x-auth-token': token,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
            }

            // 2. Submit Text Data
            const data = {
                personalInfo: {
                    fullName: formData.fullName,
                    mobileNumber: formData.mobileNumber,
                    personalEmail: formData.personalEmail,
                    currentCity: formData.currentCity,
                    dob: formData.dob,
                    currentAddress: formData.currentAddress
                },
                employmentDetails: {
                    position: formData.position,
                    workMode: formData.workMode,
                    joiningDate: formData.joiningDate,
                    currentCtc: formData.currentCtc,
                    expectedCtc: formData.expectedCtc,
                    noticePeriod: formData.noticePeriod
                },
                experienceSummary: {
                    highestQualification: formData.highestQualification,
                    totalExperience: formData.totalExperience,
                    relevantExperience: formData.relevantExperience,
                    currentEmployer: formData.currentEmployer,
                    currentDesignation: formData.currentDesignation
                },
                legalFinancial: {
                    panNumber: formData.panNumber,
                    aadhaarNumber: formData.aadhaarNumber,
                    bankAccount: formData.bankAccount,
                    ifscCode: formData.ifscCode,
                    bankAccountName: formData.bankAccountName,
                    bankName: formData.bankName,
                    taxRegime: formData.taxRegime,
                    ifscSwiftCode: formData.ifscSwiftCode,
                    accountNumber: formData.accountNumber
                },
                emergencyContact: {
                    name: formData.emergencyName,
                    phone: formData.emergencyPhone,
                    relationship: formData.emergencyRelationship
                },
                isFinalSubmission: isFinal
            };

            const res = await axios.post('/api/onboarding/update', data, {
                headers: { 'x-auth-token': token }
            });
            setEmployee(res.data);
            window.scrollTo(0, 0);
            if (isFinal === true && currentStage === 2) {
                // Force a slightly longer wait for state to update
                setTimeout(() => fetchMe(), 500);
            }
        } catch (err) {
            console.error(err);
            alert('Error updating profile. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!employee) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">Loading...</div>;

    const experienceOptions = [
        { value: '', label: 'Select Experience' },
        { value: 'Fresher', label: 'Fresher' },
        { value: '1Yr', label: '1 Year' },
        { value: '2Yrs', label: '2 Years' },
        { value: '3Yrs', label: '3 Years' },
        { value: '4Yrs', label: '4 Years' },
        { value: '5+Yrs', label: '5+ Years' }
    ];

    const workModeOptions = [
        { value: '', label: 'Select Mode' },
        { value: 'Onsite', label: 'Onsite' },
        { value: 'Hybrid', label: 'Hybrid' },
        { value: 'Remote', label: 'Remote' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="/logo-black.webp" alt="Logo" className="h-10 w-auto" />
                        <div className="h-6 w-[1px] bg-gray-200 mx-1" />
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight text-gray-900 leading-tight">Candidate Dashboard</h1>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100/50 rounded-full border border-gray-100">
                            <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-[11px] font-bold text-gray-900 lowercase">{employee.email}</p>
                        </div>
                        <button
                            onClick={() => { localStorage.removeItem('token'); navigate('/candidate/login'); }}
                            className="group flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-[10px] font-black tracking-widest uppercase transition-all duration-200 pr-2"
                        >
                            <LogoutIcon className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Add padding to account for fixed header */}
            <div className="pt-32 px-4 md:px-8 pb-4 md:pb-8 max-w-5xl mx-auto">
                <main className="space-y-6">
                    {/* Stepper & Form Integration */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm p-6 md:p-10 lg:p-12">
                        {/* Progress Stepper */}
                        <div className="flex flex-col md:flex-row justify-between items-center relative mb-16">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2 hidden md:block" />
                            <div
                                className="absolute top-1/2 left-0 h-[1px] bg-green-500 -translate-y-1/2 transition-all duration-1000 hidden md:block"
                                style={{ width: `${Math.max(0, (employee.stage - 1) * 50)}%` }}
                            />

                            {stages.map((s) => (
                                <div key={s.id} className="relative z-10 flex flex-col items-center gap-3 bg-white px-6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${currentStage > s.id
                                        ? 'bg-green-50 border-green-500 shadow-lg shadow-green-100' // Completed Stages (Green)
                                        : (currentStage === s.id && currentStatus === 'Pending Verification')
                                            ? 'bg-amber-50 border-amber-500 shadow-lg shadow-amber-100' // Pending Verification (Amber)
                                            : (currentStage === s.id && currentStatus === 'Completed')
                                                ? 'bg-green-50 border-green-500 shadow-lg shadow-green-100' // Truly Completed (Green)
                                                : currentStage === s.id
                                                    ? 'bg-black text-white border-black scale-110 shadow-lg shadow-gray-200' // Active Stage (Black)
                                                    : 'bg-white text-gray-300 border-gray-100' // Future Stages (Gray)
                                        }`}>
                                        {currentStage > s.id ? (
                                            <CheckIcon />
                                        ) : (currentStage === s.id && currentStatus === 'Pending Verification') ? (
                                            <span className="text-amber-600 font-bold animate-pulse">!</span> /* Amber Exclamation for Pending */
                                        ) : (currentStage === s.id && currentStatus === 'Completed') ? (
                                            <CheckIcon />
                                        ) : (
                                            <span className="text-xs font-bold">{s.id}</span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className={`text-xs font-bold capitalize tracking-wide ${employee.stage >= s.id ? 'text-gray-900' : 'text-gray-300'}`}>
                                            {s.title}
                                        </h3>
                                        <p className="text-[11px] capitalize font-bold tracking-tight text-gray-400 mt-0.5">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="max-w-3xl mx-auto">
                            {/* SUCCESS VIEW (Top of Content if Stage 3) */}
                            {currentStage === 3 && (
                                <div className="space-y-8 animate-in fade-in zoom-in duration-700 relative mb-12">
                                    <Confetti />
                                    <div className="text-center py-6 space-y-8 relative z-10">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100 shadow-sm relative">
                                            <CheckIcon className="w-10 h-10 text-green-600" />
                                            <div className="absolute -inset-1 border-2 border-green-500 rounded-full animate-ping opacity-20" />
                                        </div>
                                        <div className="space-y-3">
                                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Onboarding Completed!</h2>
                                            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed font-medium">
                                                Congratulations! Your official onboarding process is now complete. Our team will reach out to you shortly regarding your next steps and induction schedule.
                                            </p>
                                        </div>
                                        <div className="pt-2 flex flex-col items-center gap-4">
                                            <span className="px-6 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                                                Status: Post-Offer Verified
                                            </span>
                                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Welcome to the AntiGraviity Family</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* COMBINED VERIFIED DETAILS (Stage 3 Only) */}
                            {currentStage === 3 && (
                                <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                    <button
                                        onClick={() => setShowAllDetails(!showAllDetails)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100 transition-all group border border-gray-100 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckIcon className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-gray-900">Your Verified Details</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Review all your pre-offer and post-offer submissions</p>
                                            </div>
                                        </div>
                                        <div className={`transition-transform duration-300 ${showAllDetails ? 'rotate-180' : ''}`}>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {showAllDetails && (
                                        <div className="mt-10 space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
                                            {/* Pre-Offer Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded border border-green-100">Phase 1</span>
                                                    <h4 className="text-sm font-bold text-gray-900">Pre-Offer Information</h4>
                                                    <div className="flex-grow h-px bg-gray-100" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grayscale-[0.5] pointer-events-none">
                                                    <InputField label="Full Legal Name" value={formData.fullName} disabled />
                                                    <InputField label="Personal Email ID" value={formData.personalEmail} disabled />
                                                    <InputField label="Mobile Number" value={formData.mobileNumber} disabled />
                                                    <InputField label="Date of Birth" value={formData.dob} disabled />
                                                    <InputField label="Position" value={formData.position} disabled />
                                                    <InputField label="Joining Date" value={formData.joiningDate} disabled />
                                                </div>
                                            </div>

                                            {/* Post-Offer Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded border border-green-100">Phase 2</span>
                                                    <h4 className="text-sm font-bold text-gray-900">Post-Offer Documentation</h4>
                                                    <div className="flex-grow h-px bg-gray-100" />
                                                </div>

                                                <div className="space-y-12 grayscale-[0.5] pointer-events-none">
                                                    {/* A. Offer Acceptance */}
                                                    <div className="space-y-4">
                                                        <SectionHeader number="A" title="Offer Acceptance" />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <VerifiedDocItem label="Signed Offer Letter" type="signedOfferLetter" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                        </div>
                                                    </div>

                                                    {/* B. Identity & Address Proof */}
                                                    <div className="space-y-4">
                                                        <SectionHeader number="B" title="Identity & Address Proof" />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <InputField label="Aadhaar Card Number" value={formData.aadhaarNumber} disabled />
                                                            <InputField label="PAN Card Number" value={formData.panNumber} disabled />
                                                            <InputField label="Permanent Address" value={formData.currentAddress} mdSpan={2} isTextArea disabled />
                                                            <VerifiedDocItem label="Aadhaar ID Copy" type="aadhaarCopy" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                            <VerifiedDocItem label="Address Proof" type="addressProof" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                            <VerifiedDocItem label="PAN ID Copy" type="panCopy" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                            <VerifiedDocItem label="Passport-size Photo" type="passportPhoto" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                        </div>
                                                    </div>

                                                    {/* C. Education Documents */}
                                                    <div className="space-y-4">
                                                        <SectionHeader number="C" title="Education Documents" />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <VerifiedDocItem label="Degree Certificates" type="degreeCert" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                            <VerifiedDocItem label="Mark Sheets" type="markSheets" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                            <VerifiedDocItem label="Professional Certifications" type="proCerts" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                        </div>
                                                    </div>

                                                    {/* D. Bank & Payroll Details */}
                                                    <div className="space-y-4">
                                                        <SectionHeader number="D" title="Bank & Payroll Details" />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <InputField label="Bank Name" value={formData.bankName} disabled />
                                                            <InputField label="Account Holder" value={formData.bankAccountName} disabled />
                                                            <InputField label="Account Number" value={formData.accountNumber} disabled />
                                                            <InputField label="IFSC / SWIFT" value={formData.ifscSwiftCode} disabled />
                                                            <InputField label="Tax Regime" value={formData.taxRegime} disabled />
                                                            <VerifiedDocItem label="Passbook Frontpage Copy" type="passbookCopy" getDocPath={getDocPath} getFileUrl={getFileUrl} />
                                                        </div>
                                                    </div>

                                                    {/* Emergency Contact */}
                                                    <div className="space-y-4">
                                                        <SectionHeader number="E" title="Emergency Contact" />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <InputField label="Contact Name" value={formData.emergencyName} disabled />
                                                            <InputField label="Phone" value={formData.emergencyPhone} disabled />
                                                            <InputField label="Relationship" value={formData.emergencyRelationship} mdSpan={2} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-[10px] text-center text-gray-400 font-bold italic">This information is locked and verified by the HR team.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* INDIVIDUAL COLLAPSIBLE VERIFIED INFO (Only if NOT in Stage 3) */}
                            {currentStage === 2 && (
                                <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                    <button
                                        onClick={() => setShowVerifiedInfo(!showVerifiedInfo)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckIcon className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-gray-900">Pre-Offer Details Verified</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Click to {showVerifiedInfo ? 'hide' : 'view'} your submission</p>
                                            </div>
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showVerifiedInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showVerifiedInfo && (
                                        <div className="mt-8 space-y-10 animate-in fade-in slide-in-from-top-4 duration-500 grayscale-[0.5] pointer-events-none">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Full Legal Name" value={formData.fullName} disabled />
                                                <InputField label="Personal Email ID" value={formData.personalEmail} disabled />
                                                <InputField label="Mobile Number" value={formData.mobileNumber} disabled />
                                                <InputField label="Date of Birth" value={formData.dob} disabled />
                                                <InputField label="Position" value={formData.position} disabled />
                                                <InputField label="Joining Date" value={formData.joiningDate} disabled />
                                            </div>
                                            <p className="text-[10px] text-center text-gray-400 font-bold italic">This information is now locked and verified.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* PENDING VERIFICATION STATE */}
                            {currentStatus === 'Pending Verification' && (
                                <div className="text-center py-10 space-y-6 mb-12 bg-amber-50/50 rounded-lg border border-amber-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-100 shadow-sm relative z-10">
                                        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                    <div className="space-y-2 relative z-10">
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Documents Verification Pending</h2>
                                        <p className="text-gray-500 text-xs max-w-sm mx-auto lowercase font-bold tracking-wide leading-relaxed">
                                            <span className="capitalize">Our</span> hr team is validating your details.<br />check back soon for the next steps.
                                        </p>
                                    </div>
                                    <div className="pt-2 relative z-10 flex flex-col items-center gap-4">
                                        <span className="px-5 py-2 bg-white text-amber-600 rounded-full text-xs font-bold capitalize tracking-wide border border-amber-100 shadow-sm">
                                            Status: Pending
                                        </span>
                                        <button
                                            onClick={() => setShowResponse(!showResponse)}
                                            className="flex items-center gap-2 text-gray-400 hover:text-amber-600 text-xs font-bold capitalize tracking-wide transition-colors mt-2"
                                        >
                                            {showResponse ? 'Hide Response' : 'See Your Response'}
                                            <svg className={`w-4 h-4 transition-transform duration-300 ${showResponse ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* PRE-OFFER STAGE (1) - Only show if currentStage is 1 */}
                            {currentStage === 1 && (
                                <div className={`space-y-10 transition-all duration-700 ${currentStatus === 'Pending Verification' ? 'pointer-events-none grayscale-[0.5]' : 'opacity-100'} ${currentStatus === 'Pending Verification' && !showResponse ? 'hidden' : 'block'}`}>
                                    <div className="text-center space-y-2 mb-12">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                            {currentStatus === 'Pending Verification' ? 'Verification in Progress' : 'Complete your Pre-Offer Profile'}
                                        </h2>
                                        <p className="text-gray-400 text-sm italic">
                                            {currentStatus === 'Pending Verification' ? 'We are reviewing your submission.' : 'Please provide accurate details for offer generation.'}
                                        </p>
                                    </div>

                                    <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-12">
                                        <div className="space-y-6">
                                            <SectionHeader number="A" title="Basic Candidate Information" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Full Legal Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per aadhar ID" disabled={isReadOnly} required />
                                                <InputField label="Personal Email ID" name="personalEmail" value={formData.personalEmail} onChange={handleChange} placeholder="email@example.com" disabled={isReadOnly} required />
                                                <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit number" disabled={isReadOnly} required />
                                                <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} placeholder="" disabled={isReadOnly} required />
                                                <InputField label="Current City & Country" name="currentCity" value={formData.currentCity} onChange={handleChange} placeholder="e.g. Bangalore, India" mdSpan={2} disabled={isReadOnly} required />
                                            </div>
                                        </div>

                                        {/* B. Employment Details (Offer Inputs) */}
                                        <div className="space-y-6">
                                            <SectionHeader number="B" title="Employment Details (Offer Inputs)" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Position Applied For" name="position" value={formData.position} onChange={handleChange} placeholder="e.g. Frontend Developer" disabled={isReadOnly} required />
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Work Mode <span className="text-red-400">*</span></label>
                                                    <CustomSelect name="workMode" value={formData.workMode} onChange={handleChange} options={workModeOptions} isLightTheme disabled={isReadOnly} />
                                                </div>
                                                <InputField label="Proposed Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} placeholder="" disabled={isReadOnly} required />
                                                <div className="hidden md:block"></div> {/* Spacer */}
                                                <InputField label="Current CTC" name="currentCtc" value={formData.currentCtc} onChange={handleChange} placeholder="e.g. 10 LPA" disabled={isReadOnly} required />
                                                <InputField label="Expected CTC" name="expectedCtc" value={formData.expectedCtc} onChange={handleChange} placeholder="e.g. 15 LPA" disabled={isReadOnly} required />
                                                <InputField label="Notice Period" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="Days (mention LWD if serving)" mdSpan={2} disabled={isReadOnly} required />
                                            </div>
                                        </div>

                                        {/* C. Education & Experience Summary */}
                                        <div className="space-y-6">
                                            <SectionHeader number="C" title="Education & Experience Summary" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Highest Qualification" name="highestQualification" value={formData.highestQualification} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" disabled={isReadOnly} required />

                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Total Experience <span className="text-red-400">*</span></label>
                                                    <CustomSelect name="totalExperience" value={formData.totalExperience} onChange={handleChange} options={experienceOptions} isLightTheme disabled={isReadOnly} />
                                                </div>

                                                {formData.totalExperience && formData.totalExperience !== 'Fresher' && (
                                                    <>
                                                        <InputField label="Relevant Experience" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} placeholder="e.g. 2.5 Years" disabled={isReadOnly} required />
                                                        <InputField label="Current Designation" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} placeholder="e.g. Associate Engineer" disabled={isReadOnly} required />
                                                        <InputField label="Current Employer Name" name="currentEmployer" value={formData.currentEmployer} onChange={handleChange} placeholder="Company Name" mdSpan={2} disabled={isReadOnly} required />
                                                    </>
                                                )}

                                                <div className="md:col-span-2 space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">
                                                        Upload Resume <span className="text-gray-400 font-normal normal-case tracking-normal">(PDF, DOCX - Max 5MB)</span>
                                                    </label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input
                                                            type="file"
                                                            name="resume"
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                            disabled={isReadOnly}
                                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black"
                                                        />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {currentStage === 1 && currentStatus !== 'Pending Verification' && (
                                            <div className="pt-8 border-t border-gray-50 flex justify-center">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all text-sm capitalize tracking-wide disabled:opacity-50"
                                                >
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}



                            {/* POST-OFFER STAGE (2) */}
                            {currentStage === 2 && (
                                <div className={`space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ${currentStatus === 'Pending Verification' ? 'pointer-events-none grayscale-[0.5]' : 'opacity-100'} ${currentStatus === 'Pending Verification' && !showResponse ? 'hidden' : 'block'}`}>
                                    <div className="text-center space-y-2 mb-12">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Official Documentation</h2>
                                        <p className="text-gray-400 text-sm italic">
                                            {currentStatus === 'Pending Verification' ? 'Verification in Progress' : 'Please complete your comprehensive profile for onboarding.'}
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-12">

                                        {/* A. Offer Acceptance */}
                                        <div className="space-y-6">
                                            <SectionHeader number="A" title="Offer Acceptance" />
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">
                                                        Upload Signed Offer Letter <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="signedOfferLetter" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('signedOfferLetter')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="signedOfferLetter" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* B. Identity & Address Proof */}
                                        <div className="space-y-6">
                                            <SectionHeader number="B" title="Identity & Address Proof" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Aadhaar Card Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="12-digit number" disabled={isReadOnly} required />
                                                <InputField label="PAN Card Number" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="ABCDE1234F" disabled={isReadOnly} required />

                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Aadhaar ID Copy <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="aadhaarCopy" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('aadhaarCopy')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="aadhaarCopy" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Address Proof <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="addressProof" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('addressProof')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="addressProof" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">PAN ID Copy <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="panCopy" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('panCopy')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="panCopy" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Passport-size Photo <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="passportPhoto" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('passportPhoto')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="passportPhoto" />
                                                </div>
                                                <InputField label="Permanent Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Full residential address" mdSpan={2} isTextArea disabled={isReadOnly} required />
                                            </div>
                                        </div>

                                        {/* C. Education Documents */}
                                        <div className="space-y-6">
                                            <SectionHeader number="C" title="Education Documents" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Degree Certificates <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="degreeCert" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('degreeCert')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="degreeCert" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Mark Sheets <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="markSheets" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('markSheets')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="markSheets" />
                                                </div>
                                                <div className="md:col-span-2 space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Professional Certifications</label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="proCerts" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="proCerts" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* E. Bank & Payroll Details */}
                                        <div className="space-y-6">
                                            <SectionHeader number="E" title="Bank & Payroll Details" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Bank Account Holder Name" name="bankAccountName" value={formData.bankAccountName} onChange={handleChange} placeholder="As per bank records" disabled={isReadOnly} required />
                                                <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" disabled={isReadOnly} required />
                                                <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Numbers only" disabled={isReadOnly} required />
                                                <InputField label="IFSC / SWIFT Code" name="ifscSwiftCode" value={formData.ifscSwiftCode} onChange={handleChange} placeholder="HBIN00..." disabled={isReadOnly} required />
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Tax Regime Selection <span className="text-red-500">*</span></label>
                                                    <CustomSelect name="taxRegime" value={formData.taxRegime} onChange={handleChange} options={[{ value: '', label: 'Select Regime' }, { value: 'Old', label: 'Old Regime' }, { value: 'New', label: 'New Regime' }]} isLightTheme disabled={isReadOnly} required />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold capitalize tracking-wide text-gray-900 ml-4">Passbook Frontpage Copy <span className="text-red-500">*</span></label>
                                                    <div className="relative group overflow-hidden rounded-xl">
                                                        <input type="file" name="passbookCopy" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100/50 file:text-gray-900 hover:file:bg-gray-100 transition-all cursor-pointer border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:border-black" disabled={isReadOnly} required={!hasDocument('passbookCopy')} />
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                                                            <UploadIcon />
                                                        </div>
                                                        {!isReadOnly && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />}
                                                    </div>
                                                    <UploadIndicator type="passbookCopy" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div className="space-y-6">
                                            <SectionHeader number="F" title="Emergency Contact" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <InputField label="Contact Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Full name" disabled={isReadOnly} required />
                                                <InputField label="Phone Number" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="10 digit mobile" disabled={isReadOnly} required />
                                                <InputField label="Relationship" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} placeholder="e.g. Father/Spouse" mdSpan={2} disabled={isReadOnly} required />
                                            </div>
                                        </div>

                                        {currentStatus !== 'Pending Verification' && currentStatus !== 'Completed' && (
                                            <div className="pt-8 border-t border-gray-50 flex justify-center">
                                                <button
                                                    onClick={(e) => handleSubmit(e, true)}
                                                    disabled={loading}
                                                    className="px-10 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all text-sm capitalize tracking-wide disabled:opacity-50"
                                                >
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}

                        </div>
                    </div>


                </main >
            </div >
        </div >
    );
};

export default OnboardingDashboard;
