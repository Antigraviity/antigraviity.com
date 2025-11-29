import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LegalLayout = ({ children, title, lastUpdated }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'SaaS Agreement', path: '/saas-agreement' },
        { name: 'Service Level Agreement', path: '/sla' },
        { name: 'Acceptable Use Policy', path: '/aup' }
    ];

    return (
        <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <h3 className="text-gray-900 font-semibold mb-6 px-4 text-sm">Legal</h3>
                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                                    ? 'bg-gray-900 text-white font-medium'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 pb-24">
                        <div className="prose prose-gray max-w-none">
                            <div className="mb-12 border-b border-gray-200 pb-8">
                                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">{title}</h1>
                                {lastUpdated && (
                                    <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
                                )}
                            </div>

                            <div className="text-gray-700 space-y-8 leading-relaxed">
                                {children}
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default LegalLayout;
