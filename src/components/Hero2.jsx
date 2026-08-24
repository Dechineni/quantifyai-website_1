import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GiPlatform } from "react-icons/gi";
import { Link } from "react-router-dom";
import HeroImg from "./mapHero.mp4";
import { ROUTES } from "../routes";


/* ================= COUNTER COMPONENT ================= */
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1600;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const Hero = () => {
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  /* ================= VIDEO SLOW MOTION ================= */
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.45;
  }, []);

  /* ================= 3D PARALLAX EFFECT ================= */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      hero.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
    style={{backgroundImage: `url(${HeroImg})`}}
      id="home"
      className="relative z-0 py-12 md:py-16 overflow-hidden bg-gradient-to-b from-[#020304] via-[#050b16] to-[#020304]"
    >
      {/* ================= AI GLOW BACKGROUND ================= */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[120px]" />
      </div> */}

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl mb-6 border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-green-400/30 mr-3 animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest font-semibold text-cyan-300">
                Quantitative research services
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              DATA <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                REDEFINED.
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-10 max-w-xl">
 QuantifyAI empowers researchers with AI-driven market insights that
              deliver precision and scale.            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to={ROUTES.contact}
                className="px-7 text-center py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold text-lg hover:scale-105 transition shadow-lg shadow-cyan-500/20"
              >
                Request Demo
              </Link>

              <Link
                to={ROUTES.platform}
                className="px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-xl text-white font-semibold text-lg hover:bg-white/20 transition flex items-center justify-center border border-white/10"
              >
                <GiPlatform className="mr-3 text-cyan-400" />
                Platform
              </Link>
            </div>
          </motion.div>

          {/* ================= RIGHT AI MAP ================= */}
          <motion.div
            ref={heroRef}
            className="relative w-full perspective-[1000px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            {/* GLASS CONTAINER */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl bg-white/5">

              {/* GRID OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-tr 
from-cyan-500/10 via-transparent to-green-500/10"></div>

              {/* MAP VIDEO */}
              <video
                ref={videoRef}
                src={HeroImg}
                className="w-full h-full md:object-cover opacity-80"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* AI WATERMARK LOGO */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <h1 className="text-[40px] md:text-[80px] font-bold tracking-widest 
  text-white/10 select-none">
    QuantifyAI
  </h1>
</div>

            </div>

            {/* ================= AI SIGNAL LINES ================= */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="aiLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f2ff" />
                  <stop offset="100%" stopColor="#00ffa6" />
                </linearGradient>
              </defs>

              <motion.line
                x1="42%" y1="32%" x2="12%" y2="18%"
                stroke="url(#aiLine)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1="58%" y1="46%" x2="88%" y2="20%"
                stroke="url(#aiLine)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.line
                x1="30%" y1="60%" x2="15%" y2="80%"
                stroke="url(#aiLine)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </svg>

            {/* ================= FLOATING AI CARDS ================= */}
            <FloatingCard
              title="Total Coverage"
              value={<><AnimatedNumber value="48" />+</>}
              desc="Countries Worldwide"
              className="-top-10 -left-3 md:-top-10 md:-left-12 text-cyan-400"
            />

            <FloatingCard
              title="Verified Panel"
              // value="10M+"
              value="Global"
              desc="Participants"
              className="-top-4 right-0 text-green-400"
            />

            <FloatingCard
              title="Response Rate"
              value={<><AnimatedNumber value="99" />%</>}
              desc="Industry Leading"
              className="-bottom-8 -left-3 md:-bottom-12 md:-left-10 text-blue-400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================= FLOATING CARD COMPONENT ================= */
const FloatingCard = ({ title, value, desc, className }) => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
    className={`absolute ${className}  bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl md:px-5 px-2 md:py-4 py-2 shadow-xl`}
  >
    <p className="text-xs text-gray-400 uppercase tracking-wide">{title}</p>
    <h3 className="md:text-3xl text-md font-bold">{value}</h3>
    <p className="text-xs text-gray-500">{desc}</p>
  </motion.div>
);

export default Hero;
