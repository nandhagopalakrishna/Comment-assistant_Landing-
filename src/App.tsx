import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Stats from './components/Stats';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import PaymentSuccess from './pages/PaymentSuccess';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserAvatar from './components/UserAvatar';
import config from './config';

interface User {
  name: string;
  email: string;
  picture?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('auth_token');
    const storedUserData = localStorage.getItem('user');
    
    if (storedToken && storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        if (parsedUser) {
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    if (!userData) return;

    setIsAuthenticated(true);
    setUser(userData);
    
    // Store auth data in localStorage
    if (userData.accessToken) {
      localStorage.setItem('auth_token', userData.accessToken);
    }
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      const currentToken = localStorage.getItem('auth_token');
      if (currentToken) {
        await fetch(`${config.API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        });
      }
      // Clear auth data
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      
      // Clear all auth-related data from localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if the server request fails
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard 
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white pt-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                      <div className="text-left space-y-4 sm:space-y-6">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-3">
                            {[
                              {
                                src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
                                name: 'Sarah Chen',
                                role: 'Product Designer',
                              },
                              {
                                src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                                name: 'Michael Smith',
                                role: 'Marketing Lead',
                              },
                              {
                                src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                name: 'Emily Johnson',
                                role: 'Content Creator',
                              },
                              {
                                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                                name: 'David Wilson',
                                role: 'Social Media Manager',
                              },
                            ].map((user, index) => (
                              <UserAvatar key={index} src={user.src} name={user.name} role={user.role} />
                            ))}
                          </div>
                          <span className="text-gray-600 font-medium text-sm">67+ happy Daily Posters</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight sm:leading-snug">
                          Comment Smarter
                          <br />
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                            Grow Faster
                          </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-md">
                          Create viral, high-engagement AI-powered comments for{' '}
                          <span className="font-medium text-gray-900">Twitter</span>
                          in one click.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4">
                          <Link 
                            to="/login"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:scale-105 focus:outline-none transition-all duration-300 hover:shadow-blue-500/50"
                          >
                            Sign In
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                          <div className="text-gray-500 text-sm flex flex-row items-center justify-center sm:justify-start gap-4">
                            <span className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              One-click signup
                            </span>
                            <span className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              Completely Free
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative rounded-xl shadow-2xl overflow-hidden mt-8 lg:mt-0">
                        <img
                          src="https://i.imghippo.com/files/DBM5702.gif"
                          alt="Comment Assistant Demo"
                          className="w-full h-auto hover:scale-105 transition-all duration-700 ease-out object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Stats />
                <Features />
                <Pricing />
                <FAQ />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;