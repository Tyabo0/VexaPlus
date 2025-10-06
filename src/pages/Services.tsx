import React, { useEffect } from "react";
import { Monitor, Smartphone, Share2, Video, MoveRight, Palette, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainServices = [
    {
      id: "web",
      icon: <Monitor size={32} />,
      title: "Web Design & Development",
      description: "We build fast, modern, and mobile-responsive websites tailored to your brand. From portfolios to e-commerce, our sites are designed to engage and convert visitors seamlessly.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80",
      features: [
        "Custom website design",
        "Responsive & mobile-friendly",
        "E-commerce solutions",
        "SEO optimization",
        "Content management systems",
        "Performance optimization"
      ]
    },
    {
      id: "mobile",
      icon: <Smartphone size={32} />,
      title: "Mobile App Development",
      description: "Custom mobile applications built for performance and user experience. We design apps that bring your ideas to life across iOS and Android with elegant interfaces and robust functionality.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
      features: [
        "iOS & Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store optimization",
        "Push notifications",
        "Analytics integration"
      ]
    },
    {
      id: "social",
      icon: <Share2 size={32} />,
      title: "Social Media Management",
      description: "Build meaningful connections with your audience through smart social strategies. We create engaging content, manage your social presence, and drive measurable results across all platforms.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80",
      features: [
        "Content creation & scheduling",
        "Community management",
        "Social media strategy",
        "Paid ad campaigns",
        "Analytics & reporting",
        "Influencer partnerships"
      ]
    },
    {
      id: "video",
      icon: <Video size={32} />,
      title: "Video & Content Creation",
      description: "From dynamic promotional videos to creative visuals and branded posts, we craft content that captures attention and tells your story with impact.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80",
      features: [
        "Promotional videos",
        "Social media content",
        "Product demonstrations",
        "Brand storytelling",
        "Motion graphics",
        "Video editing & post-production"
      ]
    },
    {
      id: "branding",
      icon: <Palette size={32} />,
      title: "Branding & Graphic Design",
      description: "Stand out with strong visual identity. We design logos, brand kits, and marketing assets that reflect your brand's personality and make a lasting impression.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80",
      features: [
        "Logo design",
        "Brand identity development",
        "Marketing materials",
        "Social media graphics",
        "Print & digital design",
        "Brand guidelines"
      ]
    },
    {
      id: "strategy",
      icon: <TrendingUp size={32} />,
      title: "Digital Strategy Consulting",
      description: "We help you plan your digital roadmap—aligning your goals with the right tools, technologies, and marketing strategies to grow your online presence.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      features: [
        "Digital roadmap planning",
        "Technology consulting",
        "Marketing strategy",
        "Growth planning",
        "Analytics & insights",
        "Competitive analysis"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: <Monitor size={24} />,
      title: "Tailored Creativity",
      description: "Unlike generic agencies, we craft every project from scratch to match your unique goals and brand identity."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Integrated Tech & Design",
      description: "We combine technical expertise with bold design thinking, ensuring everything we build is both functional and beautiful."
    },
    {
      icon: <Share2 size={24} />,
      title: "All-in-One Team",
      description: "Our in-house experts handle everything — from web and app development to branding and social media — so you don't need multiple agencies."
    },
    {
      icon: <Video size={24} />,
      title: "Results That Matter",
      description: "We focus on measurable outcomes: conversions, engagement, and growth, not just visuals or likes."
    },
    {
      icon: <Palette size={24} />,
      title: "Ongoing Support",
      description: "We stay with you after launch — offering updates, maintenance, and performance tracking to ensure lasting success."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Creative Innovation",
      description: "We stay ahead of trends and technology, constantly innovating to give our clients the edge over competitors."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Our Services</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Empowering brands through design, technology, and creativity.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow animate-fade-in animation-delay-200"
            >
              Book a Service
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">What We Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive sound and lighting solutions for any event
            </p>
          </div>
          
          {mainServices.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-20 last:mb-0 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-full lg:w-1/2">
                <div className="glassmorphism p-1 rounded-2xl h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="object-cover w-full h-full aspect-video lg:aspect-auto transition-transform duration-10000 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="text-psyco-green-DEFAULT mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <div className="bg-psyco-black-light rounded-xl p-6">
                  <h4 className="text-lg font-medium text-white mb-4">{service.id === 'sound' ? 'Our Equipment:' : 'What\'s Included:'}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="text-psyco-green-DEFAULT mt-1 mr-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66675 10.1148L12.7947 3.98608L13.7381 4.92875L6.66675 12.0001L2.42675 7.76008L3.36941 6.81741L6.66675 10.1148Z" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Us vs Them</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What makes Vexa Plus stand out in the digital world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glassmorphism p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make Your Event Exceptional?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Our team of experts is ready to help you plan and execute the perfect audio-visual experience for your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-vexa-orange-DEFAULT hover:bg-vexa-orange-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Contact Us
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="bg-transparent border border-vexa-orange-DEFAULT text-vexa-orange-DEFAULT hover:bg-vexa-orange-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
