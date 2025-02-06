import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="https://i.imghippo.com/files/Hvzj9133uY.png" 
            alt="Comment Assistant Logo" 
            className="w-8 h-8 drop-shadow-md"
          />
          <span className="ml-2 text-2xl font-bold drop-shadow-md">Comment Assistant</span>
        </div>

        {/* Copyright and Links */}
        <div className="space-y-6">
          <p className="text-sm tracking-wide opacity-90">
            &copy; {new Date().getFullYear()} Comment Assistant. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <a
              href="/privacy"
              className="hover:text-blue-200 transition-colors duration-200 transform hover:scale-105"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-blue-200 transition-colors duration-200 transform hover:scale-105"
            >
              Terms
            </a>
            <a
              href="https://chrome.google.com/webstore"
              className="hover:text-blue-200 transition-colors duration-200 transform hover:scale-105"
            >
              Chrome Extension
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}