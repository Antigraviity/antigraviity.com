import React, { useRef } from 'react';

const OfferLetter = ({ candidate, onClose }) => {
    const printRef = useRef();

    if (!candidate) return null;

    const handlePrint = () => {
        const printContent = printRef.current;
        const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

        windowPrint.document.write(`
            <html>
                <head>
                    <title>Offer Letter - ${candidate.personalInfo?.fullName}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
                    <style>
                        @page { size: A4; margin: 15mm; }
                        body { 
                            font-family: 'Inter', sans-serif; 
                            line-height: 1.5; 
                            color: #111;
                            background: #fff;
                            margin: 0;
                            padding: 0;
                            -webkit-print-color-adjust: exact;
                        }
                        .print-container { padding: 30px; }
                        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; border-bottom: 1px solid #000; padding-bottom: 25px; }
                        .logo { height: 45px; }
                        .company-info { text-align: right; font-size: 9px; color: #444; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; }
                        .title { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 700; margin-bottom: 35px; text-transform: uppercase; color: #000; letter-spacing: 3px; }
                        .date-ref { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #666; margin-bottom: 30px; text-transform: uppercase; }
                        .section { margin-bottom: 30px; }
                        .section-title { font-weight: 700; text-transform: uppercase; font-size: 11px; color: #000; margin-bottom: 12px; letter-spacing: 1px; }
                        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                        .details-table td { padding: 15px 0; border-bottom: 1px solid #eee; }
                        .detail-label { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; width: 30%; }
                        .detail-value { font-size: 13px; font-weight: 600; color: #000; }
                        .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 80px; }
                        .sig-box { border-top: 1px solid #000; padding-top: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                        .footer { margin-top: 50px; font-size: 8px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 25px; letter-spacing: 2px; text-transform: uppercase; }
                        p { font-size: 12px; margin-bottom: 15px; }
                        @media print {
                            .no-print { display: none; }
                            .print-container { padding: 0; }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">
                        ${printContent.innerHTML}
                    </div>
                </body>
            </html>
        `);

        windowPrint.document.close();
        windowPrint.focus();
        setTimeout(() => {
            windowPrint.print();
            windowPrint.close();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
                {/* Header UI - Toolbar */}
                <div className="px-8 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        <h3 className="text-black text-[10px] font-black tracking-[0.3em] uppercase">Letter Of Offer Preview</h3>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrint}
                            className="bg-black text-white px-8 py-2.5 rounded-full text-[10px] font-black tracking-widest hover:bg-gray-800 transition-all shadow-lg"
                        >
                            GENERATE PDF
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* The Letter Content - Minimalist White & Black */}
                <div className="flex-1 overflow-y-auto p-12 md:p-20 bg-white custom-scrollbar">
                    <div ref={printRef} className="max-w-3xl mx-auto text-black">
                        {/* Header */}
                        <div className="header flex justify-between items-center mb-12 border-b-2 border-black pb-8">
                            <div>
                                <img src="/logo-black.webp" alt="Logo" className="logo h-12 w-auto" />
                            </div>
                            <div className="company-info text-right">
                                <p className="font-bold text-black text-xs">AntiGraviity Technologies Inc.</p>
                                <p className="text-[10px] text-gray-400 font-medium">123 innovation drive, tech city</p>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">www.antigraviity.com</p>
                            </div>
                        </div>

                        {/* Letter Content */}
                        <div className="space-y-10 font-normal leading-relaxed">
                            <div className="date-ref flex justify-between items-baseline mb-12">
                                <span className="text-[10px] font-black border-b border-black pb-1">Ref: AGT/OFFER/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}</span>
                                <span className="text-[10px] font-bold">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>

                            <h2 className="title text-4xl font-black tracking-tight mb-12 border-l-8 border-black pl-8 uppercase">Letter of Offer</h2>

                            <p className="text-sm font-medium">Dear <span className="font-black underline underline-offset-4">{candidate.personalInfo?.fullName}</span>,</p>

                            <p className="text-sm">
                                We are pleased to offer you the position of <span className="font-bold">{candidate.employmentDetails?.position}</span> with <span className="font-bold">AntiGraviity Technologies Inc.</span>
                                We were impressed with your credentials and believe that your contribution will be instrumental in our mission to push the frontiers of technology.
                            </p>

                            <div className="section pt-4">
                                <h4 className="section-title text-[10px] font-black text-gray-400 tracking-[0.2em] mb-6">Terms of Employment</h4>
                                <table className="details-table w-full">
                                    <tbody>
                                        <tr>
                                            <td className="detail-label">Designation</td>
                                            <td className="detail-value">{candidate.employmentDetails?.position}</td>
                                        </tr>
                                        <tr>
                                            <td className="detail-label">Work Mode</td>
                                            <td className="detail-value">{candidate.employmentDetails?.workMode}</td>
                                        </tr>
                                        <tr>
                                            <td className="detail-label">Effective Date</td>
                                            <td className="detail-value">
                                                {candidate.employmentDetails?.joiningDate ? new Date(candidate.employmentDetails.joiningDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'As agreed'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="detail-label">Remuneration (CTC)</td>
                                            <td className="detail-value font-black">{candidate.employmentDetails?.expectedCtc || 'Competitive Industry Standard'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="section space-y-4">
                                <h4 className="section-title text-[10px] font-black text-gray-400 tracking-[0.2em]">Confidentiality & Obligations</h4>
                                <p className="text-[11px] text-gray-600">
                                    This offer is subject to the verification of your references and the credentials provided by you. By accepting this offer, you agree to maintain the highest levels of confidentiality regarding the trade secrets, proprietary technology, and business operations of AntiGraviity Technologies.
                                </p>
                            </div>

                            <p className="text-xs pt-8">
                                We look forward to welcome you to our team.
                            </p>

                            {/* Signatures */}
                            <div className="signatures grid grid-cols-2 gap-20 pt-16">
                                <div className="sig-box">
                                    <div className="mb-4 h-12">
                                        <p className="font-outfit text-xl font-bold italic tracking-tighter opacity-80">AntiGraviity HR</p>
                                    </div>
                                    <p>Authorized Signatory</p>
                                </div>
                                <div className="sig-box">
                                    <div className="mb-4 h-12" />
                                    <p>Candidate Acceptance</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="footer mt-20 text-center border-t border-gray-100 pt-10">
                            <p>Premium Corporate Confidential Document • AntiGraviity Technologies Inc.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
            ` }} />
        </div>
    );
};

export default OfferLetter;
