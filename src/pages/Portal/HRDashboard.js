import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OfferLetter from '../../components/OfferLetter';

const HRDashboard = () => {
    const API_BASE_URL = 'http://localhost:5000';
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [hrUser, setHrUser] = useState(null);

    // Confirmation Modal State
    const [confirmation, setConfirmation] = useState({
        isOpen: false,
        type: null, // 'approve' | 'reject'
        candidateId: null,
        title: '',
        message: ''
    });

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('Dashboard'); // 'Dashboard' | 'Jobs' | 'Employees' | 'Settings'
    const [activeDetailTab, setActiveDetailTab] = useState('Pre Offer'); // 'Pre Offer' | 'Interview Assessment' | 'Post Offer'
    const [activeCandidateTab, setActiveCandidateTab] = useState('Active'); // 'Active' | 'Pending' | 'Onboarded'
    const [showOfferPreview, setShowOfferPreview] = useState(false);

    // Edit Mode State
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

    // Excel Export State
    const [isExporting, setIsExporting] = useState(false);
    const [exportFilter, setExportFilter] = useState('all');

    useEffect(() => {
        fetchCandidates();
        fetchHrUser();
    }, []);

    const fetchHrUser = async () => {
        try {
            const token = localStorage.getItem('hr_token');
            const res = await axios.get('/api/onboarding/me', {
                headers: { 'x-auth-token': token }
            });
            setHrUser(res.data);
        } catch (err) {
            console.error('[Frontend] Error fetching HR details:', err);
        }
    };

    // Sidebar Sub-component
    const Sidebar = () => {
        const menus = [
            { name: 'Dashboard', icon: <DashboardIcon /> },
            { name: 'Jobs', icon: <BriefcaseIcon /> },
            { name: 'Employees', icon: <UserGroupIcon /> },
            { name: 'Settings', icon: <SettingsIcon /> },
        ];

        return (
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 z-[60] flex flex-col animate-in slide-in-from-left duration-500">
                <div className="p-8 border-b border-gray-50 mb-4 flex items-center justify-center">
                    <img src="/logo-black.webp" alt="Logo" className="h-11 w-auto" />
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-2">
                    {menus.map((menu) => (
                        <button
                            key={menu.name}
                            onClick={() => setActiveMenu(menu.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all tracking-wide ${activeMenu === menu.name
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-400 hover:bg-gray-50/50 hover:text-gray-900'
                                }`}
                        >
                            <span className={`transition-colors ${activeMenu === menu.name ? 'text-black' : 'text-gray-400'}`}>
                                {menu.icon}
                            </span>
                            {menu.name}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                    <button
                        onClick={() => { localStorage.removeItem('hr_token'); navigate('/hr/login'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all tracking-wide"
                    >
                        <SignOutIcon />
                        Sign Out
                    </button>
                </div>
            </aside>
        );
    };

    const fetchCandidates = async () => {
        try {
            console.log('[Frontend] Fetching candidates...');
            const token = localStorage.getItem('hr_token');
            console.log('[Frontend] HR Token present in localStorage:', !!token);
            if (token) {
                console.log('[Frontend] Token (first 20 chars):', token.substring(0, 20) + '...');
            } else {
                console.error('[Frontend] NO HR TOKEN FOUND! User may need to re-login.');
            }

            const res = await axios.get('/api/onboarding/candidates', {
                headers: { 'x-auth-token': token }
            });
            console.log('[Frontend] Candidates response payload type:', typeof res.data);
            console.log('[Frontend] Is array?', Array.isArray(res.data));

            if (Array.isArray(res.data)) {
                console.log(`[Frontend] Received ${res.data.length} candidates`);
                res.data.forEach(c => {
                    console.log(`[Frontend] Candidate: ${c.email} | Status: ${c.onboardingStatus} | Stage: ${c.stage}`);
                });
                setCandidates(res.data);
            } else {
                console.error('[Frontend] Invalid response format. Expected array, got:', res.data);
                // If we get HTML (string starting with <!DOCTYPE), it might be the catch-all
                if (typeof res.data === 'string' && res.data.includes('<!DOCTYPE')) {
                    console.error('[Frontend] Received HTML instead of JSON. Catch-all route hit?');
                }
                setCandidates([]);
            }
            setLoading(false);
        } catch (err) {
            console.error('[Frontend] fetchCandidates error:', err);
            setLoading(false);
        }
    };

    const initiateApprove = (id) => {
        setConfirmation({
            isOpen: true,
            type: 'approve',
            candidateId: id,
            title: 'Approve Candidate',
            message: 'Are you sure you want to approve this candidate for the next stage?'
        });
    };

    const initiateReject = (id) => {
        setConfirmation({
            isOpen: true,
            type: 'reject',
            candidateId: id,
            title: 'Reject Candidate',
            message: 'Are you sure you want to reject this candidate? This action cannot be undone.'
        });
    };


    const handleConfirmAction = async () => {
        const { type, candidateId } = confirmation;

        if (type === 'approve') {
            try {
                const token = localStorage.getItem('hr_token');
                const res = await axios.post(`/api/onboarding/hr-approve/${candidateId}`, {}, {
                    headers: { 'x-auth-token': token }
                });
                console.log('[Frontend] Approve response:', res.data);
                await fetchCandidates();
                // Instead of closing, refresh the selected candidate data
                const updatedCandidate = res.data.employee;
                setSelectedCandidate(updatedCandidate);
            } catch (err) {
                console.error('[Frontend] Approve error:', err);
                alert('Error approving candidate');
            }
        } else if (type === 'reject') {
            alert('Reject functionality coming soon!');
            // Implement actual reject logic here later
        } else if (type === 'verify') {
            alert('Documents marked as verified locally.');
            // Implement actual verify logic here later
        }

        closeConfirmation();
    };

    // Edit Mode Functions
    const handleEditToggle = () => {
        if (isEditMode) {
            // Cancel edit
            setIsEditMode(false);
            setEditedData({});
            setSaveMessage({ type: '', text: '' });
        } else {
            // Enter edit mode
            setIsEditMode(true);
            setEditedData({
                personalInfo: { ...selectedCandidate.personalInfo },
                education: { ...selectedCandidate.education },
                employmentDetails: { ...selectedCandidate.employmentDetails },
                experienceSummary: { ...selectedCandidate.experienceSummary },
                legalFinancial: { ...selectedCandidate.legalFinancial },
                emergencyContact: { ...selectedCandidate.emergencyContact }
            });
        }
    };

    const handleFieldChange = (section, field, value) => {
        setEditedData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('hr_token');
            const res = await axios.post(`/api/onboarding/hr-update/${selectedCandidate._id}`, editedData, {
                headers: { 'x-auth-token': token }
            });

            setSelectedCandidate(res.data.employee);
            await fetchCandidates();
            setIsEditMode(false);
            setEditedData({});
            setSaveMessage({ type: 'success', text: 'Changes saved successfully!' });
            setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            console.error('Save error:', err);
            setSaveMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    // Excel Export Function - Client-side generation
    const handleExcelExport = async () => {
        setIsExporting(true);
        try {
            // Import XLSX library
            const XLSX = await import('xlsx');

            const token = localStorage.getItem('hr_token');
            // Fetch JSON data instead of Excel file
            const response = await axios.get(`/api/onboarding/export-data?filter=${exportFilter}`, {
                headers: { 'x-auth-token': token }
            });

            const employees = response.data;

            // Prepare data for Excel
            const excelData = employees.map(emp => {
                const docs = emp.documents || [];
                const getDocUrl = (type) => {
                    const doc = docs.find(d => d.type === type);
                    return doc ? doc.path : '';
                };

                return {
                    'Full Name': emp.personalInfo?.fullName || '',
                    'Email': emp.email || '',
                    'Mobile': emp.personalInfo?.mobileNumber || '',
                    'DOB': emp.personalInfo?.dob || '',
                    'Current City': emp.personalInfo?.currentCity || '',
                    'Current Address': emp.personalInfo?.currentAddress || '',
                    'School Name': emp.personalInfo?.schoolName || '',
                    'Highest Qualification': emp.education?.highestQualification || '',
                    'Institution Name': emp.education?.institutionName || '',
                    'Institution Location': emp.education?.institutionLocation || '',
                    'Total Experience': emp.experienceSummary?.totalExperience || '',
                    'Current Employer': emp.experienceSummary?.currentEmployer || '',
                    'Current Designation': emp.experienceSummary?.currentDesignation || '',
                    'Relevant Experience': emp.experienceSummary?.relevantExperience || '',
                    'Current CTC': emp.experienceSummary?.currentCtc || '',
                    'Expected CTC': emp.experienceSummary?.expectedCtc || '',
                    'Position': emp.employmentDetails?.position || '',
                    'Work Mode': emp.employmentDetails?.workMode || '',
                    'Preferred Location': emp.employmentDetails?.preferredLocation || '',
                    'Joining Date': emp.employmentDetails?.joiningDate || '',
                    'Notice Period': emp.employmentDetails?.noticePeriod || '',
                    'PAN Number': emp.legalFinancial?.panNumber || '',
                    'Aadhaar Number': emp.legalFinancial?.aadhaarNumber || '',
                    'Bank Name': emp.legalFinancial?.bankName || '',
                    'Account Holder': emp.legalFinancial?.bankAccountName || '',
                    'Account Number': emp.legalFinancial?.accountNumber || emp.legalFinancial?.bankAccount || '',
                    'IFSC/SWIFT': emp.legalFinancial?.ifscSwiftCode || emp.legalFinancial?.ifscCode || '',
                    'Tax Regime': emp.legalFinancial?.taxRegime || '',
                    'Emergency Contact Name': emp.emergencyContact?.name || '',
                    'Emergency Phone': emp.emergencyContact?.phone || '',
                    'Emergency Relationship': emp.emergencyContact?.relationship || '',
                    'Onboarding Status': emp.onboardingStatus || '',
                    'Stage': emp.stage || '',
                    'Progress %': emp.progressPercentage || 0,
                    'Resume URL': getDocUrl('resume'),
                    'Signed Offer Letter URL': getDocUrl('signedOfferLetter'),
                    'Aadhaar Copy URL': getDocUrl('aadhaarCopy'),
                    'PAN Copy URL': getDocUrl('panCopy'),
                    'Address Proof URL': getDocUrl('addressProof'),
                    'Passport Photo URL': getDocUrl('passportPhoto'),
                    'Degree Certificate URL': getDocUrl('degreeCert'),
                    'Mark Sheets URL': getDocUrl('markSheets'),
                    'Professional Certificates URL': getDocUrl('proCerts'),
                    'Passbook Copy URL': getDocUrl('passbookCopy')
                };
            });

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Set column widths
            ws['!cols'] = [
                { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 12 }, { wch: 20 },
                { wch: 40 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 25 },
                { wch: 15 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 },
                { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 18 }, { wch: 12 },
                { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 25 },
                { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 15 },
                { wch: 15 }, { wch: 20 }, { wch: 8 }, { wch: 10 }, { wch: 50 },
                { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 },
                { wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }
            ];

            XLSX.utils.book_append_sheet(wb, ws, 'Employees');

            // Generate and download file
            const filename = `employees_${exportFilter}_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(wb, filename);
        } catch (err) {
            console.error('Export error:', err);
            alert('Failed to export data. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const closeConfirmation = () => {
        setConfirmation({ ...confirmation, isOpen: false });
    };

    // Helper to construct correctly encoded file URLs
    const getFileUrl = (doc, isDownload = false) => {
        if (!doc || !doc.path) return '#';
        const path = doc.path;

        // If path is already a full URL (like Cloudinary), handle it
        if (path.startsWith('http')) {
            if (path.includes('res.cloudinary.com')) {
                let url = path;
                // For PDFs, we want to force download/attachment to avoid layout issues in some browsers
                const isPdf = path.toLowerCase().endsWith('.pdf') || doc.type?.toLowerCase().includes('pdf') || doc.originalName?.toLowerCase().endsWith('.pdf');

                if (isPdf && url.includes('/upload/')) {
                    // Inject fl_attachment and optionally the original filename for cleaner saving
                    // format: /upload/fl_attachment:filename_here/v123/...
                    const sanitizedName = (doc.originalName || 'document.pdf').replace(/[^a-z0-9.]/gi, '_');
                    url = url.replace('/upload/', `/upload/fl_attachment:${sanitizedName}/`);
                }
                return url;
            }
            return path;
        }

        // Convert Windows backslashes to forward slashes
        const normalizedPath = path.replace(/\\/g, '/');
        // Strip leading 'uploads/' if present to match the backend's manual route
        const cleanPath = normalizedPath.startsWith('uploads/')
            ? normalizedPath.slice(8)
            : normalizedPath;

        const encodedPath = cleanPath.split('/')
            .map(segment => encodeURIComponent(segment))
            .join('/');

        return `${API_BASE_URL}/candidate-docs/${encodedPath}`;
    };

    const stats = {
        total: candidates.length,
        pending: candidates.filter(c => c.onboardingStatus === 'Pending Verification').length,
        onboarded: candidates.filter(c => c.onboardingStatus === 'Completed').length
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
            <Sidebar />

            <div className="flex-1 ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 capitalize">HRMS Dashboard</h1>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded tracking-wider">Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-gray-900 leading-none">Human Resource</p>
                            <p className="text-[10px] text-gray-400 font-bold tracking-tight">{hrUser?.email || 'hr@antigraviity.com'}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                            {hrUser?.email ? hrUser.email[0].toUpperCase() : 'H'}
                        </div>
                    </div>
                </header>

                <main className="p-8 flex-1">
                    {selectedCandidate ? (
                        // Detailed View (Inline) - Shared
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Detail Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => { setSelectedCandidate(null); setIsEditMode(false); setEditedData({}); setSaveMessage({ type: '', text: '' }); }}
                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all bg-white"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </button>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.personalInfo?.fullName || 'Candidate Details'}</h3>
                                        <p className="text-[10px] text-gray-400 font-bold tracking-wider">{selectedCandidate.email} • {selectedCandidate.personalInfo?.mobileNumber || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {saveMessage.text && (
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${saveMessage.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {saveMessage.text}
                                        </span>
                                    )}
                                    {isEditMode ? (
                                        <>
                                            <button
                                                onClick={handleEditToggle}
                                                className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveChanges}
                                                disabled={isSaving}
                                                className="px-4 py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Saving...
                                                    </>
                                                ) : 'Save Changes'}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleEditToggle}
                                            className="px-4 py-2 text-xs font-bold text-black border border-black rounded-lg hover:bg-black hover:text-white transition-all flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                    )}
                                    <StatusBadge status={selectedCandidate.onboardingStatus} stage={selectedCandidate.stage} />
                                </div>
                            </div>

                            {/* Detail Tabs */}
                            <div className="px-8 border-b border-gray-100 flex gap-8">
                                {['Pre Offer', 'Interview Assessment', 'Post Offer'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveDetailTab(tab)}
                                        className={`py-4 text-xs font-bold tracking-wider transition-all border-b-2 ${activeDetailTab === tab
                                            ? 'border-black text-black'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Detail Content */}
                            <div className="p-8 min-h-[500px]">
                                {activeDetailTab === 'Pre Offer' && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
                                        {selectedCandidate.onboardingStatus === 'Draft' ? (
                                            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200 p-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900">Application in Draft</h4>
                                                <p className="text-sm text-gray-500 font-medium text-center max-w-xs">
                                                    The candidate has not submitted their application yet. Full details will be available once the application is submitted.
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                {selectedCandidate.stage >= 2 && (
                                                    <div className="flex justify-between items-center -mb-8">
                                                        <button
                                                            onClick={() => setShowOfferPreview(true)}
                                                            className="bg-black text-white px-6 py-2 rounded-lg text-[10px] font-black tracking-widest hover:bg-gray-800 transition-all shadow-lg uppercase"
                                                        >
                                                            View / Export Offer Letter
                                                        </button>
                                                        <span className="bg-green-50 text-green-600 border border-green-100 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
                                                            Stage 1 Selected (Pre Offer Approved)
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Section A: Basic Info */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">1. Basic Information</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                        <DetailItem label="Full Name" value={isEditMode ? editedData.personalInfo?.fullName : selectedCandidate.personalInfo?.fullName} isEditable={isEditMode} section="personalInfo" field="fullName" onEdit={handleFieldChange} />
                                                        <DetailItem label="Personal Email" value={isEditMode ? editedData.personalInfo?.personalEmail : selectedCandidate.personalInfo?.personalEmail} isEditable={isEditMode} section="personalInfo" field="personalEmail" onEdit={handleFieldChange} />
                                                        <DetailItem label="Mobile" value={isEditMode ? editedData.personalInfo?.mobileNumber : selectedCandidate.personalInfo?.mobileNumber} isEditable={isEditMode} section="personalInfo" field="mobileNumber" onEdit={handleFieldChange} />
                                                        <DetailItem label="DOB" value={isEditMode ? editedData.personalInfo?.dob : selectedCandidate.personalInfo?.dob} isEditable={isEditMode} section="personalInfo" field="dob" onEdit={handleFieldChange} />
                                                        <DetailItem label="Current City" value={isEditMode ? editedData.personalInfo?.currentCity : selectedCandidate.personalInfo?.currentCity} isEditable={isEditMode} section="personalInfo" field="currentCity" onEdit={handleFieldChange} />
                                                        <DetailItem label="Higher Secondary School" value={isEditMode ? editedData.personalInfo?.schoolName : selectedCandidate.personalInfo?.schoolName} mdSpan={2} isEditable={isEditMode} section="personalInfo" field="schoolName" onEdit={handleFieldChange} />
                                                    </div>
                                                </div>

                                                {/* Section B: Education */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">2. Education</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                        <DetailItem label="Highest Qualification" value={isEditMode ? editedData.education?.highestQualification : selectedCandidate.education?.highestQualification} isEditable={isEditMode} section="education" field="highestQualification" onEdit={handleFieldChange} />
                                                        <DetailItem label="Institution Name" value={isEditMode ? editedData.education?.institutionName : selectedCandidate.education?.institutionName} isEditable={isEditMode} section="education" field="institutionName" onEdit={handleFieldChange} />
                                                        <DetailItem label="Institution Location" value={isEditMode ? editedData.education?.institutionLocation : selectedCandidate.education?.institutionLocation} isEditable={isEditMode} section="education" field="institutionLocation" onEdit={handleFieldChange} />
                                                    </div>
                                                </div>

                                                {/* Section C: Experience Summary */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">3. Experience Summary</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                        <DetailItem label="Total Experience" value={isEditMode ? editedData.experienceSummary?.totalExperience : selectedCandidate.experienceSummary?.totalExperience} isEditable={isEditMode} section="experienceSummary" field="totalExperience" onEdit={handleFieldChange} />
                                                        {(isEditMode ? editedData.experienceSummary?.totalExperience : selectedCandidate.experienceSummary?.totalExperience) !== 'Fresher' && (
                                                            <>
                                                                <DetailItem label="Current Employer" value={isEditMode ? editedData.experienceSummary?.currentEmployer : selectedCandidate.experienceSummary?.currentEmployer} isEditable={isEditMode} section="experienceSummary" field="currentEmployer" onEdit={handleFieldChange} />
                                                                <DetailItem label="Current Designation" value={isEditMode ? editedData.experienceSummary?.currentDesignation : selectedCandidate.experienceSummary?.currentDesignation} isEditable={isEditMode} section="experienceSummary" field="currentDesignation" onEdit={handleFieldChange} />
                                                                <DetailItem label="Relevant Experience" value={isEditMode ? editedData.experienceSummary?.relevantExperience : selectedCandidate.experienceSummary?.relevantExperience} isEditable={isEditMode} section="experienceSummary" field="relevantExperience" onEdit={handleFieldChange} />
                                                                <DetailItem label="Current CTC" value={isEditMode ? editedData.experienceSummary?.currentCtc : selectedCandidate.experienceSummary?.currentCtc} isEditable={isEditMode} section="experienceSummary" field="currentCtc" onEdit={handleFieldChange} />
                                                                <DetailItem label="Expected CTC" value={isEditMode ? editedData.experienceSummary?.expectedCtc : selectedCandidate.experienceSummary?.expectedCtc} isEditable={isEditMode} section="experienceSummary" field="expectedCtc" onEdit={handleFieldChange} />
                                                            </>
                                                        )}
                                                        <div className="col-span-2 lg:col-span-4 mt-2">
                                                            {selectedCandidate.documents?.find(d => d.type === 'resume') ? (
                                                                <a
                                                                    href={getFileUrl(selectedCandidate.documents.find(d => d.type === 'resume'))}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-black rounded-lg hover:bg-gray-800 transition-all tracking-widest uppercase shadow-sm"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                    View Candidate Resume
                                                                </a>
                                                            ) : (
                                                                <span className="text-[10px] font-bold text-gray-400 italic">Resume not uploaded</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Section D: Employment Details */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">4. Employment Details</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                        <DetailItem label="Position Applied For" value={isEditMode ? editedData.employmentDetails?.position : selectedCandidate.employmentDetails?.position} isEditable={isEditMode} section="employmentDetails" field="position" onEdit={handleFieldChange} />
                                                        <DetailItem label="Work Mode" value={isEditMode ? editedData.employmentDetails?.workMode : selectedCandidate.employmentDetails?.workMode} isEditable={isEditMode} section="employmentDetails" field="workMode" onEdit={handleFieldChange} />
                                                        <DetailItem label="Preferred Location" value={isEditMode ? editedData.employmentDetails?.preferredLocation : selectedCandidate.employmentDetails?.preferredLocation} isEditable={isEditMode} section="employmentDetails" field="preferredLocation" onEdit={handleFieldChange} />
                                                        <DetailItem label="Proposed Joining Date" value={isEditMode ? editedData.employmentDetails?.joiningDate : selectedCandidate.employmentDetails?.joiningDate} isEditable={isEditMode} section="employmentDetails" field="joiningDate" onEdit={handleFieldChange} />
                                                        <DetailItem label="Notice Period" value={isEditMode ? editedData.employmentDetails?.noticePeriod : selectedCandidate.employmentDetails?.noticePeriod} isEditable={isEditMode} section="employmentDetails" field="noticePeriod" onEdit={handleFieldChange} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {activeDetailTab === 'Interview Assessment' && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                                        {(selectedCandidate.stage >= 3 || selectedCandidate.onboardingStatus === 'Completed') && (
                                            <div className="flex justify-end -mb-8">
                                                <span className="bg-green-50 text-green-600 border border-green-100 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
                                                    Stage 2 Verified (Assessment Complete)
                                                </span>
                                            </div>
                                        )}

                                        <div className="min-h-[300px] flex flex-col items-center justify-center space-y-4 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200 p-12">
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900">Interview Assessment</h4>
                                            <p className="text-sm text-gray-500 font-medium text-center max-w-xs">
                                                {selectedCandidate.stage === 2
                                                    ? 'Candidate is currently in the interview assessment phase. Review their performance and select for onboarding.'
                                                    : selectedCandidate.stage > 2
                                                        ? 'Candidate has successfully cleared the assessment phase.'
                                                        : 'This stage will be unlocked once the pre-offer information is approved.'}
                                            </p>

                                            {selectedCandidate.stage === 2 && (
                                                <div className="flex items-center gap-3 mt-6">
                                                    <button
                                                        onClick={() => initiateReject(selectedCandidate._id)}
                                                        className="px-8 py-3 bg-white text-red-600 text-[10px] font-black rounded-lg hover:bg-red-50 transition-all border border-red-100 tracking-widest uppercase"
                                                    >
                                                        REJECT
                                                    </button>
                                                    <button
                                                        onClick={() => initiateApprove(selectedCandidate._id)}
                                                        className="px-8 py-3 bg-green-600 text-white text-[10px] font-black rounded-lg hover:bg-green-700 transition-all tracking-widest uppercase"
                                                    >
                                                        SELECT
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeDetailTab === 'Post Offer' && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                                        {selectedCandidate.onboardingStatus === 'Completed' && (
                                            <div className="flex justify-end -mb-8">
                                                <span className="bg-green-50 text-green-600 border border-green-100 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
                                                    Onboarding Verified (Post Offer Complete)
                                                </span>
                                            </div>
                                        )}

                                        {/* Section E: Legal & Bank Info */}
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">Legal & Bank Details</h4>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                <DetailItem label="PAN Number" value={isEditMode ? editedData.legalFinancial?.panNumber : selectedCandidate.legalFinancial?.panNumber} isEditable={isEditMode} section="legalFinancial" field="panNumber" onEdit={handleFieldChange} />
                                                <DetailItem label="Aadhaar Number" value={isEditMode ? editedData.legalFinancial?.aadhaarNumber : selectedCandidate.legalFinancial?.aadhaarNumber} isEditable={isEditMode} section="legalFinancial" field="aadhaarNumber" onEdit={handleFieldChange} />
                                                <DetailItem label="Bank Name" value={isEditMode ? editedData.legalFinancial?.bankName : selectedCandidate.legalFinancial?.bankName} isEditable={isEditMode} section="legalFinancial" field="bankName" onEdit={handleFieldChange} />
                                                <DetailItem label="Account Holder" value={isEditMode ? editedData.legalFinancial?.bankAccountName : selectedCandidate.legalFinancial?.bankAccountName} isEditable={isEditMode} section="legalFinancial" field="bankAccountName" onEdit={handleFieldChange} />
                                                <DetailItem label="Account Number" value={isEditMode ? (editedData.legalFinancial?.accountNumber || editedData.legalFinancial?.bankAccount) : (selectedCandidate.legalFinancial?.accountNumber || selectedCandidate.legalFinancial?.bankAccount)} isEditable={isEditMode} section="legalFinancial" field="accountNumber" onEdit={handleFieldChange} />
                                                <DetailItem label="IFSC / SWIFT" value={isEditMode ? (editedData.legalFinancial?.ifscSwiftCode || editedData.legalFinancial?.ifscCode) : (selectedCandidate.legalFinancial?.ifscSwiftCode || selectedCandidate.legalFinancial?.ifscCode)} isEditable={isEditMode} section="legalFinancial" field="ifscSwiftCode" onEdit={handleFieldChange} />
                                                <DetailItem label="Tax Regime" value={isEditMode ? editedData.legalFinancial?.taxRegime : selectedCandidate.legalFinancial?.taxRegime} isEditable={isEditMode} section="legalFinancial" field="taxRegime" onEdit={handleFieldChange} />
                                                <DetailItem label="Permanent Address" value={isEditMode ? editedData.personalInfo?.currentAddress : selectedCandidate.personalInfo?.currentAddress} mdSpan={2} isEditable={isEditMode} section="personalInfo" field="currentAddress" onEdit={handleFieldChange} />
                                            </div>
                                        </div>

                                        {/* Section F: Emergency Contact */}
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">Emergency Contact</h4>
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                                <DetailItem label="Contact Name" value={isEditMode ? editedData.emergencyContact?.name : selectedCandidate.emergencyContact?.name} isEditable={isEditMode} section="emergencyContact" field="name" onEdit={handleFieldChange} />
                                                <DetailItem label="Phone" value={isEditMode ? editedData.emergencyContact?.phone : selectedCandidate.emergencyContact?.phone} isEditable={isEditMode} section="emergencyContact" field="phone" onEdit={handleFieldChange} />
                                                <DetailItem label="Relationship" value={isEditMode ? editedData.emergencyContact?.relationship : selectedCandidate.emergencyContact?.relationship} isEditable={isEditMode} section="emergencyContact" field="relationship" onEdit={handleFieldChange} />
                                            </div>
                                        </div>

                                        {/* Section G: Uploaded Documents */}
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black tracking-wider text-gray-400 border-l-2 border-black pl-3 uppercase">Documents Repository</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedCandidate.documents && selectedCandidate.documents.length > 0 ? (
                                                    selectedCandidate.documents.map((doc, idx) => (
                                                        <div key={idx} className="bg-white border border-gray-100 p-5 rounded-xl flex items-center justify-between group hover:border-black hover:shadow-sm transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                                                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-[10px] font-black text-gray-400 tracking-wider leading-none mb-1.5 uppercase">{doc.type}</p>
                                                                    <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{doc.originalName || doc.path?.split(/[/\\]/).pop() || 'Document'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4 transition-opacity">
                                                                <a
                                                                    href={getFileUrl(doc, false)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                                                                    title="View Document"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                </a>
                                                                <a
                                                                    href={getFileUrl(doc, true)}
                                                                    download
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                                                                    title="Download Document"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-span-2 py-10 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                                        <p className="text-xs text-gray-400 font-bold italic tracking-wide">No documents uploaded yet.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {(selectedCandidate.onboardingStatus === 'Pending Verification' || selectedCandidate.onboardingStatus === 'In-Process') && selectedCandidate.stage === 3 && (
                                            <div className="flex justify-end items-end gap-3 mt-6">
                                                <button
                                                    onClick={() => initiateReject(selectedCandidate._id)}
                                                    className="px-8 py-3 bg-white text-red-600 text-[10px] font-black rounded-lg hover:bg-red-50 transition-all border border-red-100 tracking-widest uppercase"
                                                >
                                                    REJECT
                                                </button>
                                                <button
                                                    onClick={() => initiateApprove(selectedCandidate._id)}
                                                    className="px-8 py-3 bg-green-600 text-white text-[10px] font-black rounded-lg hover:bg-green-700 transition-all tracking-widest uppercase"
                                                >
                                                    VERIFY
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Global Action Buttons - Only show on Pre-Offer tab for Stage 1 candidates */}
                                {(selectedCandidate.onboardingStatus === 'Pending Verification' ||
                                    selectedCandidate.onboardingStatus === 'In-Process' ||
                                    selectedCandidate.onboardingStatus === 'Approved') &&
                                    selectedCandidate.stage === 1 &&
                                    activeDetailTab === 'Pre Offer' && (
                                        <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-100 mt-12">
                                            <button
                                                onClick={() => initiateReject(selectedCandidate._id)}
                                                className="px-10 py-3.5 bg-white text-red-600 text-[10px] font-black rounded-lg hover:bg-red-50 transition-all border border-red-100 tracking-wider uppercase"
                                            >
                                                REJECT
                                            </button>
                                            <button
                                                onClick={() => initiateApprove(selectedCandidate._id)}
                                                className="px-10 py-3.5 bg-green-600 text-white text-[10px] font-black rounded-lg hover:bg-green-700 transition-all tracking-wider uppercase"
                                            >
                                                APPROVE & SHORTLIST
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeMenu === 'Dashboard' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    {/* Stats Overview */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <StatCard title="Total Candidates" value={stats.total} icon={<UsersIcon />} color="bg-blue-50 text-blue-600" />
                                        <StatCard title="Pending Review" value={stats.pending} icon={<ClockIcon />} color="bg-amber-50 text-amber-600" />
                                        <StatCard title="Onboarded" value={stats.onboarded} icon={<CheckCircleIcon />} color="bg-green-50 text-green-600" />
                                    </div>

                                    {/* Candidates List */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex flex-col gap-4">
                                            {/* Export Controls */}
                                            <div className="flex items-center justify-end gap-2">
                                                <select
                                                    value={exportFilter}
                                                    onChange={(e) => setExportFilter(e.target.value)}
                                                    className="text-xs font-bold bg-gray-50 border-0 rounded-lg px-4 py-2.5 hover:bg-gray-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 appearance-none pr-10"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 0.5rem center',
                                                        backgroundSize: '1.25rem'
                                                    }}
                                                >
                                                    <option value="all" className="bg-white text-gray-900 hover:bg-gray-50">All Candidates</option>
                                                    <option value="onboarded" className="bg-white text-gray-900 hover:bg-gray-50">Onboarded Only</option>
                                                </select>
                                                <button
                                                    onClick={handleExcelExport}
                                                    disabled={isExporting}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isExporting ? (
                                                        <>
                                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Exporting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            Export to Excel
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            {/* Tabs */}
                                            <div className="flex items-center gap-6">
                                                {['Active', 'Draft', 'Pending', 'Onboarded'].map((tab) => {
                                                    const count = tab === 'Active'
                                                        ? candidates.filter(c => c.onboardingStatus !== 'Completed' && !(c.onboardingStatus === 'Draft' && c.stage === 1)).length
                                                        : tab === 'Draft'
                                                            ? candidates.filter(c => c.onboardingStatus === 'Draft' && c.stage === 1).length
                                                            : tab === 'Pending'
                                                                ? candidates.filter(c => c.onboardingStatus === 'Pending Verification').length
                                                                : candidates.filter(c => c.onboardingStatus === 'Completed').length;

                                                    const isActive = activeCandidateTab === tab;
                                                    return (
                                                        <button
                                                            key={tab}
                                                            onClick={() => setActiveCandidateTab(tab)}
                                                            className={`relative py-1 text-sm font-bold tracking-tight transition-all ${isActive ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                                                }`}
                                                        >
                                                            {tab} Applications
                                                            {isActive && (
                                                                <div className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-black rounded-full" />
                                                            )}
                                                            <span className="ml-2 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{count}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-50 bg-gray-50/30">
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Candidate</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stage</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {candidates
                                                        .filter(candidate => {
                                                            if (activeCandidateTab === 'Draft') return candidate.onboardingStatus === 'Draft' && candidate.stage === 1;
                                                            if (activeCandidateTab === 'Pending') return candidate.onboardingStatus === 'Pending Verification';
                                                            if (activeCandidateTab === 'Onboarded') return candidate.onboardingStatus === 'Completed';
                                                            // Active tab: All except Stage 1 drafts and Completed
                                                            return candidate.onboardingStatus !== 'Completed' && !(candidate.onboardingStatus === 'Draft' && candidate.stage === 1);
                                                        })
                                                        .map((candidate) => (
                                                            <tr key={candidate._id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                                                                <td className="px-8 py-5">
                                                                    <div>
                                                                        <p className="font-bold text-gray-900 text-sm">{candidate.personalInfo?.fullName || 'N/A'}</p>
                                                                        <p className="text-[10px] font-bold text-gray-400 tracking-tight">{candidate.email}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <p className="text-xs font-bold text-gray-600 bg-gray-100/50 px-2 py-1 rounded inline-block">{candidate.employmentDetails?.position || 'Not Assigned'}</p>
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <StatusBadge status={candidate.onboardingStatus} stage={candidate.stage} />
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600 border border-gray-200">
                                                                        {candidate.onboardingStatus === 'Completed' ? 3 : candidate.stage}
                                                                    </span>
                                                                </td>
                                                                <td className="px-8 py-5 text-right">
                                                                    <button
                                                                        onClick={() => setSelectedCandidate(candidate)}
                                                                        className="text-[10px] font-bold text-black border border-black/10 px-4 py-2 rounded-lg hover:border-black/30 hover:bg-gray-50 transition-all tracking-wider"
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    {candidates.length === 0 && (
                                                        <tr>
                                                            <td colSpan="5" className="px-8 py-12 text-center text-gray-400 text-xs italic">
                                                                No candidates found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeMenu === 'Jobs' && (
                                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <BriefcaseIcon />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 tracking-wider">Job Management</h2>
                                    <p className="text-sm text-gray-400 font-bold max-w-xs text-center leading-relaxed">System is currently in read-only mode for active job listings.</p>
                                </div>
                            )}

                            {activeMenu === 'Employees' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    {/* Employee Records Table */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                                            <h2 className="text-lg font-bold tracking-tight">Onboarded Employees</h2>
                                            <span className="text-[10px] font-bold text-gray-400 tracking-wider bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                {candidates.filter(c => c.onboardingStatus === 'Completed').length} Records
                                            </span>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-50 bg-gray-50/30">
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Position</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Work Mode</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joining Date</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {candidates
                                                        .filter(c => c.onboardingStatus === 'Completed')
                                                        .map((candidate) => (
                                                            <tr key={candidate._id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                                                                <td className="px-8 py-5">
                                                                    <div>
                                                                        <p className="font-bold text-gray-900 text-sm">{candidate.personalInfo?.fullName || 'N/A'}</p>
                                                                        <p className="text-[10px] font-bold text-gray-400 tracking-tight">{candidate.email}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <p className="text-xs font-bold text-gray-600 bg-gray-100/50 px-2 py-1 rounded inline-block">{candidate.employmentDetails?.position || 'Not Assigned'}</p>
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <p className="text-xs font-bold text-gray-600">{candidate.employmentDetails?.workMode || 'N/A'}</p>
                                                                </td>
                                                                <td className="px-8 py-5">
                                                                    <p className="text-xs font-bold text-gray-600">{candidate.employmentDetails?.joiningDate || 'N/A'}</p>
                                                                </td>
                                                                <td className="px-8 py-5 text-right">
                                                                    <button
                                                                        onClick={() => setSelectedCandidate(candidate)}
                                                                        className="text-[10px] font-bold text-black border border-black/10 px-4 py-2 rounded-lg hover:border-black/30 hover:bg-gray-50 transition-all tracking-wider"
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    {candidates.filter(c => c.onboardingStatus === 'Completed').length === 0 && (
                                                        <tr>
                                                            <td colSpan="5" className="px-8 py-12 text-center text-gray-400 text-xs italic">
                                                                No onboarded employees found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeMenu === 'Settings' && (
                                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <SettingsIcon />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 tracking-wider">Portal Settings</h2>
                                    <p className="text-sm text-gray-400 font-bold max-w-xs text-center leading-relaxed">Access control and global configuration modules are currently locked.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Confirmation Modal */}
            {confirmation.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeConfirmation} />
                    <div className="relative bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-sm flex flex-col p-6 space-y-4 border border-gray-100">
                        <div className="text-center space-y-2">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmation.type === 'approve' ? 'bg-green-100 text-green-600' :
                                confirmation.type === 'verify' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                {confirmation.type === 'approve' ? (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                ) : confirmation.type === 'verify' ? (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{confirmation.title}</h3>
                            <p className="text-sm text-gray-500 font-medium">{confirmation.message}</p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={closeConfirmation}
                                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAction}
                                className={`flex-1 px-4 py-2.5 text-white text-sm font-bold rounded-lg transition-all ${confirmation.type === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                    confirmation.type === 'verify' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Offer Letter Preview Modal */}
            {showOfferPreview && (
                <OfferLetter
                    candidate={selectedCandidate}
                    onClose={() => setShowOfferPreview(false)}
                />
            )}

        </div >
    );
};

// Sub-components
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-gray-400 text-[10px] font-bold tracking-wide mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
        </div>
    </div>
);

const StatusBadge = ({ status, stage }) => {
    const styles = {
        'Draft': 'bg-gray-100 text-gray-600 border-gray-200',
        'Pending Verification': 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse',
        'In-Process': 'bg-blue-50 text-blue-600 border-blue-100',
        'Approved': 'bg-green-50 text-green-600 border-green-100',
        'Completed': 'bg-green-50 text-green-600 border-green-100'
    };

    let displayText = status;
    if (status === 'Pending Verification') {
        if (stage === 1) displayText = 'Pre Review Pending';
        else if (stage === 3) displayText = 'Post Offer Pending';
        else displayText = 'Verification Pending';
    } else if (status === 'Approved') {
        if (stage === 2) displayText = 'Shortlisted';
        else if (stage === 3) displayText = 'Selected';
        else displayText = 'Verified';
    } else if (status === 'Completed') {
        displayText = 'ONBOARDED';
    }

    return (
        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide border uppercase ${styles[status] || styles['Draft']}`}>
            {displayText}
        </span>
    );
};

const DetailItem = ({ label, value, mdSpan = 1, isEditable = false, section, field, onEdit }) => (
    <div className={mdSpan > 1 ? `md:col-span-${mdSpan}` : ''}>
        <p className="text-[10px] font-bold text-gray-400 mb-1">{label}</p>
        {isEditable ? (
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onEdit(section, field, e.target.value)}
                className="w-full text-sm font-bold text-gray-900 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition-all"
            />
        ) : (
            <p className="text-sm font-bold text-gray-900">{value || '-'}</p>
        )}
    </div>
);

// Icons
const UsersIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ClockIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const DashboardIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const BriefcaseIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const UserGroupIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SignOutIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export default HRDashboard;
