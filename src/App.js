import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

// ============================================
// ANTIGRAVIITY TECHNOLOGIES - COMPLETE WEBSITE
// With Integrated Logo Animation
// x.ai / Grok Style - Clean, Minimal, Premium
// ============================================

// ==========================================
// BRAND NAME COMPONENT (Reusable with levitating ii)
// ==========================================
const BrandName = ({ className = "", style = {} }) => {
  return (
    <span className={`inline-flex items-baseline ${className}`} style={style}>
      <span>AntiGrav</span>
      <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
        <span
          className="inline-block"
          style={{
            transform: 'rotate(180deg) translateY(-0.08em)',
            animation: 'levitate1 3s ease-in-out infinite'
          }}
        >i</span>
        <span
          className="inline-block"
          style={{
            transform: 'rotate(180deg) translateY(-0.12em)',
            animation: 'levitate2 3s ease-in-out infinite 0.15s'
          }}
        >i</span>
      </span>
      <span>ty</span>
    </span>
  );
};

// ==========================================
// LOGO ANIMATION COMPONENT
// ==========================================
const LogoAnimation = ({ onComplete, size = "large" }) => {
  const [animationPhase, setAnimationPhase] = useState('start');
  const [scanPosition, setScanPosition] = useState(-5);
  const [iiRevealed, setIiRevealed] = useState(false);

  const sizes = {
    small: "text-xl md:text-2xl",
    medium: "text-3xl md:text-4xl",
    large: "text-5xl md:text-7xl lg:text-8xl"
  };

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setAnimationPhase('revealing');
    }, 300);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (animationPhase === 'revealing') {
      const scanInterval = setInterval(() => {
        setScanPosition(prev => {
          if (prev >= 105) {
            clearInterval(scanInterval);
            setAnimationPhase('revealed');
            return 105;
          }
          if (prev >= 28 && !iiRevealed) {
            setIiRevealed(true);
          }
          return prev + 1.2;
        });
      }, 16);
      return () => clearInterval(scanInterval);
    }
  }, [animationPhase, iiRevealed]);

  useEffect(() => {
    if (animationPhase === 'revealed') {
      const loopTimer = setTimeout(() => {
        setAnimationPhase('loop');
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(loopTimer);
    }
  }, [animationPhase, onComplete]);

  return (
    <div className="relative" style={{ overflow: 'visible', padding: '0.5em 0' }}>
      {/* Scan line */}
      {animationPhase === 'revealing' && (
        <div
          className="absolute top-0 h-full w-[2px] z-20 pointer-events-none"
          style={{
            left: `${scanPosition}%`,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent)',
            boxShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2)',
          }}
        >
          <div
            className="absolute top-0 h-full w-12 -left-6"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
          />
        </div>
      )}

      {/* Logo with reveal mask */}
      <div
        className="relative"
        style={{
          overflow: 'visible',
          clipPath: animationPhase === 'start'
            ? 'inset(0 100% 0 0)'
            : animationPhase === 'revealing'
              ? `inset(0 ${Math.max(0, 100 - scanPosition)}% 0 0)`
              : 'none'
        }}
      >
        <div className={`flex items-baseline justify-center ${sizes[size]} tracking-tight font-semibold select-none`} style={{ paddingBottom: '0.3em', lineHeight: '1.3' }}>
          <span
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >AntiGrav</span>

          {/* Levitating ii pair */}
          <span className="inline-flex items-baseline relative" style={{ margin: '0 0.02em' }}>
            <span
              className="inline-block relative"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                transform: iiRevealed
                  ? 'rotate(180deg) translateY(-0.08em)'
                  : 'rotate(0deg) translateY(0)',
                transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'center center',
                animation: iiRevealed && animationPhase === 'loop'
                  ? 'levitate1 3s ease-in-out infinite'
                  : 'none'
              }}
            >
              i
              {iiRevealed && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-1 rounded-full"
                  style={{
                    bottom: size === 'large' ? '-0.15em' : '-0.12em',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(2px)',
                    animation: animationPhase === 'loop' ? 'shadowPulse 3s ease-in-out infinite' : 'none'
                  }}
                />
              )}
            </span>
            <span
              className="inline-block relative"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                transform: iiRevealed
                  ? 'rotate(180deg) translateY(-0.12em)'
                  : 'rotate(0deg) translateY(0)',
                transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s',
                transformOrigin: 'center center',
                animation: iiRevealed && animationPhase === 'loop'
                  ? 'levitate2 3s ease-in-out infinite 0.15s'
                  : 'none'
              }}
            >
              i
              {iiRevealed && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-1 rounded-full"
                  style={{
                    bottom: size === 'large' ? '-0.18em' : '-0.15em',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)',
                    filter: 'blur(2px)',
                    animation: animationPhase === 'loop' ? 'shadowPulse 3s ease-in-out infinite 0.15s' : 'none'
                  }}
                />
              )}
            </span>
          </span>

          <span
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >ty</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STATIC LOGO (for footer only)
// ==========================================
const StaticLogo = ({ size = "small" }) => {
  const sizes = {
    small: "text-xl",
    medium: "text-2xl"
  };

  return (
    <div className={`flex items-baseline ${sizes[size]} tracking-tight font-normal`}>
      <span className="text-white">AntiGrav</span>
      <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
        <span
          className="inline-block text-white"
          style={{
            transform: 'rotate(180deg) translateY(-0.08em)',
            animation: 'levitate1 3s ease-in-out infinite'
          }}
        >i</span>
        <span
          className="inline-block text-white"
          style={{
            transform: 'rotate(180deg) translateY(-0.12em)',
            animation: 'levitate2 3s ease-in-out infinite 0.15s'
          }}
        >i</span>
      </span>
      <span className="text-white">ty</span>
    </div>
  );
};

// ==========================================
// INTERACTIVE PARTICLE FIELD (Full Page)
// ==========================================
const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // Create particles
    const particleCount = 120;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005
      });
    }
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', setCanvasSize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        // Update wobble
        p.wobble += p.wobbleSpeed;

        // Move particle upward
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 0.5;

        // Mouse interaction - particles get pushed away
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 4;
          p.y += Math.sin(angle) * force * 4;
        }

        // Reset particle when it goes off screen (top)
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        // Wrap horizontally
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connection to mouse if close
        if (dist < 150 && dist > 0) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'transparent'
      }}
    />
  );
};

// ==========================================
// FLOATING PARTICLES (Anti-gravity effect)
// ==========================================
const FloatingParticles = ({ count = 30 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 25 + 20,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 40
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.speed}s linear infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,${p.opacity * 0.3})`,
            '--drift': `${p.drift}px`
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// NAVIGATION
// ==========================================
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about-us' },
    {
      name: 'Services',
      href: '#services',
      dropdown: [
        { name: 'Web Development', href: '#web-development' },
        { name: 'App Development', href: '#app-development' },
        { name: 'Digital Marketing', href: '#digital-marketing' },
        { name: 'Graphic Designing', href: '#graphic-designing' },
        { name: '3D Services', href: '#3d-services' },
      ]
    },
    {
      name: 'Products',
      href: '#products',
      dropdown: [
        { name: 'Antimage CRM', href: '#antimage-crm' },
        { name: 'AntiHRMS', href: '#antihrms' },
        { name: 'AntiSec', href: '#antisec' },
        { name: 'AntiAI', href: '#anti-ai' },
        { name: 'AntiChat', href: '#anti-chat' },
      ]
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent
      `}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center relative">
        {/* Centered navigation items */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="relative text-base font-medium tracking-wide transition-all duration-300 group flex items-center gap-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(180,180,180,0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {item.name}
                {item.dropdown && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {/* Hover shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </a>

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.name && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 min-w-[200px] rounded-xl border border-white/10 backdrop-blur-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Dropdown arrow */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-l border-t border-white/10"
                    style={{ background: 'rgba(0, 0, 0, 0.85)' }}
                  />

                  {item.dropdown.map((dropItem, index) => (
                    <a
                      key={dropItem.name}
                      href={dropItem.href}
                      className="block px-5 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      {dropItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Us CTA button - transparent with white outline on hover */}
        <div className="hidden md:flex items-center absolute right-6">
          <a
            href="#contact"
            className="relative text-base font-medium px-7 py-3 rounded-full overflow-hidden transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
          >
            <span
              className="relative"
              style={{
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Contact Us
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white p-2 absolute right-6"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block text-lg font-medium"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(180,180,180,0.4) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  onClick={() => !item.dropdown && setMobileOpen(false)}
                >
                  {item.name}
                </a>
                {item.dropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block text-base text-white/50 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// ==========================================
// HERO SECTION with Logo Animation
// ==========================================
const HeroSection = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Ice blue curved reflection at top - full width */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 0%, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0.08) 25%, rgba(125, 211, 252, 0.04) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[350px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(186, 230, 253, 0.15) 0%, rgba(125, 211, 252, 0.08) 35%, transparent 65%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(224, 242, 254, 0.25) 0%, rgba(186, 230, 253, 0.12) 40%, transparent 70%)',
        }}
      />
      {/* Top edge glow line - ice blue */}
      {/* <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent z-10" /> */}

      {/* Background container */}
      <div className="absolute inset-0 overflow-hidden">
      </div>

      {/* Radial glow behind logo */}
      <div
        className="absolute w-[600px] h-[300px] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: animationComplete ? 1 : 0
        }}
      />

      {/* Pulsing glow */}
      <div
        className="absolute w-[400px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 60%)',
          animation: animationComplete ? 'pulse 4s ease-in-out infinite' : 'none',
          filter: 'blur(60px)'
        }}
      />

      {/* Energy rings */}
      <div className="absolute pointer-events-none">
        <div
          className="w-[400px] h-[400px] border border-white/[0.03] rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
          style={{
            opacity: animationComplete ? 1 : 0,
            animation: animationComplete ? 'ringPulse 8s ease-in-out infinite' : 'none'
          }}
        />
        <div
          className="w-[550px] h-[550px] border border-white/[0.02] rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
          style={{
            opacity: animationComplete ? 1 : 0,
            transitionDelay: '0.3s',
            animation: animationComplete ? 'ringPulse 10s ease-in-out infinite reverse' : 'none'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center" style={{ overflow: 'visible' }}>
        {/* Animated Logo */}
        <div className="flex justify-center w-full" style={{ overflow: 'visible', marginBottom: '-30px' }}>
          <LogoAnimation size="large" onComplete={() => setAnimationComplete(true)} />
        </div>

        {/* Tagline - fades in after logo animation, right aligned below 'y' */}
        <div
          className="transition-all duration-700 w-full"
          style={{
            opacity: animationComplete ? 1 : 0,
            transform: animationComplete ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '0.2s'
          }}
        >
          <p
            className="text-sm md:text-base tracking-[0.3em] mb-10 font-medium text-right pr-4 md:pr-4"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(150,150,150,0.5) 50%, rgba(100,100,100,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: '-8px'
            }}
          >
            Elevating Businesses.
          </p>
        </div>

        {/* Search input - transparent with white outline on focus */}
        <div
          className="max-w-xl mx-auto mb-10 transition-all duration-700 w-full"
          style={{
            opacity: animationComplete ? 1 : 0,
            transform: animationComplete ? 'translateY(0)' : 'translateY(15px)',
            transitionDelay: '0.4s'
          }}
        >
          <div
            className="relative group"
            style={{
              background: 'transparent',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <input
              type="text"
              placeholder="What do you want to build?"
              className="w-full bg-transparent rounded-full px-6 py-4 text-white placeholder-white/30 transition-all text-sm"
              style={{ outline: 'none' }}
              onFocus={(e) => e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.6)'}
              onBlur={(e) => e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.2)'}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              <svg className="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Announcement - chrome style */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 transition-all duration-700"
          style={{
            opacity: animationComplete ? 1 : 0,
            transform: animationComplete ? 'translateY(0)' : 'translateY(15px)',
            transitionDelay: '0.6s'
          }}
        >
          <span
            className="text-sm"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(120,120,120,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >✦</span>
          <span
            className="text-sm"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(120,120,120,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Now offering{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(180,180,180,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >Enterprise Solutions</span>{' '}
            for global partners
          </span>
          <a
            href="#news"
            className="text-sm transition-opacity hover:opacity-80"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(150,150,150,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Read announcement →
          </a>
        </div>
      </div>

      {/* Scroll indicator - chrome style */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700"
        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: '1s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-wider"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(120,120,120,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >SCROLL</span>
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1), transparent)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PRODUCTS SECTION
// ==========================================
const ProductsSection = () => {
  const products = [
    {
      title: "Antimage CRM",
      subtitle: "Customer Relationship Management",
      description: "Powerful CRM solution to manage your customer relationships, sales pipeline, and business growth with AI-powered insights.",
      link: "Explore Antimage CRM →",
      icon: "◈",
      gradient: "from-blue-500/20 to-cyan-500/10"
    },
    {
      title: "AntiHRMS",
      subtitle: "Human Resource Management System",
      description: "Complete HR management platform for employee management, payroll, attendance tracking, and performance analytics.",
      link: "Explore AntiHRMS →",
      icon: "◇",
      gradient: "from-purple-500/20 to-pink-500/10"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="group p-8 md:p-10 border border-white/[0.08] hover:border-white/[0.15] bg-black/30 backdrop-blur-sm hover:bg-white/[0.02] transition-all duration-500 rounded-2xl relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">{product.icon}</span>
                  </div>
                  <span className="text-xs text-white/30 px-3 py-1 border border-white/10 rounded-full">Product</span>
                </div>

                <h3 className="text-2xl md:text-3xl text-white mb-2 group-hover:text-white transition-colors">{product.title}</h3>
                <p className="text-white/40 text-sm mb-4">{product.subtitle}</p>

                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all group-hover:gap-3"
                >
                  {product.link}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// STATEMENT SECTION
// ==========================================
const StatementSection = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl">
          <h2 className="text-5xl md:text-7xl lg:text-[100px] text-white font-normal leading-[1.05] mb-4">
            Understand
            <span className="text-white/20 ml-4">*</span>
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] text-white/30 font-normal leading-[1.05] md:text-right">
            The Universe
          </h2>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SERVICES SECTION
// ==========================================
const ServicesSection = () => {
  const services = [
    {
      icon: "◈",
      title: "Web Development",
      description: "Modern, responsive websites built with Next.js, React, and cutting-edge frameworks. From landing pages to complex web applications.",
      features: ["Custom Web Apps", "E-commerce Solutions", "Progressive Web Apps"],
      gradient: "from-blue-500/20 to-indigo-500/10"
    },
    {
      icon: "◇",
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences with robust backend integration.",
      features: ["iOS & Android Apps", "Cross-platform Development", "App Maintenance"],
      gradient: "from-green-500/20 to-emerald-500/10"
    },
    {
      icon: "○",
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to amplify your digital presence. SEO, social media, and performance marketing campaigns.",
      features: ["SEO Optimization", "Social Media Marketing", "PPC Campaigns"],
      gradient: "from-orange-500/20 to-amber-500/10"
    },
    {
      icon: "◎",
      title: "Graphic Designing",
      description: "Creative visual solutions that communicate your brand story. Logos, brand identities, and marketing collaterals.",
      features: ["Brand Identity", "UI/UX Design", "Print & Digital Media"],
      gradient: "from-pink-500/20 to-rose-500/10"
    },
    {
      icon: "△",
      title: "3D Services",
      description: "Immersive 3D modeling, animations, and WebGL experiences. Product visualization, architectural renders, and interactive 3D.",
      features: ["3D Modeling", "Product Visualization", "WebGL Experiences"],
      gradient: "from-purple-500/20 to-violet-500/10"
    },
  ];

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— SERVICES —</p>
          <h2 className="text-4xl md:text-5xl text-white font-normal">
            What we provide
          </h2>
          <p className="text-white/40 mt-4 max-w-2xl">
            End-to-end digital solutions tailored to transform your business and elevate your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 border border-white/[0.06] hover:border-white/[0.15] bg-black/30 backdrop-blur-sm hover:bg-white/[0.02] transition-all duration-500 rounded-xl relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="text-3xl text-white/20 mb-6 group-hover:text-white/40 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl text-white mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Features list */}
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
    <section id="contact" className="relative py-32 px-6 border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/[0.04] rounded-full border border-white/[0.06]">
          <span className="text-white/40 text-sm">◈</span>
          <span className="text-white/70 text-sm">Enterprise</span>
        </div>

        <h2 className="text-3xl md:text-5xl text-white font-normal mb-6">
          Ready to scale?
        </h2>

        <p className="text-white/35 text-lg mb-4">
          Unlock <span className="text-white/60">Premium</span> solutions for your team
        </p>

        <p className="text-white/25 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
          Join industry leaders who trust <BrandName className="text-white/40" /> for their digital transformation.
          Get priority access, dedicated support, and custom solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            Start Your Project
          </a>
          <a
            href="#"
            className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// NEWS SECTION
// ==========================================
const NewsSection = () => {
  const news = [
    {
      date: "November 25, 2024",
      title: "AntiGraviity Platform 2.0 Launch",
      description: "Introducing our next-generation development platform.",
      gradient: "from-blue-900/40 to-indigo-900/20"
    },
    {
      date: "November 20, 2024",
      title: "Global Partnership Announcement",
      description: "Strategic partnership with leading technology providers.",
      gradient: "from-emerald-900/40 to-teal-900/20"
    },
    {
      date: "November 15, 2024",
      title: "AI Solutions Suite Preview",
      description: "New AI-powered tools launching Q1 2025.",
      gradient: "from-orange-900/40 to-red-900/20"
    }
  ];

  return (
    <section id="news" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-white/30 text-sm mb-4 tracking-wide">— NEWS —</p>
            <h2 className="text-3xl md:text-4xl text-white font-normal">Latest updates</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.05]">
          {news.map((item) => (
            <article
              key={item.title}
              className="group py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center"
            >
              <div className="md:col-span-2">
                <p className="text-white/25 text-sm">{item.date}</p>
              </div>

              <div className="md:col-span-6">
                <h3 className="text-xl md:text-2xl text-white mb-2 group-hover:text-white/80 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/35 text-sm">{item.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mt-4 transition-colors">
                  Read
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="md:col-span-4">
                <div className={`aspect-video rounded-lg overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                  <div className="w-full h-full bg-black/30" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// FOOTER
// ==========================================
const Footer = () => {
  const links = {
    "Product": ["Antimage CRM", "AntiHRMS", "AntiSec", "AntiAI", "AntiChat"],
    "Services": ["Web Development", "App Development", "Digital Marketing", "Graphic Designing", "3D Services"],
    "Company": ["About Us", "Careers", "Contact",],
    "Legal": ["Privacy", "Terms", "Security", "Cookies"]
  };

  return (
    <footer className="relative" style={{ overflow: 'visible' }}>
      {/* Top section with links */}
      <div className="relative border-t border-white/[0.15]">
        {/* Reflection glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          {/* Four Column Links - evenly distributed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-white text-sm font-medium mb-4">{category}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Large Logo Section */}
      <div className="relative py-4 md:py-0" style={{ overflow: 'visible' }}>
        <div className="w-full px-2 md:px-4" style={{ overflow: 'visible' }}>
          <div className="flex items-baseline justify-center tracking-tighter leading-[0.85] select-none" style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(60px, 12vw, 200px)', overflow: 'visible', paddingBottom: '0.15em' }}>
            <span className="text-white">AntiGrav</span>
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
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.05]" style={{ overflow: 'visible' }}>
        {/* Half moon curved reflection - ice blue gradient - full width */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 150% 100% at 50% 100%, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0.08) 25%, rgba(125, 211, 252, 0.04) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 100%, rgba(186, 230, 253, 0.15) 0%, rgba(125, 211, 252, 0.08) 35%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(224, 242, 254, 0.25) 0%, rgba(186, 230, 253, 0.12) 40%, transparent 70%)',
          }}
        />
        {/* Bottom edge glow line - ice blue */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col items-center gap-4 relative z-10">
          <p className="text-white/100 text-xs mt-4">
            © 2025 AntiGraviity Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>

        {/* Extra padding for reflection space */}
        <div className="h-16" />
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Global Interactive Particles */}
      <InteractiveParticles />

      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <ProductsSection />
        <StatementSection />
        <ServicesSection />
        <CTASection />
        <NewsSection />
      </main>

      <Footer className="relative z-10" />
    </div>
  );
}

export default App;
