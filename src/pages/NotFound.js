import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const whatsappUrl = 'https://wa.me/916379388462?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services.';

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl text-white font-normal mb-4">
                    Not found what you're searching for?
                </h1>

                {/* Description */}
                <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                    We couldn't find an exact match for your search. But don't worry—our team is here to help you find exactly what you need.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Chat Now
                    </a>
                    <Link
                        to="/contact"
                        className="px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-all hover:scale-105"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Suggestions */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <p className="text-white/40 text-sm mb-4">You might be interested in:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/services" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm rounded-full transition-all">
                            Our Services
                        </Link>
                        <Link to="/products" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm rounded-full transition-all">
                            Our Products
                        </Link>
                        <Link to="/about-us" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm rounded-full transition-all">
                            About Us
                        </Link>
                        <Link to="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm rounded-full transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
