import React, { useEffect, useState } from 'react';
import UserAvatar from './UserAvatar';

function AnimatedNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 stats-section">
        <h2 className="text-6xl sm:text-7xl font-extrabold text-center mb-20 bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight leading-tight">
          Together, We Grow Faster!
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center ${
          isVisible ? 'fade-up visible' : 'fade-up'
        }`}>
          {/* Stats Section */}
          <div className="flex flex-col items-center">
            <span className="text-blue-500 text-7xl sm:text-8xl font-black">
              <AnimatedNumber end={1753} />
            </span>
            <p className="text-gray-600 text-lg font-medium mt-4">Comments Created</p>
          </div>

          {/* Avatars Section */}
          <div className="flex flex-col items-center">
            <div className="flex -space-x-4">
              <UserAvatar
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                name="Sarah Chen"
                role="Product Designer"
              />
              <UserAvatar
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
                name="Michael Smith"
                role="Marketing Lead"
              />
              <UserAvatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                name="Emily Johnson"
                role="Content Creator"
              />
              <UserAvatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                name="David Wilson"
                role="Social Media Manager"
              />
            </div>
            <p className="mt-4 text-gray-500 text-base font-medium">
              A growing community of creators
            </p>
          </div>

          {/* Creators Section */}
          <div className="flex flex-col items-center">
            <span className="text-indigo-500 text-7xl sm:text-8xl font-black">
              <AnimatedNumber end={67} />
            </span>
            <p className="text-gray-600 text-lg font-medium mt-4">Active Creators</p>
          </div>
        </div>
      </div>
    </div>
  );
}
