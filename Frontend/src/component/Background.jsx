import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, BookOpen, Award, Clock } from 'lucide-react';

const Background = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Animation on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated stats array
  const stats = [
    { icon: BookOpen, value: "5,000+", label: "Resources" },
    { icon: Award, value: "250+", label: "Premium Books" },
    { icon: Clock, value: "24/7", label: "Access" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-blue-300 rounded-full opacity-10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp2036914.jpg')",
          filter: "brightness(0.9)",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease-out",
        }}
      ></div>

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white/70"></div>

      {/* Content container */}
      <div className="relative container mx-auto px-6 py-32 md:py-40 flex flex-col h-full">
        {/* Main heading with animation */}
        <div 
          className={`max-w-3xl transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Exclusive College Resources
            </span>
            <br />
            <span className="text-white">&</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500"> Premium Books</span>
            <br />
            <span className="relative inline-block">
              <span className="text-white">100% Free!</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></span>
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-200 mt-8 max-w-2xl transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            Access a curated collection of top-tier academic materials, textbooks,
            and study guides—all for free! Elevate your learning experience with
            high-quality resources designed to help you excel in your studies.
          </p>
          
          <p className={`text-lg md:text-xl text-gray-300 mt-4 max-w-xl transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            No hidden fees, no barriers—just pure knowledge at your fingertips.
          </p>
          
          {/* CTA Button with animation */}
          <button
            onClick={() => navigate("/info")}
            className={`mt-10 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            Get Started <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Stats section */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all duration-300">
                  <stat.icon size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom wave SVG */}
      <div className="absolute -bottom-40 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,138.7C96,117,192,75,288,69.3C384,64,480,96,576,117.3C672,139,768,149,864,144C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Background;