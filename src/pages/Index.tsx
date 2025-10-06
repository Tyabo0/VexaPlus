import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { Monitor, Smartphone, Share2, Video, MoveRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredServices = [
    {
      title: "Web Design & Development",
      description: "Create stunning, responsive websites that captivate your audience and drive conversions.",
      icon: <Monitor size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80",
      link: "/services#web"
    },
    {
      title: "Mobile App Development",
      description: "Build powerful, user-friendly mobile applications for iOS and Android platforms.",
      icon: <Smartphone size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
      link: "/services#mobile"
    },
    {
      title: "Social Media Management",
      description: "Engage your audience and grow your brand with strategic social media campaigns.",
      icon: <Share2 size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80",
      link: "/services#social"
    }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-vexa-black-light border-y border-vexa-orange-DEFAULT/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-vexa-orange-DEFAULT mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
              <p className="text-gray-400 max-w-2xl">
                Comprehensive digital solutions to help your business thrive in the modern world
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-vexa-orange-DEFAULT hover:text-vexa-orange-light transition-colors"
            >
              View all services
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-6 md:px-12 bg-vexa-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Why Choose Vexa Plus?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're more than just a service provider – we're your creative partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Creative Excellence", 
                description: "Our team brings fresh ideas and innovative solutions to every project",
                icon: <Video size={32} />
              },
              { 
                title: "Proven Results", 
                description: "Track record of delivering projects that exceed expectations",
                icon: <CheckCircle2 size={32} />
              },
              { 
                title: "Full-Service Agency", 
                description: "From concept to execution, we handle everything under one roof",
                icon: <Share2 size={32} />
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-vexa-orange-DEFAULT mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's collaborate to create digital experiences that captivate your audience and drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-vexa-orange-DEFAULT hover:bg-vexa-orange-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Get in Touch
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="bg-transparent border border-vexa-orange-DEFAULT text-vexa-orange-DEFAULT hover:bg-vexa-orange-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
