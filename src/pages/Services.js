import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const Services = () => {
    usePageTitle('Services | AntiGraviity');
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
            icon: "◇",
            title: "App Development",
            description: "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences with robust backend integration.",
            features: ["iOS & Android Apps", "Cross-platform Development", "App Maintenance"],
            gradient: "from-green-500/20 to-emerald-500/10",
            hoverShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.15)",
            link: "/services/app-development"
        },
        {
            icon: "○",
            title: "Digital Marketing",
            description: "Data-driven marketing strategies to amplify your digital presence. SEO, social media, and performance marketing campaigns.",
            features: ["SEO Optimization", "Social Media Marketing", "PPC Campaigns"],
            gradient: "from-orange-500/20 to-amber-500/10",
            hoverShadow: "0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(249, 115, 22, 0.15)",
            link: "/services/digital-marketing"
        },
        {
            icon: "◎",
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

    const stats = [
        { number: "500+", label: "Projects Delivered" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "8+", label: "Years Experience" },
        { number: "50+", label: "Technologies" }
    ];

    const whyChooseUs = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Agile Methodology",
            description: "Fast iterations, continuous feedback, and adaptive planning for optimal results."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "24/7 Support",
            description: "Round-the-clock assistance to ensure your business never stops running."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            title: "Proven Track Record",
            description: "Hundreds of successful projects across diverse industries and technologies."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: "Innovation First",
            description: "Cutting-edge solutions using the latest technologies and best practices."
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
                        <span className="text-white/70">Services</span>
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/[0.04] rounded-full border border-white/[0.06]">
                            <span className="text-white/40 text-sm">◈</span>
                            <span className="text-white/70 text-sm">Digital Excellence</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl text-white font-normal mb-6 leading-tight">
                            Transform Your Business with Premium Services
                        </h1>

                        <p className="text-white/40 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Partner with industry experts to build scalable, innovative solutions that drive growth and deliver measurable results.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105"
                            >
                                Schedule Consultation
                            </Link>
                            <a
                                href="#services"
                                className="px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-all hover:scale-105"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 px-6 border-t border-white/[0.05]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl text-white font-light mb-2 group-hover:text-white/80 transition-colors">
                                    {stat.number}
                                </div>
                                <div className="text-white/40 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <p className="text-white/30 text-sm mb-4 tracking-wide">— OUR SERVICES —</p>
                        <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                            What we provide
                        </h2>
                        <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                            End-to-end digital solutions tailored to transform your business and elevate your brand.
                        </p>
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
                                    <div className="text-3xl text-white/20 mb-6 group-hover:text-white/40 transition-colors">
                                        {service.icon}
                                    </div>
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

            {/* Why Choose Us Section */}
            <section className="relative py-20 px-6 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <p className="text-white/30 text-sm mb-4 tracking-wide">— WHY CHOOSE US —</p>
                        <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                            Your success is our mission
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-xl border border-white/[0.06] bg-black/20 hover:border-white/[0.12] transition-all duration-300 hover:bg-white/[0.02]"
                            >
                                <div className="text-white/40 group-hover:text-white/70 mb-4 group-hover:scale-110 transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg text-white mb-2">{item.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Teaser */}
            <section className="relative py-20 px-6 border-t border-white/[0.05]">
                <div className="max-w-5xl mx-auto">
                    <div className="p-8 md:p-12 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                        <div className="relative z-10">
                            <p className="text-white/30 text-sm mb-4 tracking-wide">— SUCCESS STORY —</p>
                            <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">
                                How we helped TechFlow scale 10x
                            </h2>
                            <p className="text-white/50 mb-8 max-w-2xl">
                                Discover how our web development and digital marketing services transformed TechFlow's online presence, resulting in 10x revenue growth in just 12 months.
                            </p>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div>
                                    <div className="text-3xl text-white font-light mb-1">10x</div>
                                    <div className="text-white/40 text-sm">Revenue Growth</div>
                                </div>
                                <div>
                                    <div className="text-3xl text-white font-light mb-1">300%</div>
                                    <div className="text-white/40 text-sm">Traffic Increase</div>
                                </div>
                                <div>
                                    <div className="text-3xl text-white font-light mb-1">85%</div>
                                    <div className="text-white/40 text-sm">Cost Reduction</div>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                            >
                                Read full case study
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
                        Ready to elevate your business?
                    </h2>

                    <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
                        Let's discuss how our services can help you achieve your goals and drive measurable results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105"
                        >
                            Get Started Today
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

export default Services;
