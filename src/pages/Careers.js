import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import usePageTitle from '../hooks/usePageTitle';

const ApplicationModal = ({ isOpen, onClose, position, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        resume: null,
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Reset form data when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                linkedin: '',
                resume: null,
                message: ''
            });
        }
    }, [isOpen]);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!executeRecaptcha) {
            alert('ReCAPTCHA not ready. Please try again.');
            setIsSubmitting(false);
            return;
        }

        try {
            const token = await executeRecaptcha('career_application');

            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('email', formData.email);
            dataToSend.append('phone', formData.phone);
            dataToSend.append('linkedin', formData.linkedin);
            dataToSend.append('resume', formData.resume);
            dataToSend.append('message', formData.message);
            dataToSend.append('position', position);
            dataToSend.append('recaptchaToken', token);

            const response = await fetch('/api/career', {
                method: 'POST',
                body: dataToSend
            });

            const data = await response.json();
            if (data.success) {
                onSubmitSuccess();
                onClose();
            } else {
                alert(data.message || 'Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-[#050505] backdrop-blur-xl" onClick={onClose} />

            {/* Background Glow Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
                <div
                    className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] opacity-30"
                />
            </div>

            <div
                className="relative w-full max-w-2xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_0_80px_rgba(236,72,153,0.1)] animate-in fade-in zoom-in duration-300 bg-[#0a0a0a]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 100% at 50% 100%, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, #0a0a0a 100%),
                        radial-gradient(ellipse 120% 100% at 50% 100%, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.02) 45%, #0a0a0a 100%),
                        #0a0a0a
                    `,
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-2xl text-white mb-2">Apply for {position}</h3>
                <p className="text-white/40 text-sm mb-8">Share your details with us and we'll get back to you soon.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Full Name *"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#EC4899]/60 hover:border-[#EC4899]/30 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Email Address *"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#EC4899]/60 hover:border-[#EC4899]/30 transition-colors"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="tel"
                            placeholder="Phone Number *"
                            required
                            maxLength={12}
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#EC4899]/60 hover:border-[#EC4899]/30 transition-colors"
                        />
                        <input
                            type="url"
                            placeholder="Portfolio / LinkedIn URL"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#EC4899]/60 hover:border-[#EC4899]/30 transition-colors"
                        />
                    </div>

                    {/* Resume File Upload */}
                    <div className="relative group">
                        <label className="block w-full cursor-pointer">
                            <input
                                type="file"
                                required
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                                className="hidden"
                            />
                            <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm flex items-center justify-between hover:border-[#EC4899]/30 transition-colors">
                                <span className={formData.resume ? 'text-white' : 'text-white/30'}>
                                    {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC) *'}
                                </span>
                                <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4m0 0l-4 4m4-4v12" />
                                </svg>
                            </div>
                        </label>
                    </div>

                    <textarea
                        placeholder="Why do you want to join AntiGraviity? *"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#EC4899]/60 hover:border-[#EC4899]/30 transition-colors resize-none"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            'Submit Application'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Careers = () => {
    usePageTitle('Careers | AntiGraviity');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "High Impact Work",
            description: "Work on challenging projects that reach global audiences and make a real difference."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: "Growth & Learning",
            description: "Annual learning budget, mentorship programs, and clear career progression paths."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            title: "Remote First",
            description: "Work from anywhere. We focus on output and impact, not hours at a desk."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Health & Wellness",
            description: "Comprehensive health insurance, mental wellness support, and fitness allowances."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Competitive Pay",
            description: "Top-tier salary packages, performance bonuses, and equity options for key roles."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Team Retreats",
            description: "Annual global offsites to connect, bond, and celebrate our wins together."
        }
    ];

    const positions = [
        {
            title: "Full Stack Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            tags: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Front-end Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            tags: ["React", "Tailwind CSS", "Framer Motion"]
        },
        {
            title: "AI Fullstack Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            tags: ["Python", "React", "LLMs", "LangChain"]
        }
    ];

    const categories = ['All', ...new Set(positions.map(p => p.department))];

    const filteredPositions = activeCategory === 'All'
        ? positions
        : positions.filter(p => p.department === activeCategory);

    return (
        <div className="min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Careers</span>
                    </div>

                    <div className="max-w-4xl">
                        <p className="text-white/30 text-sm mb-4 tracking-wide">— JOIN OUR TEAM —</p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal mb-8 leading-tight">
                            Build the future <br />
                            <span className="text-white/40">with AntiGraviity.</span>
                        </h1>
                        <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
                            We're looking for visionaries, builders, and dreamers who want to define the next generation of digital experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Culture/Benefits Section */}
            <section className="py-24 px-6 border-y border-white/[0.05] bg-white/[0.01]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">Why Join Us?</h2>
                        <p className="text-white/40 max-w-2xl mx-auto">
                            We believe in taking care of our people so they can take care of the work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-2xl border border-white/[0.05] bg-black/20 hover:border-white/[0.1] transition-all duration-300 group"
                            >
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                                <h3 className="text-xl text-white mb-3">{benefit.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">Open Positions</h2>
                            <p className="text-white/40">Find your next role at AntiGraviity.</p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === category
                                        ? 'bg-white text-black font-medium'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredPositions.map((position, index) => (
                            <div
                                key={index}
                                className="group p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-black/20 hover:border-white/[0.15] hover:bg-white/[0.02] transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl text-white font-medium">{position.title}</h3>
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs border border-white/5">
                                            {position.department}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/40 text-sm mb-4 md:mb-0">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {position.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {position.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex gap-2">
                                        {position.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-white/[0.03] text-white/30 text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedPosition(position.title)}
                                        className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPositions.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-white/40">No positions found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 border-t border-white/[0.05]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">
                        Don't see the right role?
                    </h2>
                    <p className="text-white/40 mb-10 max-w-xl mx-auto">
                        We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future openings.
                    </p>
                    <button
                        onClick={() => setSelectedPosition('General Application')}
                        className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors inline-block"
                    >
                        Apply with Resume
                    </button>
                </div>
            </section>

            {/* Application Modal */}
            <ApplicationModal
                isOpen={!!selectedPosition}
                onClose={() => setSelectedPosition(null)}
                position={selectedPosition}
                onSubmitSuccess={() => setIsSubmitted(true)}
            />

            {/* Success Message */}
            {isSubmitted && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                    <div className="relative max-w-lg text-center p-8 md:p-12 bg-black border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl text-white font-normal mb-4">Application Sent!</h2>
                        <p className="text-white/50 mb-8">
                            Thank you for your interest in joining AntiGraviity. We've received your application and will review it shortly.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
