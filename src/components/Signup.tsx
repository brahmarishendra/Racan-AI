import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { signUp, signInWithGoogle, isSupabaseConfigured, handleOAuthCallback } from '../lib/supabase';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    password: '',
  });

  // SEO optimization for Signup page
  useEffect(() => {
    // Update page title and meta description
    document.title = 'Sign Up for Racan AI - Create Your AI Fashion Assistant Account';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create your free Racan AI account to access personalized fashion recommendations, AI-powered styling, and smart wardrobe management. Join thousands of users transforming their style with AI.');
    }
    
    // Add page-specific structured data
    const signupPageStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sign Up - Racan AI",
      "description": "Create your Racan AI account for personalized fashion recommendations",
      "url": "https://racan-ai.vercel.app/signup",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Racan AI",
        "url": "https://racan-ai.vercel.app"
      },
      "potentialAction": {
        "@type": "RegisterAction",
        "target": "https://racan-ai.vercel.app/signup",
        "object": {
          "@type": "EntryPoint",
          "urlTemplate": "https://racan-ai.vercel.app/signup",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(signupPageStructuredData);
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
        try {
          const { user, error } = await handleOAuthCallback();
          if (error) {
            setError('Authentication failed. Please try again.');
          } else if (user) {
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => {
              window.history.replaceState(null, '', '/');
              window.location.href = '/';
            }, 1000);
          }
        } catch (err) {
          console.error('OAuth callback error:', err);
          setError('Authentication failed. Please try again.');
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
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    
    return { isValid: true, message: '' };
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

    if (!formData.username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (formData.username.trim().length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter a password');
      return;
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    setLoading(true);
    
    try {
      const result = await signUp(formData.email.trim(), formData.password, formData.username.trim());
      
      if (result.error) {
        setError(result.error.message);
      } else if (result.data?.user) {
        if (!result.data.user.email_confirmed_at && !result.data.session) {
          setSuccess('Account created! Please check your email for verification.');
        } else {
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(() => {
            window.history.replaceState(null, '', '/');
            window.location.href = '/';
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google OAuth Error Details:', error);
        setError('Google sign-up failed. Please try email signup instead.');
        setLoading(false);
      } else if (data) {
        setSuccess('Redirecting to Google...');
      }
    } catch (err) {
      console.error('Google sign-up unexpected error:', err);
      setError('Google sign-up failed. Please try email signup.');
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleLogoClick = () => {
    window.history.replaceState(null, '', '/');
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

      {/* AI Chip Loading Animation - Only for Signup Page */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="text-center">
            {/* AI Chip Animation */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg 
                width="96" 
                height="96" 
                viewBox="0 0 96 96" 
                className="w-full h-full"
              >
                {/* Central Chip */}
                <rect 
                  x="32" 
                  y="32" 
                  width="32" 
                  height="32" 
                  fill="none" 
                  stroke="#004AAD" 
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <rect 
                  x="36" 
                  y="36" 
                  width="24" 
                  height="24" 
                  fill="#004AAD" 
                  className="animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                
                {/* Circuit Lines - Top */}
                <g className="circuit-lines">
                  <line x1="48" y1="32" x2="48" y2="16" stroke="#973cff" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <line x1="40" y1="32" x2="40" y2="20" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <line x1="56" y1="32" x2="56" y2="20" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                  
                  {/* Circuit Nodes - Top */}
                  <circle cx="48" cy="16" r="2" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="40" cy="20" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                  <circle cx="56" cy="20" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
                </g>
                
                {/* Circuit Lines - Right */}
                <g className="circuit-lines">
                  <line x1="64" y1="48" x2="80" y2="48" stroke="#973cff" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <line x1="64" y1="40" x2="76" y2="40" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                  <line x1="64" y1="56" x2="76" y2="56" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                  
                  {/* Circuit Nodes - Right */}
                  <circle cx="80" cy="48" r="2" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
                  <circle cx="76" cy="40" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
                  <circle cx="76" cy="56" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                </g>
                
                {/* Circuit Lines - Bottom */}
                <g className="circuit-lines">
                  <line x1="48" y1="64" x2="48" y2="80" stroke="#973cff" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <line x1="40" y1="64" x2="40" y2="76" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                  <line x1="56" y1="64" x2="56" y2="76" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  {/* Circuit Nodes - Bottom */}
                  <circle cx="48" cy="80" r="2" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                  <circle cx="40" cy="76" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
                  <circle cx="56" cy="76" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
                </g>
                
                {/* Circuit Lines - Left */}
                <g className="circuit-lines">
                  <line x1="32" y1="48" x2="16" y2="48" stroke="#973cff" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                  <line x1="32" y1="40" x2="20" y2="40" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                  <line x1="32" y1="56" x2="20" y2="56" stroke="#973cff" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
                  
                  {/* Circuit Nodes - Left */}
                  <circle cx="16" cy="48" r="2" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
                  <circle cx="20" cy="40" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                  <circle cx="20" cy="56" r="1.5" fill="#973cff" className="animate-pulse" style={{ animationDelay: '1.7s' }} />
                </g>
                
                {/* Data Flow Animation */}
                <g className="data-flow">
                  <circle r="1" fill="#FF2D6B" className="animate-ping">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M48,32 L48,16 M80,48 L64,48 M48,64 L48,80 M16,48 L32,48" />
                  </circle>
                  <circle r="1" fill="#FF2D6B" className="animate-ping" style={{ animationDelay: '0.5s' }}>
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M64,48 L80,48 M48,64 L48,80 M32,48 L16,48 M48,32 L48,16" />
                  </circle>
                </g>
              </svg>
            </div>
            
            {/* Loading text */}
            <p className="text-white text-lg font-medium">Creating account...</p>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-sm w-full md:bg-white md:rounded-sm md:shadow-lg p-6 md:p-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-2 tracking-tight">Sign up</h1>
          <p className="text-sm text-gray-600">Create your AI fashion assistant account</p>
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

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              required
              minLength={2}
              className="w-full px-3 py-3 border-b border-gray-300 bg-transparent placeholder-gray-500 focus:outline-none focus:border-gray-900 text-gray-900"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={loading}
              autoComplete="username"
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
              autoComplete="new-password"
              aria-describedby={error ? "error-message" : "password-requirements"}
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

          {/* Password Requirements */}
          <div id="password-requirements" className="text-xs text-gray-500 mt-1">
            Password must contain: uppercase, lowercase, number (min 6 characters)
          </div>

          {/* Google Sign Up Button */}
          <div className="pt-4">
            <button 
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign up with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Loading...' : 'Continue with Google'}
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="text-center text-sm text-gray-600 py-4">
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline underline">
              Privacy Policy
            </a>
            .
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading || !validatePassword(formData.password).isValid}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-full text-base font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          {/* Sign in link */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => {
                  window.history.replaceState(null, '', '/login');
                  window.location.href = '/login';
                }}
                className="text-red-600 font-medium hover:underline underline"
                disabled={loading}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Signup;