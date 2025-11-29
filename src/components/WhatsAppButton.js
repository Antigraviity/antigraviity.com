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
                    background: isLegalPage ? 'rgba(26, 26, 26, 0.1)' : 'rgba(255, 255, 255, 0.1)',
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
                    className="w-7 h-7"
                    fill="none"
                    stroke={isLegalPage ? "rgba(26, 26, 26, 0.7)" : "rgba(255, 255, 255, 0.7)"}
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
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

            <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
        </a>
    );
};

export default WhatsAppButton;
