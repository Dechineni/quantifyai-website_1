import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
  FiBarChart2,
  FiShield,
  FiFileText,
  FiCode,
} from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaRobot } from "react-icons/fa";
import { ROUTES } from "../routes";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Service data (you can move this to a separate data file)
  const servicesData = {
    "questionnaire-development": {
      id: "questionnaire-development",
      title: "Questionnaire Development",
      description: "Crafting intuitive, engaging surveys with clear objectives and logical flow.",
      fullDescription: "Our expert team designs questionnaires that yield high-quality, actionable data. We specialize in creating surveys that engage respondents while gathering precise data for your research needs. With years of experience in market research methodology, we ensure your surveys are scientifically sound and practically effective.",
      icon: <FiFileText className="text-3xl" />,
      gradient: "from-blue-500 to-cyan-400",
      color: "blue",
      features: [
        { icon: <FiCheck />, title: "Custom Question Design", description: "Tailored questions for specific research objectives" },
        { icon: <FiTrendingUp />, title: "Advanced Logic & Branching", description: "Complex skip patterns and survey flow optimization" },
        { icon: <FiGlobe />, title: "Multilingual Capabilities", description: "Translation and cultural adaptation services" },
        { icon: <FiClock />, title: "Mobile Optimization", description: "Responsive designs for all devices" },
        { icon: <FiUsers />, title: "Pre-testing Services", description: "Cognitive debriefing and pilot studies" },
        { icon: <FiShield />, title: "Quality Assurance", description: "Comprehensive review and testing protocols" },
      ],
      stats: [
        { value: "2500+", label: "Projects Completed" },
        { value: "99%", label: "Client Satisfaction" },
        { value: "24-48h", label: "Average Turnaround" },
      ],
      process: [
        "Requirement Analysis & Research Design",
        "Questionnaire Drafting & Structure Planning",
        "Cognitive Testing & Iteration",
        "Multilingual Translation & Localization",
        "Final Review & Quality Assurance",
        "Client Approval & Delivery",
      ],
      benefits: [
        "Higher response rates through engaging design",
        "Improved data quality with precise question wording",
        "Reduced survey fatigue through optimal flow",
        "Cross-cultural validity with proper translation",
        "Mobile-friendly design for broader reach",
      ],
    },
    "survey-programming": {
      id: "survey-programming",
      title: "Survey Programming",
      description: "Precision programming with cutting-edge tools for seamless functionality.",
      fullDescription: "We ensure seamless functionality across all devices with real-time testing and quality assurance protocols. Our programming experts deliver robust, error-free surveys that capture data with precision and reliability.",
      icon: <FiCode className="text-3xl" />,
      gradient: "from-purple-500 to-pink-500",
      color: "purple",
      features: [
        { icon: <FiCode />, title: "Complex Logic Programming", description: "Advanced skip patterns and conditional logic" },
        { icon: <FiTrendingUp />, title: "Multimedia Integration", description: "Video, audio, and image support in surveys" },
        { icon: <FiGlobe />, title: "API Connectivity", description: "Seamless integration with external systems" },
        { icon: <FiClock />, title: "Real-time Testing", description: "Continuous quality assurance during development" },
        { icon: <FiShield />, title: "Security Protocols", description: "Data protection and privacy compliance" },
        { icon: <FiCheck />, title: "Cross-device Compatibility", description: "Optimized for all platforms and devices" },
      ],
      stats: [
        { value: "1200+", label: "Surveys Programmed" },
        { value: "99.9%", label: "Error-free Delivery" },
        { value: "12-30 Minutes", label: "Average Development Time" },
      ],
    },
    // Add other services similarly...
  };

  const dataQualityData = {
    "social-verification": {
      title: "Social Media Verification",
      description: "Recruitment through Facebook + LinkedIn with comprehensive profile validation",
      icon: <div className="flex gap-2"><FaFacebookF /><FaLinkedinIn /></div>,
      gradient: "from-blue-500 to-cyan-400",
    },
    // Add other data quality features...
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      if (serviceId.startsWith("data-quality")) {
        const featureId = serviceId.split("#")[1];
        setService(dataQualityData[featureId]);
      } else {
        setService(servicesData[serviceId]);
      }
      setLoading(false);
    }, 500);
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className={`relative py-20 bg-gradient-to-r ${service.gradient}`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-white mb-8 hover:text-blue-200">
            <FiArrowLeft /> Back to Services
          </Link>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              {service.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {service.title}
              </h1>
              <p className="text-xl text-white/80">{service.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {service.fullDescription}
              </p>
              
              {service.process && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Our Process</h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{step}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Key Metrics</h3>
              <div className="space-y-4">
                {service.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-2xl bg-gray-800/50">
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            {service.benefits && (
              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="glass-card rounded-3xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-gray-400 mb-6">
                Contact us to discuss how we can help with your research needs.
              </p>
              <Link
                to={ROUTES.contact}
                className="inline-block w-full py-3 rounded-xl gradient-bg text-white font-semibold hover:shadow-xl transition-all duration-300"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
