
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InteractiveParticles from './InteractiveParticles';

const PricingLayout = ({ children, title, subtitle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showBundled, setShowBundled] = useState(false);

    const singlePackageItems = [
        {
            name: 'Website Development',
            path: '/pricing/web-development',
            bigText: 'WEB DEV'
        },
        {
            name: 'Ecommerce Development',
            path: '/pricing/ecommerce-development',
            bigText: 'STORE'
        },
        {
            name: 'App Development',
            path: '/pricing/app-development',
            bigText: 'APPS'
        },
        {
            name: 'Digital Marketing',
            path: '/pricing/digital-marketing',
            bigText: 'GROWTH'
        }
    ];

    const bundledPackageItems = [
        {
            name: 'Website Development + Digital Marketing',
            path: '/pricing/bundled-packages',
            bigText: 'STARTER'
        },
        {
            name: 'Ecommerce/App Development',
            path: '/pricing/bundled-packages',
            bigText: 'GROWTH'
        },
        {
            name: 'Ecommerce/App Development + Digital Marketing',
            path: '/pricing/bundled-packages',
            bigText: 'ENTERPRISE'
        }
    ];

    const menuItems = showBundled ? bundledPackageItems : singlePackageItems;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-black text-white relative overflow-hidden perspective-1000">
            <InteractiveParticles />

            {/* Ambient Background Glows */}
            <div className="fixed top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow delay-1000" />

            <div className="max-w-[1600px] mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 pb-2 tracking-tight drop-shadow-2xl">{title}</h1>
                    {subtitle && (
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">{subtitle}</p>
                    )}
                </div>

                {/* Package Type Toggle Switch */}
                <div className="flex justify-center mb-8 animate-fade-in-up">
                    <div className="inline-flex p-1 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.15] shadow-xl">
                        <button
                            onClick={() => {
                                setShowBundled(false);
                                navigate('/pricing/web-development');
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!showBundled
                                ? 'bg-white/[0.12] text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Single Package
                        </button>
                        <button
                            onClick={() => {
                                setShowBundled(true);
                                navigate('/pricing/bundled-packages');
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${showBundled
                                ? 'bg-white/[0.12] text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Bundled Package
                        </button>
                    </div>
                </div>

                {/* Top Navigation Tabs - Pill Design */}
                <div className="flex justify-center mb-16 overflow-x-auto pb-4 hide-scrollbar animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <nav key={showBundled ? 'bundled' : 'single'} className="inline-flex p-1.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] shadow-2xl">
                        {showBundled ? (
                            // Bundle tabs - non-clickable visual indicators
                            bundledPackageItems.map((item, index) => (
                                <span
                                    key={`bundle-${index}`}
                                    className="relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-white"
                                >
                                    <div className="absolute inset-0 bg-white/[0.08] border border-white/[0.15] rounded-full -z-10" />
                                    <span className="relative z-10">{item.name}</span>
                                </span>
                            ))
                        ) : (
                            // Single package tabs - clickable links
                            singlePackageItems.map((item, index) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={`single-${index}`}
                                        to={item.path}
                                        className={`
                                            relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                                            ${isActive ? 'text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                        `}
                                    >
                                        {isActive && (
                                            <>
                                                <div className="absolute inset-0 bg-white/[0.08] border border-white/[0.15] rounded-full -z-10 animate-fade-in" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-full blur-xl -z-20 animate-fade-in" />
                                            </>
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                );
                            })
                        )}
                    </nav>
                </div>

                {/* Main Content - Full Width */}
                <main className="w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    {children}
                </main>

            </div>

            <style>{`
                @keyframes slow-drift {
                    0% { transform: translateX(-2%) rotate(-1deg); }
                    50% { transform: translateX(2%) rotate(1deg); }
                    100% { transform: translateX(-2%) rotate(-1deg); }
                }
                .animate-slow-drift {
                    animation: slow-drift 20s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                /* Hide scrollbar for tabs on mobile */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default PricingLayout;
