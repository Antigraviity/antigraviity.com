import React from 'react';
import { Link } from 'react-router-dom';
import { getTechnology } from '../data/technologyStack';

const ServicePage = ({
  title,
  subtitle,
  description,
  icon,
  gradient,
  gradientColors,
  features,
  process,
  technologies
}) => {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6`}>
                <span className="text-3xl text-white/80">{icon}</span>
              </div>

              <h1 className="text-4xl md:text-6xl text-white font-normal mb-4">{title}</h1>
              <p className="text-xl text-white/50 mb-6">{subtitle}</p>
              <p className="text-white/40 leading-relaxed mb-8 max-w-lg">{description}</p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                  Get Started
                </Link>
                <a href="#process" className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors">
                  Learn More
                </a>
              </div>
            </div>

            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${gradient} p-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex items-center justify-center">
                {/* Web Development Illustration */}
                {title === "Web Development" && (
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="40" y="60" width="320" height="240" rx="8" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
                    <rect x="40" y="60" width="320" height="30" rx="8" fill="rgba(255,255,255,0.05)" />
                    <circle cx="60" cy="75" r="4" fill="rgba(255,255,255,0.3)" />
                    <circle cx="75" cy="75" r="4" fill="rgba(255,255,255,0.3)" />
                    <circle cx="90" cy="75" r="4" fill="rgba(255,255,255,0.3)" />
                    <line x1="60" y1="120" x2="180" y2="120" stroke="rgba(99,102,241,0.4)" strokeWidth="2" />
                    <line x1="80" y1="140" x2="200" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="80" y1="160" x2="160" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="60" y1="180" x2="220" y2="180" stroke="rgba(99,102,241,0.4)" strokeWidth="2" />
                    <line x1="80" y1="200" x2="140" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="80" y1="220" x2="190" y2="220" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="60" y1="240" x2="180" y2="240" stroke="rgba(99,102,241,0.4)" strokeWidth="2" />
                    <rect x="240" y="110" width="100" height="60" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                    <rect x="250" y="120" width="30" height="30" rx="2" fill="rgba(99,102,241,0.2)" />
                    <line x1="290" y1="125" x2="330" y2="125" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="290" y1="135" x2="320" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <line x1="290" y1="145" x2="325" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <rect x="280" y="200" width="80" height="140" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="rgba(0,0,0,0.3)" />
                    <rect x="290" y="215" width="60" height="100" rx="2" fill="rgba(255,255,255,0.05)" />
                    <circle cx="320" cy="330" r="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <circle cx="100" cy="320" r="30" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="320" r="20" stroke="rgba(99,102,241,0.3)" strokeWidth="1" fill="none" />
                    <path d="M 30 140 L 20 150 L 30 160" stroke="rgba(99,102,241,0.4)" strokeWidth="2" fill="none" />
                    <path d="M 370 140 L 380 150 L 370 160" stroke="rgba(99,102,241,0.4)" strokeWidth="2" fill="none" />
                    <rect x="150" y="280" width="40" height="40" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" transform="rotate(-15 170 300)" />
                    <circle cx="220" cy="310" r="15" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" fill="rgba(99,102,241,0.05)" />
                    <line x1="100" y1="290" x2="150" y2="280" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="130" y1="320" x2="205" y2="310" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                )}

                {/* App Development Illustration */}
                {title === "App Development" && (
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="120" y="40" width="160" height="320" rx="20" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="rgba(0,0,0,0.3)" />
                    <rect x="130" y="70" width="140" height="240" rx="4" fill="rgba(255,255,255,0.05)" />
                    <circle cx="200" cy="340" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
                    <rect x="180" y="50" width="40" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
                    <rect x="145" y="90" width="110" height="40" rx="6" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
                    <rect x="145" y="145" width="110" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <rect x="145" y="185" width="110" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <rect x="145" y="225" width="110" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <circle cx="155" cy="200" r="4" fill="rgba(34,197,94,0.4)" />
                    <circle cx="155" cy="240" r="4" fill="rgba(255,255,255,0.3)" />
                    <circle cx="155" cy="160" r="4" fill="rgba(255,255,255,0.3)" />
                    <line x1="145" y1="275" x2="195" y2="275" stroke="rgba(34,197,94,0.3)" strokeWidth="2" />
                    <line x1="145" y1="285" x2="220" y2="285" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <line x1="145" y1="295" x2="180" y2="295" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <circle cx="60" cy="100" r="40" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" fill="none" />
                    <circle cx="60" cy="100" r="25" stroke="rgba(34,197,94,0.3)" strokeWidth="1" fill="none" />
                    <path d="M 50 100 L 57 107 L 72 92" stroke="rgba(34,197,94,0.4)" strokeWidth="2" fill="none" />
                    <circle cx="340" cy="280" r="35" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                    <rect x="325" y="270" width="10" height="20" rx="1" fill="rgba(34,197,94,0.3)" />
                    <rect x="340" y="265" width="10" height="25" rx="1" fill="rgba(34,197,94,0.4)" />
                    <line x1="90" y1="120" x2="120" y2="100" stroke="rgba(34,197,94,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="280" y1="200" x2="310" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                )}

                {/* Digital Marketing Illustration */}
                {title === "Digital Marketing" && (
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="120" stroke="rgba(249,115,22,0.2)" strokeWidth="2" fill="none" />
                    <circle cx="200" cy="200" r="90" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" fill="rgba(249,115,22,0.05)" />
                    <path d="M 200 80 L 230 150 L 305 150 L 245 195 L 275 265 L 200 220 L 125 265 L 155 195 L 95 150 L 170 150 Z" stroke="rgba(249,115,22,0.4)" strokeWidth="2" fill="rgba(249,115,22,0.08)" />
                    <circle cx="200" cy="200" r="30" fill="rgba(249,115,22,0.2)" />
                    <rect x="60" y="100" width="60" height="80" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
                    <line x1="70" y1="120" x2="110" y2="120" stroke="rgba(249,115,22,0.3)" strokeWidth="2" />
                    <line x1="70" y1="135" x2="100" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <line x1="70" y1="150" x2="105" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <rect x="280" y="220" width="60" height="80" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
                    <circle cx="310" cy="245" r="12" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
                    <line x1="290" y1="270" x2="330" y2="270" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <line x1="290" y1="280" x2="320" y2="280" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <path d="M 200 50 L 210 70 L 190 70 Z" fill="rgba(249,115,22,0.3)" />
                    <path d="M 350 200 L 330 210 L 330 190 Z" fill="rgba(249,115,22,0.3)" />
                    <path d="M 200 350 L 190 330 L 210 330 Z" fill="rgba(249,115,22,0.3)" />
                    <path d="M 50 200 L 70 190 L 70 210 Z" fill="rgba(249,115,22,0.3)" />
                    <circle cx="140" cy="280" r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
                    <path d="M 130 280 L 137 287 L 152 272" stroke="rgba(249,115,22,0.4)" strokeWidth="2" fill="none" />
                    <line x1="120" y1="140" x2="170" y2="170" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="280" y1="250" x2="230" y2="220" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="165" y1="280" x2="175" y2="210" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                )}

                {/* Graphic Designing Illustration */}
                {title === "Graphic Designing" && (
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="80" y="80" width="240" height="240" rx="8" stroke="rgba(236,72,153,0.25)" strokeWidth="2" fill="rgba(255,255,255,0.02)" />
                    <circle cx="150" cy="150" r="40" stroke="rgba(236,72,153,0.3)" strokeWidth="2" fill="rgba(236,72,153,0.08)" />
                    <rect x="220" y="110" width="80" height="80" rx="4" stroke="rgba(236,72,153,0.3)" strokeWidth="2" fill="rgba(236,72,153,0.05)" />
                    <path d="M 120 250 L 180 210 L 240 270 L 180 270 Z" stroke="rgba(236,72,153,0.35)" strokeWidth="2" fill="rgba(236,72,153,0.1)" />
                    <line x1="100" y1="100" x2="300" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="300" y1="100" x2="100" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="200" r="8" fill="rgba(236,72,153,0.4)" />
                    <rect x="40" y="140" width="30" height="120" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
                    <rect x="45" y="150" width="20" height="20" rx="2" fill="rgba(236,72,153,0.3)" />
                    <rect x="45" y="180" width="20" height="20" rx="2" fill="rgba(255,255,255,0.2)" />
                    <rect x="45" y="210" width="20" height="20" rx="2" fill="rgba(255,255,255,0.15)" />
                    <rect x="45" y="240" width="20" height="10" rx="2" fill="rgba(236,72,153,0.2)" />
                    <path d="M 330 120 L 360 90 M 345 105 L 375 75" stroke="rgba(236,72,153,0.3)" strokeWidth="2" />
                    <circle cx="345" cy="105" r="15" stroke="rgba(236,72,153,0.25)" strokeWidth="1.5" fill="none" />
                    <path d="M 340 280 L 370 250 L 370 310 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                    <circle cx="355" cy="280" r="5" fill="rgba(236,72,153,0.3)" />
                    <rect x="250" y="240" width="40" height="40" rx="20" stroke="rgba(236,72,153,0.3)" strokeWidth="2" fill="rgba(236,72,153,0.06)" />
                    <path d="M 260 260 Q 270 250 280 260" stroke="rgba(236,72,153,0.4)" strokeWidth="2" fill="none" />
                    <line x1="70" y1="160" x2="100" y2="140" stroke="rgba(236,72,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="320" y1="190" x2="345" y2="120" stroke="rgba(236,72,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                )}

                {/* 3D Services Illustration */}
                {title === "3D Services" && (
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 200 80 L 320 150 L 320 270 L 200 340 L 80 270 L 80 150 Z" stroke="rgba(168,85,247,0.3)" strokeWidth="2.5" fill="rgba(168,85,247,0.05)" />
                    <path d="M 200 80 L 200 340" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" strokeDasharray="5 5" />
                    <path d="M 80 150 L 320 150" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" strokeDasharray="5 5" />
                    <path d="M 80 270 L 320 270" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" strokeDasharray="5 5" />
                    <path d="M 200 80 L 320 150 L 200 220 L 80 150 Z" stroke="rgba(168,85,247,0.4)" strokeWidth="2" fill="rgba(168,85,247,0.15)" />
                    <path d="M 200 220 L 320 270 L 200 340 L 80 270 Z" stroke="rgba(168,85,247,0.35)" strokeWidth="2" fill="rgba(168,85,247,0.08)" />
                    <path d="M 80 150 L 80 270 L 200 340 L 200 220 Z" stroke="rgba(168,85,247,0.3)" strokeWidth="2" fill="rgba(168,85,247,0.1)" />
                    <circle cx="200" cy="80" r="6" fill="rgba(168,85,247,0.5)" />
                    <circle cx="320" cy="150" r="6" fill="rgba(168,85,247,0.5)" />
                    <circle cx="80" cy="150" r="6" fill="rgba(168,85,247,0.5)" />
                    <circle cx="320" cy="270" r="6" fill="rgba(168,85,247,0.4)" />
                    <circle cx="80" cy="270" r="6" fill="rgba(168,85,247,0.4)" />
                    <circle cx="200" cy="340" r="6" fill="rgba(168,85,247,0.4)" />
                    <circle cx="200" cy="220" r="6" fill="rgba(168,85,247,0.5)" />
                    <path d="M 140 180 L 180 160 L 220 180 L 220 220 L 180 240 L 140 220 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                    <path d="M 180 160 L 180 240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M 140 220 L 220 220" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="50" cy="120" r="20" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" fill="none" />
                    <path d="M 40 120 L 50 110 L 60 120 L 50 130 Z" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" fill="rgba(168,85,247,0.1)" />
                    <circle cx="350" cy="300" r="25" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" fill="none" />
                    <circle cx="350" cy="300" r="15" stroke="rgba(168,85,247,0.3)" strokeWidth="1" fill="rgba(168,85,247,0.08)" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— WHAT WE OFFER —</p>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-12">Our {title} Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 border border-white/[0.06] hover:border-white/[0.15] bg-black/30 backdrop-blur-sm hover:bg-white/[0.02] transition-all duration-500 rounded-xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-2xl text-white/30 mb-4">{feature.icon}</div>
                  <h3 className="text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— OUR PROCESS —</p>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-12">How We Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-white/[0.05] mb-4">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="text-lg text-white mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-12 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— TECHNOLOGIES —</p>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-12">Tools & Technologies</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((techName, index) => {
              const tech = getTechnology(techName);
              return (
                <div
                  key={index}
                  className="group p-4 rounded-xl border border-white/[0.06] bg-black/20 hover:border-white/[0.15] transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center gap-3"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div className="relative z-10 text-white/60 group-hover:text-white text-xs font-medium transition-colors text-center">
                    {tech.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">Ready to start your {title.toLowerCase()} project?</h2>
          <p className="text-white/40 mb-8">Let's discuss how we can help transform your vision into reality.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">Start Your Project</Link>
            <Link to="/" className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
