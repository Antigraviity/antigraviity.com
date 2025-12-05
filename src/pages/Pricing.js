
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PricingLayout from '../components/PricingLayout';
import { pricingData } from '../data/pricingData';
import usePageTitle from '../hooks/usePageTitle';

// ==========================================
// 3D TILT PRO CARD COMPONENT
// ==========================================
const TiltCard = ({ plan, index, isHorizontal = false }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});
    const [glowStyle, setGlowStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Reduced spotlight intensity from 0.15 to 0.06
        setGlowStyle({
            background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`,
            opacity: 1
        });
    };

    const handleMouseLeave = () => {
        setGlowStyle({ opacity: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-3xl transition-all duration-300 transform-gpu"
            style={{
                animationDelay: `${index * 100}ms`
            }}
        >
            {/* Card Content Container - Glassmorphism */}
            <div className={`
                h-full flex ${isHorizontal ? 'flex-row' : 'flex-col'} relative overflow-hidden rounded-3xl
                bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                shadow-2xl shadow-black/50
            `}>

                {/* Spotlight Glow Effect */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={glowStyle}
                />

                {/* Top Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${plan.gradient} opacity-80`} />

                {/* Popular Badge */}
                {plan.isPopular && (
                    <div className="absolute top-0 right-0 z-20">
                        <div className="bg-gradient-to-bl from-yellow-500/80 to-transparent p-px rounded-bl-2xl">
                            <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-bl-2xl border-b border-l border-white/10">
                                <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest text-shadow-glow">Best Value</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-8 flex-1 flex flex-col relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                                {plan.name}
                            </h3>
                            {plan.badge && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold animate-pulse">
                                    {plan.badge}
                                </span>
                            )}
                        </div>
                        {plan.subtitle && (
                            <div className="mb-3 px-3 py-1.5 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-lg inline-block">
                                <span className="text-sm font-semibold text-white/90">
                                    {plan.subtitle}
                                </span>
                            </div>
                        )}
                        {plan.originalPrice && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg text-gray-500 line-through">₹{plan.originalPrice}</span>
                                <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-orange-400 text-xs font-bold">
                                    {plan.discount}
                                </span>
                            </div>
                        )}
                        <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                {plan.price.startsWith('₹') || plan.price === 'Custom' ? '' : '₹'}
                                {plan.price.split(' (')[0]}
                            </span>
                            {plan.price.includes('(') && (
                                <span className="text-xs text-gray-400 font-normal">
                                    ({plan.price.split('(')[1].replace(')', '')})
                                </span>
                            )}
                            {plan.price !== 'Custom' && (
                                <span className="text-gray-500 text-sm font-medium"> <span className="text-xs text-gray-400">+ 18% GST</span></span>
                            )}
                        </div>
                    </div>

                    {/* Features Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                        {[...plan.features].sort((a, b) => (a.included === b.included ? 0 : a.included ? -1 : 1)).map((feature, idx) => {
                            const isIncluded = feature.included;
                            // Check if this is a bundle combination item (contains service names)
                            const isCombinationItem = feature.name.includes('Website Development') ||
                                feature.name.includes('Digital Marketing') ||
                                feature.name.includes('Ecommerce') ||
                                feature.name.includes('Mobile App');
                            return (
                                <li key={idx} className={`flex items-start text-sm transition-colors ${isCombinationItem
                                    ? 'p-2 rounded-lg border border-amber-500/30 bg-amber-500/5'
                                    : ''
                                    } ${isIncluded ? 'text-gray-300 group-hover:text-white' : 'text-gray-600'}`}>
                                    <div className={`
                                        mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center 
                                        ${isIncluded
                                            ? `bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]`
                                            : 'bg-red-500/10 text-red-500/50'}
                                    `}>
                                        {isIncluded ? (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`leading-relaxed ${isIncluded ? 'font-light' : 'font-light line-through decoration-gray-700'}`}>
                                        {feature.name}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Action Button */}
                    <a
                        href="/contact"
                        className={`
                            relative w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group/btn
                            ${plan.isPopular
                                ? 'text-black shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)] hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]'
                                : 'text-white border border-white/10 hover:border-white/30 hover:bg-white/5'}
                        `}
                    >
                        {plan.isPopular ? (
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500" />
                        ) : null}

                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Get Started
                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>

            {/* Background Reflection/Glow underneath - Reduced opacity from 20 to 5 */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`} />
        </div>
    );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const Pricing = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    usePageTitle('Pricing | AntiGraviity');


    const data = pricingData[category] || pricingData['web-development'];

    return (
        <PricingLayout title={data.title} subtitle={data.description}>
            <div className="flex flex-nowrap justify-center gap-8 perspective-1000 overflow-x-auto">
                {data.plans.map((plan, index) => (
                    <div
                        key={index}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                    >
                        <TiltCard plan={plan} index={index} />
                    </div>
                ))}
            </div>

            {/* AMC Section */}
            {data.amc && (
                <div className="mt-16 sm:mt-24 max-w-5xl mx-auto px-4">
                    <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 bg-white/[0.03] shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />

                        <div className="relative z-10 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Left Side: Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                                    {data.amc.title}
                                </h2>
                                <div className="text-xl sm:text-2xl text-blue-400 font-semibold">
                                    {data.amc.price} <span className="text-sm text-gray-400 font-normal">+ 18% GST</span>
                                </div>
                                <div className="text-gray-500 text-sm mt-1 mb-6">(Recommended for long-term health)</div>
                                <Link to="/contact" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/10 inline-block">
                                    {category === 'digital-marketing' ? 'Get Started with Retainer' : 'Contact for AMC'}
                                </Link>
                            </div>

                            {/* Right Side: Features */}
                            <div className="flex-[1.5] w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                    {data.amc.features.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-300">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation CSS (Inline for simplicity) */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
            `}</style>
        </PricingLayout>
    );
};

export default Pricing;
