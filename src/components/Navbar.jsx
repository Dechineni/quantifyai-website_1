import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import {
  MdDashboard,
  MdAnalytics,
  MdPublic,
  MdPeople,
  MdGroup,
  MdDescription,
  MdCode,
  MdDataUsage,
  MdTrendingUp,
  MdOutlineArticle,
} from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./../assets/logo.png";
import { BiLineChart } from "react-icons/bi";
import { ROUTES } from "../routes";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopServices, setDesktopServices] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  const dropdownRef = useRef(null);
  const btnRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  

  /* ================= LOCK SCROLL WHEN MOBILE MENU OPEN ================= */
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileMenu]);

  /* ================= SCROLL EFFECT ================= */
useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 30);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setDesktopServices(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 40);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  const navItems = [
    { label: "Home", path: ROUTES.home, icon: <MdDashboard /> },
    { label: "Platform", path: ROUTES.platform, icon: <MdPublic /> },
    { label: "Solutions", path: ROUTES.solutions, icon: <MdPeople /> },
    { label: "Our Approach", path: ROUTES.approach, icon: <MdGroup /> },
    { label: "Company", path: ROUTES.company, icon: <MdGroup /> },
    { label: "Blogs", path: ROUTES.blogs, icon: <MdOutlineArticle /> },
    // { label: "Country Net Rep", path: "/country-net-rep-data-table", icon: <BiLineChart /> },
  ];

  const servicesItems = [
    {
      title: "Questionnaire Development",
      icon: <MdDescription />,
      path: ROUTES.questionnaireDevelopment,
    },
    {
      title: "Survey Programming",
      icon: <MdCode />,
      path: ROUTES.surveyProgramming,
    },
    {
      title: "Fielding & Data Collection",
      icon: <MdDataUsage />,
      path: ROUTES.fieldingDataCollection,
    },
    {
      title: "Data Processing & Analysis",
      icon: <MdTrendingUp />,
      path: ROUTES.dataAnalysis,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= NAVBAR ================= */}
  <nav
  className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500
    ${
      isScrolled
        ? "bg-[#020617]/70 backdrop-blur-xl shadow-lg"
        : "bg-transparent"
    }
  `}
>

  {isScrolled && (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-20 left-1/3 w-64 h-64 bg-cyan-500/20 blur-[120px]" />
    <div className="absolute -top-20 right-1/4 w-64 h-64 bg-blue-500/20 blur-[120px]" />
  </div>
)}



        {/* AI GRADIENT GLOW */}
        {/* ================= AI GLOW BACKGROUND ================= */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-green-500/20 blur-[120px]" />
      </div> */}

        <div className="relative container mx-auto px-5 sm:px-8 lg:px-20 py-4 lg:py-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-11 drop-shadow-lg" />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`px-2 py-1 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
  ? "text-cyan-400 bg-white/10 border border-cyan-400/20"
  : "text-gray-200 hover:text-cyan-300 hover:bg-white/10"

                }`}
              >
                {item.label}
              </button>
            ))}

            {/* SERVICES DROPDOWN */}
            <div className="relative ml-2" ref={btnRef}>
              <button
                onClick={() => setDesktopServices((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-200 hover:text-white bg-white/5 hover:bg-white/10  border-white/10 transition"
              >
                <MdAnalytics />
                Services
                <FaChevronDown
                  className={`transition ${desktopServices ? "rotate-180" : ""}`}
                />
              </button>

              {desktopServices && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] rounded-2xl bg-[#20478e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(14, 67, 181, 0.7)] z-[9999]"
                >
                  <div className="p-4 space-y-2">
                    {servicesItems.map((s) => (
                      <button
                        key={s.title}
                        onClick={() => {
                          navigate(s.path);
                          setDesktopServices(false);
                        }}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition"
                      >
                        <span className="text-xl text-cyan-400">{s.icon}</span>
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              to={ROUTES.contact}
className="ml-3 flex introButton items-center gap-2 px-6 py-2 rounded-xl 
bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold 
shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
            >
              <FiUserPlus />
              Get Started
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden bg-gradient-to-r from-cyan-500 to-green-500 p-3 rounded-xl text-white"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars size={22} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden transition ${
          mobileMenu ? "visible" : "invisible"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
            mobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`fixed left-0 top-0 h-screen w-80 p-6 overflow-y-auto
          transition-transform duration-300
          ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
          bg-[#050b16]/95 backdrop-blur-2xl border-r border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.8)]`}
        >
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10">
            <img src={logo} alt="logo" className="h-10" />
            <button onClick={() => setMobileMenu(false)}>
              <FaTimes className="text-white bg-gradient-to-r from-cyan-500 to-green-500 text-2xl p-2 rounded-xl" />
            </button>
          </div>

          {/* NAV LINKS */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenu(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-200 hover:bg-white/10 transition"
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            {/* MOBILE SERVICES */}
            <button
              onClick={() => setMobileServices(!mobileServices)}
              className="flex items-center justify-between w-full p-3 rounded-xl text-gray-200 hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <MdAnalytics />
                Services
              </span>
              <FaChevronDown
                className={`transition ${mobileServices ? "rotate-180" : ""}`}
              />
            </button>

            {mobileServices && (
              <div className="ml-4 space-y-1">
                {servicesItems.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => {
                      navigate(s.path);
                      setMobileMenu(false);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    {s.icon}
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to={ROUTES.contact}
            onClick={() => setMobileMenu(false)}
            className="mt-6  flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold shadow-lg"
          >
            <FiUserPlus />
            Get Started
          </Link>
        </div>
      </div>

      {/* SPACER (because navbar is fixed) */}
    </>
  );
};

export default Navbar;
