import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const Products = () => {
    usePageTitle('Products | AntiGraviity');
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
            icon: "◇",
            gradient: "from-purple-500/20 to-pink-500/10",
            hoverShadow: "0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)"
        },
        {
            title: "AntiSec",
            subtitle: "Enterprise Security Solutions",
            description: "Advanced cybersecurity platform providing threat detection, vulnerability management, and real-time security monitoring.",
            link: "/products/antisec",
            icon: "⬡",
            gradient: "from-red-500/20 to-orange-500/10",
            hoverShadow: "0 0 40px rgba(239, 68, 68, 0.3), 0 0 80px rgba(239, 68, 68, 0.15)"
        },
        {
            title: "AntiAI",
            subtitle: "Enterprise AI Platform",
            description: "Build, deploy, and manage custom AI models. From natural language processing to computer vision solutions.",
            link: "/products/antiai",
            icon: "◎",
            gradient: "from-emerald-500/20 to-teal-500/10",
            hoverShadow: "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.15)"
        },
        {
            title: "AntiChat",
            subtitle: "Enterprise Communication Platform",
            description: "Secure, feature-rich communication platform with real-time messaging, video conferencing, and collaboration tools.",
            link: "/products/antichat",
            icon: "▣",
            gradient: "from-indigo-500/20 to-blue-500/10",
            hoverShadow: "0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.15)"
        }
    ];

    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Rapid Deployment",
            description: "Get up and running in days, not months, with our streamlined onboarding process."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Enterprise Security",
            description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Real-time Analytics",
            description: "Make data-driven decisions with comprehensive dashboards and reporting tools."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "Seamless Integration",
            description: "Connect with your existing tools via our robust API and pre-built integrations."
        }
    ];

    const testimonials = [
        {
            company: "TechCorp Inc",
            industry: "SaaS",
            quote: "AntiMage CRM transformed our sales process. We saw a 40% increase in conversions within the first quarter.",
            author: "Sarah Chen",
            role: "VP of Sales"
        },
        {
            company: "Global Ventures",
            industry: "Finance",
            quote: "AntiSec gave us the peace of mind we needed. Zero security incidents since implementation.",
            author: "Michael Rodriguez",
            role: "CTO"
        }
    ];

    return (
        <div className="min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-12">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Products</span>
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/[0.04] rounded-full border border-white/[0.06]">
                            <span className="text-white/40 text-sm">◈</span>
                            <span className="text-white/70 text-sm">Enterprise Solutions</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl text-white font-normal mb-6 leading-tight">
                            Software That Scales With Your Ambition
                        </h1>

                        <p className="text-white/40 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Enterprise-grade products designed to streamline operations, boost productivity, and accelerate growth across your organization.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105"
                            >
                                Request Demo
                            </Link>
                            <a
                                href="#products"
                                className="px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-all hover:scale-105"
                            >
                                Explore Products
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative py-16 px-6 border-t border-white/[0.05]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-xl border border-white/[0.06] bg-black/20 hover:border-white/[0.12] transition-all duration-300"
                            >
                                <div className="text-white/40 group-hover:text-white/70 mb-4 group-hover:scale-110 transition-all duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg text-white mb-2">{benefit.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section id="products" className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <p className="text-white/30 text-sm mb-4 tracking-wide">— OUR PRODUCTS —</p>
                        <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                            Enterprise Solutions
                        </h2>
                        <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                            Powerful tools designed to solve complex business challenges and drive measurable outcomes.
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
                                        <div>
                                            <span className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">{product.icon}</span>
                                        </div>
                                        <span className="text-xs text-white/30 px-3 py-1 border border-white/10 rounded-full">Product</span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl text-white mb-2 group-hover:text-white transition-colors">{product.title}</h3>
                                    <p className="text-white/40 text-sm mb-4">{product.subtitle}</p>

                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        {product.description}
                                    </p>

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

            {/* ROI Calculator Teaser */}
            <section className="relative py-20 px-6 bg-white/[0.01]">
                <div className="max-w-5xl mx-auto">
                    <div className="p-8 md:p-12 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                        <div className="relative z-10">
                            <p className="text-white/30 text-sm mb-4 tracking-wide">— ROI CALCULATOR —</p>
                            <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">
                                Calculate your potential savings
                            </h2>
                            <p className="text-white/50 mb-8 max-w-2xl">
                                See how much time and money you could save by implementing our enterprise solutions. Most clients see ROI within 6 months.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="text-3xl text-white font-light mb-1">40%</div>
                                    <div className="text-white/40 text-sm">Average Cost Reduction</div>
                                </div>
                                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="text-3xl text-white font-light mb-1">3x</div>
                                    <div className="text-white/40 text-sm">Productivity Increase</div>
                                </div>
                                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="text-3xl text-white font-light mb-1">6 mo</div>
                                    <div className="text-white/40 text-sm">Average ROI Timeline</div>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
                            >
                                Get Your Custom ROI Report
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Success Stories */}
            <section className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <p className="text-white/30 text-sm mb-4 tracking-wide">— SUCCESS STORIES —</p>
                        <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                            Trusted by industry leaders
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl border border-white/[0.06] bg-black/30 hover:border-white/[0.12] transition-all duration-500"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                        <span className="text-white/60 text-xs">{testimonial.industry}</span>
                                    </div>
                                </div>

                                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div>
                                        <div className="text-white text-sm font-medium">{testimonial.author}</div>
                                        <div className="text-white/40 text-xs">{testimonial.role}, {testimonial.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                        Ready to transform your business?
                    </h2>

                    <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
                        Schedule a demo to see how our products can help you achieve your goals and drive measurable results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105"
                        >
                            Request Demo
                        </Link>
                        <Link
                            to="/about-us"
                            className="px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-all hover:scale-105"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
