// pages/services/data-analysis.jsx
import { FiBarChart2, FiCheckCircle, FiTrendingUp, FiZap, FiChevronRight, FiPieChart, FiFilter, FiCpu, FiEye, FiTarget, FiClock, FiDatabase } from 'react-icons/fi';
import { TbChartLine } from 'react-icons/tb';
import { MdOutlineInsights, MdOutlineAnalytics } from 'react-icons/md';
import { AiOutlineRocket } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { ROUTES } from '../../routes';

export default function DataAnalysisPage() {
  useDocumentMeta({
    title: "Market Segmentation Analysis in California | QuantifyAI",
    description:
      "QuantifyAI specializes in market segmentation analysis in California — AI-powered data processing, clean verified datasets, and actionable insights for decisions.",
  });
  const service = {
    id: "data-analysis",
    icon: <FiBarChart2 className="text-4xl" />,
    title: "Data Processing & Analysis",
    tagline: "Transform raw data into strategic insights with AI-powered analytics",
    description: "Our analytics team employs advanced statistical methods and AI-powered tools to uncover deep market intelligence and actionable insights for data-driven decision making.",
    
    features: [
      {
        icon: <MdOutlineAnalytics />,
        title: "Advanced Statistical Analysis",
        description: "Regression, factor analysis, conjoint, TURF, max diff, and more"
      },
      {
        icon: <AiOutlineRocket />,
        title: "AI-Powered Insight Generation",
        description: "Machine learning algorithms for pattern recognition and prediction"
      },
      {
        icon: <FiPieChart />,
        title: "Interactive Dashboards",
        description: "Real-time visualization tools for ongoing data monitoring"
      },
      {
        icon: <TbChartLine />,
        title: "Predictive Modeling",
        description: "Forecasting and scenario analysis for strategic planning"
      },
      {
        icon: <FiFilter />,
        title: "Data Visualization",
        description: "Clear, compelling charts and infographics for stakeholder communication"
      },
      {
        icon: <MdOutlineInsights />,
        title: "Strategic Recommendations",
        description: "Actionable insights tied directly to business objectives"
      }
    ],
    
    stats: [
      { 
        icon: <FiDatabase className="text-3xl" />, 
        value: "10K+", 
        label: "Insights Generated",
        description: "Annual strategic insights delivered"
      },
      { 
        icon: <FiZap className="text-3xl" />, 
        value: "Real-time", 
        label: "Analysis Speed",
        description: "Live data processing capability"
      },
      { 
        icon: <FiTrendingUp className="text-3xl" />, 
        value: "99%", 
        label: "Accuracy Rate",
        description: "Statistical validity assurance"
      }
    ],
    
    methodologies: [
      {
        category: "Descriptive Analytics",
        techniques: ["Frequency Analysis", "Cross-tabulation", "Descriptive Statistics", "Data Profiling"],
        icon: <FiBarChart2 />
      },
      {
        category: "Advanced Analytics",
        techniques: ["Regression Analysis", "Factor Analysis", "Cluster Analysis", "Conjoint Analysis"],
        icon: <MdOutlineAnalytics />
      },
      {
        category: "Predictive Analytics",
        techniques: ["Forecast Modeling", "Scenario Analysis", "Predictive Scoring", "Trend Analysis"],
        icon: <TbChartLine />
      },
      {
        category: "AI & Machine Learning",
        techniques: ["Pattern Recognition", "Sentiment Analysis", "Natural Language Processing", "Anomaly Detection"],
        icon: <FiCpu />
      }
    ],
    
    cta: {
      text: "Start Your Data Analysis",
      link: ROUTES.contact,
      secondary: {
        text: "View Sample Reports",
        link: "/samples/analysis"
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
      title: "Fielding & Data Collection",
      description: "Access to Social Media Verified participants across 48 global markets",
      link: ROUTES.fieldingDataCollection,
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
              <div key={index} className="glass-card  flex justify-between items-center p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-2xl mb-6">
                  {stat.icon}
                </div>
                <div> <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div> </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Analytical Methodologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodologies.map((method, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{method.category}</h3>
                <ul className="space-y-2">
                  {method.techniques.map((technique, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <FiCheckCircle className="text-teal-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{technique}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Advanced Analysis Capabilities
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

      {/* Related Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            End-to-End Research Solution
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Complete your research journey with our integrated service offerings
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
                Transform Your Data Into Actionable Intelligence
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Leverage advanced analytics and AI to uncover insights that drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect"
                >
                  Start Your Analysis
                </Link>
                <Link 
                  to={`${ROUTES.solutions}#analytics`}
                  className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View Analytics Solutions
                </Link>
              </div>
              {/* <p className="mt-8 text-gray-400 text-sm">
                Have existing data to analyze? Email us at <a href="mailto:analytics@quantifyai.com" className="text-blue-400 hover:text-teal-400 transition-colors">analytics@quantifyai.com</a>
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
