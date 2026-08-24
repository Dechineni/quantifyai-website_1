import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GiPlatform } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

import HeroVideo from "../assets/hero/animation1.webm";
import HeroImage from "../assets/hero/HEROimage2.png";
import HeroBg from "../assets/imgs/hero-bg2.png";

const Hero = () => {
  const videoRef = useRef(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const safari =
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("android");
    setIsSafari(safari);
  }, []);

  useEffect(() => {
    if (!isSafari && videoRef.current) {
      videoRef.current.playbackRate = 0.45;
    }
  }, [isSafari]);

  const sectionStyle = useMemo(
    () => ({
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%),
        radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%),
        url(${HeroBg})
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  return (
    <section
      id="home"
      style={sectionStyle}
      className="relative w-full min-h-[100svh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020814]/60 via-transparent to-[#020814]/70 pointer-events-none" />

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-25 sm:py-23 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          {/* ✅ LEFT: MEDIA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[520px] sm:max-w-[620px] lg:max-w-[720px]">
              {isSafari ? (
                <img
                  src={HeroImage}
                  alt="Hero"
                  draggable={false}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,150,255,0.18)]"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,150,255,0.18)]"
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.playbackRate = 1.15;
                    }
                  }}
                >
                  <source src={HeroVideo} type="video/webm" />
                </video>
              )}
            </div>
          </motion.div>

          {/* ✅ RIGHT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 text-center lg:text-left"
          >
            <h1
              className="
                font-extrabold leading-[0.95] text-white
                text-[clamp(3.2rem,5vw,5.6rem)]
                flex flex-col gap-1
              "
            >
              <span>DATA</span>
              <span>REDEFINED.</span>
            </h1>

            <h2
              className="
                mt-3 sm:mt-4
                font-semibold text-[#a7b4f8]
                text-[clamp(1rem,2.3vw,2.25rem)]
              "
            >
              Your insight, our expertise.
            </h2>

            <div className="mt-4 h-[3px] w-100 sm:w-100 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto lg:mx-0" />

            <p
              className="
                mt-5 sm:mt-6
                text-[#a7b4f8]
                text-[clamp(0.95rem,1.2vw,1.1rem)]
                leading-relaxed
                max-w-xl
                mx-auto lg:mx-0
              "
            >
              QuantifyAI empowers quantitative researchers with advanced,
              AI-driven market research tools that deliver precise, actionable
              insights, enabling data-driven decisions and fostering innovation
              in a rapidly evolving market landscape.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start lg:items-start">
              <Link
                to={ROUTES.contact}
                className="
                  w-full sm:w-auto min-w-[200px]
                  px-8 sm:px-10 py-3.5 sm:py-4
                  rounded-xl
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  text-white font-bold
                  text-base sm:text-lg
                  hover:scale-[1.03]
                  transition-all duration-300
                  shadow-lg
                  text-center
                "
              >
                CONTACT US
              </Link>

              <Link
                to={ROUTES.platform}
                className="
                  w-full sm:w-auto min-w-[200px]
                  px-8 sm:px-10 py-3.5 sm:py-4
                  rounded-xl
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  text-white font-bold
                  text-base sm:text-lg
                  hover:scale-[1.03]
                  transition-all duration-300
                  shadow-lg
                  flex items-center justify-center
                "
              >
                <GiPlatform className="mr-2 text-cyan-200 text-2xl" />
                PLATFORM
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
