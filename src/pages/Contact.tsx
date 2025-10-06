import React, { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vexa-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-vexa-orange-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Get In Touch</h1>
            <p className="text-xl text-gray-300 animate-fade-in animation-delay-100">
              Have a project in mind? We'd love to hear from you. Send us a message and let's start creating something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glassmorphism p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-vexa-black-light border border-vexa-orange-DEFAULT/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vexa-orange-DEFAULT transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-vexa-black-light border border-vexa-orange-DEFAULT/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vexa-orange-DEFAULT transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-vexa-black-light border border-vexa-orange-DEFAULT/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vexa-orange-DEFAULT transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-vexa-orange-DEFAULT hover:bg-vexa-orange-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glassmorphism p-6 card-hover animate-fade-in animation-delay-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-vexa-orange-muted rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-vexa-orange-DEFAULT" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                    <p className="text-gray-300">contact@vexaplus.com</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-6 card-hover animate-fade-in animation-delay-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-vexa-orange-muted rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-vexa-orange-DEFAULT" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-6 card-hover animate-fade-in animation-delay-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-vexa-orange-muted rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-vexa-orange-DEFAULT" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                    <p className="text-gray-300">Available Worldwide</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-6 animate-fade-in animation-delay-400">
                <h3 className="text-lg font-medium text-white mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
