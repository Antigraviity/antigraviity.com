import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const location = useLocation();

    // Updated: 2025-12-06 - Pricing pages use amber color

    // Gradient definitions matching Footer component
    const gradients = {
        default: {
            color: 'rgba(56, 189, 248, 0.5)', // Sky blue
            glow: 'rgba(56, 189, 248, 0.2)'
        },
        about: {
            color: 'rgba(148, 163, 184, 0.5)', // Slate
            glow: 'rgba(148, 163, 184, 0.2)'
        },
        contact: {
            color: 'rgba(139, 92, 246, 0.5)', // Violet
            glow: 'rgba(139, 92, 246, 0.2)'
        },
        mainServices: {
            color: 'rgba(163, 230, 53, 0.5)', // Lime
            glow: 'rgba(163, 230, 53, 0.2)'
        },
        services: {
            '/services/web-development': { color: 'rgba(59, 130, 246, 0.5)', glow: 'rgba(59, 130, 246, 0.2)' }, // Blue
            '/services/app-development': { color: 'rgba(34, 197, 94, 0.5)', glow: 'rgba(34, 197, 94, 0.2)' }, // Green
            '/services/digital-marketing': { color: 'rgba(249, 115, 22, 0.5)', glow: 'rgba(249, 115, 22, 0.2)' }, // Orange
            '/services/graphic-designing': { color: 'rgba(236, 72, 153, 0.5)', glow: 'rgba(236, 72, 153, 0.2)' }, // Pink
            '/services/3d-services': { color: 'rgba(168, 85, 247, 0.5)', glow: 'rgba(168, 85, 247, 0.2)' } // Purple
        },
        products: {
            '/products/antimage-crm': { color: 'rgba(234, 179, 8, 0.5)', glow: 'rgba(234, 179, 8, 0.2)' }, // Yellow
            '/products/antihrms': { color: 'rgba(168, 85, 247, 0.5)', glow: 'rgba(168, 85, 247, 0.2)' }, // Purple
            '/products/antisec': { color: 'rgba(239, 68, 68, 0.5)', glow: 'rgba(239, 68, 68, 0.2)' }, // Red
            '/products/antiai': { color: 'rgba(16, 185, 129, 0.5)', glow: 'rgba(16, 185, 129, 0.2)' }, // Emerald
            '/products/antichat': { color: 'rgba(99, 102, 241, 0.5)', glow: 'rgba(99, 102, 241, 0.2)' } // Indigo
        }
    };

    // Determine current color based on route
    const getCurrentStyle = () => {
        const path = location.pathname;

        if (path === '/about-us') return gradients.about;
        if (path === '/contact') return gradients.contact;
        if (path === '/services') return gradients.mainServices;
        if (path.startsWith('/services/')) return gradients.services[path] || gradients.default;
        if (path.startsWith('/products/')) return gradients.products[path] || gradients.default;
        if (path.startsWith('/pricing/')) return { color: 'rgba(194, 120, 60, 0.5)', glow: 'rgba(180, 100, 40, 0.3)' }; // Brownish-Orange to match footer gradient

        return gradients.default; // Default sky blue
    };

    const currentStyle = getCurrentStyle();

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable element
            const target = e.target;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            );
        };

        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <>
            <style>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: pointer;
        }
        input, textarea, select {
          cursor: auto;
        }

      `}</style>

            {/* Ambient Background Glow - Always visible */}
            <div
                className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[9990] transition-opacity duration-300 ease-out"
                style={{
                    background: `radial-gradient(circle, ${currentStyle.color.replace('0.5)', '0.15)')} 0%, transparent 70%)`,
                    transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
                    filter: 'blur(50px)',
                    mixBlendMode: 'screen'
                }}
            />



            {/* Central Diamond Node - Hidden when hovering interactive elements */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out bg-white"
                style={{
                    width: '6px',
                    height: '6px',
                    transform: `translate(${position.x - 3}px, ${position.y - 3}px) rotate(45deg)`,
                    boxShadow: `0 0 10px ${currentStyle.glow}`,
                    opacity: isPointer ? 0 : 1
                }}
            />
        </>
    );
};

export default CustomCursor;
