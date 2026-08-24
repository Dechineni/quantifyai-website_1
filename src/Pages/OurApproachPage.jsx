// pages/OurApproachPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiTarget, 
  FiUsers, 
  FiGlobe, 
  FiShield, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiBarChart2,
  FiClock,
  FiStar,
  FiAward,
  FiHeart,
  FiChevronRight
} from 'react-icons/fi';
import { MdOutlineInsights, MdOutlineAutoGraph, MdOutlineVerified } from 'react-icons/md';
import { TbHandClick } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { ROUTES } from '../routes';

export default function OurApproachPage() {
  useDocumentMeta({
    title: "Global survey panel with fraud detection technology | QuantifyAI",
    description:
      "Backed by a global survey panel with fraud detection technology, QuantifyAI uses AI verification to deliver accurate and trusted research data for businesses.",
  });
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    countries: 0,
    accuracy: 0
  });

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

    animateCounter("projects", 2500);
    setTimeout(() => animateCounter("clients", 250), 300);
    setTimeout(() => animateCounter("countries", 48), 600);
    setTimeout(() => animateCounter("accuracy", 99), 900);
  }, []);

  const missionStatement = "We uphold the highest standards of data quality and reliable insights derived from a diverse and Social Media Verified participants base.";

  const fullDescription = "Our services are fully customizable to your specific research needs and our team collaborates with you at every stage of the process. With a team of research experts averaging 10 years of experience, we bring deep knowledge and strategic guidance to each project.";

  const coreValues = [
    {
      icon: <FiTarget className="text-4xl" />,
      title: "Data Integrity",
      description: "Uncompromising commitment to data accuracy and validity",
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: <FiUsers className="text-4xl" />,
      title: "Client Partnership",
      description: "Collaborative approach focused on your success",
      color: "from-blue-400 to-teal-400"
    },
    {
      icon: <FiGlobe className="text-4xl" />,
      title: "Global Perspective",
      description: "Insights that transcend borders and cultures",
      color: "from-teal-400 to-teal-500"
    },
    {
      icon: <FiShield className="text-4xl" />,
      title: "Ethical Research",
      description: "Responsible practices that protect participants and data",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const methodology = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "Understanding your research objectives and defining clear goals",
      icon: <FiTarget />,
      duration: "1-2 days"
    },
    {
      step: 2,
      title: "Design & Development",
      description: "Creating tailored research instruments and sampling plans",
      icon: <FiBarChart2 />,
      duration: "2-5 days"
    },
    {
      step: 3,
      title: "Data Collection",
      description: "Executing fieldwork with rigorous quality control measures",
      icon: <TbHandClick />,
      duration: "Varies by project"
    },
    {
      step: 4,
      title: "Analysis & Insights",
      description: "Transforming data into actionable strategic insights",
      icon: <MdOutlineInsights />,
      duration: "3-7 days"
    },
    {
      step: 5,
      title: "Reporting & Delivery",
      description: "Presenting findings in clear, compelling formats",
      icon: <MdOutlineAutoGraph />,
      duration: "2-4 days"
    },
    {
      step: 6,
      title: "Strategic Consultation",
      description: "Guiding implementation and measuring impact",
      icon: <FiTrendingUp />,
      duration: "Ongoing"
    }
  ];

  const qualityStandards = [
    {
      title: "AI-Powered Validation",
      description: "Advanced algorithms detect and prevent fraudulent responses",
      icon: <MdOutlineVerified />
    },
    {
      title: "Multi-Layer Verification",
      description: "Multiple identity verification methods ensure respondent authenticity",
      icon: <FiShield />
    },
    {
      title: "Real-Time Monitoring",
      description: "Continuous quality checks throughout data collection",
      icon: <FiClock />
    },
    {
      title: "Statistical Rigor",
      description: "Advanced analytics ensure statistical validity",
      icon: <FiBarChart2 />
    }
  ];

  const teamStats = [
    {
      value: "10+",
      label: "Years Avg. Experience",
      description: "Per research team member",
      icon: <FiStar />
    },
    {
      value: "24/7",
      label: "Support Availability",
      description: "Global client support",
      icon: <FiClock />
    },
    {
      value: "99%",
      label: "Client Satisfaction",
      description: "Based on post-project surveys",
      icon: <FiHeart />
    },
    // {
    //   value: "ISO 20252",
    //   label: "Certified",
    //   description: "International research standards",
    //   icon: <FiAward />
    // }
  ];

  // SVG pattern for background
  const svgPattern = 'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230066ff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black  ">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20  md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/10"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${svgPattern})`, opacity: 0.1 }}></div>
        
        <div className="relative container mx-auto px-8 ">
          <div className="max-w-4xl mx-auto text-center">
            {/* <div className="inline-flex items-center px-5 py-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 mb-8 animate-fadeIn">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                OUR PHILOSOPHY
              </span>
            </div> */}

            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className=" text-white">Our</span> {" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Approach</span>
            </h1>

            <div className="relative max-w-3xl mx-auto mb-10 p-1 rounded-3xl bg-gradient-to-r from-blue-500 to-teal-400">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                    <FiTarget className="text-white text-2xl" />
                  </div>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed text-center mb-6">
                  {missionStatement}
                </p>
                <p className="text-lg text-gray-400 leading-relaxed text-center">
                  {fullDescription}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {counters.projects}+
                </div>
                <p className="text-gray-400 text-sm">Projects Completed</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {counters.clients}+
                </div>
                <p className="text-gray-400 text-sm">Satisfied Clients</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {counters.countries}
                </div>
                <p className="text-gray-400 text-sm">Global Markets</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {counters.accuracy}%
                </div>
                <p className="text-gray-400 text-sm">Data Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="md:py-20 md:px-8  py-10 px-4 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Our Core Values
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            The principles that guide every decision and define our commitment to excellence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 h-full">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/20 px-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Research Methodology
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-24 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {methodology.map((step, index) => (
                <div key={step.step} className="relative" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Connector dots */}
                  <div className="absolute left-1/2 top-24 w-3 h-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full hidden lg:block transform -translate-x-1/2"></div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 mt-12">
                    <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    
                    <div className="mt-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-900/30 text-blue-400 rounded-xl mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <div className="flex items-center text-sm text-blue-400">
                        <FiClock className="mr-2" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="md:py-20 md:px-8  py-10 px-4  ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Uncompromising Quality Standards
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We've built our reputation on delivering data you can trust. Our multi-layered quality assurance process combines human expertise with AI-powered technology to ensure every insight is accurate, reliable, and actionable.
              </p>
              
              <div className="space-y-6">
                {qualityStandards.map((standard, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {standard.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {standard.title}
                      </h3>
                      <p className="text-gray-400">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-blue-500 to-teal-400">
                <div className="bg-gray-900 rounded-3xl p-8">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-teal-900/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">99%</div>
                        <div className="text-white font-semibold">Data Quality Score</div>
                        <div className="text-gray-400 text-sm mt-2">Industry-leading accuracy</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {teamStats.map((stat, index) => (
                      <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-4 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 text-white flex items-center justify-center mr-3">
                            {stat.icon}
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">{stat.value}</div>
                        </div>
                        <div className="text-sm font-semibold text-white">{stat.label}</div>
                        <div className="text-xs text-gray-400">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opinion Elite Showcase */}
      <section className="md:py-20 md:px-8  py-10 px-4  bg-gradient-to-b from-transparent to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-blue-500 to-teal-400">
                <div className="bg-gray-900 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mr-4">
                      <FiUsers className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Opinion Elite</h3>
                      <p className="text-gray-400">Our Proprietary Panel</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Verified Participants</span>
                      <span className="text-white font-bold">1M+</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Global Coverage</span>
                      <span className="text-white font-bold">48 Countries</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Response Rate</span>
                      <span className="text-white font-bold">99%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                The Opinion Elite Advantage
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our proprietary panel connects you with B2B + B2C audiences worldwide. By verifying respondent identities across LinkedIn + Facebook and using AI-powered fraud monitoring, we ensure engaged and truly validated respondents.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Multi-platform identity verification</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">AI-powered fraud detection</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Real-time quality monitoring</span>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Global audience segmentation</span>
                </div>
              </div>
              
              <Link 
                to={ROUTES.platform}
                className="inline-flex items-center mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Learn More About Opinion Elite
                <FiChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="md:py-20 md:px-8  py-10 px-4 ">
        <div className="container mx-auto px-4 text-center">
          <div className="relative max-w-4xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="bg-gray-900 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Experience Our Approach?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust us with their most important research projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  Start Your Project
                </Link>
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-blue-800 text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Schedule a Consultation
                </Link>
              </div>
              {/* <p className="mt-8 text-gray-400 text-sm">
                Have questions about our approach? Email us at <a href="mailto:approach@quantifyai.com" className="text-blue-400 hover:text-teal-400 transition-colors">approach@quantifyai.com</a>
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
