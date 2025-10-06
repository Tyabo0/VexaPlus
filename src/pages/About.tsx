import React, { useEffect } from "react";
import { Target, Users, Lightbulb, Award, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions."
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description: "Your success is our success. We work closely with clients as true partners in every project."
    },
    {
      icon: <Target size={32} />,
      title: "Results-Driven",
      description: "Every decision we make is focused on delivering measurable results that matter to your business."
    },
    {
      icon: <Award size={32} />,
      title: "Excellence",
      description: "We're committed to delivering exceptional quality in everything we create, from concept to execution."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vexa-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">About Vexa Plus</h1>
            <p className="text-xl text-gray-300 animate-fade-in animation-delay-100">
              We're a creative digital agency passionate about helping businesses transform their online presence through innovative design and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At Vexa Plus, we believe every business deserves a powerful digital presence that captivates audiences and drives real results. Our mission is to empower businesses with creative solutions that make them stand out in the digital landscape.
              </p>
              <p className="text-gray-300 mb-6">
                We combine strategic thinking, stunning design, and cutting-edge technology to create digital experiences that not only look amazing but deliver measurable impact. From startups to established brands, we're committed to helping our clients succeed.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-vexa-orange-DEFAULT hover:text-vexa-orange-light transition-colors font-medium"
              >
                Work with us
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="glassmorphism p-8 animate-fade-in animation-delay-100">
              <div className="aspect-video bg-vexa-black-DEFAULT rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 bg-vexa-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-vexa-orange-muted rounded-full mb-4">
                  <div className="text-vexa-orange-DEFAULT">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Our Creative Approach</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A proven process that delivers exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description: "We start by understanding your business, goals, and target audience to create a tailored strategy."
              },
              {
                step: "02",
                title: "Design & Development",
                description: "Our team brings your vision to life with stunning designs and robust technical implementation."
              },
              {
                step: "03",
                title: "Launch & Optimize",
                description: "We launch your project and continue optimizing for maximum performance and results."
              }
            ].map((phase, index) => (
              <div 
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl font-bold text-vexa-orange-DEFAULT/20 mb-4">{phase.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                <p className="text-gray-300">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-vexa-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Create Something Amazing Together</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Ready to transform your digital presence? Get in touch and let's discuss how we can help your business thrive.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-vexa-orange-DEFAULT hover:bg-vexa-orange-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              Start Your Project
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
