import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../components/Home';
import AboutUs from '../components/AboutUs';
import Signup from '../components/Signup';
import Login from '../components/Login';
import StartupAnimation from '../components/StartupAnimation';
import { isAuthenticated, onAuthStateChange } from './lib/supabase';

// Protected Route component for auth pages (login/signup)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setAuthenticated(!!session?.user);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to home
  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [hasShownStartup, setHasShownStartup] = useState(false);

  useEffect(() => {
    // Check if startup animation has been shown in this session
    const startupShown = sessionStorage.getItem('startupAnimationShown');
    if (startupShown) {
      setShowStartup(false);
      setHasShownStartup(true);
    }
  }, []);

  const handleStartupComplete = () => {
    setShowStartup(false);
    setHasShownStartup(true);
    // Mark startup as shown for this session
    sessionStorage.setItem('startupAnimationShown', 'true');
  };

  // Show startup animation only on first load
  if (showStartup && !hasShownStartup) {
    return <StartupAnimation onComplete={handleStartupComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route 
          path="/signup" 
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } 
        />
      </Routes>
    </Router>
  );
} 

export default App;