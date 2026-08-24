// pages/services/questionnaire-development.jsx
import { FiFileText, FiCheckCircle, FiClock, FiTrendingUp, FiChevronRight, FiTarget, FiUsers, FiBarChart2, FiMessageSquare, FiGlobe, FiSmartphone, FiShield } from 'react-icons/fi';
import { MdOutlinePsychology, MdOutlineFormatListBulleted, MdOutlineTranslate } from 'react-icons/md';
import { TbChartBar } from 'react-icons/tb';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { ROUTES } from '../../routes';

export default function QuestionnaireDevelopmentPage() {
  useDocumentMeta({
    title: "B2B Survey Panel Provider in California | QuantifyAI",
    description:
      "Looking for a B2B survey panel provider in California? QuantifyAI offers AI-optimized survey design and verified respondent access for brands and agencies fast.",
  });
  const service = {
    id: "questionnaire-development",
    icon: <FiFileText className="text-4xl" />,
    title: "Questionnaire Development",
    tagline: "Crafting intuitive, engaging surveys with clear objectives and logical flow",
    description: "Our expert team designs questionnaires that yield high-quality, actionable data. We specialize in creating surveys that engage respondents while gathering precise data for your research needs.",
    
    fullDescription: "We transform complex research questions into effective, respondent-friendly surveys. Our questionnaire development process combines psychological principles, industry best practices, and advanced methodology to create instruments that maximize response quality and minimize bias. From concept to final draft, we ensure every question serves a clear purpose and contributes to your research objectives.",
    
    features: [
      {
        icon: <FiTarget />,
        title: "Custom Question Design & Logic",
        description: "Tailored questions aligned with specific research objectives"
      },
      {
        icon: <MdOutlineFormatListBulleted />,
        title: "Advanced Skip Patterns & Branching",
        description: "Intelligent routing based on respondent answers"
      },
      {
        icon: <MdOutlineTranslate />,
        title: "Multilingual Survey Capabilities",
        description: "Professional translation and cultural adaptation"
      },
      {
        icon: <FiSmartphone />,
        title: "Mobile-Optimized Formats",
        description: "Responsive design for all devices and screen sizes"
      },
      {
        icon: <HiOutlineLightBulb />,
        title: "Pre-testing & Pilot Studies",
        description: "Validation through cognitive interviews and pilot testing"
      },
      {
        icon: <MdOutlinePsychology />,
        title: "Cognitive Debriefing",
        description: "Understanding how respondents interpret questions"
      }
    ],
    
    stats: [
      { 
        icon: <FiCheckCircle className="text-3xl" />, 
        value: "2500+", 
        label: "Projects Completed",
        description: "Successful questionnaire designs"
      },
      { 
        icon: <FiTrendingUp className="text-3xl" />, 
        value: "99%", 
        label: "Accuracy Rate",
        description: "Data quality assurance"
      },
      { 
        icon: <FiClock className="text-3xl" />, 
        value: "24-48h", 
        label: "Turnaround Time",
        description: "Average development timeline"
      }
    ],
    
    questionTypes: [
      {
        category: "Closed-Ended Questions",
        examples: ["Multiple Choice", "Rating Scales", "Likert Scales", "Matrix Questions"],
        icon: <TbChartBar />
      },
      {
        category: "Open-Ended Questions",
        examples: ["Text Responses", "Comment Boxes", "Essay Questions", "Verbatim Feedback"],
        icon: <FiMessageSquare />
      },
      {
        category: "Advanced Question Types",
        examples: ["Conjoint Analysis", "MaxDiff", "TURF Analysis", "Discrete Choice"],
        icon: <FiBarChart2 />
      },
      {
        category: "Interactive Elements",
        examples: ["Image Selection", "Drag & Drop", "Slider Scales", "Audio/Video Response"],
        icon: <FiSmartphone />
      }
    ],
    
    process: [
      { 
        step: 1, 
        title: "Research Objectives", 
        description: "Define clear goals and key information needs",
        duration: "2-4 hours",
        icon: <FiTarget />
      },
      { 
        step: 2, 
        title: "Questionnaire Framework", 
        description: "Develop structure and logical flow",
        duration: "4-8 hours",
        icon: <FiFileText />
      },
      { 
        step: 3, 
        title: "Question Design", 
        description: "Craft clear, unbiased questions",
        duration: "6-12 hours",
        icon: <MdOutlinePsychology />
      },
      { 
        step: 4, 
        title: "Logic & Branching", 
        description: "Implement skip patterns and routing",
        duration: "4-8 hours",
        icon: <MdOutlineFormatListBulleted />
      },
      { 
        step: 5, 
        title: "Testing & Refinement", 
        description: "Cognitive testing and pilot validation",
        duration: "4-8 hours",
        icon: <HiOutlineLightBulb />
      },
      { 
        step: 6, 
        title: "Final Delivery", 
        description: "Complete questionnaire ready for programming",
        duration: "2-4 hours",
        icon: <FiCheckCircle />
      }
    ],
    
    cta: {
      text: "Start Your Questionnaire Design",
      link: ROUTES.contact,
      secondary: {
        text: "Download Questionnaire Template",
        link: "/templates/questionnaire"
      }
    }
  };
  
  const otherServices = [
    {
      title: "Survey Programming",
      description: "Precision programming with cutting-edge tools",
      link: ROUTES.surveyProgramming,
    },
    {
      title: "Fielding & Data Collection",
      description: "Access to Social Media Verified participants globally",
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
            <div className="inline-flex items-center justify-center w-20 h-20 glass-card rounded-2xl mb-8 animate-fade-in-up">
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
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-6">
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

      {/* Question Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Comprehensive Question Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.questionTypes.map((type, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg mb-4">
                  {type.icon}
                </div>


                 {/* <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                  {type.icon}
                      </div> */}






                <h3 className="text-xl font-bold mb-4 text-white">{type.category}</h3>
                <ul className="space-y-2">
                  {type.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                      <span className="text-sm">{example}</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Advanced Development Capabilities
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Combining methodology expertise with respondent psychology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:translate-y-2 animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-14 h-14 gradient-bg rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our 6-Step Development Process
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-400 hidden lg:block -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {service.process.map((step, index) => (
                <div key={step.step} className={`relative flex flex-col lg:flex-row items-center lg:items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2">
                    <div className={`glass-card rounded-3xl p-8 relative ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                      <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="mt-4">
                        {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg mb-4">
                          {step.icon}
                        </div> */}
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
            Combine questionnaire development with our other expert services
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
                Ready to Design Your Perfect Survey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let us craft a questionnaire that delivers the insights you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 glow-effect"
                >
                  Start Your Questionnaire
                </Link>
                <Link 
                  to={ROUTES.contact}
                  className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Schedule a Consultation
                </Link>
              </div>
              {/* <p className="mt-8 text-gray-400 text-sm">
                Need a quick quote? Email us at <a href="mailto:questionnaire@quantifyai.com" className="text-blue-400 hover:text-teal-400 transition-colors">questionnaire@quantifyai.com</a>
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
