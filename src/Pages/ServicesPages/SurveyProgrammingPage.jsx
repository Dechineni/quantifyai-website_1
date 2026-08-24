// pages/services/survey-programming.jsx
import { FiCode, FiCheckCircle, FiClock, FiTrendingUp, FiChevronRight, FiGlobe, FiShield, FiSmartphone, FiZap, FiLink, FiDatabase } from 'react-icons/fi';
import { RiComputerLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { ROUTES } from '../../routes';

export default function SurveyProgrammingPage() {
  useDocumentMeta({
    title: "Verified Survey Respondents in California | QuantifyAI",
    description:
      "Access verified survey respondents in California with QuantifyAI smart survey programming, skip logic, AI-backed integrity, and device support for B2B brands.",
  });
  const service = {
    id: "survey-programming",
    icon: <FiCode className="text-4xl" />,
    title: "Survey Programming",
    tagline: "Precision programming with cutting-edge tools for seamless functionality",
    description: "We ensure seamless functionality across all devices with real-time testing and quality assurance protocols. Our programming experts deliver robust, error-free surveys that capture accurate data while providing an optimal respondent experience.",
    
    features: [
      {
        icon: <FiCode />,
        title: "Complex Logic Programming",
        description: "Advanced skip patterns, branching, piping, and randomization"
      },
      {
        icon: <FiGlobe />,
        title: "Multimedia Integration",
        description: "Seamless embedding of images, videos, audio, and interactive content"
      },
      {
        icon: <TbApi />,
        title: "API Connectivity & Webhooks",
        description: "Real-time data transfer and integration with your systems"
      },
      {
        icon: <FiZap />,
        title: "Real-time Quality Testing",
        description: "Continuous testing throughout development process"
      },
      {
        icon: <FiSmartphone />,
        title: "Cross-device Compatibility",
        description: "Fully responsive design for mobile, tablet, and desktop"
      },
      {
        icon: <FiShield />,
        title: "Security & Data Protection",
        description: "Enterprise-grade security and GDPR compliance"
      }
    ],
    
    stats: [
      { 
        icon: <FiCheckCircle className="text-3xl" />, 
        value: "2500+", 
        label: "Projects Completed",
        description: "Successfully programmed surveys"
      },
      { 
        icon: <FiTrendingUp className="text-3xl" />, 
        value: "99%", 
        label: "Accuracy Rate",
        description: "Error-free deployment rate"
      },
      { 
        icon: <FiClock className="text-3xl" />, 
        value: "12-30 Minutes", 
        label: "Turnaround Time",
        description: "Average programming timeline"
      }
    ],
    
    technologies: [
      { name: "Decipher", category: "Enterprise Platform" },
      { name: "Qualtrics", category: "Enterprise Platform" },
      { name: "Confirmit", category: "Enterprise Platform" },
      { name: "SurveyMonkey", category: "Platform" },
      { name: "Typeform", category: "Interactive" },
      { name: "JavaScript/React", category: "Custom Solutions" },
      { name: "HTML5/CSS3", category: "Web Standards" },
      { name: "REST APIs", category: "Integration" }
    ],
    
    process: [
      { 
        step: 1, 
        title: "Requirements Analysis", 
        description: "Review questionnaire design and technical specifications",
        duration: "1-2 hours"
      },
      { 
        step: 2, 
        title: "Programming Setup", 
        description: "Configure survey platform and set up project structure",
        duration: "2-3 hours"
      },
      { 
        step: 3, 
        title: "Core Programming", 
        description: "Implement survey logic, routing, and question programming",
        duration: "4-8 hours"
      },
      { 
        step: 4, 
        title: "Quality Assurance", 
        description: "Comprehensive testing across devices and scenarios",
        duration: "2-4 hours"
      },
      { 
        step: 5, 
        title: "Client Review", 
        description: "Staging environment review and feedback implementation",
        duration: "1-2 hours"
      },
      { 
        step: 6, 
        title: "Final Deployment", 
        description: "Launch survey and provide monitoring dashboard",
        duration: "1 hour"
      }
    ],
    
    cta: {
      text: "Start Your Survey Programming",
      link: ROUTES.contact,
      secondary: {
        text: "View Sample Surveys",
        link: "/samples"
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
      title: "Fielding & Data Collection",
      description: "Access to Social Media Verified participants across 48 markets.",
      link: ROUTES.fieldingDataCollection,
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-400 text-white rounded-2xl mb-8 animate-fade-in-up">
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
            Advanced Programming Capabilities
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

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Platform Expertise
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {service.technologies.map((tech, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 50}ms`}}>
                <div className="text-lg font-semibold text-white mb-2">{tech.name}</div>
                <div className="text-sm gradient-text bg-blue-900/30 px-3 py-1 rounded-full inline-block">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Proven Programming Process
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-400 hidden lg:block -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {service.process.map((step, index) => (
                <div key={step.step} className={`relative flex flex-col lg:flex-row items-center lg:items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2">
                    <div className={`glass-card rounded-3xl p-8 relative ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                      <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                        <p className="text-gray-300 mb-4">{step.description}</p>
                        <div className="flex items-center text-sm text-blue-400">
                          <FiClock className="mr-2" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="w-6 h-6 gradient-bg rounded-full border-4 border-gray-900"></div>
                  </div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Complete Research Solution
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Combine survey programming with our other expert services for end-to-end research support
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
                Ready to Program Your Survey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get expert survey programming that ensures flawless functionality and optimal respondent experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect"
                >
                  Start Your Project
                </Link>
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Schedule a Call
                </Link>
              </div>
              {/* <p className="mt-8 text-gray-400 text-sm">
                Need a quick quote? Email us at <a href="mailto:programming@quantifyai.com" className="text-blue-400 hover:text-teal-400 transition-colors">programming@quantifyai.com</a>
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
