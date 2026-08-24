import {
  FaGlobeAmericas,
  FaCheck,
  FaFacebookF,
  FaRobot,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import bgimage from "../assets/imgs/research-services-box-inner-mob.png";
import { ROUTES } from "../routes";

const Services = () => {
  const features = [
    "Advanced Survey Programming",
    "Questionnaire Development",
    "Real-time Data Analytics",
  ];

  const qualitySteps = [
    {
      icon: <FaLinkedinIn />,
      title: "LinkedIn + Facebook Verification",
      description:
        "Recruitment and verification through social platforms for authentic respondents with profile validation.",
      color: "bg-green-400",
    },
    {
      icon: <FaRobot />,
      title: "Machine Learning System",
      description:
        "AI-powered fraud detection and behavioral analysis with continuous learning algorithms.",
      color: "bg-blue-400 animate-pulse-glow",
    },
    {
      icon: <FaChartLine />,
      title: "Advanced Engagement",
      description:
        "Prioritizing response rate and engagement over sheer panel size with gamified experiences.",
      color: "bg-teal-400",
    },
  ];

  return (
    <section id="services" className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced <span className="gradient-text">Research Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for quantitative research with global reach
            and AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Global Panel Card */}
          <div className="gradient-borde rounded-3xl -6 animate-slide-in-left">
            {/* Global Panel Card */}
            {/* <div className="rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/10 to-white/5 shadow-xl"> */}
            <div
              className="relative w-full h-full rounded-[30px]
    bg-gradient-to-b from-blue-700 via-sky-600 to-emerald-400
    border border-white/20
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]
    overflow-hidden p-5 md:py-16 sm:p-6"
            >
              {/* Top */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-white/30 bg-white/10 backdrop-blur flex items-center justify-center">
                  <FaGlobeAmericas size={34} className="text-blue-50" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Global Panel
                  </h3>
                  <p className="text-white text-sm">
                    Opinion Elite: B2C + B2B Panel
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-4">
                Our proprietary panel,{" "}
                <span className="font-semibold text-white">Opinion Elite</span>,
                covers continents with diverse demographics, cultures, and
                languages — connecting participants worldwide.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur p-3 text-center">
                  <div className="text-2xl font-bold text-white">48</div>
                  <p className="text-white text-xs sm:text-sm">Markets</p>
                </div>

                <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur p-3 text-center">
                  <div className="md:text-xl sm:text-sm font-bold  text-white">Social Media </div>
                  <p className="md:text-xl text-white text-sm text-white "> Verified participants</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-800 to-blue-800 flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                    <span className="text-white/85 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={ROUTES.contact}
                className="w-full flex items-center justify-center py-3 rounded-xl
      bg-gradient-to-r from-cyan-800 via-blue-500 to-blue-700
      text-white font-semibold text-sm sm:text-base
      hover:scale-[1.02] transition mt-5"
              >
                Explore Panel Features →
              </Link>
            </div>
            {/* </div> */}
          </div>

          {/* Data Quality Focus */}
          <div className="animate-slide-in-right">
            <h3 className="text-3xl font-bold text-white mb-8">
              Data Quality Focus
            </h3>

            <p className="text-gray-300 mb-10 leading-relaxed text-lg">
              Survey fraud is a constant presence in online research and an
              overwhelming burden to data collection. At QuantifyAI, we don't
              think it has to be, so we built Opinion Elite with an intense
              focus on panel health and high respondent quality.
            </p>

            {/* Data Quality Steps */}
            <div className="space-y-8">
              {qualitySteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500  flex items-center justify-center shadow-xl mr-6">
                      <span className="text-white text-2xl">{step.icon}</span>
                    </div>
                    {/* <div className="absolute -bottom-2  w-8 h-8 rounded-full bg-gray-900 border-4 border-gray-900 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full ${step.color}`}></div>
                    </div> */}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
