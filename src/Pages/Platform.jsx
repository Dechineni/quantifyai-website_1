import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  BiBriefcase, BiBuilding, BiCheckCircle, BiChevronRight, 
  BiGlobe, BiShield, BiTrendingUp, BiUserCheck, BiWrench,
  BiBarChartAlt2, BiData, BiTargetLock, BiWorld, BiUserVoice,
  BiLineChart, BiPieChartAlt2, BiMedal, BiStar
} from 'react-icons/bi';
import { FaUserSecret, FaUsers, FaIndustry, FaChartLine, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { MdVerifiedUser, MdOutlineSecurity, MdGroups, MdPublic } from 'react-icons/md';
import { Link } from 'react-router-dom';
import HeroBg from "../assets/imgs/hero-bg2.png";
import useDocumentMeta from '../hooks/useDocumentMeta';
import { ROUTES } from '../routes';


const Platform = () => {
  useDocumentMeta({
    title: "B2B Survey Panel Provider in California | QuantifyAI",
    description:
      "Built for accuracy and scale, QuantifyAI's online survey platform for B2B insights features AI validation, verified panels, and quality data for businesses now.",
  });
  const [activeSection, setActiveSection] = useState('overview');
  const refs = {
    overview: useRef(null),
    audiences: useRef(null),
    industries: useRef(null),
    features: useRef(null),
    cta: useRef(null)
  };

  // Animation for elements when in view
  const useScrollAnimation = (ref) => {
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      }
    }, [isInView, controls]);

    return controls;
  };

  const overviewRef = useRef(null);
  const audiencesRef = useRef(null);
  const industriesRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  const overviewControls = useScrollAnimation(overviewRef);
  const audiencesControls = useScrollAnimation(audiencesRef);
  const industriesControls = useScrollAnimation(industriesRef);
  const featuresControls = useScrollAnimation(featuresRef);
  const statsControls = useScrollAnimation(statsRef);

  // Platform features data
  const platformFeatures = [
    {
      icon: <MdOutlineSecurity className="w-8 h-8" />,
      title: "Identity Verification",
      description: "Verifying respondent identities across LinkedIn + Facebook for authenticity",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "AI Fraud Monitoring",
      description: "AI-powered monitoring ensures engaged and validated respondents",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: <MdPublic className="w-8 h-8" />,
      title: "Global Reach",
      description: "Worldwide audience coverage across 50+ countries",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: <MdVerifiedUser className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous quality checks for reliable data collection",
      gradient: "from-orange-500 to-red-500",
      delay: 0.4
    }
  ];

  // Audiences data
  const audiences = [
    {
      category: "Corporate Functions",
      icon: <BiBuilding className="w-6 h-6" />,
      roles: ["IT", "Sales", "Supply Chain", "HR", "Finance", "Marketing", "Legal", "Procurement"],
      count: "Global",
      color: "blue",
      delay: 0.1
    },
    {
      category: "Business Leaders",
      icon: <BiBriefcase className="w-6 h-6" />,
      roles: ["AI Strategy", "Cybersecurity", "Data Analytics", "Talent Management", "Tech Trends"],
      count: "200K+",
      color: "purple",
      delay: 0.2
    },
    {
      category: "Trades Professionals",
      icon: <BiWrench className="w-6 h-6" />,
      roles: ["Contractors", "HVAC Techs", "Auto Mechanics", "Electricians", "Plumbers"],
      count: "150K+",
      color: "green",
      delay: 0.3
    },
    {
      category: "Consumer Audiences",
      icon: <BiBuilding className="w-6 h-6" />,
      roles: ["Census Reps", "Targeted Zip Codes", "Financial Decision-makers", "Parents", "Homeowners"],
      // count: "10M+",
      count: "Global",
      color: "blue",
      delay: 0.4
    }
  ];

  // Industry expertise
  const industries = [
    { name: "Technology & Software", icon: <BiData />, projects: "2500+" },
    { name: "Healthcare & Pharmaceuticals", icon: <BiMedal />, projects: "850+" },
    { name: "Financial Services", icon: <BiLineChart />, projects: "950+" },
    { name: "Retail & E-commerce", icon: <BiBarChartAlt2 />, projects: "1100+" },
    { name: "Manufacturing & Industrial", icon: <BiTargetLock />, projects: "750+" },
    { name: "Media & Entertainment", icon: <BiUserVoice />, projects: "650+" },
    { name: "Automotive", icon: <BiTrendingUp />, projects: "550+" },
    { name: "Telecommunications", icon: <BiGlobe />, projects: "450+" },
    { name: "Energy & Utilities", icon: <BiStar />, projects: "350+" },
    { name: "Professional Services", icon: <BiBriefcase />, projects: "2000+" },
  ];

  // Stats data
  const stats = [
    { value: "48", label: "Countries Covered", icon: <BiWorld /> },
    { value: "100+", label: "Industries Served", icon: <FaIndustry /> },
    { value: "Global", label: "Verified Panelists", icon: <FaUsers /> },
    { value: "99%", label: "Response Rate", icon: <BiPieChartAlt2 /> },
    { value: "99%", label: "Data Accuracy", icon: <BiCheckCircle /> },
    { value: "24/7", label: "Support Available", icon: <BiShield /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };



  return (
    <div className=" relative min-h-screen text-white md:py-0 py-13"
    style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%), 
                              radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%), 
                              url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
      {/* Navigation */}
      {/* <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                QuantifyAI
              </span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features' },
                { id: 'audiences', label: 'Audiences' },
                { id: 'industries', label: 'Industries' },
                { id: 'stats', label: 'Stats' },
                { id: 'cta', label: 'Get Started' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30' 
                      : 'hover:bg-gray-800/50 hover:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Get In Touch
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header> */}

      {/* Hero Section */}
      <section 
        ref={refs.overview}
        className="md:pt-32 pt-12  pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={overviewRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={overviewControls}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 mb-8"
            >
              <BiStar className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Proprietary Platform</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Opinion Elite
              </span>
              <br />
              <span className="text-5xl md:text-5xl text-gray-300">Platform</span>
            </h1>
            
            <p className="text-md md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-center text-normal leading-relaxed">
              We're redefining industry standards with an intense focus on data quality. 
              Connect with verified B2B + B2C audiences worldwide through our proprietary panel.
            </p>
            
     
          </motion.div>
        </div>
      </section>

      {/* Platform Features */}
      <section 
        ref={refs.features}
        className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            ref={featuresRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={featuresControls}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Platform <span className="text-blue-400">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with cutting-edge technology to ensure the highest data quality standards
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                className="group relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 h-full"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Audiences Section */}
      <section 
        ref={refs.audiences}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={audiencesRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={audiencesControls}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Target <span className="text-purple-400">Audiences</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From corporate leaders to everyday consumers, we specialize in recruiting diverse audiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={audiencesControls}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-${audience.color}-500/50 transition-all duration-300 h-full`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500`}>
                      {audience.icon}
                    </div>
                    {/* <span className={`text-2xl font-bold text-${audience.color}-400`}>
                      {audience.count}
                    </span> */}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{audience.category}</h3>
                  
                  <ul className="space-y-3 mb-6">
                    {audience.roles.map((role, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-gray-400">
                        <div className={`w-2 h-2 rounded-full bg-${audience.color}-500`}></div>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                 
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={refs.stats}
        className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            ref={statsRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={statsControls}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              By The <span className="text-cyan-400">Numbers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trusted by industry leaders worldwide for our reliable data and insights
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsControls}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 text-center h-full">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section 
        ref={refs.industries}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={industriesRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={industriesControls}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Industry <span className="text-green-400">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Supporting research needs across diverse industries and global markets
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={industriesControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center gap-6"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="bg-gradient-to-br md:flex-col flex gap-3 justify-between from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300 h-full"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-green-500">
                      {industry.icon}
                    </div>
                    <div className="text-sm font-semibold">{industry.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Projects Completed</div>
                    <div className="text-2xl font-bold text-green-400">{industry.projects}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={refs.cta}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-12 text-center shadow-2xl shadow-blue-900/20">
              <h2 className="text-2xl md:text-5xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform</span> Your Research?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Connect with verified audiences across the globe. Get actionable insights with our premium panel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
               {/* <Link to="/contact"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 60px -15px rgba(59, 130, 246, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex-1 sm:flex-none"
                >
                  Start Free Trial
                </Link> */}
                <Link to={ROUTES.contact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex-1 sm:flex-none"
                >
                  Schedule Demo
                </Link>
              </div>
              
              <div className="flex items-start md:flex-row flex-col gap-2 justify-center space-x-8 text-sm text-gray-500">
                {/* <div className="flex items-center space-x-2">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                  <span>No credit card required</span>
                </div> */}
                <div className="flex items-center space-x-2">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                  <span> Free IR check</span>
                </div>
                <div className="flex items-center space-x-2">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default Platform;
