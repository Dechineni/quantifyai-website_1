import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import BGIMAGE from "../assets/imgs/trustedby-bg.png";
import {
  FiMapPin,
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

// ✅ amCharts 5
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

/* ================= CONFIG ================= */
const API = "https://quantifyaiapi.mavenerp.in/public/api/insights";
const YEAR = 2024;
const METRIC = "demographics";

// ✅ Inactive base
const BASE_DARK = 0x334155;

/* ================= HELPERS ================= */
const safeNumber = (v) => {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : null;
};

const guessRegion = (countryName) => {
  const c = String(countryName || "").toLowerCase();

  const americas = [
    "united states",
    "united states of america",
    "canada",
    "mexico",
    "argentina",
    "brazil",
    "colombia",
    "chile",
    "peru",
    "venezuela",
    "costa rica",
  ];
  const apac = [
    "australia",
    "china",
    "hong kong",
    "india",
    "indonesia",
    "japan",
    "malaysia",
    "new zealand",
    "philippines",
    "korea",
    "singapore",
    "taiwan",
    "thailand",
    "vietnam",
    "pakistan",
    "bangladesh",
  ];

  if (americas.some((x) => c.includes(x))) return "Americas";
  if (apac.some((x) => c.includes(x))) return "APAC";
  return "EMEA";
};

// ✅ Build values by country from ONE selected row (internal)
const buildValueByCountry = (
  rows,
  pick = { category: "Gender", subcategory: "Female" },
) => {
  const row = (rows || []).find(
    (r) =>
      String(r?.category || "").toLowerCase() ===
        String(pick.category).toLowerCase() &&
      String(r?.subcategory || "").toLowerCase() ===
        String(pick.subcategory).toLowerCase(),
  );

  const values = row?.values || {};
  const out = {};
  for (const [countryName, v] of Object.entries(values)) {
    const n = safeNumber(v);
    if (n !== null) out[countryName] = String(v); // keep "43.00"
  }
  return out;
};

export default function GlobalCoverage() {
  const chartDivRef = useRef(null);
  const rootRef = useRef(null);
  const polygonSeriesRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState([
    "Americas",
    "APAC",
    "EMEA",
  ]);

  const [apiCountries, setApiCountries] = useState([]);
  // 🔥 STEP 1 — Replace State
  const [countryCounts, setCountryCounts] = useState({});
  const [meta, setMeta] = useState(null);
  const [countriesData, setCountriesData] = useState([]);

  // 🔥 STEP 2 — Update fetchData()
  const fetchData = useCallback(async () => {
    const res = await axios.get(API, {
      params: { metric_type: METRIC, year: YEAR },
    });

    const data = res?.data;

    const countries = data?.data?.countries || [];

    // Build map: { "India": "5596720.0000" }
    const countMap = {};
    countries.forEach((c) => {
      if (c?.name && c?.count) {
        countMap[c.name] = c.count;
      }
    });

    setMeta(data?.meta || null);
    setApiCountries(countries.map((c) => c.name));
    setCountryCounts(countMap);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        await fetchData();
      } catch (e) {
        console.error("GlobalCoverage API error:", e);
        if (!mounted) return;
        setApiCountries([]);
        setRows([]);
        setMeta(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchData]);

  // ✅ values like "43.00"
  // 🔥 STEP 3 — REMOVE THIS COMPLETELY
  // 🔥 STEP 4 — Replace activeSet
  const activeSet = useMemo(
    () => new Set(Object.keys(countryCounts || {})),
    [countryCounts],
  );

  const regionData = useMemo(() => {
    const base = {
      Americas: {
        color: "from-blue-500 to-blue-600",
        icon: <FiTrendingUp className="" />,
        countries: { COUNTRIES: [] },
      },
      APAC: {
        color: "from-teal-500 to-teal-600",
        icon: <FiTrendingUp className="" />,
        countries: { COUNTRIES: [] },
      },
      EMEA: {
        color: "from-indigo-500 to-indigo-600",
        icon: <MdLocationOn className="" />,
        countries: { COUNTRIES: [] },
      },
    };

    for (const name of apiCountries) {
      const r = guessRegion(name);
      base[r].countries.COUNTRIES.push(name);
    }
    return base;
  }, [apiCountries]);

  const toggleRegion = (region) => {
    setExpandedRegion((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const countByCountry = useMemo(() => {
    const map = {};
    countriesData.forEach((c) => {
      if (c?.name && c?.count) {
        map[c.name] = c.count;
      }
    });
    return map;
  }, [countriesData]);
  /* ================= MAP INIT ================= */
  useEffect(() => {
    if (!chartDivRef.current) return;

    // cleanup old chart
    if (rootRef.current) {
      rootRef.current.dispose();
      rootRef.current = null;
      polygonSeriesRef.current = null;
    }

    const root = am5.Root.new(chartDivRef.current);
    rootRef.current = root;

    root.container.set(
      "background",
      am5.Rectangle.new(root, { fillOpacity: 0 }),
    );
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        pinchZoom: false,
        background: am5.Rectangle.new(root, { fillOpacity: 0 }),
      }),
    );

    chart.set("zoomControl", null);
    chart.set("homeGeoPoint", { longitude: 10, latitude: 20 });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      }),
    );
    polygonSeriesRef.current = polygonSeries;

    // ✅ Logo-like gradient (TOP light -> BOTTOM dark) - adjust hex if needed
    const logoGradient = am5.LinearGradient.new(root, {
      rotation: 90, // top -> bottom
      stops: [
        { color: am5.color(0x25f3d6), offset: 0 }, // light teal (top)
        { color: am5.color(0xb7ff3a), offset: 1 }, // lime (bottom)
      ],
    });

    const logoHoverGradient = am5.LinearGradient.new(root, {
      rotation: 90,
      stops: [
        { color: am5.color(0x55ffe9), offset: 0 },
        { color: am5.color(0xeaff75), offset: 1 },
      ],
    });

    // tooltip
    const tooltip = am5.Tooltip.new(root, {
      keepTargetHover: true,
      pointerOrientation: "vertical",
      getFillFromSprite: false,
      getStrokeFromSprite: false,
      autoTextColor: false,
    });

    tooltip.get("background")?.setAll({
      fill: am5.color(0x0f172a),
      fillOpacity: 0.92,
      strokeOpacity: 0,
      cornerRadius: 12,
    });

    tooltip.label.setAll({
      fontSize: 13,
      fill: am5.color(0xffffff),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
    });

    // base polygon style
    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      // ✅ base for inactive countries
      fill: am5.color(BASE_DARK),
      fillOpacity: 0.14,
      stroke: am5.color(0xffffff),
      strokeOpacity: 1.14,
      strokeWidth: 0.7,
      tooltipText: "",
    });

    // ✅ hover state uses gradient (IMPORTANT: use fillGradient, not fill)
    polygonSeries.mapPolygons.template.states.create("hover", {
      fillGradient: logoHoverGradient,
      fillOpacity: 1,
      strokeOpacity: 0.25,
    });

    const isActive = (name) => activeSet.has(name);

    // ✅ for active countries: apply gradient using fillGradient
    polygonSeries.mapPolygons.template.adapters.add(
      "fillGradient",
      (grad, target) => {
        const name =
          target.dataItem?.dataContext?.name || target.dataItem?.get("name");
        return isActive(name) ? logoGradient : null;
      },
    );

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const name =
        target.dataItem?.dataContext?.name || target.dataItem?.get("name");
      return isActive(name) ? am5.color(0x25f3d6) : am5.color(BASE_DARK);
    });

    polygonSeries.mapPolygons.template.adapters.add(
      "fillOpacity",
      (op, target) => {
        const name =
          target.dataItem?.dataContext?.name || target.dataItem?.get("name");
        return isActive(name) ? 0.95 : 0.14;
      },
    );

    // ✅ tooltip only for active
    polygonSeries.mapPolygons.template.adapters.add("tooltip", (tt, target) => {
      const name =
        target.dataItem?.dataContext?.name || target.dataItem?.get("name");
      return isActive(name) ? tooltip : null;
    });

    // ✅ tooltip: ONLY number + country (no %)
   polygonSeries.mapPolygons.template.adapters.add(
  "tooltipText",
  (text, target) => {
    const name =
      target.dataItem?.dataContext?.name || target.dataItem?.get("name");

    if (!activeSet.has(name)) return "";

    const raw = countryCounts?.[name];
    if (!raw) return "";

    // const formatted = Number(raw).toLocaleString();

    // return `${formatted}\n${name}`;
    return `${name}`;
  }
);

    polygonSeries.mapPolygons.template.events.on("pointerover", (ev) => {
      const name =
        ev.target.dataItem?.dataContext?.name ||
        ev.target.dataItem?.get("name");
      if (isActive(name)) setSelectedCountry(name);
    });

    polygonSeries.mapPolygons.template.events.on("pointerout", () => {
      setSelectedCountry(null);
    });

    chart.appear(800, 80);

    return () => {
      root.dispose();
      rootRef.current = null;
      polygonSeriesRef.current = null;
    };
    // 🔥 STEP 7 — Update useEffect dependency
  }, [activeSet, countryCounts]);

  // list hover -> highlight + tooltip
  const hoverCountryOnMap = (countryName) => {
    if (!activeSet.has(countryName)) return;
    const polygonSeries = polygonSeriesRef.current;
    if (!polygonSeries) return;

    const polygons = polygonSeries.mapPolygons.values;
    const poly = polygons.find((p) => {
      const nm = p.dataItem?.dataContext?.name || p.dataItem?.get("name");
      return nm === countryName;
    });

    polygons.forEach((p) => p.states.applyAnimate("default", { duration: 70 }));

    if (poly) {
      poly.states.applyAnimate("hover", { duration: 70 });
      poly.showTooltip();
    }
  };

  const resetMapHover = () => {
    const polygonSeries = polygonSeriesRef.current;
    if (!polygonSeries) return;

    const polygons = polygonSeries.mapPolygons.values;
    polygons.forEach((p) => p.states.applyAnimate("default", { duration: 70 }));
    polygons.forEach((p) => p.hideTooltip());
  };

  const totalCountries = meta?.countries ?? apiCountries.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="py-6 md:py-10"
    >
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 border border-blue-500 mb-3 md:mb-4">
            <FiGlobe className="text-white mr-2" />
            <span className="text-xs md:text-sm font-semibold text-white tracking-wider">
              GLOBAL REACH
            </span>
          </div>

          <h2 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6">
            Global Coverage
          </h2>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
            {totalCountries} Markets Worldwide • Local Expertise • Global
            Standards
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 max-w-4xl mx-auto gap-4 md:gap-6 mb-5 md:mb-10">
          {[
            {
              title: "Total Coverage",
              value: String(totalCountries),
              sub: "Countries Worldwide",
              icon: <FiGlobe className="text-white text-sm" />,
            },
            {
              title: "Response Rate",
              value: "99%",
              sub: "Industry Leading",
              icon: <FiTrendingUp className="text-white text-sm" />,
            },
          ].map((c) => (
            <div
              key={c.title}
              className="glass-car border border-blue-50/20 rounded-2xl p-5 md:p-6 relative overflow-hidden"
              style={{
                backgroundImage: `url(${BGIMAGE})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">
                  {c.title}
                </h3>
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center">
                  {c.icon}
                </div>
              </div>

              <div className="text-2xl flex items-center gap-3 md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-1 md:mb-2">
                {c.value}
                <span className="text-xs md:text-sm text-gray-400">
                  {c.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="glass-car p-6 text-center text-white/80">
            Loading global coverage…
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-4 bg-gradient-to-br gap-2 from-blue-900/10 to-teal-900/10 rounded-2xl overflow-hidden">
            {/* Countries List */}
            <div className="lg:col-span-1">
              <div className="glass-car h-full p-4 md:p-5">
                <h3 className="text-lg md:text-sm font-bold text-white mb-4 md:mb-6 flex items-center">
                  <MdLocationOn className="text-blue-400 mr-2" />
                  <span className="text-white">Countries Covered</span>
                  <span className="ml-2 text-xs md:text-sm text-gray-100">
                    ( {totalCountries} Total )
                  </span>
                </h3>

                <div className="space-y-4 max-h-[320px] md:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(regionData).map(([region, data]) => {
                    const regionCountries = Object.values(
                      data.countries,
                    ).flat();
                    return (
                      <div
                        key={region}
                        className="rounded-xl overflow-hidden border border-gray-800"
                      >
                        <button
                          onClick={() => toggleRegion(region)}
                          className="w-full flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2 md:gap-5">
                            <div
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 text-white flex items-center justify-center mr-3`}
                            >
                              {data.icon}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-white">{region}</h4>
                              <p className="text-xs text-gray-400">
                                {regionCountries.length} countries
                              </p>
                            </div>
                          </div>

                          {expandedRegion.includes(region) ? (
                            <FiChevronUp className="text-blue-400" />
                          ) : (
                            <FiChevronDown className="text-blue-400" />
                          )}
                        </button>

                        {expandedRegion.includes(region) && (
                          <div className="bg-gray-900/50 p-3 md:p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {regionCountries.map((country, idx) => (
                                <motion.div
                                  key={country}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: idx * 0.01,
                                  }}
                                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                    selectedCountry === country
                                      ? "bg-gradient-to-r from-teal-500/20 to-emerald-400/10 border border-teal-400/30"
                                      : "hover:bg-gray-800/50"
                                  }`}
                                  onMouseEnter={() => {
                                    setSelectedCountry(country);
                                    hoverCountryOnMap(country);
                                  }}
                                  onMouseLeave={() => {
                                    setSelectedCountry(null);
                                    resetMapHover();
                                  }}
                                >
                                  <>
                                    <svg width="0" height="0">
                                      <div>
                                        <linearGradient
                                          id="gradientStroke"
                                          x1="0%"
                                          y1="0%"
                                          x2="100%"
                                          y2="0%"
                                        >
                                          <stop
                                            offset="0%"
                                            stopColor="#06b6d4"
                                          />
                                          <stop
                                            offset="100%"
                                            stopColor="#22c55e"
                                          />
                                        </linearGradient>
                                      </div>
                                    </svg>

                                    <FiCheckCircle
                                      className="mr-2 flex-shrink-0"
                                      style={{ stroke: "url(#gradientStroke)" }}
                                    />
                                  </>
                                  <span
                                    className={`text-sm truncate ${
                                      selectedCountry === country
                                        ? "text-white font-medium"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    {country}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-3 relative">
              <div className="glass-car h-full px-2">
                <div className="bg-gradient-to-br from-blue-500/30  to-blue-950/30 rounded-xl  relative">
                  {/* ✅ Top badge: ONLY value + country (NO %) */}
                  {selectedCountry && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-3 md:top-6 left-1/2 -translate-x-1/2 z-20"
                    >
                      <div className="bg-gray-950/70 border border-teal-400/30 backdrop-blur-md text-white px-4 md:px-5 py-2 rounded-full shadow-lg">
                        <div className="flex items-center justify-center gap-2">
                          <FiMapPin className="text-white" />
                          {/* <span className="font-semibold tracking-wide text-sm md:text-base">
                            {countryCounts[selectedCountry]
                              ? Number(countryCounts[selectedCountry]).toLocaleString()
                              : "—"}
                          </span> */}
                          <span className="w-1 h-1 bg-white/50 rounded-full" />
                          <span className="font-semibold tracking-wide text-sm md:text-base">
                            {selectedCountry}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative rounded-lg overflow-hidden h-[46vh] sm:h-[60vh] md:h-[78vh] lg:h-[84vh] mt-3 md:mt-3 p-5 md:p-3">
                    <div ref={chartDivRef} className="w-full h-full" />
                  </div>

                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-teal-500/20 animate-float-slow">
                    <p className="text-xs text-teal-300 flex items-center">
                      <span className="mr-2">✨</span>
                      Hover highlighted countries
                    </p>
                  </div>

                  {/* <div className="absolute bottom-3 left-3 text-[10px] text-white/40">
                    Map attribution is required unless you have an amCharts
                    license.
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 md:mt-8" />
      </div>

      <style jsx global>{`
        .glass-car {
          background: rgba(30, 41, 59, 0.22);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #46f3b9, #b7ff3a);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #46f3b9, #22c55e);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float-slow {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
}
