import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { signUp } from '../lib/supabase';

function Signup() {
  const [step, setStep] = useState<'email' | 'verification' | 'password'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (step === 'email') {
      if (formData.email) {
        setStep('password');
      }
    } else if (step === 'password') {
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      setLoading(true);
      
      try {
        const { data, error } = await signUp(formData.email, formData.password);
        
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created successfully! Please check your email for verification.');
          setStep('verification');
          
          // Auto redirect after successful signup
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoBack = () => {
    if (step === 'password') {
      setStep('email');
    } else if (step === 'verification') {
      setStep('email');
    } else {
      window.history.back();
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Note: Google OAuth setup would require additional configuration in Supabase
      setError('Google sign-up will be available soon. Please use email signup for now.');
    } catch (err) {
      setError('Google sign-up failed. Please try email signup.');
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
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex items-center gap-2 mb-12">
              <img src="https://i.postimg.cc/50B939gH/Logo.png" alt="Racan AI" className="w-8 h-8" />
              <span className="text-2xl font-semibold">Racan AI</span>
            </div>
            <h1 className="text-5xl font-serif mb-3">Redefine Your Style</h1>
            <p className="text-gray-600 text-lg">
              Experience the future of fashion with AI-powered recommendations that match your unique taste.
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {step === 'email' ? (
              <>
                <div className="flex items-center justify-center w-full">
                  <button 
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.email}
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Continue with email'}
                </button>
              </>
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
                  Redirecting to home page in a few seconds...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Create your password
                  </h2>
                  <p className="text-gray-600">
                    Enter a secure password for {formData.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={loading}
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
                    Password must be at least 8 characters long
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || formData.password.length < 8}
                  className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto">
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
                onClick={() => window.location.href = '/Login'}
                className="text-black font-medium hover:underline"
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
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://i.pinimg.com/736x/94/d2/5f/94d25f091a8fd11ab557d02d4ac03979.jpg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://i.pinimg.com/736x/65/dc/8e/65dc8e24c28415fba29f1dff90c9d970.jpg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[calc(50vh-3rem)]">
            <img 
              src="https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg" 
              alt="Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;