import React, { useState, useEffect } from 'react';
import './fonts/Croogla.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';


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
import Pricing from './pages/Pricing';
import FlashMessage from './components/FlashMessage';

// Import Portal Pages
import Login from './pages/Portal/Login';
import OnboardingDashboard from './pages/Portal/OnboardingDashboard';
import HRDashboard from './pages/Portal/HRDashboard';
import HRLogin from './pages/Portal/HRLogin';
import ForgotPassword from './pages/Portal/ForgotPassword';
import ResetPassword from './pages/Portal/ResetPassword';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// ANTIGRAVIITY TECHNOLOGIES - COMPLETE WEBSITE
// With Integrated Logo Animation
// x.ai / Grok Style - Clean, Minimal, Premium
// ============================================

import Home from './pages/Home';
import InteractiveParticles from './components/InteractiveParticles';

// Note: To silence React Router v7 future flag warnings, we configure the router future flags.
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
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
  ];

  const isHomepage = location.pathname === '/';
  const isLegalPage = location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/saas-agreement') ||
    location.pathname.startsWith('/sla') ||
    location.pathname.startsWith('/aup');

  return (
    <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-500 ${isLegalPage
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
        <div className="hidden md:flex items-center" style={{ minWidth: '200px' }}>
          {(location.pathname !== '/' || scrolled) && (
            <Link to="/" className="flex items-center transition-opacity duration-500" style={{ opacity: scrolled || location.pathname !== '/' ? 1 : 0 }}>
              <img
                src="/antigraviity-logo.webp"
                alt="AntiGraviity"
                className="h-[56px] w-auto object-contain"
                style={{
                  filter: isLegalPage ? 'invert(1) brightness(0.2)' : 'none'
                }}
              />
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
            className="relative text-sm font-medium px-6 py-2 rounded-full overflow-hidden transition-all duration-300"
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
              className="flex items-center transition-opacity duration-500"
              style={{ opacity: scrolled || location.pathname !== '/' ? 1 : 0 }}
            >
              <img
                src="/antigraviity-logo.webp"
                alt="AntiGraviity"
                className="h-[54px] w-auto object-contain"
                style={{
                  filter: isLegalPage ? 'invert(1) brightness(0.2)' : 'none'
                }}
              />
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





// ==========================================
// NEWS SECTION
// ==========================================


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
  const isCareersPage = location.pathname === '/careers';

  // Careers page gradient colors - Pink (Matching WhatsApp Pulse)
  const careersGradient = {
    primary: 'rgba(236, 72, 153, 0.18)',
    primaryLight: 'rgba(236, 72, 153, 0.08)',
    secondary: 'rgba(236, 72, 153, 0.04)',
    secondaryLight: 'rgba(236, 72, 153, 0.15)',
    glow: 'rgba(236, 72, 153, 0.25)',
    glowLight: 'rgba(236, 72, 153, 0.12)',
    line: 'rgba(236, 72, 153, 0.4)'
  };

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
          <div className="flex items-baseline justify-center tracking-tighter leading-[0.85] select-none relative" style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(60px, 10vw, 180px)', overflow: 'visible', paddingBottom: '0.25em', letterSpacing: '0.01em' }}>
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

            <span className={isLegalPage ? 'text-gray-900' : 'text-white'}>antigrav</span>
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
        {!isServicePage && !isProductPage && !isAboutPage && !isContactPage && !isServicesListing && !isProductsListing && !isLegalPage && !isCareersPage && (
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

        {/* Careers page gradient reflection - WhatsApp Green */}
        {isCareersPage && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${careersGradient.primary} 0%, ${careersGradient.primaryLight} 25%, ${careersGradient.secondary} 45%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[350px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 50% 100%, ${careersGradient.secondaryLight} 0%, ${careersGradient.secondary} 35%, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${careersGradient.glow} 0%, ${careersGradient.glowLight} 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${careersGradient.line}, transparent)`,
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
                href: 'http://linkedin.com/company/antigraviity'
              },
              {
                name: 'Instagram',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
                href: 'https://www.instagram.com/antigraviity_official/'
              }
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
            © {new Date().getFullYear()} AntiGraviity Technologies Pvt Ltd. All rights reserved.
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

// ==========================================
// SCROLL TO TOP ON ROUTE CHANGE
// ==========================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
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

  const isLegalPage = location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/saas-agreement') ||
    location.pathname.startsWith('/sla') ||
    location.pathname.startsWith('/aup');

  const isCandidatePage = location.pathname.startsWith('/candidate');
  const isHRPage = location.pathname.startsWith('/hr');



  // Dynamically set body background color to handle overscroll/panning
  useEffect(() => {
    if (isLegalPage || isCandidatePage || isHRPage) {
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
  }, [isLegalPage, isCandidatePage, isHRPage]);

  return (
    <div className={`min-h-screen relative w-full overflow-x-hidden ${(isLegalPage || isCandidatePage || isHRPage) ? 'bg-white text-gray-900' : 'bg-black text-white'}`}>
      {!isLegalPage && !isCandidatePage && !isHRPage && <InteractiveParticles />}
      {!isCandidatePage && !isHRPage && <FlashMessage />}
      {!isCandidatePage && !isHRPage && <Navigation />}
      {!isCandidatePage && !isHRPage && <WhatsAppButton />}

      <main className="relative z-40 transition-opacity duration-300 ease-in-out" key={location.pathname}>
        <div key={location.pathname} className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/services/graphic-designing" element={<GraphicDesigning />} />
            <Route path="/services/3d-services" element={<ThreeDServices />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/antimage-crm" element={<AntimageCRM />} />
            <Route path="/products/anti-hrms" element={<AntiHRMS />} />
            <Route path="/products/antisec" element={<AntiSec />} />
            <Route path="/products/antiai" element={<AntiAI />} />
            <Route path="/products/antichat" element={<AntiChat />} />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/saas-agreement" element={<SaaSAgreement />} />
            <Route path="/sla" element={<SLA />} />
            <Route path="/aup" element={<AcceptableUsePolicy />} />

            <Route path="/candidate/login" element={<Login />} />
            <Route path="/candidate/dashboard" element={<OnboardingDashboard />} />
            <Route path="/hr/login" element={<HRLogin />} />
            <Route path="/hr/forgot-password" element={<ForgotPassword />} />
            <Route path="/hr/reset-password" element={<ResetPassword />} />
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {!isCandidatePage && !isHRPage && <Footer />}
    </div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
      <Router future={routerFutureConfig}>
        <ScrollToTop />
        <CustomCursor />
        <MainLayout />
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
