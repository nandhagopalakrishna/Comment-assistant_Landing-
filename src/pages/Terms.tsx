import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: 12/19/2024</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="text-gray-600">
              Welcome to Comment Assistant. By accessing or using our website, services, applications, and tools (collectively, the "Services"), you agree to these Terms of Service ("Terms"). Please read these Terms carefully before using the Services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">2. Using our Services</h2>
            <p className="text-gray-600">
              You must follow any policies made available to you within the Services. You may use our Services only as permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">3. Your Comment Assistant Account</h2>
            <p className="text-gray-600">
              To use some of our Services, you may need to create an account. You are responsible for maintaining the security of your account and the activities that occur under your account. We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">4. Privacy & Copyright Protection</h2>
            <p className="text-gray-600">
              Comment Assistant's privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Comment Assistant can use such data in accordance with our privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">5. Software in our Services</h2>
            <p className="text-gray-600">
              When a Service requires or includes downloadable software, this software may update automatically on your device once a new version or feature is available. Some Services may let you adjust your automatic update settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">6. Modifying and Terminating our Services</h2>
            <p className="text-gray-600">
              We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether. You can stop using our Services at any time. Comment Assistant may also stop providing Services to you or add or create new limits to our Services at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">7. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:{' '}
              <a href="mailto:nandhagopalakrishnan3@gmail.com" className="text-blue-600 hover:text-blue-800">
                nandhagopalakrishnan3@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}