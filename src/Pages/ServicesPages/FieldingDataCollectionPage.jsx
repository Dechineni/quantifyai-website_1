// pages/services/fielding-data-collection.jsx
import { FiUsers, FiCheckCircle, FiGlobe, FiTrendingUp, FiChevronRight, FiShield, FiMonitor, FiTarget, FiClock, FiMapPin, FiDatabase } from 'react-icons/fi';
import { MdOutlineSpeed, MdOutlineGroupWork } from 'react-icons/md';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { ROUTES } from '../../routes';

export default function FieldingDataCollectionPage() {
  useDocumentMeta({
    title: "Fraud-Free Survey Data in California | QuantifyAI",
    description:
      "QuantifyAI delivers fraud-free survey data in California with verified B2B and B2C respondents, AI-powered fielding, and accurate market insights worldwide now.",
  });
  const service = {
    id: "fielding-data-collection",
    icon: <FiUsers className="text-4xl" />,
    title: "Fielding & Data Collection",
    tagline: "Access to Social Media Verified participants across 48 global markets",
    description: "Our proprietary Opinion Elite panel delivers high-quality, diverse respondents with stringent validation processes and real-time monitoring for reliable data collection.",
    
    features: [
      {
        icon: <FiGlobe />,
        title: "B2B + B2C Global Audiences",
        description: "Access to diverse professional and consumer respondents worldwide"
      },
      {
        icon: <FiMonitor />,
        title: "Real-time Field Monitoring",
        description: "Live dashboard tracking of response rates, quotas, and data quality"
      },
      {
        icon: <HiOutlineDocumentCheck />,
        title: "Quality Control Protocols",
        description: "Multi-stage validation including AI-powered fraud detection"
      },
      {
        icon: <MdOutlineGroupWork />,
        title: "Multi-mode Data Collection",
        description: "Online, mobile, CATI, and in-person methodologies available"
      },
      {
        icon: <MdOutlineSpeed />,
        title: "Incident Rate Optimization",
        description: "Proactive management to maintain optimal completion rates"
      },
      {
        icon: <FiDatabase />,
        title: "Panel Management",
        description: "Active engagement strategies and panel health monitoring"
      }
    ],
    
    stats: [
      { 
        icon: <FiUsers className="text-3xl" />, 
        // value: "10M+", 
        // value: "Global", 
        value: "Global", 
        label: "Verified Participants",
        description: "Active panel members globally"
      },
      { 
        icon: <FiGlobe className="text-3xl" />, 
        value: "48", 
        label: "Global Markets",
        description: "Countries with local fielding teams"
      },
      { 
        icon: <FiTrendingUp className="text-3xl" />, 
        value: "99%", 
        label: "Completion Rate",
        description: "Average study completion"
      }
    ],
    
    validationProcess: [
      {
        step: "Identity Verification",
        methods: ["LinkedIn/Facebook API", "Professional Email", "Phone Verification"],
        icon: <FiShield />
      },
      {
        step: "Profile Validation",
        methods: ["Employment Verification", "Professional Credentials", "Industry Validation"],
        icon: <HiOutlineDocumentCheck />
      },
      {
        step: "AI Fraud Monitoring",
        methods: ["Behavioral Analysis", "Pattern Detection", "Real-time Screening"],
        icon: <MdOutlineSpeed />
      },
      {
        step: "Quality Assurance",
        methods: ["Response Consistency", "Attention Checks", "Speed Monitoring"],
        icon: <FiMonitor />
      }
    ],
    
    cta: {
      text: "Start Your Data Collection",
      link: ROUTES.contact,
      secondary: {
        text: "Request Audience Sample",
        link: "/samples/audience"
      }
    }
  };
  
  const otherServices = [
    {
      title: "Questionnaire Development",
      description: "Crafting intuitive, engaging surveys with clear objectives",
      link: ROUTES.questionnaireDevelopment,
    },
    {
      title: "Survey Programming",
      description: "Precision programming with cutting-edge tools for seamless functionality",
      link: ROUTES.surveyProgramming,
    },
    {
      title: "Data Processing & Analysis",
      description: "Transform raw data into strategic insights with AI",
      link: ROUTES.dataAnalysis,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/10"></div>
        <div className="relative container mx-auto px-4 py-10 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-2xl mb-8 animate-fade-in-up">
              {service.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-white mb-2">{service.title}</span>
              <span className="gradient-text text-2xl">{service.tagline}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to={service.cta.link}
                className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect group relative overflow-hidden"
              >
                <span className="relative z-10">{service.cta.text}</span>
                <div className="absolute inset-0 animate-gradient-flow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              {/* <Link 
                to={service.cta.secondary.link}
                className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <span className="relative z-10">{service.cta.secondary.text}</span>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-2xl mb-6">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Advanced Fielding Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Process Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            4-Stage Validation Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.validationProcess.map((stage, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg mb-4">
                  {stage.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{stage.step}</h3>
                <ul className="space-y-2">
                  {stage.methods.map((method, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                      <span className="text-sm">{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Complete Research Solution
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Combine data collection with our other expert services for comprehensive research support
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((other, index) => (
              <Link 
                key={index}
                to={other.link}
                className="group"
              >
                <div className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:gradient-text transition-all duration-300">
                    {other.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{other.description}</p>
                  {/* <div className="flex items-center text-blue-400 group-hover:text-teal-400 font-semibold transition-colors">
                    <span>Learn More</span>
                    <FiChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="gradient-border max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Start Collecting Quality Data Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Access Social Media Verified respondents across 48 markets with our Opinion Elite panel.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect"
                >
                  Start Your Data Collection
                </Link>
                <Link 
                  to={`${ROUTES.platform}#Opinion Elite`}
                  className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Learn About Opinion Elite
                </Link>
              </div>
              {/* <p className="mt-8 text-gray-400 text-sm">
                Need specific audience targeting? Email us at <a href="mailto:fielding@quantifyai.com" className="text-blue-400 hover:text-teal-400 transition-colors">fielding@quantifyai.com</a>
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
