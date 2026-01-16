import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await axios.post('/api/onboarding/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
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
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Forgot Password</h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">HR Portal Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    {message && <p className="text-green-600 text-[10px] font-bold uppercase tracking-wider text-center bg-green-50 py-3 rounded-xl">{message}</p>}
                    {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-50 py-3 rounded-xl">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white font-bold py-3.5 rounded-2xl hover:bg-gray-900 transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/hr/login')}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
