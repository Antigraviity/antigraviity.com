import React, { useState, useEffect } from 'react';

// ==========================================
// LOGO ANIMATION COMPONENT - AntiGravity Float Up Reveal
// ==========================================
const LogoAnimation = ({ onComplete, size = "large" }) => {
    const [animationPhase, setAnimationPhase] = useState('start');
    const [floatProgress, setFloatProgress] = useState(0);
    const [iiRevealed, setIiRevealed] = useState(false);

    const sizes = {
        small: "text-xl md:text-2xl",
        medium: "text-3xl md:text-4xl",
        large: "text-5xl md:text-7xl lg:text-8xl"
    };

    // Letter data with staggered delays
    const letters = [
        { char: 'a', position: 0, delay: 0 },
        { char: 'n', position: 1, delay: 0.06 },
        { char: 't', position: 2, delay: 0.12 },
        { char: 'i', position: 3, delay: 0.18 },
        { char: 'g', position: 4, delay: 0.24 },
        { char: 'r', position: 5, delay: 0.30 },
        { char: 'a', position: 6, delay: 0.36 },
        { char: 'v', position: 7, delay: 0.42 },
        { char: 'i', position: 8, delay: 0.48, isSpecial: true },
        { char: 'i', position: 9, delay: 0.54, isSpecial: true },
        { char: 't', position: 10, delay: 0.60 },
        { char: 'y', position: 11, delay: 0.66 },
    ];

    // Start animation
    useEffect(() => {
        const startTimer = setTimeout(() => {
            setAnimationPhase('floating');
        }, 400);
        return () => clearTimeout(startTimer);
    }, []);

    // Float progress
    useEffect(() => {
        if (animationPhase === 'floating') {
            const interval = setInterval(() => {
                setFloatProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Trigger ii flip near the end
                    if (prev >= 70 && !iiRevealed) {
                        setIiRevealed(true);
                    }
                    return prev + 1.5;
                });
            }, 25);
            return () => clearInterval(interval);
        }
    }, [animationPhase, iiRevealed]);

    // Complete phase
    useEffect(() => {
        if (floatProgress >= 100 && animationPhase === 'floating') {
            const completeTimer = setTimeout(() => {
                setAnimationPhase('complete');
                if (onComplete) onComplete();
            }, 400);
            return () => clearTimeout(completeTimer);
        }
    }, [floatProgress, animationPhase, onComplete]);

    // Calculate gentle float-up style for each letter
    const getLetterStyle = (position, delay) => {
        // Each letter has its own timing based on delay
        const letterProgress = Math.max(0, Math.min(100, (floatProgress - delay * 100) * 1.8));

        // Easing function for gentle float (ease-out-cubic)
        const eased = 1 - Math.pow(1 - letterProgress / 100, 3);

        // Start position (below) and float up
        const startY = 60; // Start 60px below
        const currentY = startY * (1 - eased);

        // Gentle opacity fade in
        const opacity = eased;

        // Subtle blur that clears as letter rises
        const blur = (1 - eased) * 4;

        // Very subtle scale
        const scale = 0.95 + (eased * 0.05);

        return {
            transform: `translateY(${currentY}px) scale(${scale})`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transition: 'none',
        };
    };

    // Special style for the flipping "ii"
    const getSpecialIStyle = (position, delay, index) => {
        const baseStyle = getLetterStyle(position, delay);

        if (iiRevealed) {
            const floatOffset = index === 0 ? '-0.08em' : '-0.12em';
            const flipProgress = Math.min(1, (floatProgress - 70) / 20);

            if (flipProgress > 0) {
                return {
                    ...baseStyle,
                    transform: `rotate(180deg) translateY(${floatOffset})`,
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                    transformOrigin: 'center center',
                    animation: animationPhase === 'complete' ? `levitate${index + 1} 3s ease-in-out infinite ${index * 0.15}s` : 'none'
                };
            }
        }

        return baseStyle;
    };

    return (
        <div className="relative" style={{ overflow: 'visible', padding: '0.5em 0' }}>
            {/* Floating particles - rising upward like antigravity */}
            {animationPhase !== 'start' && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(12)].map((_, i) => {
                        const baseDelay = i * 0.15;
                        const particleProgress = Math.max(0, (floatProgress - baseDelay * 50) / 50);
                        const yOffset = 80 - particleProgress * 160; // Float upward
                        const opacity = particleProgress < 0.5
                            ? particleProgress * 2 * 0.4
                            : (1 - (particleProgress - 0.5) * 2) * 0.4;

                        return (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${4 + Math.random() * 4}px`,
                                    height: `${4 + Math.random() * 4}px`,
                                    left: `${8 + i * 7.5}%`,
                                    top: '50%',
                                    transform: `translateY(${yOffset}px) translateX(${Math.sin(floatProgress * 0.05 + i) * 10}px)`,
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                                    opacity: Math.max(0, opacity),
                                    transition: 'none',
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* Soft glow underneath during float */}
            {animationPhase === 'floating' && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        bottom: '-20px',
                        width: '80%',
                        height: '40px',
                        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        opacity: Math.sin(floatProgress * 0.05) * 0.5 + 0.5,
                        filter: 'blur(10px)',
                    }}
                />
            )}

            {/* Rising air wisps */}
            {animationPhase === 'floating' && floatProgress < 90 && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${15 + i * 18}%`,
                                bottom: '0',
                                width: '2px',
                                height: `${30 + Math.sin(floatProgress * 0.1 + i * 2) * 20}px`,
                                background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.15), transparent)',
                                transform: `translateY(${-floatProgress * 1.5 - i * 10}px) scaleY(${0.5 + Math.sin(floatProgress * 0.08 + i) * 0.3})`,
                                opacity: 0.6 - floatProgress * 0.005,
                                filter: 'blur(1px)',
                            }}
                        />
                    ))}
                </div>
            )}

            <div className={`flex items-baseline justify-center ${sizes[size]} tracking-tight select-none relative z-10`} style={{ paddingBottom: '0.3em', lineHeight: '1.3', fontFamily: '"Outfit", sans-serif', fontWeight: 'normal' }}>

                {/* AntiGrav */}
                {letters.slice(0, 8).map((letter, idx) => (
                    <span
                        key={idx}
                        className="inline-block"
                        style={{
                            ...getLetterStyle(letter.position, letter.delay),
                            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {letter.char}
                    </span>
                ))}

                {/* Special ii */}
                <span className="inline-flex items-baseline relative" style={{ margin: '0 0.02em' }}>
                    {letters.slice(8, 10).map((letter, idx) => (
                        <span
                            key={idx}
                            className="inline-block relative"
                            style={{
                                ...getSpecialIStyle(letter.position, letter.delay, idx),
                                background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {letter.char}
                            {iiRevealed && animationPhase === 'complete' && (
                                <span
                                    className="absolute left-1/2 -translate-x-1/2 w-3 h-1 rounded-full"
                                    style={{
                                        bottom: size === 'large' ? (idx === 0 ? '-0.15em' : '-0.18em') : (idx === 0 ? '-0.12em' : '-0.15em'),
                                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)',
                                        filter: 'blur(2px)',
                                        animation: `shadowPulse 3s ease-in-out infinite ${idx * 0.15}s`,
                                    }}
                                />
                            )}
                        </span>
                    ))}
                </span>

                {/* ty */}
                {letters.slice(10).map((letter, idx) => (
                    <span
                        key={idx}
                        className="inline-block"
                        style={{
                            ...getLetterStyle(letter.position, letter.delay),
                            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {letter.char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LogoAnimation;
