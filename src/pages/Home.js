import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoAnimation from '../components/LogoAnimation';
import ThreeGlobe from '../components/ThreeGlobe';
import usePageTitle from '../hooks/usePageTitle';
import { technologies } from '../data/technologyStack';

// ==========================================
// BRAND NAME COMPONENT (Reusable with levitating ii)
// ==========================================
export const BrandName = ({ className = "", style = {} }) => {
    return (
        <span className={`inline-flex items-baseline ${className}`} style={{ margin: '0 0.02em', ...style }}>
            <span className="text-white">antigrav</span>
            <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
                <span
                    className="inline-block text-white"
                    style={{
                        transform: 'rotate(180deg) translateY(-0.03em)',
                        animation: 'levitate1 3s ease-in-out infinite'
                    }}
                >i</span>
                <span
                    className="inline-block text-white"
                    style={{
                        transform: 'rotate(180deg) translateY(-0.06em)',
                        animation: 'levitate2 3s ease-in-out infinite 0.15s'
                    }}
                >i</span>
            </span>
            <span className="text-white">ty</span>
        </span>
    );
};

// ==========================================
// HERO SECTION with Logo Animation
// ==========================================
const HeroSection = () => {
    usePageTitle('Home | AntiGraviity');
    const navigate = useNavigate();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const searchSuggestions = [
        {
            title: 'Web Development',
            path: '/services/web-development',
            type: 'service',
            icon: '◈',
            keywords: ['web', 'website', 'web development', 'react', 'nextjs', 'next.js', 'responsive', 'ecommerce', 'e-commerce', 'landing page'],
            description: 'Modern websites & web apps'
        },
        {
            title: 'App Development',
            path: '/services/app-development',
            type: 'service',
            icon: '⚛',
            keywords: ['app', 'mobile', 'ios', 'android', 'react native', 'flutter', 'application'],
            description: 'iOS & Android applications'
        },
        {
            title: 'Digital Marketing',
            path: '/services/digital-marketing',
            type: 'service',
            icon: '◎',
            keywords: ['marketing', 'seo', 'social media', 'ads', 'google ads', 'meta ads', 'campaign'],
            description: 'SEO & social campaigns'
        },
        {
            title: 'Graphic Designing',
            path: '/services/graphic-designing',
            type: 'service',
            icon: '🎨',
            keywords: ['design', 'graphic', 'logo', 'ui', 'ux', 'branding', 'figma'],
            description: 'Brand identity & UI/UX'
        },
        {
            title: '3D Services',
            path: '/services/3d-services',
            type: 'service',
            icon: '△',
            keywords: ['3d', 'modeling', 'animation', 'render', 'threejs', 'webgl'],
            description: '3D modeling & visualization'
        },
        {
            title: 'AntiMage CRM',
            path: '/products/antimage-crm',
            type: 'product',
            icon: '◈',
            keywords: ['crm', 'antimage', 'customer', 'sales', 'lead management'],
            description: 'Customer relationship management'
        },
        {
            title: 'AntiHRMS',
            path: '/products/antihrms',
            type: 'product',
            icon: '⚛',
            keywords: ['hrms', 'hr', 'payroll', 'employee', 'onboarding'],
            description: 'HR management system'
        },
        {
            title: 'AntiSec',
            path: '/products/antisec',
            type: 'product',
            icon: '🛡',
            keywords: ['security', 'cybersecurity', 'protection', 'firewall'],
            description: 'Enterprise security platform'
        },
        {
            title: 'AntiAI',
            path: '/products/antiai',
            type: 'product',
            icon: '🎨',
            keywords: ['ai', 'artificial intelligence', 'machine learning', 'chatbot'],
            description: 'AI & ML solutions'
        },
        {
            title: 'AntiChat',
            path: '/products/antichat',
            type: 'product',
            icon: '💬',
            keywords: ['chat', 'messaging', 'communication', 'slack', 'teams'],
            description: 'Team communication platform'
        }
    ];

    const getFilteredSuggestions = () => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return [];

        return searchSuggestions.filter(suggestion =>
            suggestion.title.toLowerCase().includes(query) ||
            suggestion.keywords.some(keyword => keyword.includes(query) || query.includes(keyword)) ||
            suggestion.description.toLowerCase().includes(query)
        ).slice(0, 5);
    };

    const filteredSuggestions = getFilteredSuggestions();

    const handleSearch = (path) => {
        if (typeof path === 'string') {
            navigate(path);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        if (!query) return;

        if (filteredSuggestions.length > 0) {
            navigate(filteredSuggestions[0].path);
        } else {
            navigate('/not-found');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
                handleSearch(filteredSuggestions[selectedIndex].path);
            } else {
                handleSearch();
            }
            setShowSuggestions(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
        setSelectedIndex(-1);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center">
            {/* Gradients */}
            <div className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse 150% 100% at 50% 0%, rgba(56, 189, 248, 0.03) 0%, rgba(56, 189, 248, 0.015) 25%, rgba(125, 211, 252, 0.01) 45%, transparent 70%)' }} />
            <div className="absolute top-0 left-0 right-0 h-[70px] pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(186, 230, 253, 0.04) 0%, rgba(125, 211, 252, 0.02) 35%, transparent 65%)' }} />
            <div className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(224, 242, 254, 0.05) 0%, rgba(186, 230, 253, 0.025) 40%, transparent 70%)' }} />

            <div className="absolute inset-0 overflow-hidden"></div>

            <div className="absolute w-[600px] h-[300px] rounded-full pointer-events-none transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    opacity: animationComplete ? 1 : 0
                }} />

            {/* Rotating Globe Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-80"
                style={{ transition: 'opacity 1s ease-in-out', opacity: animationComplete ? 0.8 : 0 }}>
                <ThreeGlobe />
            </div>

            <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center" style={{ overflow: 'visible' }}>
                <div className="flex justify-center w-full" style={{ overflow: 'visible', marginBottom: '-20px' }}>
                    <LogoAnimation size="large" onComplete={() => setAnimationComplete(true)} />
                </div>

                <div className="transition-all duration-700 w-full"
                    style={{
                        opacity: animationComplete ? 1 : 0,
                        transform: animationComplete ? 'translateY(0)' : 'translateY(10px)',
                        transitionDelay: '0.2s'
                    }}>
                    <p className="text-sm md:text-base tracking-[0.3em] mb-10 font-medium text-right pr-4 md:pr-4"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(150,150,150,0.5) 50%, rgba(100,100,100,0.3) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                        Elevating Businesses.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mb-10 transition-all duration-700 w-full"
                    style={{
                        opacity: animationComplete ? 1 : 0,
                        transform: animationComplete ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: '0.4s'
                    }}>
                    <div className="relative group" style={{ background: 'transparent', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }}>
                        <div className="absolute -inset-1 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none" id="searchGlow"
                            style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(125, 211, 252, 0.08) 40%, transparent 70%)', filter: 'blur(8px)' }} />
                        <input
                            type="text"
                            placeholder="What do you want to build?"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent rounded-full px-6 py-4 text-white placeholder-white/30 transition-all text-sm relative z-10"
                            style={{ outline: 'none' }}
                            onFocus={(e) => {
                                e.currentTarget.parentElement.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                                e.currentTarget.parentElement.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.15), 0 0 40px rgba(125, 211, 252, 0.1)';
                                const glow = e.currentTarget.parentElement.querySelector('#searchGlow');
                                if (glow) glow.style.opacity = '1';
                                setShowSuggestions(true);
                            }}
                            onBlur={(e) => {
                                setTimeout(() => {
                                    e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.parentElement.style.boxShadow = 'none';
                                    const glow = e.currentTarget.parentElement.querySelector('#searchGlow');
                                    if (glow) glow.style.opacity = '0';
                                    setShowSuggestions(false);
                                }, 200);
                            }}
                        />
                        <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 z-20"
                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <svg className="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                        {showSuggestions && filteredSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden z-30"
                                style={{ background: 'rgba(0, 0, 0, 0.85)', boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div key={suggestion.path} onClick={() => handleSearch(suggestion.path)} onMouseEnter={() => setSelectedIndex(index)}
                                        className="flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200"
                                        style={{ background: selectedIndex === index ? 'rgba(255,255,255,0.08)' : 'transparent', borderBottom: index < filteredSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-white/40 text-lg">
                                            {suggestion.icon}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-white text-sm font-medium mb-0.5">{suggestion.title}</div>
                                            <div className="text-white/40 text-xs">{suggestion.description}</div>
                                        </div>
                                        <div className="px-2 py-1 rounded-full bg-white/5 text-white/30 text-xs capitalize">
                                            {suggestion.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700"
                style={{ opacity: animationComplete ? 1 : 0, transitionDelay: '1s' }}>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs tracking-wider"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(120,120,120,0.2) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SCROLL</span>
                    <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1), transparent)' }} />
                </div>
            </div>
        </section>
    );
};

// ==========================================
// PRODUCTS SECTION
// ==========================================
const ProductsSection = () => {
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const products = [
        {
            title: "AntiMage CRM",
            subtitle: "Customer Relationship Management",
            description: "Powerful CRM solution to manage your customer relationships, sales pipeline, and business growth with AI-powered insights.",
            link: "/products/antimage-crm",
            icon: "◈",
            gradient: "from-yellow-500/20 to-amber-500/10",
            hoverShadow: "0 0 40px rgba(234, 179, 8, 0.3), 0 0 80px rgba(234, 179, 8, 0.15)"
        },
        {
            title: "AntiHRMS",
            subtitle: "Human Resource Management System",
            description: "Complete HR management platform for employee management, payroll, attendance tracking, and performance analytics.",
            link: "/products/antihrms",
            icon: "⚛",
            gradient: "from-purple-500/20 to-pink-500/10",
            hoverShadow: "0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)"
        },
        {
            title: "AntiSec",
            subtitle: "Enterprise Security Solutions",
            description: "Advanced cybersecurity platform providing threat detection, vulnerability management, and real-time security monitoring.",
            link: "/products/antisec",
            icon: "🛡",
            gradient: "from-red-500/20 to-orange-500/10",
            hoverShadow: "0 0 40px rgba(239, 68, 68, 0.3), 0 0 80px rgba(239, 68, 68, 0.15)"
        },
        {
            title: "AntiAI",
            subtitle: "Enterprise AI Platform",
            description: "Build, deploy, and manage custom AI models. From natural language processing to computer vision solutions.",
            link: "/products/antiai",
            icon: "🎨",
            gradient: "from-emerald-500/20 to-teal-500/10",
            hoverShadow: "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.15)"
        },
        {
            title: "AntiChat",
            subtitle: "Enterprise Communication Platform",
            description: "Secure, feature-rich communication platform with real-time messaging, video conferencing, and collaboration tools.",
            link: "/products/antichat",
            icon: "💬",
            gradient: "from-indigo-500/20 to-blue-500/10",
            hoverShadow: "0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.15)"
        }
    ];

    return (
        <section id="products" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <p className="text-white/30 text-sm mb-4 tracking-wide">— PRODUCTS —</p>
                    <h2 className="text-4xl md:text-6xl text-white font-normal leading-tight">
                        Coming Soon...
                    </h2>
                    <p className="text-white/40 mt-4 max-w-2xl">
                        Enterprise-grade solutions designed to streamline your business operations and accelerate growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link
                            to={product.link}
                            key={product.title}
                            className="group p-8 border border-white/[0.08] hover:border-white/[0.15] bg-black/30 backdrop-blur-sm hover:bg-white/[0.02] transition-all duration-500 rounded-2xl relative overflow-hidden block"
                            style={{
                                boxShadow: hoveredProduct === product.title ? product.hoverShadow : 'none',
                                transition: 'all 0.5s ease'
                            }}
                            onMouseEnter={() => setHoveredProduct(product.title)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">{product.icon}</div>
                                    <span className="text-xs text-white/30 px-3 py-1 border border-white/10 rounded-full">Product</span>
                                </div>
                                <h3 className="text-xl md:text-2xl text-white mb-2 group-hover:text-white transition-colors">{product.title}</h3>
                                <p className="text-white/40 text-sm mb-4">{product.subtitle}</p>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
                                <div className="inline-flex items-center gap-2 text-white/40 group-hover:text-white/70 text-sm transition-all">
                                    Learn more
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==========================================
// SERVICES SECTION
// ==========================================
const ServicesSection = () => {
    const [hoveredService, setHoveredService] = useState(null);

    const services = [
        {
            icon: "◈",
            title: "Web Development",
            description: "Modern, responsive websites built with Next.js, React, and cutting-edge frameworks. From landing pages to complex web applications.",
            features: ["Custom Web Apps", "E-commerce Solutions", "Progressive Web Apps"],
            gradient: "from-blue-500/20 to-indigo-500/10",
            hoverShadow: "0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)",
            link: "/services/web-development"
        },
        {
            icon: "⚛",
            title: "App Development",
            description: "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences with robust backend integration.",
            features: ["iOS & Android Apps", "Cross-platform Development", "App Maintenance"],
            gradient: "from-green-500/20 to-emerald-500/10",
            hoverShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.15)",
            link: "/services/app-development"
        },
        {
            icon: "◎",
            title: "Digital Marketing",
            description: "Data-driven marketing strategies to amplify your digital presence. SEO, social media, and performance marketing campaigns.",
            features: ["SEO Optimization", "Social Media Marketing", "PPC Campaigns"],
            gradient: "from-orange-500/20 to-amber-500/10",
            hoverShadow: "0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(249, 115, 22, 0.15)",
            link: "/services/digital-marketing"
        },
        {
            icon: "🎨",
            title: "Graphic Designing",
            description: "Creative visual solutions that communicate your brand story. Logos, brand identities, and marketing collaterals.",
            features: ["Brand Identity", "UI/UX Design", "Print & Digital Media"],
            gradient: "from-pink-500/20 to-rose-500/10",
            hoverShadow: "0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(236, 72, 153, 0.15)",
            link: "/services/graphic-designing"
        },
        {
            icon: "△",
            title: "3D Services",
            description: "Immersive 3D modeling, animations, and WebGL experiences. Product visualization, architectural renders, and interactive 3D.",
            features: ["3D Modeling", "Product Visualization", "WebGL Experiences"],
            gradient: "from-purple-500/20 to-violet-500/10",
            hoverShadow: "0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)",
            link: "/services/3d-services"
        },
    ];

    return (
        <section id="services" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <p className="text-white/30 text-sm mb-4 tracking-wide">— SERVICES —</p>
                    <h2 className="text-4xl md:text-5xl text-white font-normal">What we provide</h2>
                    <p className="text-white/40 mt-4 max-w-2xl">End-to-end digital solutions tailored to transform your business and elevate your brand.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <Link
                            to={service.link}
                            key={service.title}
                            className="group p-8 border border-white/[0.06] hover:border-white/[0.15] bg-black/30 backdrop-blur-sm hover:bg-white/[0.02] transition-all duration-500 rounded-xl relative overflow-hidden block"
                            style={{
                                boxShadow: hoveredService === service.title ? service.hoverShadow : 'none',
                                transition: 'all 0.5s ease'
                            }}
                            onMouseEnter={() => setHoveredService(service.title)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative z-10">
                                <div className="text-3xl text-white/20 mb-6 group-hover:text-white/40 transition-colors">{service.icon}</div>
                                <h3 className="text-xl text-white mb-3">{service.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">{service.description}</p>
                                <div className="space-y-2 mb-6">
                                    {service.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-white/30 text-xs">
                                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-white/25 group-hover:text-white/50 transition-colors">
                                    <span className="text-sm">Learn more</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==========================================
// PROCESS/METHODOLOGY SECTION
// ==========================================
const ProcessSection = () => {

    const steps = [
        {
            number: "01",
            title: "Discovery",
            description: "We dive deep into your business goals, target audience, and technical requirements to create a solid foundation.",
            icon: "◈",
            gradient: "from-blue-500/20 to-indigo-500/10"
        },
        {
            number: "02",
            title: "Strategy",
            description: "Our team develops a comprehensive roadmap aligned with your objectives, timeline, and budget constraints.",
            icon: "⚛",
            gradient: "from-emerald-500/20 to-teal-500/10"
        },
        {
            number: "03",
            title: "Design",
            description: "We craft stunning, user-centric designs that blend aesthetics with functionality for optimal experiences.",
            icon: "◎",
            gradient: "from-purple-500/20 to-violet-500/10"
        },
        {
            number: "04",
            title: "Development",
            description: "Using cutting-edge technologies, we build scalable, secure solutions with clean, maintainable code.",
            icon: "△",
            gradient: "from-orange-500/20 to-amber-500/10"
        },
        {
            number: "05",
            title: "Testing",
            description: "Rigorous quality assurance ensures every feature works flawlessly across all devices and scenarios.",
            icon: "🎨",
            gradient: "from-pink-500/20 to-rose-500/10"
        },
        {
            number: "06",
            title: "Launch & Support",
            description: "We ensure smooth deployment and provide ongoing support to keep your solution performing at its best.",
            icon: "🛡",
            gradient: "from-cyan-500/20 to-blue-500/10"
        }
    ];

    return (
        <section className="relative pt-8 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-white/30 text-sm mb-4 tracking-wide">— HOW WE WORK —</p>
                    <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">Our proven process</h2>
                    <p className="text-white/40 max-w-2xl mx-auto">A structured approach that ensures exceptional results at every stage of your project.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="group p-8 rounded-2xl border border-white/[0.06] bg-black/30 relative overflow-hidden hover:border-white/[0.12] transition-all duration-500 cursor-pointer">
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="text-5xl text-white/10 group-hover:text-white/20 font-light transition-colors">{step.number}</div>
                                    <div className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">{step.icon}</div>
                                </div>
                                <h3 className="text-2xl text-white mb-3">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-white/10" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==========================================
// TECH STACK SECTION
// ==========================================
const TechStackSection = () => {
    return (
        <section className="relative pt-32 pb-8 px-6 bg-white/[0.01]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-white/30 text-sm mb-4 tracking-wide">— TECHNOLOGY STACK —</p>
                    <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">Powered by modern tech</h2>
                    <p className="text-white/40 max-w-2xl mx-auto">We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions.</p>
                </div>

                <div className="space-y-12">
                    {Object.entries(technologies).map(([category, techs], catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-white/50 text-sm uppercase tracking-wider mb-6 text-center">{category}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {techs.map((tech, index) => (
                                    <div key={index} className="group p-6 rounded-xl border border-white/[0.06] bg-black/20 hover:border-white/[0.15] transition-all duration-300 relative overflow-hidden" style={{ transitionDelay: `${index * 50}ms` }}>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)` }} />
                                        <div className="relative z-10 text-center">
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                                            <div className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">{tech.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==========================================
// CTA SECTION
// ==========================================
const CTASection = () => {
    return (
        <section id="contact" className="relative pt-8 pb-32 px-6 border-t border-white/[0.05]">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/[0.04] rounded-full border border-white/[0.06]">
                    <span className="text-white/40 text-sm">◈</span>
                    <span className="text-white/70 text-sm">Enterprise</span>
                </div>
                <h2 className="text-3xl md:text-5xl text-white font-normal mb-6">Ready to scale?</h2>
                <p className="text-white/35 text-lg mb-4">Unlock <span className="text-white/60">Premium</span> solutions for your team</p>
                <p className="text-white/25 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
                    Join industry leaders who trust <BrandName className="text-white/40" /> for their digital transformation.
                    Get priority access, dedicated support, and custom solutions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/contact" className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">Start Your Project</Link>
                    <Link to="/contact" className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors">Schedule a Call</Link>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// MAIN HOME PAGE COMPONENT
// ==========================================
const Home = () => {
    return (
        <>
            <HeroSection />
            <ProductsSection />
            <ServicesSection />
            <TechStackSection />
            <ProcessSection />
            <CTASection />
        </>
    );
};

export default Home;
