import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate('/profile', { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Once auth state resolves, the reactive useEffect will cleanly redirect to /profile
    } catch (err) {
      console.error("Login error details:", err);
      setError(`Login failed: ${err.message || 'Please check your credentials.'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark overflow-hidden p-8 md:p-10 border border-white/60 dark:border-white/10 relative z-10 transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <LogIn className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Login to access your dashboard</p>
        </div>

        {error && (
          <div role="alert" className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 text-center border border-red-100 dark:border-red-900/30 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-sans">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
              placeholder="admin@ecellrecabn.com"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-sans">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-glow hover:shadow-glow-strong mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
