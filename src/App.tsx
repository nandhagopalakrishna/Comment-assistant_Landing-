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
import Home from './pages/Home';

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
        <Route path="/sign-in" element={<Home />} />
        <Route
          path="/"
          element={
            <Home />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;