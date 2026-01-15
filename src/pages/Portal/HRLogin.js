import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HRLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const normalizedEmail = email.toLowerCase().trim();
            const res = await axios.post('/api/onboarding/login', { email: normalizedEmail, password });
            localStorage.setItem('token', res.data.token);
            navigate('/hr/dashboard'); // Redirect to HR Dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 font-sans">
            <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="text-center mb-12 flex flex-col items-center">
                    <img
                        src="/logo-black.webp"
                        alt="AntiGraviity"
                        className="h-12 w-auto mb-8"
                    />
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">HR Portal</h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Admin Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                        <input
                            type="email"
                            placeholder="hr@antigravity.com"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-all text-sm font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-all text-sm font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-50 py-3 rounded-xl">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white font-bold py-3.5 rounded-2xl hover:bg-gray-900 transition-all text-xs uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} AntiGraviity Technologies Pvt Ltd
                </p>
            </div>
        </div>
    );
};

export default HRLogin;
