import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isAuthenticated, user, onLogout }) => {
  useEffect(() => {
    // Listen for logout events from the extension
    const handleExtensionLogout = () => {
      onLogout();
    };

    // Add listener for custom event from extension
    window.addEventListener('EXTENSION_LOGOUT', handleExtensionLogout);

    return () => {
      window.removeEventListener('EXTENSION_LOGOUT', handleExtensionLogout);
    };
  }, [onLogout]);

  const handleLogout = async () => {
    try {
      // Notify extension of logout
      if (chrome?.runtime?.sendMessage) {
        await chrome.runtime.sendMessage('lefahakdejoafdagopoabflodfdkgnch', {
          type: 'WEB_APP_LOGOUT'
        });
      }
      // Call the parent's onLogout handler
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Still logout even if extension communication fails
      onLogout();
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.imghippo.com/files/Hvzj9133uY.png" 
              alt="Comment Assistant Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-semibold text-gray-900">Comment Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Start Growing Your Social Media Presence Today
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Skyrocket your growth with AI-powered engagement on X.
            Let Comment Assistant help you build meaningful connections.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Grow on X
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 