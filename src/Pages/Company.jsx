import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  BiChevronRight, BiCheckCircle, BiTrendingUp, BiBarChartAlt2, 
  BiUser, BiBriefcase, BiGlobe, BiShield, BiAward, BiStar,
  BiChart, BiCalendarCheck, BiMedal, BiRocket, BiTargetLock,
  BiLineChart, BiPieChartAlt2, BiData, BiUserVoice
} from 'react-icons/bi';
import { 
  FaUsers, FaIndustry, FaChartLine, FaRegHandshake,
  FaQuoteLeft, FaQuoteRight, FaLinkedin, FaTwitter,
  FaAward, FaTrophy, FaCertificate, FaRegSmile,
  FaCheck
} from 'react-icons/fa';
import { 
  MdOutlineGroups, MdOutlineBusinessCenter, MdLocationOn,
  MdOutlineVerifiedUser, MdOutlineCelebration, MdPeople
} from 'react-icons/md';
import Team from '../components/Team';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import HeroBg from "../assets/imgs/hero-bg2.png";
import useDocumentMeta from '../hooks/useDocumentMeta';


// Custom animation hook
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

// Animation variants
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

const Company = () => {
  useDocumentMeta({
    title: "Product market research insights with AI analytics | QuantifyAI",
    description:
      "Get product market research insights with AI analytics from QuantifyAI using verified respondents, survey solutions, and smarter data-driven decisions.",
  });
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const clientsRef = useRef(null);
  const missionRef = useRef(null);
  const ctaRef = useRef(null);

  // Animation controls
  const heroControls = useScrollAnimation(heroRef);
  const statsControls = useScrollAnimation(statsRef);
  const teamControls = useScrollAnimation(teamRef);
  const clientsControls = useScrollAnimation(clientsRef);
  const missionControls = useScrollAnimation(missionRef);
  const ctaControls = useScrollAnimation(ctaRef);

  // Company stats data
  const companyStats = [
    {
      icon: <BiChart className="w-8 h-8" />,
      // value: "10M+",
      value: " Empowering Active Participants",
      label: "Survey Completes",
      description: "Accurate responses collected globally",
      color: "blue",
      delay: 0.1
    },
    {
      icon: <BiGlobe className="w-8 h-8" />,
      value: "50+",
      label: "Countries",
      description: "Global reach across continents",
      color: "green",
      delay: 0.2
    },
    {
      icon: <MdOutlineGroups className="w-8 h-8" />,
      // value: "10M+",
      value: "Global",
      label: "Panelists",
      description: "Verified and engaged respondents",
      color: "cyan",
      delay: 0.3
    },
    {
      icon: <BiBriefcase className="w-8 h-8" />,
      value: "2000+",
      label: "Clients",
      description: "Trusted by leading companies",
      color: "orange",
      delay: 0.4
    },
    {
      icon: <BiAward className="w-8 h-8" />,
      value: "10+",
      label: "Years Experience",
      description: "Industry expertise and knowledge",
      color: "pink",
      delay: 0.5
    },
    {
      icon: <BiBarChartAlt2 className="w-8 h-8" />,
      value: "95%",
      label: "Client Retention",
      description: "Consistent satisfaction rate",
      color: "cyan",
      delay: 0.6
    }
  ];

  // Leadership team data
  const leadershipTeam = [
    {
      name: "Alexandra Chen",
      title: "CEO & Founder",
      bio: "Former McKinsey partner with 15+ years in market research. Founded QuantifyAI to revolutionize data quality standards.",
      expertise: ["Market Research", "Data Strategy", "Business Growth"],
      linkedin: "#",
      imageColor: "from-blue-400 to-cyan-400"
    },
    {
      name: "Marcus Rodriguez",
      title: "Chief Technology Officer",
      bio: "Ex-Google AI engineer specializing in machine learning and fraud detection systems. Leads our AI-powered verification platform.",
      expertise: ["AI/ML", "Fraud Detection", "Platform Architecture"],
      linkedin: "#",
      imageColor: "from-cyan-400 to-pink-400"
    },
    {
      name: "Sarah Johnson",
      title: "Chief Research Officer",
      bio: "PhD in Behavioral Science with 12+ years leading research teams at Nielsen and Ipsos. Ensures methodological rigor.",
      expertise: ["Methodology", "Behavioral Science", "Quality Control"],
      linkedin: "#",
      imageColor: "from-green-400 to-emerald-400"
    },
    {
      name: "David Kim",
      title: "Head of Global Operations",
      bio: "Former operations director at Kantar with expertise in scaling research operations across 30+ countries.",
      expertise: ["Global Operations", "Panel Management", "Client Services"],
      linkedin: "#",
      imageColor: "from-orange-400 to-red-400"
    },
    {
      name: "Priya Patel",
      title: "VP of Client Success",
      bio: "12 years in client relations at Gartner and Forrester. Focused on delivering exceptional value and insights.",
      expertise: ["Client Relations", "Insight Delivery", "Strategic Consulting"],
      linkedin: "#",
      imageColor: "from-indigo-400 to-blue-400"
    },
    {
      name: "James Wilson",
      title: "Head of Data Science",
      bio: "Data scientist with experience at Facebook and Amazon. Leads our analytics and insights generation team.",
      expertise: ["Data Analytics", "Predictive Modeling", "Statistical Analysis"],
      linkedin: "#",
      imageColor: "from-cyan-400 to-teal-400"
    }
  ];

  // Client testimonials
  // Testimonial data
const testimonials = [
  {
    name: "Research Director",
    role: "Political Polling",
    company: null,
    rating: 5,
    text: `We just went through the most intensive period of polling we have ever conducted and included a national sample and several states. QuantifyAI was a true partner in this effort to deliver Sample quickly and efficiently. They were very responsive to any concerns we had. Communication with the team was quick and respectful, which is not always the case with other Sample providers.
      
The samples we obtained were some of the most representative we've ever produced in our 20+ years of doing survey research. Nearly all of the samples had maximum weights that were less than 5, with care paid to obtaining young, people of color, or low income respondents, who are typically harder to obtain. I highly recommend QuantifyAI for your next in-depth survey project.`,
    verified: true,
  },
  {
    name: "Senior Director",
    role: "Consumer Insights",
    company: null,
    rating: 5,
    text: `I've been in the insights industry for over 25 years, and in recent years, securing high-quality sample has become increasingly challenging. The rise of aggregator panels, professional survey takers, bots, and even the use of tools like ChatGPT by respondents has led to a decline in data quality, compromising the integrity of our research. While various technologies aim to detect fraud, they don't address the root issue: the need for genuinely engaged, real panelists and a positive experience for them.
      
Thankfully, Adam and his team at QuantifyAI are bringing meaning back to insights. After years of discarding 30-50% of our sample due to quality issues, we recently completed a strategic study with QuantifyAI and found only 5% of the responses to be problematic. The panelists provided thoughtful, high-quality responses that will guide our organization for years to come.

In addition to the outstanding sample quality, Adam's project management team delivered a seamless experience from start to finish, managing everything from redirect links to quality assurance with precision. Moving forward, QuantifyAI will be our go-to partner for panel sourcing.`,
    verified: true,
  },
  {
    name: "Senior Analyst",
    role: "Research Services",
    company: null,
    rating: 5,
    text: `Working with QuantifyAI has been an incredibly smooth process as each member of the team goes above and beyond to help make our projects successful. They have been instrumental in helping us reach tricky demographics that others would struggle to obtain and are proactive in taking steps to limit the number of fraudulent survey takers in their panels!`,
    verified: true,
  },
];

  // Company timeline/milestones
  const milestones = [
    { year: "2015", event: "Company Founded", description: "QuantifyAI established with focus on data quality" },
    { year: "2017", event: "Opinion Elite Launch", description: "Proprietary panel platform launched" },
    { year: "2019", event: "Global Expansion", description: "Expanded operations to 20+ countries" },
    { year: "2020", event: "AI Verification System", description: "Implemented AI-powered fraud detection" },
    { year: "2022", event: "Major Funding Round", description: "Secured Series B funding for growth" },
    { year: "2023", event: "Industry Awards", description: "Recognized as top market research provider" },
    { year: "2024", event: "Platform 3.0 Launch", description: "Next-gen research platform introduced" }
  ];

  // Trusted by logos (placeholder)
  const trustedLogos = [
    { name: "Fortune 500 Tech", color: "from-blue-500 to-cyan-500" },
    { name: "Global Pharma", color: "from-cyan-500 to-pink-500" },
    { name: "Top Retailer", color: "from-green-500 to-emerald-500" },
    { name: "Leading Bank", color: "from-orange-500 to-red-500" },
    { name: "Media Giant", color: "from-indigo-500 to-blue-500" },
    { name: "Auto Leader", color: "from-cyan-500 to-teal-500" }
  ];

  return (
  
   <div className=" relative min-h-screen text-white md:py-0 py-13"
    style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%), 
                              radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%), 
                              url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}  > 

      {/* Hero Section */}
      <section className="md:pt-32 pt-12  pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            ref={heroRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={heroControls}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30 mb-8"
            >
              <MdOutlineBusinessCenter className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">About Our Company</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                Redefining Data
              </span>
              <br />
              <span className="text-2xl sm:text-4xl md:text-5xl text-gray-300">Through Innovation & Expertise</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              We uphold the highest standards of data quality and reliable insights derived from a diverse and global participant base.
            </p>
            
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all"
              >
                Meet Our Team
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-700 bg-gray-900/50 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:border-blue-500/50 hover:bg-gray-800/50 transition-all"
              >
                View Careers
              </motion.button>
            </div> */}
          </motion.div>
        </div>
      </section>


      {/* Mission & Approach */}
      <section ref={missionRef} className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={missionControls}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 sm:p-12 shadow-2xl shadow-blue-900/20">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Our <span className="text-cyan-400">Approach</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  How we deliver exceptional value to our clients
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: <MdOutlineVerifiedUser className="w-8 h-8" />,
                    title: "Quality First",
                    description: "We uphold the highest standards of data quality with rigorous verification processes"
                  },
                  {
                    icon: <BiTargetLock className="w-8 h-8" />,
                    title: "Custom Solutions",
                    description: "Our services are fully customizable to your specific research needs"
                  },
                  {
                    icon: <MdPeople className="w-8 h-8" />,
                    title: "Expert Collaboration",
                    description: "Our team collaborates with you at every stage of the process"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 mb-6">
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-200">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-200">Expertise That Matters</h3>
                <p className="text-lg text-gray-300 mb-6">
                  With a team of research experts averaging 10+ years of experience, we bring deep knowledge and strategic guidance to each project. 
                  Our approach combines cutting-edge technology with human expertise to deliver actionable insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Data Quality Focus", "Global Reach", "AI-Powered Verification", "Strategic Insights", "Client Collaboration", "Methodological Rigor"].map((skill, idx) => (
                    <div key={idx} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20">
 <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mr-4">
                        <FaCheck className="text-white text-sm " />
                      </div>                      <span className="text-sm text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

   

      {/* Trusted By */}
    <Team />

      {/* Testimonials */}
    <section ref={clientsRef} className="py-16 sm:py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10"></div>

  <div className="container mx-auto px-4 sm:px-6 relative z-10">
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate={clientsControls}
      className="text-center mb-12 sm:mb-16"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        Client <span className="text-orange-400">Testimonials</span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
        Hear from companies that trust us with their research needs 
      </p>
    </motion.div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={clientsControls}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {testimonials.map((t, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -10 }}
          className="group"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-orange-500/30 transition-all duration-300 h-full p-6 sm:p-8">
            <div className="mb-6">
              <FaQuoteLeft className="w-8 h-8 text-orange-500/30 mb-4" />

              {/* ✅ FIX: use t.text (your data) */}
              <p className="text-gray-300 italic mb-6 whitespace-pre-line line-clamp-6">
                {t.text}
              </p>

              {/* <div className="flex items-center mb-2">
                {[...Array(t.rating || 0)].map((_, i) => (
                  <BiStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div> */}

              {/* optional verified badge */}
              {/* {t.verified && (
                <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <BiCheckCircle className="w-4 h-4" />
                  Verified
                </div>
              )} */}
            </div>

            <div className="pt-6 border-t border-gray-800/50">
              {/* ✅ FIX: use t.name + t.role */}
              <div className="font-bold text-gray-200">{t.name}</div>
              <div className="text-sm text-orange-400">{t.role}</div>

              {/* company is null in your data, so show only if exists */}
              {t.company && (
                <div className="text-sm text-gray-500">{t.company}</div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Timeline/Milestones */}
      {/* <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-pink-400">Journey</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Key milestones in our growth and innovation story
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-pink-500"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
                      <div className="text-pink-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <div className="text-gray-200 font-semibold mb-2">{milestone.event}</div>
                      <div className="text-gray-400 text-sm">{milestone.description}</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section ref={ctaRef} className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-gray-900"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={ctaControls}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 sm:p-12 text-center shadow-2xl shadow-blue-900/20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Join <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Our Mission</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Whether you're looking to partner with us or join our growing team, we'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.contact}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px -15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all"
                >
                  Contact Our Team
                </Link>
                 <Link to={ROUTES.contact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-700 bg-gray-900/50 backdrop-blur-sm px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:border-blue-500/50 hover:bg-gray-800/50 transition-all"
                >
                  View Open Positions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

  
    </div>
  );
};

export default Company;
