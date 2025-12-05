import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';

// Import Service Pages
import WebDevelopment from './pages/WebDevelopment';
import AppDevelopment from './pages/AppDevelopment';
import DigitalMarketing from './pages/DigitalMarketing';
import GraphicDesigning from './pages/GraphicDesigning';
import ThreeDServices from './pages/ThreeDServices';

// Import Product Pages
import AntimageCRM from './pages/AntimageCRM';
import AntiHRMS from './pages/AntiHRMS';
import AntiSec from './pages/AntiSec';
import AntiAI from './pages/AntiAI';
import AntiChat from './pages/AntiChat';

// Import Other Pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import SaaSAgreement from './pages/legal/SaaSAgreement';
import SLA from './pages/legal/SLA';
import AcceptableUsePolicy from './pages/legal/AcceptableUsePolicy';
import Services from './pages/Services';
import Products from './pages/Products';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';
import NotFound from './pages/NotFound';
import usePageTitle from './hooks/usePageTitle';
import ThreeGlobe from './components/ThreeGlobe';
import Pricing from './pages/Pricing';

// ANTIGRAVIITY TECHNOLOGIES - COMPLETE WEBSITE
// With Integrated Logo Animation
// x.ai / Grok Style - Clean, Minimal, Premium
// ============================================

import { technologies } from './data/technologyStack';
import LogoAnimation from './components/LogoAnimation';
import Preloader from './components/Preloader';
import InteractiveParticles from './components/InteractiveParticles';

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
// LOGO ANIMATION COMPONENT - AntiGravity Float Up Reveal
// ==========================================
// ==========================================
// LOGO ANIMATION COMPONENT - IMPORTED
// ==========================================



// ==========================================
// NAVIGATION
// ==========================================
const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to hide reflection gradients
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'App Development', href: '/services/app-development' },
        { name: 'Digital Marketing', href: '/services/digital-marketing' },
        { name: 'Graphic Designing', href: '/services/graphic-designing' },
        { name: '3D Services', href: '/services/3d-services' },
      ]
    },
    {
      name: 'Products',
      href: '/products',
      dropdown: [
        { name: 'AntiMage CRM', href: '/products/antimage-crm' },
        { name: 'AntiHRMS', href: '/products/antihrms' },
        { name: 'AntiSec', href: '/products/antisec' },
        { name: 'AntiAI', href: '/products/antiai' },
        { name: 'AntiChat', href: '/products/antichat' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isHomepage = location.pathname === '/';
  const isLegalPage = location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/saas-agreement') ||
    location.pathname.startsWith('/sla') ||
    location.pathname.startsWith('/aup');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isLegalPage
      ? (scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' : 'bg-white border-b border-gray-100')
      : (scrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-black')
      }`}>
      {/* Top reflection gradient - only on homepage, hidden on scroll */}
      {isHomepage && (
        <>
          {/* Curved half-moon reflection */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500"
            style={{
              width: '140%',
              height: '200px',
              borderRadius: '0 0 50% 50%',
              background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(125, 211, 252, 0.08) 30%, rgba(186, 230, 253, 0.04) 50%, transparent 70%)',
              opacity: scrolled ? 0 : 1,
              filter: 'blur(20px)',
            }}
          />
          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500"
            style={{
              width: '100%',
              height: '150px',
              borderRadius: '0 0 50% 50%',
              background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(224, 242, 254, 0.12) 0%, rgba(186, 230, 253, 0.06) 40%, transparent 65%)',
              opacity: scrolled ? 0 : 1,
              filter: 'blur(10px)',
            }}
          />
        </>
      )}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative">
        {/* Logo - shows on non-homepage pages OR on homepage when scrolled */}
        <div className="hidden md:flex items-center" style={{ minWidth: '250px' }}>
          {(location.pathname !== '/' || scrolled) && (
            <Link to="/" className="flex items-baseline text-4xl font-semibold tracking-tight transition-opacity duration-500" style={{ opacity: scrolled || location.pathname !== '/' ? 1 : 0 }}>
              <span style={{ color: isLegalPage ? '#1a1a1a' : undefined, background: isLegalPage ? undefined : 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)', WebkitBackgroundClip: isLegalPage ? undefined : 'text', WebkitTextFillColor: isLegalPage ? undefined : 'transparent', backgroundClip: isLegalPage ? undefined : 'text' }}>
                AntiGrav
              </span>
              <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
                <span className="inline-block" style={{ color: isLegalPage ? '#1a1a1a' : undefined, background: isLegalPage ? undefined : 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)', WebkitBackgroundClip: isLegalPage ? undefined : 'text', WebkitTextFillColor: isLegalPage ? undefined : 'transparent', backgroundClip: isLegalPage ? undefined : 'text', transform: 'rotate(180deg) translateY(-0.08em)', animation: 'levitate1 3s ease-in-out infinite' }}>
                  i
                </span>
                <span className="inline-block" style={{ color: isLegalPage ? '#1a1a1a' : undefined, background: isLegalPage ? undefined : 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)', WebkitBackgroundClip: isLegalPage ? undefined : 'text', WebkitTextFillColor: isLegalPage ? undefined : 'transparent', backgroundClip: isLegalPage ? undefined : 'text', transform: 'rotate(180deg) translateY(-0.12em)', animation: 'levitate2 3s ease-in-out infinite 0.15s' }}>
                  i
                </span>
              </span>
              <span style={{ color: isLegalPage ? '#1a1a1a' : undefined, background: isLegalPage ? undefined : 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)', WebkitBackgroundClip: isLegalPage ? undefined : 'text', WebkitTextFillColor: isLegalPage ? undefined : 'transparent', backgroundClip: isLegalPage ? undefined : 'text' }}>
                ty
              </span>
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="relative text-base font-medium tracking-wide transition-all duration-300 group flex items-center gap-1"
                style={
                  isLegalPage
                    ? { color: '#1a1a1a' }
                    : {
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(180,180,180,0.4) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }
                }
              >
                {item.name}
                {item.dropdown && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke={isLegalPage ? "rgba(26,26,26,0.5)" : "rgba(255,255,255,0.5)"}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {/* Creative Hover Effect: Glowing Stardust Underline */}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent ${isLegalPage ? 'via-gray-900' : 'via-white'} to-transparent w-0 group-hover:w-full transition-[width] duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isLegalPage ? 'bg-gray-900' : 'bg-white'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 blur-[1px]`} />
              </Link>

              {/* Invisible bridge to prevent dropdown from closing when moving cursor through gap */}
              {item.dropdown && (
                <div className="absolute top-full left-0 w-full h-8 bg-transparent" />
              )}

              {item.dropdown && activeDropdown === item.name && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 min-w-[200px] rounded-xl backdrop-blur-xl ${isLegalPage ? 'border border-gray-200' : 'border border-white/10'
                    }`}
                  style={{
                    background: isLegalPage ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)',
                    boxShadow: isLegalPage
                      ? '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                      : '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 ${isLegalPage ? 'border-l border-t border-gray-200' : 'border-l border-t border-white/10'
                      }`}
                    style={{ background: isLegalPage ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)' }}
                  />

                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.name}
                      to={dropItem.href}
                      className={`block px-5 py-2.5 text-sm transition-all duration-200 ${isLegalPage
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {dropItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end" style={{ minWidth: '180px' }}>
          <Link
            to="/contact"
            className="relative text-base font-medium px-7 py-3 rounded-full overflow-hidden transition-all duration-300"
            style={{
              background: 'transparent',
              border: isLegalPage ? '1px solid rgba(26,26,26,0.2)' : '1px solid rgba(255,255,255,0.2)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = isLegalPage ? 'rgba(26,26,26,0.6)' : 'rgba(255,255,255,0.6)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = isLegalPage ? 'rgba(26,26,26,0.2)' : 'rgba(255,255,255,0.2)'}
          >
            <span className="relative" style={{ color: isLegalPage ? 'rgba(26,26,26,0.7)' : 'rgba(255,255,255,0.7)' }}>
              Contact Us
            </span>
          </Link>
        </div>

        {/* Mobile Contact Us Button - left side */}
        <Link
          to="/contact"
          className="md:hidden text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 relative z-10"
          style={{
            background: 'transparent',
            border: isLegalPage ? '1px solid rgba(26,26,26,0.2)' : '1px solid rgba(255,255,255,0.2)',
            color: isLegalPage ? 'rgba(26,26,26,0.7)' : 'rgba(255,255,255,0.7)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = isLegalPage ? 'rgba(26,26,26,0.6)' : 'rgba(255,255,255,0.6)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = isLegalPage ? 'rgba(26,26,26,0.2)' : 'rgba(255,255,255,0.2)'}
        >
          Contact
        </Link>

        {/* Mobile Logo - shows on non-homepage OR on homepage when scrolled, centered */}
        <div className="md:hidden flex items-center absolute left-1/2 -translate-x-1/2">
          {(location.pathname !== '/' || scrolled) && (
            <Link
              to="/"
              className="flex items-baseline text-2xl font-semibold tracking-tight transition-opacity duration-500"
              style={{ opacity: scrolled || location.pathname !== '/' ? 1 : 0 }}
            >
              <span
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >AntiGrav</span>
              <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transform: 'rotate(180deg) translateY(-0.08em)',
                    animation: 'levitate1 3s ease-in-out infinite'
                  }}
                >i</span>
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transform: 'rotate(180deg) translateY(-0.12em)',
                    animation: 'levitate2 3s ease-in-out infinite 0.15s'
                  }}
                >i</span>
              </span>
              <span
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 25%, #a8a8a8 50%, #6b6b6b 75%, #4a4a4a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >ty</span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white p-2 ml-auto relative z-10"
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
                <Link
                  to={item.href}
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
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        to={dropItem.href}
                        className="block text-base text-white/50 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Us Button */}
            <div className="pt-4">
              <Link
                to="/contact"
                className="block text-center text-base font-medium px-7 py-3 rounded-full transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.7)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// HERO SECTION with Logo Animation
// ==========================================
const HeroSection = () => {
  usePageTitle('Home | AntiGraviity');
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Search suggestions data with metadata
  const searchSuggestions = [
    // Services
    {
      title: 'Web Development',
      path: '/services/web-development',
      type: 'service',
      icon: '◈',
      keywords: ['web', 'website', 'web development', 'react', 'nextjs', 'next.js', 'vue', 'angular', 'frontend', 'backend', 'fullstack', 'full stack', 'responsive', 'landing page', 'ecommerce', 'e-commerce', 'online store', 'portal', 'webapp', 'web app', 'pwa', 'progressive web app', 'cms', 'wordpress', 'node', 'javascript', 'typescript', 'html', 'css'],
      description: 'Modern websites & web apps'
    },
    {
      title: 'App Development',
      path: '/services/app-development',
      type: 'service',
      icon: '◇',
      keywords: ['app', 'mobile', 'ios', 'android', 'app development', 'mobile app', 'application', 'native', 'hybrid', 'cross-platform', 'react native', 'flutter', 'swift', 'kotlin', 'iphone', 'ipad', 'tablet', 'smartphone', 'mobile development', 'apk', 'play store', 'app store', 'firebase'],
      description: 'iOS & Android applications'
    },
    {
      title: 'Digital Marketing',
      path: '/services/digital-marketing',
      type: 'service',
      icon: '○',
      keywords: ['marketing', 'seo', 'digital marketing', 'social media', 'social', 'facebook', 'instagram', 'twitter', 'linkedin', 'ads', 'advertising', 'ppc', 'google ads', 'meta ads', 'content marketing', 'email marketing', 'campaign', 'analytics', 'optimization', 'sem', 'smm', 'influencer', 'brand awareness', 'lead generation', 'conversion'],
      description: 'SEO & social campaigns'
    },
    {
      title: 'Graphic Designing',
      path: '/services/graphic-designing',
      type: 'service',
      icon: '◎',
      keywords: ['design', 'graphic', 'logo', 'ui', 'ux', 'graphic design', 'branding', 'brand identity', 'visual design', 'creative', 'illustration', 'photoshop', 'illustrator', 'figma', 'sketch', 'poster', 'flyer', 'banner', 'business card', 'packaging', 'print', 'typography', 'color', 'layout', 'mockup', 'prototype', 'wireframe', 'user interface', 'user experience'],
      description: 'Brand identity & UI/UX'
    },
    {
      title: '3D Services',
      path: '/services/3d-services',
      type: 'service',
      icon: '△',
      keywords: ['3d', 'modeling', 'animation', '3d services', 'three dimensional', 'render', 'rendering', 'blender', 'maya', 'cinema 4d', 'c4d', '3ds max', 'zbrush', 'webgl', 'threejs', 'three.js', 'product visualization', 'architectural', 'cgi', 'vfx', 'motion graphics', 'ar', 'vr', 'augmented reality', 'virtual reality', 'metaverse'],
      description: '3D modeling & visualization'
    },
    // Products
    {
      title: 'AntiMage CRM',
      path: '/products/antimage-crm',
      type: 'product',
      icon: '◈',
      keywords: ['crm', 'antimage', 'customer', 'customer relationship', 'sales', 'pipeline', 'lead management', 'contact management', 'client', 'customer management', 'salesforce', 'hubspot', 'relationship management', 'deals', 'opportunities', 'funnel', 'automation', 'customer service'],
      description: 'Customer relationship management'
    },
    {
      title: 'AntiHRMS',
      path: '/products/antihrms',
      type: 'product',
      icon: '◇',
      keywords: ['hrms', 'hr', 'payroll', 'antihrms', 'human resources', 'employee', 'attendance', 'leave', 'recruitment', 'hiring', 'onboarding', 'performance', 'appraisal', 'workforce', 'staff', 'personnel', 'benefits', 'compensation', 'time tracking', 'timesheet'],
      description: 'HR management system'
    },
    {
      title: 'AntiSec',
      path: '/products/antisec',
      type: 'product',
      icon: '⬡',
      keywords: ['security', 'cybersecurity', 'antisec', 'cyber', 'threat', 'protection', 'firewall', 'antivirus', 'malware', 'encryption', 'vulnerability', 'penetration testing', 'pen test', 'security audit', 'compliance', 'data protection', 'network security', 'endpoint', 'siem', 'monitoring'],
      description: 'Enterprise security platform'
    },
    {
      title: 'AntiAI',
      path: '/products/antiai',
      type: 'product',
      icon: '◎',
      keywords: ['ai', 'antiai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network', 'nlp', 'natural language', 'computer vision', 'chatbot', 'bot', 'automation', 'predictive', 'data science', 'tensorflow', 'pytorch', 'gpt', 'llm', 'large language model', 'generative ai'],
      description: 'AI & ML solutions'
    },
    {
      title: 'AntiChat',
      path: '/products/antichat',
      type: 'product',
      icon: '▣',
      keywords: ['chat', 'messaging', 'communication', 'antichat', 'team chat', 'collaboration', 'slack', 'teams', 'discord', 'instant messaging', 'group chat', 'video call', 'voice call', 'conferencing', 'meeting', 'workspace', 'channels', 'direct message', 'dm'],
      description: 'Team communication platform'
    },
  ];

  // Filter suggestions based on search query
  const getFilteredSuggestions = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    return searchSuggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(query) ||
      suggestion.keywords.some(keyword => keyword.includes(query) || query.includes(keyword)) ||
      suggestion.description.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 suggestions
  };

  const filteredSuggestions = getFilteredSuggestions();

  const handleSearch = (path) => {
    if (path) {
      navigate(path);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    // If there are suggestions, navigate to the first one
    if (filteredSuggestions.length > 0) {
      navigate(filteredSuggestions[0].path);
    } else {
      // Redirect to not-found page if no match
      navigate('/not-found');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSearch(filteredSuggestions[selectedIndex].path);
      } else {
        handleSearch();
      }
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <div
        className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 0%, rgba(56, 189, 248, 0.03) 0%, rgba(56, 189, 248, 0.015) 25%, rgba(125, 211, 252, 0.01) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[70px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(186, 230, 253, 0.04) 0%, rgba(125, 211, 252, 0.02) 35%, transparent 65%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(224, 242, 254, 0.05) 0%, rgba(186, 230, 253, 0.025) 40%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden"></div>

      <div
        className="absolute w-[600px] h-[300px] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: animationComplete ? 1 : 0
        }}
      />

      {/* Rotating Diamond Globe Background */}
      <div
        key="globe-background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-80"
        style={{
          transition: 'opacity 1s ease-in-out',
          opacity: animationComplete ? 0.8 : 0
        }}
      >
        <ThreeGlobe />
      </div>

      <div
        className="absolute w-[400px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 60%)',
          animation: animationComplete ? 'pulse 4s ease-in-out infinite' : 'none',
          filter: 'blur(60px)'
        }}
      />

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

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center" style={{ overflow: 'visible' }}>
        <div className="flex justify-center w-full" style={{ overflow: 'visible', marginBottom: '-20px' }}>
          <LogoAnimation size="large" onComplete={() => setAnimationComplete(true)} />
        </div>

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
            }}
          >
            Elevating Businesses.
          </p>
        </div>

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
            {/* Focus glow effect */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none"
              id="searchGlow"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(125, 211, 252, 0.08) 40%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
            <input
              type="text"
              placeholder="What do you want to build?"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent rounded-full px-6 py-4 text-white placeholder-white/30 transition-all text-sm relative z-10"
              style={{ outline: 'none' }}
              onFocus={(e) => {
                e.currentTarget.parentElement.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                e.currentTarget.parentElement.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.15), 0 0 40px rgba(125, 211, 252, 0.1)';
                const glow = e.currentTarget.parentElement.querySelector('#searchGlow');
                if (glow) glow.style.opacity = '1';
                setShowSuggestions(true);
              }}
              onBlur={(e) => {
                // Delay to allow click on suggestion
                setTimeout(() => {
                  e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.parentElement.style.boxShadow = 'none';
                  const glow = e.currentTarget.parentElement.querySelector('#searchGlow');
                  if (glow) glow.style.opacity = '0';
                  setShowSuggestions(false);
                }, 200);
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 z-20"
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

            {/* Search Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden z-30"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.path}
                    onClick={() => handleSearch(suggestion.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200"
                    style={{
                      background: selectedIndex === index ? 'rgba(255,255,255,0.08)' : 'transparent',
                      borderBottom: index < filteredSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-white/40 text-lg">
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium mb-0.5">{suggestion.title}</div>
                      <div className="text-white/40 text-xs">{suggestion.description}</div>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-white/5 text-white/30 text-xs capitalize">
                      {suggestion.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700"
        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: '1s' }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Main text */}
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
  );
};



// ==========================================
// SERVICES SECTION
// ==========================================
const ServicesSection = () => {
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
  );
};

// ==========================================
// TESTIMONIALS SECTION (COMMENTED OUT - Removed from homepage)
// To re-enable, uncomment the component below and add <TestimonialsSection /> back to HomePage
// ==========================================



// ==========================================
// PROCESS/METHODOLOGY SECTION
// ==========================================
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We dive deep into your business goals, target audience, and technical requirements to create a solid foundation.",
      icon: "◈",
      gradient: "from-blue-500/20 to-indigo-500/10"
    },
    {
      number: "02",
      title: "Strategy",
      description: "Our team develops a comprehensive roadmap aligned with your objectives, timeline, and budget constraints.",
      icon: "◇",
      gradient: "from-emerald-500/20 to-teal-500/10"
    },
    {
      number: "03",
      title: "Design",
      description: "We craft stunning, user-centric designs that blend aesthetics with functionality for optimal experiences.",
      icon: "○",
      gradient: "from-purple-500/20 to-violet-500/10"
    },
    {
      number: "04",
      title: "Development",
      description: "Using cutting-edge technologies, we build scalable, secure solutions with clean, maintainable code.",
      icon: "△",
      gradient: "from-orange-500/20 to-amber-500/10"
    },
    {
      number: "05",
      title: "Testing",
      description: "Rigorous quality assurance ensures every feature works flawlessly across all devices and scenarios.",
      icon: "◎",
      gradient: "from-pink-500/20 to-rose-500/10"
    },
    {
      number: "06",
      title: "Launch & Support",
      description: "We ensure smooth deployment and provide ongoing support to keep your solution performing at its best.",
      icon: "⬡",
      gradient: "from-cyan-500/20 to-blue-500/10"
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— HOW WE WORK —</p>
          <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
            Our proven process
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            A structured approach that ensures exceptional results at every stage of your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-white/[0.06] bg-black/30 relative overflow-hidden hover:border-white/[0.12] transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl text-white/10 group-hover:text-white/20 font-light transition-colors">
                    {step.number}
                  </div>
                  <div className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connection line to next step */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// TECH STACK SECTION
// ==========================================
const TechStackSection = () => {
  return (
    <section className="relative py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— TECHNOLOGY STACK —</p>
          <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
            Powered by modern tech
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(technologies).map(([category, techs], catIndex) => (
            <div key={catIndex}>
              <h3 className="text-white/50 text-sm uppercase tracking-wider mb-6 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techs.map((tech, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-xl border border-white/[0.06] bg-black/20 hover:border-white/[0.15] transition-all duration-300 relative overflow-hidden"
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`
                      }}
                    />

                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <div className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
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
          <Link
            to="/contact"
            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            Start Your Project
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors"
          >
            Schedule a Call
          </Link>
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
  const location = useLocation();
  const isServicePage = location.pathname.startsWith('/services/');
  const isProductPage = location.pathname.startsWith('/products/');
  const isServicesListing = location.pathname === '/services';
  const isProductsListing = location.pathname === '/products';
  const isAboutPage = location.pathname === '/about-us';
  const isContactPage = location.pathname === '/contact';
  const isLegalPage = location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/saas-agreement') ||
    location.pathname.startsWith('/sla') ||
    location.pathname.startsWith('/aup');
  const isPricingPage = location.pathname.startsWith('/pricing/');

  // About Us page gradient colors
  const aboutGradient = {
    primary: 'rgba(148, 163, 184, 0.18)',
    primaryLight: 'rgba(148, 163, 184, 0.08)',
    secondary: 'rgba(100, 116, 139, 0.04)',
    secondaryLight: 'rgba(100, 116, 139, 0.15)',
    glow: 'rgba(203, 213, 225, 0.25)',
    glowLight: 'rgba(148, 163, 184, 0.12)',
    line: 'rgba(148, 163, 184, 0.4)'
  };

  // Contact page gradient colors - Violet/Purple
  const contactGradient = {
    primary: 'rgba(139, 92, 246, 0.18)',
    primaryLight: 'rgba(139, 92, 246, 0.08)',
    secondary: 'rgba(124, 58, 237, 0.04)',
    secondaryLight: 'rgba(124, 58, 237, 0.15)',
    glow: 'rgba(167, 139, 250, 0.25)',
    glowLight: 'rgba(139, 92, 246, 0.12)',
    line: 'rgba(139, 92, 246, 0.4)'
  };

  // Services Listing page gradient colors - Neon Lime
  const servicesListingGradient = {
    primary: 'rgba(163, 230, 53, 0.18)',
    primaryLight: 'rgba(163, 230, 53, 0.08)',
    secondary: 'rgba(190, 242, 100, 0.04)',
    secondaryLight: 'rgba(190, 242, 100, 0.15)',
    glow: 'rgba(236, 252, 203, 0.25)',
    glowLight: 'rgba(163, 230, 53, 0.12)',
    line: 'rgba(163, 230, 53, 0.4)'
  };

  // Products Listing page gradient colors - Bright Cyan
  const productsListingGradient = {
    primary: 'rgba(34, 211, 238, 0.18)',
    primaryLight: 'rgba(34, 211, 238, 0.08)',
    secondary: 'rgba(103, 232, 249, 0.04)',
    secondaryLight: 'rgba(103, 232, 249, 0.15)',
    glow: 'rgba(207, 250, 254, 0.25)',
    glowLight: 'rgba(34, 211, 238, 0.12)',
    line: 'rgba(34, 211, 238, 0.4)'
  };

  // Service-specific gradient colors for footer reflection
  const serviceGradients = {
    '/services/web-development': {
      primary: 'rgba(59, 130, 246, 0.18)',
      primaryLight: 'rgba(59, 130, 246, 0.08)',
      secondary: 'rgba(99, 102, 241, 0.04)',
      secondaryLight: 'rgba(99, 102, 241, 0.15)',
      glow: 'rgba(129, 140, 248, 0.25)',
      glowLight: 'rgba(99, 102, 241, 0.12)',
      line: 'rgba(99, 102, 241, 0.4)'
    },
    '/services/app-development': {
      primary: 'rgba(34, 197, 94, 0.18)',
      primaryLight: 'rgba(34, 197, 94, 0.08)',
      secondary: 'rgba(16, 185, 129, 0.04)',
      secondaryLight: 'rgba(16, 185, 129, 0.15)',
      glow: 'rgba(52, 211, 153, 0.25)',
      glowLight: 'rgba(16, 185, 129, 0.12)',
      line: 'rgba(16, 185, 129, 0.4)'
    },
    '/services/digital-marketing': {
      primary: 'rgba(249, 115, 22, 0.18)',
      primaryLight: 'rgba(249, 115, 22, 0.08)',
      secondary: 'rgba(245, 158, 11, 0.04)',
      secondaryLight: 'rgba(245, 158, 11, 0.15)',
      glow: 'rgba(251, 191, 36, 0.25)',
      glowLight: 'rgba(245, 158, 11, 0.12)',
      line: 'rgba(245, 158, 11, 0.4)'
    },
    '/services/graphic-designing': {
      primary: 'rgba(236, 72, 153, 0.18)',
      primaryLight: 'rgba(236, 72, 153, 0.08)',
      secondary: 'rgba(244, 63, 94, 0.04)',
      secondaryLight: 'rgba(244, 63, 94, 0.15)',
      glow: 'rgba(251, 113, 133, 0.25)',
      glowLight: 'rgba(244, 63, 94, 0.12)',
      line: 'rgba(244, 63, 94, 0.4)'
    },
    '/services/3d-services': {
      primary: 'rgba(168, 85, 247, 0.18)',
      primaryLight: 'rgba(168, 85, 247, 0.08)',
      secondary: 'rgba(139, 92, 246, 0.04)',
      secondaryLight: 'rgba(139, 92, 246, 0.15)',
      glow: 'rgba(167, 139, 250, 0.25)',
      glowLight: 'rgba(139, 92, 246, 0.12)',
      line: 'rgba(139, 92, 246, 0.4)'
    }
  };

  // Product-specific gradient colors for footer reflection
  const productGradients = {
    '/products/antimage-crm': {
      primary: 'rgba(234, 179, 8, 0.18)',
      primaryLight: 'rgba(234, 179, 8, 0.08)',
      secondary: 'rgba(250, 204, 21, 0.04)',
      secondaryLight: 'rgba(250, 204, 21, 0.15)',
      glow: 'rgba(253, 224, 71, 0.25)',
      glowLight: 'rgba(250, 204, 21, 0.12)',
      line: 'rgba(250, 204, 21, 0.4)'
    },
    '/products/antihrms': {
      primary: 'rgba(168, 85, 247, 0.18)',
      primaryLight: 'rgba(168, 85, 247, 0.08)',
      secondary: 'rgba(236, 72, 153, 0.04)',
      secondaryLight: 'rgba(236, 72, 153, 0.15)',
      glow: 'rgba(244, 114, 182, 0.25)',
      glowLight: 'rgba(236, 72, 153, 0.12)',
      line: 'rgba(236, 72, 153, 0.4)'
    },
    '/products/antisec': {
      primary: 'rgba(239, 68, 68, 0.18)',
      primaryLight: 'rgba(239, 68, 68, 0.08)',
      secondary: 'rgba(249, 115, 22, 0.04)',
      secondaryLight: 'rgba(249, 115, 22, 0.15)',
      glow: 'rgba(251, 146, 60, 0.25)',
      glowLight: 'rgba(249, 115, 22, 0.12)',
      line: 'rgba(249, 115, 22, 0.4)'
    },
    '/products/antiai': {
      primary: 'rgba(16, 185, 129, 0.18)',
      primaryLight: 'rgba(16, 185, 129, 0.08)',
      secondary: 'rgba(20, 184, 166, 0.04)',
      secondaryLight: 'rgba(20, 184, 166, 0.15)',
      glow: 'rgba(45, 212, 191, 0.25)',
      glowLight: 'rgba(20, 184, 166, 0.12)',
      line: 'rgba(20, 184, 166, 0.4)'
    },
    '/products/antichat': {
      primary: 'rgba(99, 102, 241, 0.18)',
      primaryLight: 'rgba(99, 102, 241, 0.08)',
      secondary: 'rgba(59, 130, 246, 0.04)',
      secondaryLight: 'rgba(59, 130, 246, 0.15)',
      glow: 'rgba(96, 165, 250, 0.25)',
      glowLight: 'rgba(59, 130, 246, 0.12)',
      line: 'rgba(59, 130, 246, 0.4)'
    }
  };

  const currentServiceGradient = serviceGradients[location.pathname];
  const currentProductGradient = productGradients[location.pathname];

  // Pricing page gradient - Orange/Amber
  const pricingGradient = {
    primary: 'rgba(249, 115, 22, 0.18)',
    primaryLight: 'rgba(249, 115, 22, 0.08)',
    secondary: 'rgba(245, 158, 11, 0.04)',
    secondaryLight: 'rgba(245, 158, 11, 0.15)',
    glow: 'rgba(251, 191, 36, 0.25)',
    glowLight: 'rgba(245, 158, 11, 0.12)',
    line: 'rgba(245, 158, 11, 0.4)'
  };

  const links = {
    "Product": [
      { name: "AntiMage CRM", href: "/products/antimage-crm" },
      { name: "AntiHRMS", href: "/products/antihrms" },
      { name: "AntiSec", href: "/products/antisec" },
      { name: "AntiAI", href: "/products/antiai" },
      { name: "AntiChat", href: "/products/antichat" }
    ],
    "Services": [
      { name: "Web Development", href: "/services/web-development" },
      { name: "App Development", href: "/services/app-development" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
      { name: "Graphic Designing", href: "/services/graphic-designing" },
      { name: "3D Services", href: "/services/3d-services" }
    ],
    "Company": [
      { name: "About Us", href: "/about-us" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    "Legal": [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "SaaS Agreement", href: "/saas-agreement" },
      { name: "Service Level Agreement", href: "/sla" },
      { name: "Acceptable Use Policy", href: "/aup" }
    ]
  };

  return (
    <footer className={`relative ${isLegalPage ? 'bg-white' : ''}`} style={{ overflow: 'visible' }}>
      <div className={`relative ${isLegalPage ? 'border-t border-gray-200' : 'border-t border-white/[0.15]'}`}>
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isLegalPage ? 'via-gray-300' : 'via-white/30'} to-transparent`} />
        <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${isLegalPage ? 'from-gray-100/50' : 'from-white/[0.03]'} to-transparent pointer-events-none`} />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className={`text-sm font-medium mb-4 ${isLegalPage ? 'text-gray-900' : 'text-white'}`}>{category}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className={`text-sm transition-colors ${isLegalPage ? 'text-gray-600 hover:text-gray-900' : 'text-white/50 hover:text-white'}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-4 md:py-0" style={{ overflow: 'visible' }}>
        <div className="w-full px-2 md:px-4" style={{ overflow: 'visible' }}>
          <div className="flex items-baseline justify-center tracking-tighter leading-[0.85] select-none relative" style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(60px, 12vw, 200px)', overflow: 'visible', paddingBottom: '0.25em', letterSpacing: '0.01em' }}>
            {/* Particles for legal pages */}
            {isLegalPage && (
              <div className="absolute inset-0 pointer-events-none" style={{ transform: 'scale(1.5)' }}>
                {[...Array(120)].map((_, i) => {
                  const size = Math.random() * 3 + 1;
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const duration = Math.random() * 3 + 2;
                  const delay = Math.random() * 2;
                  const opacity = Math.random() * 0.3 + 0.1;

                  return (
                    <div
                      key={i}
                      className="absolute rounded-full bg-black"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity: opacity,
                        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
                      }}
                    />
                  );
                })}
              </div>
            )}

            <span className={isLegalPage ? 'text-gray-900' : 'text-white'}>AntiGrav</span>
            <span className="inline-flex items-baseline" style={{ margin: '0 0.02em' }}>
              <span
                className={`inline-block ${isLegalPage ? 'text-gray-900' : 'text-white'}`}
                style={{
                  transform: 'rotate(180deg) translateY(-0.03em)',
                  animation: 'levitate1 3s ease-in-out infinite'
                }}
              >i</span>
              <span
                className={`inline-block ${isLegalPage ? 'text-gray-900' : 'text-white'}`}
                style={{
                  transform: 'rotate(180deg) translateY(-0.06em)',
                  animation: 'levitate2 3s ease-in-out infinite 0.15s'
                }}
              >i</span>
            </span>
            <span className={isLegalPage ? 'text-gray-900' : 'text-white'}>ty</span>
          </div>

          {/* Add float animation for particles */}
          {isLegalPage && (
            <style jsx>{`
              @keyframes float {
                0% {
                  transform: translateY(0px) translateX(0px);
                }
                100% {
                  transform: translateY(-20px) translateX(10px);
                }
              }
            `}</style>
          )}
        </div>
      </div>

      <div className={`relative ${isLegalPage ? 'border-t border-gray-200' : 'border-t border-white/[0.05]'}`} style={{ overflow: 'visible' }}>
        {/* Ice blue reflection on homepage */}
        {!isServicePage && !isProductPage && !isAboutPage && !isContactPage && !isServicesListing && !isProductsListing && !isLegalPage && (
          <>
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
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
          </>
        )}

        {/* Service-specific gradient reflection on service pages */}
        {isServicePage && currentServiceGradient && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${currentServiceGradient.primary} 0%, ${currentServiceGradient.primaryLight} 25%, ${currentServiceGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${currentServiceGradient.secondaryLight} 0%, ${currentServiceGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${currentServiceGradient.glow} 0%, ${currentServiceGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${currentServiceGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* Product-specific gradient reflection on product pages */}
        {isProductPage && currentProductGradient && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${currentProductGradient.primary} 0%, ${currentProductGradient.primaryLight} 25%, ${currentProductGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${currentProductGradient.secondaryLight} 0%, ${currentProductGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${currentProductGradient.glow} 0%, ${currentProductGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${currentProductGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* About Us page gradient reflection - Silver/Slate */}
        {isAboutPage && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${aboutGradient.primary} 0%, ${aboutGradient.primaryLight} 25%, ${aboutGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${aboutGradient.secondaryLight} 0%, ${aboutGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${aboutGradient.glow} 0%, ${aboutGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${aboutGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* Contact page gradient reflection - Violet/Purple */}
        {isContactPage && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${contactGradient.primary} 0%, ${contactGradient.primaryLight} 25%, ${contactGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${contactGradient.secondaryLight} 0%, ${contactGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${contactGradient.glow} 0%, ${contactGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${contactGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* Services Listing page gradient reflection - Neon Lime */}
        {isServicesListing && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${servicesListingGradient.primary} 0%, ${servicesListingGradient.primaryLight} 25%, ${servicesListingGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${servicesListingGradient.secondaryLight} 0%, ${servicesListingGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${servicesListingGradient.glow} 0%, ${servicesListingGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${servicesListingGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* Products Listing page gradient reflection - Bright Cyan */}
        {isProductsListing && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${productsListingGradient.primary} 0%, ${productsListingGradient.primaryLight} 25%, ${productsListingGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${productsListingGradient.secondaryLight} 0%, ${productsListingGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${productsListingGradient.glow} 0%, ${productsListingGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${productsListingGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        {/* Pricing page gradient reflection - Orange/Amber */}
        {isPricingPage && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${pricingGradient.primary} 0%, ${pricingGradient.primaryLight} 25%, ${pricingGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${pricingGradient.secondaryLight} 0%, ${pricingGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${pricingGradient.glow} 0%, ${pricingGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${pricingGradient.line}, transparent)`,
              }}
            />
          </>
        )}

        <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col items-center gap-4 relative z-10 mt-8">
          <div className="flex gap-4 mb-2">
            {[
              {
                name: 'LinkedIn',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                href: '#'
              },
              {
                name: 'Instagram',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
                href: '#'
              },
              {
                name: 'Facebook',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.657-2.797 2.895v1.085h3.988l-.85 3.667h-3.138v7.98h-5.017z" />
                  </svg>
                ),
                href: '#'
              },
              {
                name: 'Twitter',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                href: '#'
              }
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isLegalPage
                  ? 'border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100'
                  : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5'
                  }`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col items-center gap-4 relative z-10">
          <p className={`text-xs mt-4 ${isLegalPage ? 'text-gray-900' : 'text-white/100'}`}>
            © 2025 AntiGraviity Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>

        <div className="h-16" />
      </div>
    </footer>
  );
};

// ==========================================
// HOME PAGE
// ==========================================
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProductsSection />

      <ServicesSection />
      <TechStackSection />
      {/* <TestimonialsSection /> */}
      <ProcessSection />
      <CTASection />
    </>
  );
};

// ==========================================
// SCROLL TO TOP ON ROUTE CHANGE
// ==========================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ==========================================
// MAIN APP
// ==========================================


// ==========================================
// MAIN APP
// ==========================================
// ==========================================
// MAIN LAYOUT COMPONENT
// ==========================================
const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const isLegalPage = location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/saas-agreement') ||
    location.pathname.startsWith('/sla') ||
    location.pathname.startsWith('/aup');

  // Handle Page Navigation with Preloader
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Check if navigating between pricing sub-pages
    const isPricingNav = location.pathname.startsWith('/pricing') && prevPathRef.current.startsWith('/pricing');

    if (!isPricingNav) {
      // Start preloader on location change
      setIsLoading(true);

      // Smooth scroll to top
      window.scrollTo(0, 0);

      // Stop preloader after minimal delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200); // 1.2s for smooth transition

      prevPathRef.current = location.pathname;
      return () => clearTimeout(timer);
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Dynamically set body background color to handle overscroll/panning
  useEffect(() => {
    if (isLegalPage) {
      document.body.style.backgroundColor = '#ffffff';
      document.body.classList.add('bg-white');
      document.body.classList.remove('bg-black');
    } else {
      document.body.style.backgroundColor = '#000000';
      document.body.classList.add('bg-black');
      document.body.classList.remove('bg-white');
    }

    return () => {
      document.body.style.backgroundColor = '';
      document.body.classList.remove('bg-white', 'bg-black');
    };
  }, [isLegalPage]);

  return (
    <div className={`min-h-screen relative w-full overflow-x-hidden ${isLegalPage ? 'bg-white text-gray-900' : 'bg-black text-white'}`}>
      <Preloader isLoading={isLoading} />
      {!isLegalPage && <InteractiveParticles />}
      <Navigation />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/graphic-designing" element={<GraphicDesigning />} />
          <Route path="/services/3d-services" element={<ThreeDServices />} />
          <Route path="/products/antimage-crm" element={<AntimageCRM />} />
          <Route path="/products/antihrms" element={<AntiHRMS />} />
          <Route path="/products/antisec" element={<AntiSec />} />
          <Route path="/products/antiai" element={<AntiAI />} />
          <Route path="/products/antichat" element={<AntiChat />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/saas-agreement" element={<SaaSAgreement />} />
          <Route path="/sla" element={<SLA />} />
          <Route path="/aup" element={<AcceptableUsePolicy />} />
          <Route path="/pricing" element={<Navigate to="/pricing/web-development" replace />} />
          <Route path="/pricing/:category" element={<Pricing />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <WhatsAppButton />
      <MainLayout />
    </Router>
  );
}

export default App;
