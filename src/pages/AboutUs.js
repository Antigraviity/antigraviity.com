import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeGlobe from '../components/ThreeGlobe';

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 4000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  const animateCount = () => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
};

const AboutUs = () => {
  const [activeValue, setActiveValue] = useState(0);

  const stats = [
    { number: 50, suffix: "+", label: "Projects Delivered" },
    { number: 30, suffix: "+", label: "Happy Clients" },
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 15, suffix: "+", label: "Team Members" }
  ];

  const values = [
    {
      icon: "◈",
      title: "Innovation First",
      description: "We don't just follow trends—we set them. Every solution we build pushes boundaries and challenges the status quo.",
      gradient: "from-blue-500/20 to-indigo-500/10"
    },
    {
      icon: "◇",
      title: "Client Partnership",
      description: "Your success is our success. We work alongside you, not just for you, building relationships that last beyond projects.",
      gradient: "from-emerald-500/20 to-teal-500/10"
    },
    {
      icon: "○",
      title: "Quality Obsession",
      description: "Good enough isn't in our vocabulary. We obsess over every pixel, every line of code, every user interaction.",
      gradient: "from-purple-500/20 to-violet-500/10"
    },
    {
      icon: "△",
      title: "Transparent Process",
      description: "No black boxes here. You'll always know where your project stands, what's next, and how we're getting there.",
      gradient: "from-orange-500/20 to-amber-500/10"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a vision to help businesses leverage technology for growth."
    },
    {
      year: "2021",
      title: "First Major Milestone",
      description: "Expanded our team and delivered our first enterprise-level project."
    },
    {
      year: "2022",
      title: "Service Expansion",
      description: "Added 3D services and digital marketing to our offerings."
    },
    {
      year: "2023",
      title: "Product Development",
      description: "Began development of our flagship products - Antimage CRM and AntiHRMS."
    },
    {
      year: "2024",
      title: "Going Global",
      description: "Expanded operations internationally, serving clients across multiple countries."
    },
    {
      year: "2025",
      title: "The Future",
      description: "Launching our AI-powered product suite and scaling our enterprise solutions."
    }
  ];

  const team = [
    {
      name: "Leadership",
      description: "Visionaries driving innovation",
      icon: "◈",
      gradient: "from-yellow-500/20 to-amber-500/10"
    },
    {
      name: "Development",
      description: "Engineers building the future",
      icon: "◇",
      gradient: "from-blue-500/20 to-cyan-500/10"
    },
    {
      name: "Design",
      description: "Creatives shaping experiences",
      icon: "◎",
      gradient: "from-pink-500/20 to-rose-500/10"
    },
    {
      name: "Marketing",
      description: "Strategists amplifying reach",
      icon: "○",
      gradient: "from-green-500/20 to-emerald-500/10"
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      <style>{`
        @keyframes rotateY {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Subtle gradient background */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-12">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">About Us</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-white/30 text-sm mb-4 tracking-wide">— WHO WE ARE —</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal mb-8 leading-tight">
              We build digital
              <span className="text-white/40"> experiences</span> that
              <span className="block">elevate businesses.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
              AntiGraviity Technologies is a full-service digital agency that transforms ideas into
              powerful digital solutions. We combine creativity with technology to help businesses
              defy limitations and reach new heights.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl text-white font-light mb-2">
                  <AnimatedCounter target={stat.number} duration={4000} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map / Global Section */}
      <section className="py-20 px-6 border-b border-white/[0.05] overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Overlay to hide particles only over the map content */}
          <div className="absolute inset-0 bg-black z-0" />
          <p className="text-white/30 text-sm mb-4 tracking-wide relative z-10">— GLOBAL REACH —</p>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-4 relative z-10">Working with clients worldwide</h2>
          <p className="text-white/40 max-w-xl mx-auto mb-16 relative z-10">
            From startups to enterprises, we've partnered with businesses across the globe to deliver exceptional digital experiences.
          </p>

          {/* World Map Container */}
          <div className="relative w-full max-w-4xl mx-auto z-10" style={{ aspectRatio: '2/1' }}>
            {/* World Map SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.05))' }}
            >
              {/* Simplified World Map Path */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>

              {/* North America */}
              <path
                d="M150,120 Q180,100 220,110 L260,100 Q300,90 320,110 L340,130 Q350,150 340,170 L320,200 Q300,220 280,210 L240,220 Q200,230 180,210 L150,180 Q130,150 150,120 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* South America */}
              <path
                d="M280,260 Q300,250 310,270 L320,310 Q330,350 310,380 L290,400 Q270,410 260,390 L250,350 Q240,310 260,280 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Europe */}
              <path
                d="M450,100 Q480,90 510,100 L540,110 Q560,120 550,140 L530,160 Q510,170 490,160 L460,150 Q440,130 450,100 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Africa */}
              <path
                d="M480,180 Q510,170 530,190 L550,230 Q560,280 540,320 L510,350 Q480,360 460,340 L450,300 Q440,250 460,210 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Asia */}
              <path
                d="M580,90 Q650,80 720,100 L780,120 Q820,140 800,180 L760,220 Q720,250 680,240 L620,220 Q580,200 570,160 L560,120 Q560,100 580,90 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* India */}
              <path
                d="M650,180 Q680,170 700,190 L710,230 Q720,270 700,290 L670,300 Q640,300 640,270 L640,220 Q640,190 650,180 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Australia */}
              <path
                d="M780,320 Q820,310 850,330 L870,360 Q880,390 860,410 L820,420 Q780,420 770,390 L770,360 Q770,330 780,320 Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Connection Lines */}
              <g stroke="rgba(239,68,68,0.3)" strokeWidth="1" fill="none">
                <path d="M670,250 Q500,200 230,150" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M670,250 Q600,200 500,130" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
                </path>
                <path d="M670,250 Q750,300 820,370" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M670,250 Q720,220 760,180" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.2s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>

            {/* Location Markers */}
            {/* USA - Chicago */}
            <div className="absolute" style={{ top: '30%', left: '18%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <div className="absolute -inset-1 w-5 h-5 bg-red-500/30 rounded-full animate-pulse" />
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap">Chicago, USA</div>
            </div>

            {/* Bangladesh - Dhaka */}
            <div className="absolute" style={{ top: '36%', left: '70%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute -inset-1 w-5 h-5 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap">Dhaka, Bangladesh</div>
            </div>

            {/* India - Chennai (HQ) */}
            <div className="absolute" style={{ top: '48%', left: '66%' }}>
              <div className="relative">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-red-500" />
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                <div className="absolute -inset-2 w-8 h-8 bg-red-500/20 rounded-full animate-pulse" />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-white font-medium whitespace-nowrap">HQ - Chennai</div>
            </div>

            {/* Malaysia */}
            <div className="absolute" style={{ top: '54%', left: '73%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute -inset-1 w-5 h-5 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap">Malaysia</div>
            </div>

            {/* Singapore */}
            <div className="absolute" style={{ top: '56%', left: '74.5%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                <div className="absolute -inset-1 w-5 h-5 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap">Singapore</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-white rounded-full border-2 border-red-500" />
              </div>
              <span className="text-white/50 text-sm">Headquarters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <span className="text-white/50 text-sm">Client Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-white/30 text-sm mb-4 tracking-wide">— OUR STORY —</p>
              <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">
                Born from a passion for innovation
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  AntiGraviity wasn't born in a boardroom. It started with a simple observation:
                  too many businesses were being held back by outdated technology and uninspired
                  digital presence.
                </p>
                <p>
                  We believed there had to be a better way—a way to combine cutting-edge technology
                  with stunning design to create digital experiences that truly elevate businesses.
                  So we set out to build it.
                </p>
                <p>
                  Today, we're a team of engineers, designers, and strategists united by a single
                  mission: to help businesses break free from digital gravity and soar to new heights.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square p-12 relative">
                {/* Three.js 3D Globe */}
                <div className="absolute inset-0">
                  <ThreeGlobe />
                </div>

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center relative z-10">
                    <div className="flex items-baseline justify-center text-3xl font-semibold text-white/80">
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
                    </div>
                    <p className="text-white/30 text-xs mt-2 tracking-widest">TECHNOLOGIES</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-10 rounded-2xl border border-white/[0.05] bg-gradient-to-br from-blue-500/[0.03] to-transparent relative overflow-hidden group hover:border-white/[0.1] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <div className="relative z-10">
                <div className="text-4xl text-white/20 mb-6">◈</div>
                <h3 className="text-2xl text-white mb-4">Our Mission</h3>
                <p className="text-white/50 leading-relaxed">
                  To empower businesses with innovative digital solutions that drive growth,
                  enhance user experiences, and create lasting impact in an ever-evolving
                  digital landscape.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="p-10 rounded-2xl border border-white/[0.05] bg-gradient-to-br from-purple-500/[0.03] to-transparent relative overflow-hidden group hover:border-white/[0.1] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <div className="relative z-10">
                <div className="text-4xl text-white/20 mb-6">◇</div>
                <h3 className="text-2xl text-white mb-4">Our Vision</h3>
                <p className="text-white/50 leading-relaxed">
                  To be the catalyst that helps businesses transcend digital boundaries,
                  setting new standards in technology and design while building a future
                  where innovation knows no limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/30 text-sm mb-4 tracking-wide">— WHAT DRIVES US —</p>
            <h2 className="text-3xl md:text-4xl text-white font-normal">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border border-white/[0.05] bg-black/30 relative overflow-hidden cursor-pointer transition-all duration-500 ${activeValue === index ? 'border-white/[0.15]' : 'hover:border-white/[0.1]'}`}
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-3xl text-white/20 group-hover:text-white/40 mb-6 transition-colors">{value.icon}</div>
                  <h3 className="text-lg text-white mb-3">{value.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/30 text-sm mb-4 tracking-wide">— OUR JOURNEY —</p>
            <h2 className="text-3xl md:text-4xl text-white font-normal">The Path We've Traveled</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'} pl-8 md:pl-0`}>
                    <div className="text-white/30 text-sm mb-2">{item.year}</div>
                    <h3 className="text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-white/20 rounded-full -translate-x-1/2 border-2 border-black" />

                  {/* Empty space for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/30 text-sm mb-4 tracking-wide">— THE TEAM —</p>
            <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">Meet the Teams Behind the Magic</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              A diverse team of experts united by a shared passion for creating exceptional digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((dept, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-white/[0.05] bg-black/20 relative overflow-hidden hover:border-white/[0.1] transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-white/[0.1] flex items-center justify-center bg-white/[0.02] group-hover:border-white/[0.2] transition-all">
                    <span className="text-3xl text-white/30 group-hover:text-white/50 transition-colors">{dept.icon}</span>
                  </div>
                  <h3 className="text-lg text-white mb-2">{dept.name}</h3>
                  <p className="text-white/40 text-sm">{dept.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-white/30 text-sm mb-4 tracking-wide">— WHY ANTIGRAVIITY —</p>
              <h2 className="text-3xl md:text-4xl text-white font-normal mb-8">
                What sets us apart
              </h2>

              <div className="space-y-6">
                {[
                  { title: "End-to-End Solutions", desc: "From concept to deployment, we handle every aspect of your digital journey." },
                  { title: "Cutting-Edge Technology", desc: "We stay ahead of the curve, using the latest tools and frameworks." },
                  { title: "Design Excellence", desc: "Every project is crafted with meticulous attention to aesthetics and usability." },
                  { title: "Dedicated Support", desc: "Our relationship doesn't end at launch—we're here for the long haul." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats/Achievement Visual */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "◈", label: "Client Satisfaction", value: 98, suffix: "%" },
                { icon: "◇", label: "Project Success Rate", value: 100, suffix: "%" },
                { icon: "○", label: "On-Time Delivery", value: 95, suffix: "%" },
                { icon: "△", label: "Client Retention", value: 90, suffix: "%" }
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] text-center hover:border-white/[0.1] transition-all">
                  <div className="text-2xl text-white/20 mb-3">{stat.icon}</div>
                  <div className="text-2xl text-white mb-1">
                    <AnimatedCounter target={stat.value} duration={4000} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/40 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">
            Ready to elevate your business?
          </h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">
            Let's discuss how we can help transform your digital presence and drive real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              to="/#services"
              className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
