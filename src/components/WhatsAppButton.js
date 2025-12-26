import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const phoneNumber = '916379388462'; // WhatsApp number without + or spaces
    const message = encodeURIComponent('Hello! I would like to know more about your services.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    const isLegalPage = location.pathname.startsWith('/privacy') ||
        location.pathname.startsWith('/terms') ||
        location.pathname.startsWith('/saas-agreement') ||
        location.pathname.startsWith('/sla') ||
        location.pathname.startsWith('/aup');

    const getPulseColor = () => {
        if (isLegalPage) return 'rgba(26, 26, 26, 0.25)';

        const path = location.pathname;

        // Exact matches from App.js footer gradients
        if (path === '/services') return 'rgba(163, 230, 53, 0.3)'; // Neon Lime
        if (path === '/products') return 'rgba(34, 211, 238, 0.3)'; // Bright Cyan
        if (path === '/about-us') return 'rgba(148, 163, 184, 0.3)'; // Silver/Slate
        if (path === '/contact') return 'rgba(139, 92, 246, 0.3)'; // Violet/Purple

        // Service specific pages
        if (path === '/services/web-development') return 'rgba(59, 130, 246, 0.3)';
        if (path === '/services/app-development') return 'rgba(34, 197, 94, 0.3)';
        if (path === '/services/digital-marketing') return 'rgba(249, 115, 22, 0.3)';
        if (path === '/services/graphic-designing') return 'rgba(236, 72, 153, 0.3)';
        if (path === '/services/3d-services') return 'rgba(168, 85, 247, 0.3)';

        // Product specific pages
        if (path === '/products/antimage-crm') return 'rgba(234, 179, 8, 0.3)';
        if (path === '/products/antihrms') return 'rgba(168, 85, 247, 0.3)';
        if (path === '/products/antisec') return 'rgba(239, 68, 68, 0.3)';
        if (path === '/products/antiai') return 'rgba(16, 185, 129, 0.3)';
        if (path === '/products/antichat') return 'rgba(99, 102, 241, 0.3)';

        // Pricing pages
        if (path.startsWith('/pricing/')) return 'rgba(245, 158, 11, 0.3)'; // Amber

        // Fallback for careers or other pages
        if (path.startsWith('/careers')) return 'rgba(236, 72, 153, 0.3)';

        return 'rgba(56, 189, 248, 0.3)'; // Default Sky Blue (Home)
    };

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Chat on WhatsApp"
        >
            {/* Pulsing ring effect */}
            <div
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                    background: getPulseColor(),
                    transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                    opacity: isHovered ? 0 : 1,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
            />

            {/* Main button */}
            <div
                className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300"
                style={{
                    background: isLegalPage ? 'rgba(26, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                    border: isLegalPage ? '1px solid rgba(26, 26, 26, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: isHovered
                        ? (isLegalPage ? '0 8px 30px rgba(26, 26, 26, 0.15), 0 0 20px rgba(26, 26, 26, 0.1)' : '0 8px 30px rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)')
                        : (isLegalPage ? '0 4px 15px rgba(0, 0, 0, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.5)')
                }}
            >
                {/* WhatsApp Icon */}
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke={isLegalPage ? "rgba(26, 26, 26, 0.9)" : "rgba(255, 255, 255, 0.9)"}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.92 14.38c-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.71.88-.86 1.06-.15.18-.3.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.15-.27-.02-.41.11-.55.13-.13.27-.33.41-.49.14-.16.18-.27.27-.45.09-.18.04-.33-.02-.46-.07-.13-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.33-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.82.13.18 1.92 2.94 4.65 4.12 2.73 1.18 2.73.79 3.23.74.5-.05 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
                    />
                </svg>
            </div>

            {/* Tooltip */}
            <div
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 pointer-events-none"
                style={{
                    background: isLegalPage ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: isLegalPage ? '1px solid rgba(26, 26, 26, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(10px)'
                }}
            >
                <span className={isLegalPage ? "text-gray-900 text-sm font-medium" : "text-white text-sm font-medium"}>Chat with us on WhatsApp</span>
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rotate-45"
                    style={{
                        background: isLegalPage ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)',
                        borderRight: isLegalPage ? '1px solid rgba(26, 26, 26, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderBottom: isLegalPage ? '1px solid rgba(26, 26, 26, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                />
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.4);
          }
        }
      `}</style>
        </a>
    );
};

export default WhatsAppButton;
