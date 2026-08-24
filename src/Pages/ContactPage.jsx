import { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset
} from 'react-icons/fa';
import { FiSend, FiUser, FiMail, FiBriefcase, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import HeroBg from "../assets/imgs/hero-bg2.png";
import useDocumentMeta from '../hooks/useDocumentMeta';

const ContactPage = () => {
  useDocumentMeta({
    title: "Contact QuantifyAI | AI Market Research Solutions",
    description:
      "As a trusted market research panel provider with verified respondents, QuantifyAI ensures fraud-free data, global panel access, and accurate B2B & B2C insights.",
  });
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const services = [
    'Quantitative Research',
    'AI Analytics',
    'Market Intelligence',
    'Data Consulting',
    'Panel Management',
    'Custom Solutions'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://quantifyaiapi.mavenerp.in/public/api/contact/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success
      setSubmitSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
      setSelectedService('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="contact"
      className="relative w-full min-h-screen py-22 md:py-30"
      style={{
        background: `linear-gradient(135deg, 
          rgba(10, 25, 47, 0.95) 0%,
          rgba(15, 32, 58, 0.92) 50%,
          rgba(20, 40, 70, 0.89) 100%),
          url(${HeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6 shadow-lg">
            <FaHeadset className="text-white text-lg" />
            <span className="text-white font-semibold tracking-wide">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">QuantifyAI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can transform your data into actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4 shadow-lg">
                  <FaPhone className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <a href="tel:+18586921325" className="text-gray-300 hover:text-cyan-400 transition-colors text-lg font-medium block">
                  +1 (858) 692-1325
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a href="mailto:RFQ@QUANTIFYAI.CO" className="text-gray-300 hover:text-purple-400 transition-colors text-lg font-medium block">
                  RFQ@QUANTIFYAI.CO
                </a>
              </div>
            </div>

            {/* Global Presence */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                  <FiGlobe className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-white">Global Presence</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { location: 'San Diego, USA', flag: '🇺🇸', timezone: 'PST' },
                  { location: 'Bangalore, India', flag: '🇮🇳', timezone: 'IST' },
                  { location: 'London, UK', flag: '🇬🇧', timezone: 'GMT' },
                  { location: 'San Francisco, USA', flag: '🇺🇸', timezone: 'PST' }
                ].map((office, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-blue-500">{office.flag}</span>
                      <div>
                        <p className="text-white font-medium">{office.location}</p>
                        <p className="text-gray-400 text-sm">{office.timezone}</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <FaClock className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-white">Business Hours</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <span className="text-cyan-300">Emergency Support</span>
                  <span className="text-cyan-400 font-semibold">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10">
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <FaCheckCircle className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-8">
                      Thank you for contacting QuantifyAI. Our team will reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Send us a message</h2>
                      <p className="text-gray-400">Fill out the form below and we'll get back to you promptly.</p>
                    </div>

                    {submitError && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                        <p className="text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiUser className="text-gray-500" />
                            </div>
                            <input
                              type="text"
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiMail className="text-gray-500" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="john@company.com"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Company *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <HiOutlineBuildingOffice2 className="text-gray-500" />
                            </div>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Your Company"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaPhone className="text-gray-500 text-sm" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-3">
                          Service Interested In
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleServiceSelect(service)}
                              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                selectedService === service
                                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Message *
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <FiMessageSquare className="text-gray-500" />
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Tell us about your project, challenges, or questions..."
                            required
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="text-lg" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <p className="text-gray-500 text-sm text-center">
                        By submitting this form, you agree to our Privacy Policy
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-gray-400 text-sm mt-1">Support</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">2h</div>
                <div className="text-gray-400 text-sm mt-1">Avg Response</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
                <div className="text-gray-400 text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick FAQ */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quick Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Common questions about working with QuantifyAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What's your typical response time?",
                a: "We respond to all inquiries within 2 business hours during PST working hours."
              },
              {
                q: "Do you offer free consultations?",
                a: "Yes, we offer a complimentary 30-minute consultation for all new clients."
              },
              {
                q: "What industries do you serve?",
                a: "We work with clients across tech, finance, healthcare, retail, and more."
              },
              {
                q: "Is my data secure?",
                a: "We implement enterprise-grade security with SOC2 compliance and GDPR adherence."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-colors">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 text-white"></span>
                  {item.q}
                </h3>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;