import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaGlobeAmericas,
  FaShieldAlt,
  FaUsers,
  FaChartLine
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import all your images
import image1 from "../assets/Qunantify-company-images/1.png";
import image2 from "../assets/Qunantify-company-images/2.png";
import image3 from "../assets/Qunantify-company-images/3.png";
import image4 from "../assets/Qunantify-company-images/4.png";
import image5 from "../assets/Qunantify-company-images/5.png";
import image6 from "../assets/Qunantify-company-images/6.png";
import image7 from "../assets/Qunantify-company-images/7.png";
import image8 from "../assets/Qunantify-company-images/8.png";
import image9 from "../assets/Qunantify-company-images/9.png";
import image10 from "../assets/Qunantify-company-images/10.png";
import image11 from "../assets/Qunantify-company-images/11.png";
import image12 from "../assets/Qunantify-company-images/12.png";
// import image13 from "../assets/Qunantify-company-images/13.png";
// import image14 from "../assets/Qunantify-company-images/14.png";
// import image15 from "../assets/Qunantify-company-images/15.png";

const CompanyCarousels = () => {
  const desktopSliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Partner logos data
  const partners = [
    { name: "Quantiai-trusted-company-1", logo: image1 },
    { name: "Quantiai-trusted-company-2", logo: image2 },
    { name: "Quantiai-trusted-company-3", logo: image3 },
    { name: "Quantiai-trusted-company-4", logo: image4 },
    { name: "Quantiai-trusted-company-5", logo: image5 },
    { name: "Quantiai-trusted-company-6", logo: image6 },
    { name: "Quantiai-trusted-company-7", logo: image7 },
    { name: "Quantiai-trusted-company-8", logo: image8 },
    { name: "Quantiai-trusted-company-9", logo: image9 },
    { name: "Quantiai-trusted-company-10", logo: image10 },
    { name: "Quantiai-trusted-company-11", logo: image11 },
    { name: "Quantiai-trusted-company-12", logo: image12 },
    // { name: "Quantiai-trusted-company-13", logo: image13 },
    // { name: "Quantiai-trusted-company-14", logo: image14 },
    // { name: "Quantiai-trusted-company-15", logo: image15 },
  ];

 



  // Desktop slider settings
  const desktopSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  // Mobile slider settings
  const mobileSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-600 hover:bg-blue-500 transition-colors"></div>
    ),
    dotsClass: "slick-dots !bottom-4",
    beforeChange: (current, next) => setActiveIndex(next),
  };

  // Navigation handlers
  const nextSlide = () => {
    if (window.innerWidth >= 768) {
      desktopSliderRef.current?.slickNext();
    } else {
      mobileSliderRef.current?.slickNext();
    }
  };

  const prevSlide = () => {
    if (window.innerWidth >= 768) {
      desktopSliderRef.current?.slickPrev();
    } else {
      mobileSliderRef.current?.slickPrev();
    }
  };

  return (
<div className="relative py-12 px-4 md:px-8 overflow-visible">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div> */}



     {/* Carousel Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* <div className="flex flex-col md:flex-row items-center justify-between mb-3"> */}
            <div className="mb-6 flex-col flex  justify-center items-center md:mb-0">
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-2">
                Trusted By
              </h2>
              {/* <p className="text-gray-400 text-2xl">
                Scroll to discover industry leaders who trust our solutions
              </p> */}
            </div>
            


             {/* <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Slide {activeIndex + 1} of {partners.length}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="group w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
                    aria-label="Previous logos"
                  >
                    <FaChevronLeft className="text-lg group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="group w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
                    aria-label="Next logos"
                  >
                    <FaChevronRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div> */}



         
          {/* </div> */}

         <div className="hidden md:block relative">

  {/* fixed center background */}
<div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
  <div className="w-[90vw] max-w-[1000px] h-[180px] md:h-[240px] bg-blue-500/20 blur-3xl rounded-[70px]" />
</div>


  <Slider ref={desktopSliderRef} {...desktopSliderSettings} className="relative py-10 z-10">

    {partners.map((partner) => (
      <div key={partner.name} className="px-3 py-5">
        <div className="partner-card relative h-36 flex items-center justify-center rounded-2xl 
          bg-[#06152b]/80
          border border-blue-500/10
          backdrop-blur-xl
          transition-all duration-500 introBG ease-out px-3
        ">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-h-16 object-contain grayscale"
          />

          <div className="active-line absolute bottom-2 "></div>
          <div className="active-line absolute bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-500"></div>
        </div>
      </div>
    ))}

  </Slider>
</div>


          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Slider ref={mobileSliderRef} {...mobileSliderSettings}>
              {partners.map((partner) => (
                <div key={partner.name} className="">
                  <div className="glass-card rounded-2xl transition-all duration-300 border border-gray-700/50">
                    <div className="relative flex justify-center items-center ">
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" /> */}
                      
                      <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 w-full h-full flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-22 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                   
                  </div>
                </div>
              ))}
            </Slider>
          </div>

         
        </motion.div>





      {/* <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-blue-300">TRUSTED WORLDWIDE</span>
            <FaStar className="text-yellow-400 text-sm" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies worldwide who trust QuantifyAI for accurate, 
            reliable market research and data intelligence solutions.
          </p>
        </motion.div>

     

    

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Our Valued Partners
              </h2>
              <p className="text-gray-400">
                Scroll to discover industry leaders who trust our solutions
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Slide {activeIndex + 1} of {partners.length}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="group w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
                    aria-label="Previous logos"
                  >
                    <FaChevronLeft className="text-lg group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="group w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
                    aria-label="Next logos"
                  >
                    <FaChevronRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent z-20 pointer-events-none" />
            
            <Slider ref={desktopSliderRef} {...desktopSliderSettings}>
              {partners.map((partner, index) => (
                <div key={partner.name} className="px-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="glass-card rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-700/50 hover:border-blue-500/50">
                      <div className="relative flex justify-center items-center h-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                        
                        <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex ? 'bg-blue-500 scale-125' : 'bg-gray-600'
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="block md:hidden">
            <Slider ref={mobileSliderRef} {...mobileSliderSettings}>
              {partners.map((partner) => (
                <div key={partner.name} className="px-4">
                  <div className="glass-card rounded-2xl p-8 transition-all duration-300 border border-gray-700/50">
                    <div className="relative flex justify-center items-center h-48">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
                      
                      <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 w-full h-full flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-32 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full">
                        <FiExternalLink className="text-blue-400" />
                        <span className="text-sm text-blue-300">Trusted Partner</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

         
        </motion.div>

       
      </div> */}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .glass-card {
          background: rgba(17, 25, 40, 0.75);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }
      `}</style>
    </div>
  );
};

export default CompanyCarousels;