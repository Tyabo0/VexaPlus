import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-vexa-black-DEFAULT via-vexa-black-light to-vexa-black-DEFAULT pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl top-1/4 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl bottom-1/4 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-vexa-orange-muted border border-vexa-orange-DEFAULT/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-vexa-orange-DEFAULT" />
            <span className="text-sm text-vexa-orange-light">Creative & Digital Services Agency</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in animation-delay-100">
            Elevate Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-vexa-orange-light to-vexa-orange-DEFAULT">
              Digital Presence
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in animation-delay-200">
            From stunning websites to engaging social media campaigns, we bring your vision to life with creativity and innovation. Let's build something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-vexa-orange-DEFAULT hover:bg-vexa-orange-dark text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              Get Started
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-transparent border-2 border-vexa-orange-DEFAULT text-vexa-orange-DEFAULT hover:bg-vexa-orange-DEFAULT/10 font-medium py-4 px-8 rounded-lg transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-vexa-black-light opacity-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
