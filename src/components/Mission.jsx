import {
  FaUserShield,
  FaBrain,
  FaUsers,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import BGIMAGE from "../assets/imgs/leadership-teamlist-membercard.png";

const Mission = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  const missionCards = [
    {
      icon: <FaUserShield />,
      title: "Identity Verification",
      description:
        "Facebook + LinkedIn recruitment and verification for authentic respondents with multi-layer validation.",
      link: "Learn more",
      features: [
        "Multi-platform verification",
        "Real-time validation",
        "Fraud detection",
        "Compliance ready",
      ],
      color: "from-blue-500/20 to-blue-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: <FaBrain />,
      title: "AI & Machine Learning",
      description:
        "Advanced behavioral analysis and fraud detection systems powered by cutting-edge AI algorithms.",
      link: "Explore AI",
      features: [
        "Neural networks",
        "Predictive analytics",
        "Pattern recognition",
        "Continuous learning",
      ],
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      icon: <FaUsers />,
      title: "Engaged Participants",
      description:
        "Prioritizing response rate and engagement over sheer panel size with personalized experiences.",
      link: "View Panel",
      features: [
        "Gamified surveys",
        "Instant rewards",
        "Community building",
        "Quality incentives",
      ],
      color: "from-teal-500/20 to-emerald-500/20",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-400",
    },
  ];

  /* ================= 3D MOUSE EFFECT ================= */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || hoveredCard === current) return;

      const card =
        containerRef.current.querySelectorAll(".mission-card-3d")[hoveredCard];

      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;

      card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
    `;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredCard]);

  return (
    <section className="relative  z-10 py-5 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Upholding the
              <span className="block gradient-text mt-4">
                Highest Standards of Data Quality
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              At QuantifyAI, our mission is to ensure reliable, accurate, and
              AI-verified data from a Social Media Verified participants base.
            </p>
          </div>

          {/* CARDS */}
          <div
            ref={containerRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mission-cards-container"
          >
            {missionCards.map((card, index) => (
              <div
                key={index}
                className="mission-card-3d "
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative rounded-3xl p-6 px-10 md:p-8 border border-white/10 shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
                 style={{ backgroundImage: `url(${BGIMAGE})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                   >
                 

                  {/* Content */}
                  <div className="relative z-10 py-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center mb-6">
                      <span className="text-4xl text-white">{card.icon}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">
                      {card.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-6">{card.description}</p>

                    <ul className="space-y-3 mb-8">
                      {card.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          {/* <FaCheck className="text-green-400" /> */}
                           <div className="w-4 h-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center ">
                        <FaCheck className="text-white text-sm " />
                      </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
