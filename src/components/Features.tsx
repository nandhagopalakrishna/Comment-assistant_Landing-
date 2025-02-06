import React from 'react';
import { Clock, Globe, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

export default function Features() {
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="features" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 leading-tight">
          Achieve{' '}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
            Instant Growth
          </span>{' '}
          with AI.
        </h2>

        {/* Feature Items */}
        {[
          {
            icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            title: 'Grow Your Profile Faster',
            description:
              'Grow your profile more quickly by participating in every relevant conversation, ensuring you\'re consistently seen and heard.',
            image: 'https://i.imghippo.com/files/ipOc8121sE.gif'
          },
          {
            icon: <Clock className="w-6 h-6 text-blue-600" />,
            title: 'Reduce Time by 10x',
            description:
              'Engage with 100+ posts in minutes, helping your profile grow organically and giving you more time for what matters most.',
            image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=512&h=512&fit=crop'
          },
          {
            icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
            title: 'One Click Comment Generation',
            description: 'One-click comment creation made easy. Pick your tone, and watch us generate a high-quality response in seconds.',
            image: 'https://i.imghippo.com/files/RhH3979yhc.gif'
          },
          {
            icon: <Globe className="w-6 h-6 text-blue-600" />,
            title: 'Multilanguage Support',
            description: 'Break language barriers with ease. Our extension supports multiple languages, allowing you to engage with a global audience.',
            image: 'https://i.imghippo.com/files/AsC9486k.png'
          },
        ].map((feature, index) => (
          <div
            key={index}
            data-index={index}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center justify-start gap-8 md:gap-16 mb-16 md:mb-32 ${
              visibleItems.includes(index) ? 'fade-up visible' : 'fade-up'
            }`}
          >
            <div className="w-full md:w-3/5">
              <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-10 transform hover:scale-[1.02]">
                <div className="flex-1 min-w-0 md:min-w-[320px] space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl p-4 bg-blue-50 flex-shrink-0">{feature.icon}</div>
                    <h3 className="text-xl md:text-3xl font-extrabold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{feature.description}</p>
                </div>
                {feature.image && (
                  <div className="w-full md:w-80 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-auto object-contain md:object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* CTA Button */}
        <div className="flex justify-center mt-8 md:mt-16 px-4 md:px-0">
          <div className="relative group">
            <button className="w-full md:w-auto relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block px-8 py-4 rounded-xl bg-gray-950">
                <a href="http://localhost:3000" className="text-white">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm md:text-base transition-all duration-500 group-hover:translate-x-1">
                      Sign In
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </a>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
