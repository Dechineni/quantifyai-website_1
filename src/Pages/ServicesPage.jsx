import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FiFileText,
  FiCode,
  FiUsers,
  FiBarChart2,
  FiCheck,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiPlayCircle,
  FiZap,
  FiFilter,
  FiCpu,
} from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaChartLine, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { ROUTES } from "../routes";

const ServicesPage = () => {
  useDocumentMeta({
    title: "Market Research Services | QuantifyAI",
    description:
      "Explore QuantifyAI's full suite of market research services — questionnaire development, survey programming, fielding, and AI-powered data analysis.",
  });
  const controls = useAnimation();
  const ref = useRef(null);
  const [counters, setCounters] = useState({ markets: 0, participants: 0, quality: 0 });
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Counter animations
  useEffect(() => {
    const animateCounter = (key, end, duration = 2000) => {
      let start = 0;
      const steps = 60;
      const increment = end / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(start),
        }));

        if (start >= end) {
          setCounters(prev => ({
            ...prev,
            [key]: end,
          }));
          clearInterval(timer);
        }
      }, interval);
    };

    animateCounter("markets", 48);
    setTimeout(() => animateCounter("participants", 500), 300);
    setTimeout(() => animateCounter("quality", 99.8), 600);
  }, []);

  const services = [
    {
      id: "questionnaire-development",
      icon: <FiFileText className="text-2xl" />,
      title: "Questionnaire Development",
      description: "Crafting intuitive, engaging surveys with clear objectives and logical flow.",
      fullDescription: "Our expert team designs questionnaires that yield high-quality, actionable data. We specialize in creating surveys that engage respondents while gathering precise data for your research needs.",
      features: [
        "Custom question design & logic",
        "Advanced skip patterns & branching",
        "Multilingual survey capabilities",
        "Mobile-optimized formats",
        "Pre-testing & pilot studies",
        "Cognitive debriefing"
      ],
      gradient: "from-blue-500 to-cyan-400",
      color: "blue",
      stats: { projects: "2000+", accuracy: "99%", time: "24-48h" },
      path: ROUTES.questionnaireDevelopment
    },
    {
      id: "survey-programming",
      icon: <FiCode className="text-2xl" />,
      title: "Survey Programming",
      description: "Precision programming with cutting-edge tools for seamless functionality.",
      fullDescription: "We ensure seamless functionality across all devices with real-time testing and quality assurance protocols. Our programming experts deliver robust, error-free surveys.",
      features: [
        "Complex logic programming",
        "Multimedia integration",
        "API connectivity & webhooks",
        "Real-time quality testing",
        "Cross-device compatibility",
        "Security & data protection"
      ],
      gradient: "from-purple-500 to-pink-500",
      color: "purple",
      stats: { projects: "1200+", accuracy: "99%", time: "12-30 Minutes" },
      path: ROUTES.surveyProgramming
    },
    {
      id: "sample-solutions",
      icon: <FiUsers className="text-2xl" />,
      title: "Fielding & Data Collection",
      description: "Access to Social Media Verified participants across 48 global markets.",
      fullDescription: "Our proprietary Opinion Elite panel delivers high-quality, diverse respondents with stringent validation processes and real-time monitoring.",
      features: [
        "B2B + B2C global audiences",
        "Real-time field monitoring",
        "Quality control protocols",
        "Multi-mode data collection",
        "Incident rate optimization",
        "Panel management"
      ],
      gradient: "from-cyan-500 to-blue-500",
      color: "cyan",
      stats: { participants: "Global", markets: "48", completion: "94%" },
      path: ROUTES.fieldingDataCollection
    },
    {
      id: "data-analysis",
      icon: <FiBarChart2 className="text-2xl" />,
      title: "Data Processing & Analysis",
      description: "Transform raw data into strategic insights with AI-powered analytics.",
      fullDescription: "Our analytics team employs advanced statistical methods and AI-powered tools to uncover deep market intelligence and actionable insights.",
      features: [
        "Advanced statistical analysis",
        "AI-powered insight generation",
        "Interactive dashboards",
        "Predictive modeling",
        "Data visualization",
        "Strategic recommendations"
      ],
      gradient: "from-green-500 to-teal-400",
      color: "green",
      stats: { insights: "10K+", speed: "Real-time", accuracy: "99%" },
      path: ROUTES.dataAnalysis
    }
  ];

  const qualityFeatures = [
    {
      id: "social-verification",
      icon: <div className="flex gap-2">
        <FaFacebookF className="text-blue-400 text-xl" />
        <FaLinkedinIn className="text-blue-300 text-xl" />
      </div>,
      title: "Social Media Verification",
      description: "Recruitment through Facebook + LinkedIn with comprehensive profile validation for authentic respondents.",
      stat: "99.8%",
      label: "Authenticity Rate",
      details: "Dual-platform verification ensures genuine participant profiles",
      path: `${ROUTES.surveyDataQualitySolutions}#social-verification`
    },
    {
      id: "ai-fraud-detection",
      icon: <FiTrendingUp className="text-2xl text-purple-400" />,
      title: "Machine Learning System",
      description: "AI-powered fraud detection and behavioral analysis with continuous learning algorithms.",
      stat: "95%",
      label: "Fraud Prevention",
      details: "Real-time monitoring with adaptive learning algorithms",
      path: `${ROUTES.surveyDataQualitySolutions}#ai-fraud-detection`
    },
    {
      id: "engagement-focus",
      icon: <FiShield className="text-2xl text-green-400" />,
      title: "Advanced Engagement",
      description: "Prioritizing response quality with gamified experiences and optimized interactions.",
      stat: "99%",
      label: "Response Rate",
      details: "Engagement optimization through behavioral science",
      path: `${ROUTES.surveyDataQualitySolutions}#engagement-focus`
    },
    {
      id: "ai-quality",
      icon: <FaRobot className="text-2xl text-cyan-400" />,
      title: "AI-Powered Quality",
      description: "Artificial intelligence monitors response patterns to ensure data integrity.",
      stat: "96%",
      label: "Quality Score",
      details: "Continuous AI monitoring of response patterns",
      path: `${ROUTES.surveyDataQualitySolutions}#ai-quality`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="services" className="relative z-10 py-10 md:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="animate-slide-in-left mb-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center px-5 py-3 rounded-full glass-card mb-8 backdrop-blur-sm"
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3 animate-pulse-glow" />
            <span className="text-sm font-semibold gradient-text">
              QUANTIFYAI RESEARCH SERVICES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">Our</span>{" "}
            <span className="gradient-text animate-typing">Services.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            We're here to help with every step of the research process. Whether you are looking for end-to-end support or ad hoc services, we tailor our approach to best fit your research needs.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            {[
              { value: counters.markets, label: "Global Markets", suffix: "" },
              { value: counters.participants, label: "Active Participants", suffix: "K+" },
              { value: counters.quality, label: "Data Quality", suffix: "%" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="cursor-pointer"
            >
              <Link to={service.path}>
                <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 h-full group relative overflow-hidden">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Service Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-800 opacity-30">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features Preview */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <FiCheck className="text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mt-auto">
                    <span>View Details</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Data Quality Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center px-5 py-3 rounded-full glass-card backdrop-blur-sm mb-6"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3 animate-pulse-glow" />
              <span className="text-sm font-semibold gradient-text">
                DATA QUALITY FOCUS
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Quality
              <span className="block gradient-text">Verification System</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Survey fraud is a constant presence in online research. At QuantifyAI, we built Opinion Elite with an intense focus on panel health and high respondent quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <Link to={feature.path}>
                  <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Animated Icon */}
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                      className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4 mx-auto shadow-xl"
                    >
                      {feature.icon}
                    </motion.div>
                    
                    {/* Stat */}
                    <div className="text-3xl font-bold gradient-text text-center mb-2">
                      {feature.stat}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white text-center mb-3">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-center text-sm mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${
                          index === 0 ? 'from-blue-500 to-cyan-400' :
                          index === 1 ? 'from-purple-500 to-pink-500' :
                          index === 2 ? 'from-green-500 to-teal-400' :
                          'from-cyan-500 to-blue-400'
                        } rounded-full animate-shimmer`}
                        style={{ width: `${parseInt(feature.stat)}%` }}
                      />
                    </div>
                    
                    <div className="text-gray-500 text-xs text-center mt-2">
                      {feature.label}
                    </div>
                    
                    {/* View Details Link */}
                    <div className="mt-4 text-center">
                      <span className="text-blue-400 text-sm font-medium inline-flex items-center gap-1">
                        View Details <FiArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* View All Data Quality Button */}
          <div className="text-center mt-12">
            <Link 
              to={ROUTES.surveyDataQualitySolutions}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-bg text-white font-semibold hover:shadow-xl transition-all duration-300"
            >
              View All Data Quality Features <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        {/* Global Panel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="gradient-border p-1 rounded-3xl">
            <div className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-400/10" />
              
              <div className="relative z-10">
                <FiGlobe className="text-5xl mx-auto mb-6 text-blue-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Opinion Elite Global Panel
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Access to Social Media Verified participants across 48 global markets with our proprietary panel technology.
                </p>
                <Link 
                  to={ROUTES.globalSurveyPanelFraudDetection}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass-card text-white font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Explore Global Panel <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="gradient-border p-1 rounded-3xl">
            <div className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-400/10 animate-pulse" />
              
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 relative z-10">
                Ready to Transform Your Research?
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                Whether you need full-service support or sample-only solutions, we provide the insights to make actionable business decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link 
                  to={ROUTES.contact} 
                  className="px-12 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started <FiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 animate-gradient-flow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <Link 
                  to={ROUTES.solutions}
                  className="px-12 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <FiPlayCircle className="mr-3 text-blue-400" />
                    View All Solutions
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
