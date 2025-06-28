import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { signIn, resetPassword, signInWithGoogle, isSupabaseConfigured, handleOAuthCallback } from '../lib/supabase';

function Login() {
  const [step, setStep] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '',
  });

  // Handle OAuth callback on component mount
  useEffect(() => {
    const handleCallback = async () => {
      // Check if this is an OAuth callback
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
      
      if (accessToken || refreshToken) {
        setLoading(true);
        try {
          const { user, error } = await handleOAuthCallback();
          if (error) {
            setError('Authentication failed. Please try again.');
          } else if (user) {
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
              window.location.replace('/');
            }, 1000);
          }
        } catch (err) {
          console.error('OAuth callback error:', err);
          setError('Authentication failed. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    handleCallback();
  }, []);

  // Check if Supabase is configured on component mount
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Authentication service is not configured. Please contact support.');
    }
  }, []);

  // Clear messages after some time
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true, message: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (step === 'email') {
      if (!formData.email.trim()) {
        setError('Please enter your email address');
        return;
      }
      
      if (!validateEmail(formData.email.trim())) {
        setError('Please enter a valid email address');
        return;
      }
      
      setStep('password');
    } else {
      if (!formData.password.trim()) {
        setError('Please enter your password');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      setLoading(true);
      
      try {
        const { data, error } = await signIn(formData.email.trim(), formData.password);
        
        if (error) {
          setError(error.message);
        } else if (data?.user) {
          setSuccess('Login successful! Redirecting...');
          
          setTimeout(() => {
            window.location.replace('/');
          }, 1000);
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoBack = () => {
    if (step === 'password') {
      setStep('email');
      setError(null);
      setSuccess(null);
    } else {
      window.location.href = '/';
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address first');
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { error } = await resetPassword(formData.email.trim());
      
      if (error) {
        setError(error.message || 'Failed to send password reset email');
      } else {
        setSuccess('Password reset email sent! Check your inbox for instructions.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google OAuth Error Details:', error);
        setError('Google sign-in failed. Please try email login instead.');
        setLoading(false);
      } else if (data) {
        setSuccess('Redirecting to Google...');
      }
    } catch (err) {
      console.error('Google sign-in unexpected error:', err);
      setError('Google sign-in failed. Please try email login instead.');
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Sign in form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* Back button */}
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5" />
              {step === 'password' ? 'Back' : 'Home'}
            </button>

            <div className="flex items-center gap-2 mb-12">
              <img 
                src="https://i.postimg.cc/50B939gH/Logo.png" 
                alt="Racan AI" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-2xl font-semibold">Racan AI</span>
            </div>
            <h1 className="text-5xl font-serif mb-3">Welcome Back</h1>
            <p className="text-gray-600 text-lg">
              Sign in to continue your fashion journey with AI-powered recommendations.
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'email' ? (
              <>
                <div className="flex items-center justify-center w-full">
                  <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img 
                      src="https://developers.google.com/identity/images/g-logo.png" 
                      alt="Google" 
                      className="w-5 h-5"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjY5QzE3LjQzIDE1LjYgMTYuNTggMTYuNzEgMTUuMjcgMTcuMzlWMjAuMDlIMTguOTZDMjEuMTggMTguMDkgMjIuNTYgMTUuNDMgMjIuNTYgMTIuMjVaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik0xMiAyM0M5LjI0IDIzIDYuOTUgMjEuOTIgNS4yNyAyMC4wOUw4Ljk2IDE3LjM5QzEwLjA0IDE4LjAzIDExLjM3IDE4LjM4IDEyIDE4LjM4QzE0LjY5IDE4LjM4IDE2Ljk5IDE2LjU2IDE3Ljg0IDE0LjA5SDE0LjEyVjEwLjg0SDE3Ljg0QzE4LjY5IDguMzcgMjAuOTkgNi41NSAyNCAwLjU1QzI0IDguMzcgMjAuOTkgNi41NSAyNCAwLjU1QzI0IDQuNzMgMjIuOTkgMyAyMS4yNyAxSDEuODRDMTYuOTkgMS40NCAxNC43NiAzLjI3IDE0LjEyIDYuMDlIMTcuODRDMTcuODQgNi41NSAxNy44NCA2LjU1IDE3Ljg0IDYuNTVaIiBmaWxsPSIjMzRBODUzIi8+Cjwvc3ZnPg==';
                      }}
                    />
                    {loading ? 'Connecting...' : 'Continue with Google'}
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                    placeholder="Enter your personal or work email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.email.trim()}
                  className="mt-4 w-full bg-[#FF2D6B] text-white py-3 px-4 rounded-lg hover:bg-[#e6245e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Continue with email'}
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Enter your password
                  </h2>
                  <p className="text-gray-600 break-all">
                    Enter your password for {formData.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={loading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Password must be at least 6 characters long
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || formData.password.length < 6}
                  className="mt-4 w-full bg-[#FF2D6B] text-white py-3 px-4 rounded-lg hover:bg-[#e6245e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="mt-4 w-full text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </form>

          {/* Create an account link at the bottom */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => window.location.href = '/signup'}
                className="text-[#FF2D6B] font-medium hover:underline"
                disabled={loading}
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="pt-4">
            <button 
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto"
              disabled={loading}
            >
              Learn more
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Fashion images */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-50">
        <div className="h-screen grid grid-cols-2 gap-4 p-8">
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://i.pinimg.com/736x/94/d2/5f/94d25f091a8fd11ab557d02d4ac03979.jpg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://i.pinimg.com/736x/65/dc/8e/65dc8e24c28415fba29f1dff90c9d970.jpg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;