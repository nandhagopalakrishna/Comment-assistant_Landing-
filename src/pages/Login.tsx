import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import config from '../config';

interface LoginProps {
  isAuthenticated: boolean;
  onLoginSuccess?: (userData: any) => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
  error?: string;
}

interface ExtensionMessage {
  type: 'WEB_APP_AUTH';
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface ExtensionResponse {
  success: boolean;
  error?: string;
}

const EXTENSION_ID = process.env.NODE_ENV === 'production' 
  ? 'lefahakdejoafdagopoabflodfdkgnch' // Your production extension ID
  : 'lefahakdejoafdagopoabflodfdkgnch'; // Same ID for development

const Login: React.FC<LoginProps> = ({ isAuthenticated, onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      console.log('[Web Login] Starting Google Sign-In initialization');
      const googleSignInDiv = document.getElementById("googleSignInDiv");
      if (window.google && googleSignInDiv) {
        console.log('[Web Login] Google Sign-In SDK loaded, initializing button');
        window.google.accounts.id.initialize({
          client_id: config.GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin
        });
        window.google.accounts.id.renderButton(
          googleSignInDiv,
          { 
            theme: "outline", 
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "signin_with",
            logo_alignment: "left"
          }
        );
      } else {
        console.log('[Web Login] Waiting for Google Sign-In SDK...');
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    initializeGoogleSignIn();
  }, []);

  const syncWithExtension = async (accessToken: string, refreshToken: string, user: User) => {
    console.log('[Web Login] Starting extension sync');
    try {
      // Check if Chrome runtime is available
      if (!chrome?.runtime?.sendMessage) {
        console.warn('[Web Login] Chrome runtime not available, extension might not be installed');
        return;
      }

      console.log('[Web Login] Sending auth data to extension:', {
        extensionId: EXTENSION_ID,
        hasAccessToken: !!accessToken,
        accessTokenPreview: accessToken ? `${accessToken.substring(0, 10)}...` : 'none',
        hasRefreshToken: !!refreshToken,
        refreshTokenPreview: refreshToken ? `${refreshToken.substring(0, 10)}...` : 'none',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });

      const message: ExtensionMessage = {
        type: 'WEB_APP_AUTH',
        accessToken,
        refreshToken,
        user
      };

      const response = await chrome.runtime.sendMessage<ExtensionMessage, ExtensionResponse>(
        EXTENSION_ID,
        message
      );

      console.log('[Web Login] Extension sync response:', response);

      if (!response?.success) {
        throw new Error(response?.error || 'Extension sync failed');
      }

      console.log('[Web Login] Successfully synced with extension');
    } catch (error: unknown) {
      console.error('[Web Login] Extension sync error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        extensionId: EXTENSION_ID,
        chromeRuntime: !!chrome?.runtime,
        sendMessage: !!chrome?.runtime?.sendMessage
      });
    }
  };

  const handleGoogleLogin = async (response: { credential: string }) => {
    console.log('[Web Login] Google login callback received');
    try {
      console.log('[Web Login] Sending Google token to backend:', {
        apiUrl: config.API_URL,
        hasCredential: !!response.credential,
        credentialPreview: response.credential ? `${response.credential.substring(0, 10)}...` : 'none'
      });

      const result = await fetch(`${config.API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token: response.credential })
      });
      
      console.log('[Web Login] Backend response status:', result.status);
      
      const data: AuthResponse = await result.json();
      console.log('[Web Login] Backend response data:', {
        success: data.success,
        hasAccessToken: !!data.accessToken,
        accessTokenPreview: data.accessToken ? `${data.accessToken.substring(0, 10)}...` : 'none',
        hasRefreshToken: !!data.refreshToken,
        refreshTokenPreview: data.refreshToken ? `${data.refreshToken.substring(0, 10)}...` : 'none',
        hasUser: !!data.user,
        user: data.user ? {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name
        } : null
      });
      
      if (!data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store tokens in localStorage
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }

      // Sync with extension if available
      if (data.accessToken && data.refreshToken && data.user) {
        await syncWithExtension(data.accessToken, data.refreshToken, data.user);
      }

      // Call onLoginSuccess callback
      if (onLoginSuccess && data.user) {
        console.log('[Web Login] Calling onLoginSuccess callback');
        onLoginSuccess(data.user);
      }

      console.log('[Web Login] Navigating to dashboard');
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('[Web Login] Login error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      // Handle error (show error message to user)
    }
  };

  if (isAuthenticated) {
    console.log('[Web Login] User already authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div id="googleSignInDiv" className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default Login; 