import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Start Growing Your Profile{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Today
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          No credit card required. Try the tool free with one-click quick sign up, 
          and generate comments in the next 30 seconds.
        </p>

        <div className="relative group inline-block">
          <button className="w-full sm:w-auto relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-8 py-4 rounded-xl bg-gray-950">
              <a href="http://localhost:3000" className="text-white">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1 text-lg">Sign In</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            </span>
          </button>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-4 sm:space-y-0 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
            No credit card
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
            Instant access
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
            20 free comments
          </div>
        </div>
      </div>
    </div>
  );
}