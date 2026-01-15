import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [step, setStep] = useState('email'); // 'email' or 'password'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const normalizedEmail = email.toLowerCase().trim();
            const res = await axios.post('/api/onboarding/check-email', { email: normalizedEmail });

            // Check if server returned HTML (index.html fallback) instead of JSON
            if (typeof res.data === 'string' && res.data.trim().startsWith('<!doctype html>')) {
                throw new Error('Backend server needs restart. Routes not loaded.');
            }

            setIsNewUser(!res.data.exists);
            setStep('password');
        } catch (err) {
            console.error(err);
            if (err.message && err.message.includes('Backend server needs restart')) {
                setError(err.message);
            } else {
                setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (isNewUser && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const normalizedEmail = email.toLowerCase().trim();
            const res = await axios.post('/api/onboarding/login', { email: normalizedEmail, password });
            localStorage.setItem('token', res.data.token);
            navigate('/candidate/dashboard');
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
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Candidate Portal</h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Secure Onboarding</p>
                </div>

                {step === 'email' ? (
                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email id"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-all text-sm font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-50 py-3 rounded-xl">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-bold py-3.5 rounded-2xl hover:bg-gray-900 transition-all text-xs uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Next Step'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                            <p className="text-gray-600 text-xs font-bold truncate max-w-[180px]">{email}</p>
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="text-gray-400 hover:text-black text-[10px] font-bold uppercase tracking-widest transition-colors"
                            >
                                Change
                            </button>
                        </div>

                        {isNewUser ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Create Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-all text-sm font-medium"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-all text-sm font-medium"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
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
                        )}

                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-50 py-3 rounded-xl">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-bold py-3.5 rounded-2xl hover:bg-gray-900 transition-all text-xs uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : isNewUser ? 'Create Account' : 'Enter Portal'}
                        </button>
                    </form>
                )}

                <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} AntiGraviity Technologies Pvt Ltd
                </p>
            </div>
        </div>
    );
};

export default Login;
