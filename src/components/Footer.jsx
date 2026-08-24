// components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiSend,
  FiChevronRight,
  FiArrowUpRight,
} from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import logo from "./../assets/logo.png";
import HeroBg from "../assets/imgs/hero-bg2.png";
import { ROUTES } from "../routes";
import { researchLandingPages } from "../Pages/LandingPages/researchLandingPages";


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Add your subscription logic here
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");

      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const services = [
    {
      name: "Questionnaire Development",
      path: ROUTES.questionnaireDevelopment,
    },
    { name: "Survey Programming", path: ROUTES.surveyProgramming },
    {
      name: "Fielding & Data Collection",
      path: ROUTES.fieldingDataCollection,
    },
    { name: "Data Processing & Analysis", path: ROUTES.dataAnalysis },
  ];

  const quickLinks = [
    { name: "Platform", path: ROUTES.platform },
    { name: "Solutions", path: ROUTES.solutions },
    { name: "Our Approach", path: ROUTES.approach },
    { name: "Company", path: ROUTES.company },
    { name: "Contact", path: ROUTES.contact },
    // { name: 'Careers', path: '/careers' },
    // { name: 'Blog', path: '/blog' },
    // { name: 'Resources', path: '/resources' },
  ];

  const landingPages = [
    {
      name: researchLandingPages.aiMarketResearchPlatform.footerLabel,
      path: ROUTES.aiMarketResearchPlatform,
    },
    {
      name: researchLandingPages.b2bSurveyPanelProvider.footerLabel,
      path: ROUTES.b2bSurveyPanelProvider,
    },
    {
      name: researchLandingPages.fraudFreeSurveyDataPlatform.footerLabel,
      path: ROUTES.fraudFreeSurveyDataPlatform,
    },
    {
      name: researchLandingPages.globalSurveyPanelFraudDetection.footerLabel,
      path: ROUTES.globalSurveyPanelFraudDetection,
    },
    {
      name: researchLandingPages.marketSegmentationAnalysis.footerLabel,
      path: ROUTES.marketSegmentationAnalysis,
    },
    {
      name: researchLandingPages.onlineSurveyPlatform.footerLabel,
      path: ROUTES.onlineSurveyPlatform,
    },
    {
      name: researchLandingPages.surveyDataQualitySolutions.footerLabel,
      path: ROUTES.surveyDataQualitySolutions,
    },
    {
      name: researchLandingPages.productMarketResearchInsights.footerLabel,
      path: ROUTES.productMarketResearchInsights,
    },
    {
      name: researchLandingPages.marketResearchPanelProvider.footerLabel,
      path: ROUTES.marketResearchPanelProvider,
    },
    {
      name: "Verified Survey Respondents",
      path: ROUTES.verifiedSurveyRespondents,
    },
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin />,
      href: "https://linkedin.com/company/quantifyai-co",
      label: "LinkedIn",
    },
    // {
    //   icon: <FiTwitter />,
    //   href: "https://twitter.com/quantifyai",
    //   label: "Twitter",
    // },
    // {
    //   icon: <FiFacebook />,
    //   href: "https://facebook.com/quantifyai",
    //   label: "Facebook",
    // },
    // {
    //   icon: <FiInstagram />,
    //   href: "https://instagram.com/quantifyai",
    //   label: "Instagram",
    // },
  ];

  const contactInfo = [
    {
      icon: <FiMail />,
      text: "rfq@quantifyai.co",
      href: "mailto:rfq@quantifyai.co",
    },
    { icon: <FiPhone />, text: "+1 858-692-1325", href: "tel:+1 8586921325" },
    {
      icon: <FiMapPin />,
      text: "    2803 Grandview St.  San Diego, CA 92110 ",
      // text: "      QuantifyAI, LLC 3200 Paseo Village Way #2337 San Diego, CA 92130 USA",

      href: "https://maps.google.com",
    },
  ];

  return (
    <footer className="bg-gradient-to-b relative from-gray-900 to-black text-white pt-16 ">
         {/* <div className="absolute bottom-0 text-white"
    style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%), 
                              radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%), 
                              url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}/> */}
      <div className="container mx-auto px-8 pt-10 pb-5"  style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%), 
                              radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%), 
                              url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(340px,0.78fr)_minmax(0,1.62fr)] xl:grid-cols-[minmax(420px,0.82fr)_minmax(0,1.78fr)] gap-12 xl:gap-16 mb-12">
          {/* Left Column - Brand & Newsletter */}
          <div>
            <div className="flex items-center mb-6">
              <img src={logo} className="w-40" />

              {/* <div className="ml-3 flex items-center text-xs bg-gradient-to-r from-blue-500 to-teal-500 text-white px-2 py-1 rounded-full">
                <MdOutlineVerifiedUser className="mr-1" />
                Verified Partner
              </div> */}
            </div>

            <p className="text-gray-400 mb-8 max-w-sm">
              We're redefining industry standards with an intense focus on data
              quality through our proprietary Opinion Elite panel and AI-powered
              analytics solutions.
            </p>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-40 h-10  rounded-full  text-white bg-gradient-to-r from-blue-400 to-blue-700 flex items-center justify-center gap-3 font-serif text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-400 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <span>{social.icon}</span> <span>Linkedln</span> 
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1.15fr_1.3fr] gap-8 xl:gap-12">
            {/* Services Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Services
                </span>
                {/* <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400"></div> */}
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={service.name} className="group">
                    <Link
                      to={service.path}
                      className="flex items-center text-gray-400 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                    >
                      {/* <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                      {service.name}
                      {/* <FiArrowUpRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm" /> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Quick Links
                </span>
                {/* <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400"></div> */}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name} className="group">
                    <Link
                      to={link.path}
                      className="flex items-center text-gray-400 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                    >
                      {/* <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                      {link.name}
                      <FiArrowUpRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Landing Pages Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Research Pages
                </span>
              </h3>
              <ul className="space-y-2">
                {landingPages.map((link) => (
                  <li key={link.name} className="group">
                    <Link
                      to={link.path}
                      className="flex items-center text-sm leading-5 text-gray-400 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                    >
                      {link.name}
                      <FiArrowUpRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Contact Us
                </span>
                <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400"></div>
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="flex items-start text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="mt-1 mr-4 text-blue-400 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </span>
                      <span className="group-hover:text-blue-400 text-sm transition-colors">
                        {info.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {/* <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex  introButton items-center px-10 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left */}
          <div className="text-gray-500 text-sm text-center md:text-left">
            <div>© {currentYear} QuantifyAI. All rights reserved.</div>
            <div className="mt-1">
              Developed by{" "}
              <a
                href="https://mavengroupglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Maven Group Global
              </a>
            </div>
          </div>

          {/* Center - Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Right - Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* <div className="flex items-center text-gray-400 text-sm">
              <MdOutlineVerifiedUser className="mr-2 text-green-400" />
              ISO 27001 Certified
            </div> */}
            {/* <div className="hidden md:block text-gray-500">•</div> */}
            <div className="flex items-center text-gray-400 text-sm">
              <MdOutlineVerifiedUser className="mr-2 text-green-400" />
              GDPR Compliant
            </div>
            <div className="hidden md:block text-gray-500">•</div>
            {/* <div className="flex items-center text-gray-400 text-sm">
              <MdOutlineVerifiedUser className="mr-2 text-green-400" />
              SOC 2 Type II
            </div> */}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
