import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const error = queryParams.get('error');

    if (status === 'success') {
      // Show success message for a few seconds then redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    }
  }, [location, navigate]);

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const error = queryParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'missing_user_id':
        return 'User identification failed. Please try again.';
      case 'user_not_found':
        return 'User account not found. Please contact support.';
      case 'payment_failed':
        return 'Payment processing failed. Please try again.';
      case 'server_error':
        return 'Server error occurred. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === 'success' ? (
          <>
            <div className="mb-4">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your subscription has been activated.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will be redirected to the dashboard in a few seconds...
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-8">
              {getErrorMessage(error)}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess; 