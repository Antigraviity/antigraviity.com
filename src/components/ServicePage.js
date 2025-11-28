import React from 'react';
import { Link } from 'react-router-dom';

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
                <span className="text-[120px] text-white/20">{icon}</span>
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

          <div className="flex flex-wrap gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="px-6 py-3 border border-white/[0.1] rounded-full text-white/60 text-sm hover:border-white/30 hover:text-white transition-all">
                {tech}
              </div>
            ))}
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
