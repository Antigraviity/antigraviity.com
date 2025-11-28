import React from 'react';
import { Link } from 'react-router-dom';

const ProductPage = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  gradient,
  features,
  comingSoonDate
}) => {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
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
                <button
                  className="px-8 py-3 bg-white/10 text-white/50 text-sm font-medium rounded-full cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
                <Link to="/contact" className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors">
                  Get Notified
                </Link>
              </div>
            </div>

            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${gradient} p-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <span className="text-[100px] text-white/20 mb-4">{icon}</span>
                <div className="text-center">
                  <p className="text-white/60 text-2xl font-medium mb-2">Coming Soon</p>
                  {comingSoonDate && (
                    <p className="text-white/30 text-sm">{comingSoonDate}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-sm mb-4 tracking-wide">— FEATURES PREVIEW —</p>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-12">What to Expect</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 border border-white/[0.06] bg-black/30 backdrop-blur-sm rounded-xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
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

      {/* Notify Section */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} mb-8`}>
            <span className="text-4xl text-white/80">{icon}</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">Be the First to Know</h2>
          <p className="text-white/40 mb-8">Get notified when {title} launches. Early access and exclusive features for our waitlist members.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30"
            />
            <button className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-10 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/#products" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
