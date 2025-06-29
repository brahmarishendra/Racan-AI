import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { signIn, resetPassword, signInWithGoogle, isSupabaseConfigured, handleOAuthCallback } from '../lib/supabase';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
  });

  // SEO optimization for Login page
  useEffect(() => {
    // Update page title and meta description
    document.title = 'Login to Racan AI - AI Fashion Assistant | Secure Sign In';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sign in to your Racan AI account to access personalized fashion recommendations, AI-powered styling, and smart wardrobe management. Secure login with Google authentication available.');
    }
    
    // Add page-specific structured data
    const loginPageStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Login - Racan AI",
      "description": "Sign in to your Racan AI account for personalized fashion recommendations",
      "url": "https://racan-ai.vercel.app/login",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Racan AI",
        "url": "https://racan-ai.vercel.app"
      },
      "potentialAction": {
        "@type": "LoginAction",
        "target": "https://racan-ai.vercel.app/login",
        "object": {
          "@type": "EntryPoint",
          "urlTemplate": "https://racan-ai.vercel.app/login",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(loginPageStructuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
      // Reset title when leaving page
      document.title = 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform';
    };
  }, []);

  // Handle OAuth callback on component mount
  useEffect(() => {
    const handleCallback = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(formData.email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

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
          window.location.href = '/';
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-10">
        <img
          src="https://i.postimg.cc/rsYBTFzm/image-41.png"
          alt="Racan AI Logo - AI Fashion Assistant"
          className="w-20 md:w-24 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleLogoClick}
          loading="eager"
        />
      </div>

      <main className="max-w-sm w-full md:bg-white md:rounded-sm md:shadow-lg p-6 md:p-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-2 tracking-tight">Login</h1>
          <p className="text-sm text-gray-600">Sign in to access your AI fashion assistant</p>
        </header>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-2 mb-6" role="alert">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-red-700 text-sm leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4 flex items-center gap-2 mb-6" role="alert">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-3 border-b border-gray-300 bg-transparent placeholder-gray-500 focus:outline-none focus:border-gray-900 text-gray-900"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={loading}
              autoComplete="email"
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full px-3 py-3 pr-12 border-b border-gray-300 bg-transparent placeholder-gray-500 focus:outline-none focus:border-gray-900 text-gray-900"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              aria-describedby={error ? "error-message" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>

          {/* Google Sign In Button */}
          <div className="pt-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="text-center text-sm text-gray-600 py-4">
            By logging in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline underline">
              Privacy Policy
            </a>
            .
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || !formData.email.trim() || !formData.password.trim()}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-full text-base font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account yet?{' '}
              <button 
                type="button"
                onClick={() => window.location.href = '/signup'}
                className="text-red-600 font-medium hover:underline underline"
                disabled={loading}
              >
                Sign up
              </button>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Forgot your password?{' '}
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-red-600 hover:underline underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Click here
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;