import React from 'react';
import { Link } from 'react-router-dom';

const FlashMessage = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0ea5e9]/60 backdrop-blur-xl border-b border-white/20 text-white py-2.5 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                <span className="mx-8 text-[13px] font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The revolution is loading... ⬛⬛⬛⬜⬜ Something amazing is in the works... AntiGraviity SaaS Suite dropping soon.
                    <Link to="/products" className="ml-2 underline hover:text-white/80 transition-colors">EXPLORE</Link>
                </span>
                <span className="mx-8 text-[13px] font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The revolution is loading... ⬛⬛⬛⬜⬜ Something amazing is in the works... AntiGraviity SaaS Suite dropping soon.
                    <Link to="/products" className="ml-2 underline hover:text-white/80 transition-colors">EXPLORE</Link>
                </span>
                <span className="mx-8 text-[13px] font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The revolution is loading... ⬛⬛⬛⬜⬜ Something amazing is in the works... AntiGraviity SaaS Suite dropping soon.
                    <Link to="/products" className="ml-2 underline hover:text-white/80 transition-colors">EXPLORE</Link>
                </span>
                <span className="mx-8 text-[13px] font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The revolution is loading... ⬛⬛⬛⬜⬜ Something amazing is in the works... AntiGraviity SaaS Suite dropping soon.
                    <Link to="/products" className="ml-2 underline hover:text-white/80 transition-colors">EXPLORE</Link>
                </span>
            </div>
        </div>
    );
};

export default FlashMessage;
