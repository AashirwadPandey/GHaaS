import React, { useState } from 'react';
import { TreePine, Mail, Lock, User, Eye, EyeOff, Leaf } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSignup, isLoading }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }
      const success = await onSignup(formData.name, formData.email, formData.password);
      if (!success) {
        setError('Email already exists or signup failed');
      }
    } else {
      const success = await onLogin(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              GHaaS
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Join the Green Revolution' : 'Welcome Back, Eco Warrior'}
          </h2>
          <p className="text-gray-600">
            {isSignup 
              ? 'Start your journey to a greener planet today' 
              : 'Continue your mission to save the Earth'
            }
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (only for signup) */}
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignup}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isSignup ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Leaf className="w-5 h-5" />
                  <span>{isSignup ? 'Start My Green Journey' : 'Continue Mission'}</span>
                </div>
              )}
            </button>
          </form>

          {/* Toggle between login/signup */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              {isSignup 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Join Us"
              }
            </button>
          </div>

          {/* Demo credentials hint */}
          {!isSignup && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Demo:</strong> arjun@example.com / password123
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>By continuing, you agree to help save our planet 🌱</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
