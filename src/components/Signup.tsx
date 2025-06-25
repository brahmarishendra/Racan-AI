import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { signUp, signInWithGoogle, isSupabaseConfigured, handleOAuthCallback, createSimpleTestUser, testDatabaseConnection } from '../lib/supabase';

function Signup() {
  const [step, setStep] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '',
  });

  // Test database connection on mount
  useEffect(() => {
    const checkDbConnection = async () => {
      const result = await testDatabaseConnection();
      setDbConnected(result.connected);
      if (!result.connected) {
        console.log('Database connection issue:', result.error);
      }
    };
    checkDbConnection();
  }, []);

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
            setSuccess('Account created successfully! Redirecting...');
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
      }, 8000); // Increased timeout for better UX
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Check for minimum length
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    // Check for number
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
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
      
      setStep('name');
    } else if (step === 'name') {
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }
      
      if (formData.name.trim().length < 2) {
        setError('Name must be at least 2 characters long');
        return;
      }
      
      setStep('password');
    } else if (step === 'password') {
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
        // Pass the full name to the signUp function
        const result = await signUp(formData.email.trim(), formData.password, formData.name.trim());
        
        if (result.error) {
          setError(result.error.message);
        } else if (result.data?.user) {
          // Check if user needs email confirmation
          if (!result.data.user.email_confirmed_at && !result.data.session) {
            setSuccess('Account created! Please check your email for verification.');
            setStep('verification');
          } else {
            setSuccess('Account created successfully! Redirecting...');
            // Auto redirect after successful signup
            setTimeout(() => {
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
    }
  };

  const handleGoBack = () => {
    if (step === 'password') {
      setStep('name');
      setError(null);
      setSuccess(null);
    } else if (step === 'name') {
      setStep('email');
      setError(null);
      setSuccess(null);
    } else if (step === 'verification') {
      setStep('email');
      setError(null);
      setSuccess(null);
    } else {
      // Navigate to home page
      window.location.href = '/';
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
        // Don't set loading to false here as the redirect will happen
        setSuccess('Redirecting to Google...');
        // The redirect will be handled automatically by Supabase
      }
    } catch (err) {
      console.error('Google sign-up unexpected error:', err);
      setError('Google sign-up failed. Please try email signup.');
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  // Quick test user creation for bypassing rate limits
  const handleCreateTestUser = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await createSimpleTestUser();
      if (result.success) {
        setSuccess(`Test account created! Email: ${result.email} | Password: ${result.password}`);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        setError('Failed to create test account. Please try manual signup.');
      }
    } catch (err) {
      console.error('Test user creation error:', err);
      setError('Failed to create test account. Please try manual signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Sign up form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* Back button */}
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
              disabled={loading}
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
              {step === 'password' || step === 'name' || step === 'verification' ? 'Back' : 'Home'}
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
            <h1 className="text-5xl font-serif mb-3">Redefine Your Style</h1>
            <p className="text-gray-600 text-lg">
              Experience the future of fashion with AI-powered recommendations that match your unique taste.
            </p>
          </div>

          {/* Database Connection Status */}
          {dbConnected !== null && (
            <div className={`p-3 rounded-lg text-sm ${
              dbConnected 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
            }`}>
              {dbConnected 
                ? '✅ Database connected successfully' 
                : '⚠️ Database connection issue detected'
              }
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
                {error.includes('rate limit') && (
                  <div className="mt-3">
                    <p className="text-red-600 text-xs mb-2">
                      Rate limit detected. Try the bypass option below:
                    </p>
                    <button
                      onClick={handleCreateTestUser}
                      disabled={loading}
                      className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      Create Test Account (Bypass Rate Limit)
                    </button>
                  </div>
                )}
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
                    onClick={handleGoogleSignUp}
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
                    {loading ? 'Loading...' : 'Continue with Google'}
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
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Continue with email'}
                </button>

                {/* Rate Limit Bypass Option */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-600 mb-2">
                    Having trouble with rate limits? Try this bypass option:
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateTestUser}
                    disabled={loading}
                    className="w-full text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Create Instant Test Account
                  </button>
                </div>
              </>
            ) : step === 'name' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    What's your name?
                  </h2>
                  <p className="text-gray-600">
                    Enter your full name for {formData.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      minLength={2}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={loading}
                      autoComplete="name"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Name must be at least 2 characters long
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || formData.name.trim().length < 2}
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
              </div>
            ) : step === 'verification' ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Check your inbox</h2>
                  <p className="text-gray-600">
                    We sent a verification link to <br />
                    <span className="font-medium">{formData.email}</span>
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Account created successfully</span>
                </div>
                <p className="text-sm text-gray-500">
                  Click the link in your email to verify your account, then you can sign in.
                </p>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Go to Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Create your password
                  </h2>
                  <p className="text-gray-600">
                    Enter a secure password for {formData.name}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={loading}
                      autoComplete="new-password"
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
                    Password must be at least 6 characters long and contain:
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>At least one uppercase letter (A-Z)</li>
                      <li>At least one lowercase letter (a-z)</li>
                      <li>At least one number (0-9)</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !validatePassword(formData.password).isValid}
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            )}
          </form>

          <div className="pt-4">
            <button 
              type="button"
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto"
            >
              Learn more
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => window.location.href = '/login'}
                className="text-black font-medium hover:underline"
                disabled={loading}
              >
                Sign in
              </button>
            </p>
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

export default Signup;