import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgimage from "../../assets/imgs/testimonials-box.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import HeroVideo from "../../assets/hero/animation5.webm";
import HeroImage from "../../assets/hero/testimonials-icon.png";

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

/* ✅ Safari detect helper */
const detectSafari = () => {
  const ua = navigator.userAgent;
  return /^((?!chrome|chromium|android).)*safari/i.test(ua);
};

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isSafari, setIsSafari] = useState(false);
  const autoPlayRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-rotate configuration
  // const AUTO_ROTATE_INTERVAL = 3000; // 5 seconds

  // Safari detection
  useEffect(() => {
    setIsSafari(detectSafari());
  }, []);

  // Video playback rate
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.45;
  }, [isSafari]);

  // Auto-rotate functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    // autoPlayRef.current = setInterval(() => {
    //   setIndex((prev) => (prev + 1) % testimonials.length);
    // }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Pause auto-rotate on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
    // Reset auto-play timer on manual navigation
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    // Reset auto-play timer on manual navigation
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  // Dot navigation
  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  return (
    <section
      className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ✅ Safari = Image | Chrome = Video */}
      <div className="flex justify-center items-center mb-8 md:mb-12">
        {isSafari ? (
          <img
            src={HeroImage}
            alt="Testimonials"
            draggable={false}
            className="
        w-[90%] 
        sm:w-[75%] 
        md:w-[65%] 
        lg:w-[55%] 
        xl:w-[45%]
        mx-auto 
        object-contain
      "
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 1.15;
              }
            }}
            className="
        w-[90%] 
        sm:w-[75%] 
        md:w-[70%] 
        lg:w-[70%] 
        xl:w-[70%]
        mx-auto 
        object-contain
      "
          >
            <source src={HeroVideo} type="video/webm" />
          </video>
        )}
      </div>

      {/* 🔥 AI Glow Background */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[300px] h-[200px] sm:w-[450px] sm:h-[250px] md:w-[550px] md:h-[300px] lg:w-[650px] lg:h-[350px] bg-blue-500/30 blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[160px] rounded-full"></div>
        <div className="w-[200px] h-[150px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[250px] lg:w-[450px] lg:h-[250px] bg-cyan-400/20 blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[140px] rounded-full"></div>
      </div>

      {/* 🌌 Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a3cff25,transparent_65%)]"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 md:mb-14">
          Client{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
          {/* Left Preview Card (Desktop only) */}
          {/* <div className="hidden lg:block absolute left-0 -translate-x-1/2 scale-75 opacity-90 blur-[1px] z-0 
          flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px]
          ">
            <TestimonialCard
              data={
                testimonials[(index - 1 + testimonials.length) % testimonials.length]
              }
            />
          </div> */}

          {/* Center Card */}
          <div className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[700px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: 80 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -80 }}
                transition={{ duration: 0.5 }}
                className="z-10"
              >
                <TestimonialCard data={testimonials[index]} center />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Preview Card (Desktop only) */}
          {/* <div className="hidden lg:block absolute right-0 translate-x-1/2 scale-75 opacity-30 blur-[1px] z-0">
            <TestimonialCard data={testimonials[(index + 1) % testimonials.length]} />
          </div> */}
        </div>

        {/* Navigation Dots (Mobile & Tablet) */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 lg:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-gradient-to-r from-cyan-500 to-green-500 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <button
            onClick={prev}
            className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:border-blue-500 flex items-center justify-center text-gray-50 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Desktop Dots */}
          <div className="hidden lg:flex justify-center gap-3 mx-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-gradient-to-r from-cyan-500 to-green-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/20"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-base sm:text-lg group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Auto-play indicator */}
        {/* <div className="flex justify-center items-center gap-2 mt-4">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-600'}`}></div>
          <span className="text-xs text-gray-400">
            {isAutoPlaying ? "Auto-rotating" : "Paused"}
          </span>
        </div> */}
      </div>
    </section>
  );
}

function TestimonialCard({ data, center }) {
  return (
    <div
      className={`group relative   w-full ${
        center ? "scale-100 md:scale-105" : ""
      }`}
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/40 to-cyan-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Card */}
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="
          relative
          w-full
          min-h-[400px]
          sm:min-h-[450px]
          md:min-h-[500px]
          rounded-3xl
          border border-blue-500/20
          bg-black
          backdrop-blur-xl
          p-6 sm:p-8 md:p-10 lg:p-12
          flex flex-col justify-between
          transition-all duration-500
          group-hover:scale-[1.02]
          overflow-hidden
        "
      >
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-2 ">
          {/* Text Content */}
          <p
            className="
  text-gray-300
  text-sm
  sm:text-sm
  leading-[1.6]
  sm:leading-relaxed
  tracking-normal
  sm:tracking-wide
  whitespace-pre-line
  text-left
  
  pb-2
"
          >
            “{data.text}”
          </p>
        </div>

        {/* Footer (Fixed at bottom) */}
        <div className="mt-4 pt-4 md:mt-6 border-t border-gray-700/30">
          <div className="flex flex-col  items-center justify-center gap-3">
            <div>
              <h4 className="text-white font-semibold text-base sm:text-lg">
                {data.name}
              </h4>
              <p className="text-sm text-gray-400">{data.role}</p>
            </div>

            {/* Rating Stars */}
            {/* <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {data.verified && (
                <span className="text-xs text-green-400 ml-2">✓ Verified</span>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
