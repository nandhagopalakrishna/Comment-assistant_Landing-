import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed w-full top-0 bg-gradient-to-r from-white to-gray-100/80 backdrop-blur-md border-b border-gray-200 z-50 px-2 sm:px-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0 min-w-0 max-w-[60%] sm:max-w-none">
            <img 
              src="https://i.imghippo.com/files/Hvzj9133uY.png" 
              alt="Comment Assistant Logo" 
              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-200 hover:scale-110"
            />
            <span className="ml-2 font-semibold text-gray-900 text-xs sm:text-base leading-tight">
              <span className="block sm:inline">Comment</span>
              <span className="block sm:inline sm:ml-1">Assistant</span>
            </span>
          </Link>

          {/* Navigation Section */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </a>
            {/* CTA Button */}
            <Link 
              to="/login"
              className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </Link>
          </nav>
          
          {/* Mobile Sign In Button */}
          <Link 
            to="/login"
            className="md:hidden flex items-center gap-2 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-4 py-2.5 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 text-sm whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}