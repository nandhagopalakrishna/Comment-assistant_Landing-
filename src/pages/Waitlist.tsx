import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Waitlist() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get('email') as string;

    setStatus('loading');
    
    try {
      const response = await fetch('https://app.loops.so/api/newsletter-form/cm4jizrfy00gmjlypf9iszcm9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userGroup=Comment-Assistant&email=${encodeURIComponent(email)}`,
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to home
        </button>

        <div className="max-w-xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join the Waitlist
          </h1>
          <p className="text-lg text-gray-600">
            Be the first to know when Comment Assistant launches. Get early access and exclusive features.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {status === 'success' ? (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-medium text-lg">
                  Thanks! We'll be in touch soon!
                </p>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  ← Back
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full relative inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold rounded-lg shadow-lg hover:scale-105 focus:outline-none transition-all duration-300 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Please wait...' : 'Join Waitlist'}
                </button>
                {status === 'error' && (
                  <p className="text-red-600 text-sm text-center">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}