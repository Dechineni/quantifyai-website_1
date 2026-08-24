import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

/* ===== THEME COLORS ===== */
const COLORS = ["#0066ff", "#00d4aa", "#9d4edd", "#f59e0b", "#ef4444"];

/* ===== TITLES ===== */
const TITLES = {
  Ethnicity: {
    main: "Ethnic Composition of Respondents",
    pie: "Population Share by Ethnicity",
    bar: "Top Ethnic Groups (%)",
    radar: "Ethnic Diversity Pattern",
  },
  Region: {
    main: "Geographic Distribution of Respondents",
    pie: "Regional Share",
    bar: "Top Regions (%)",
    radar: "Regional Distribution Pattern",
  },
  Education: {
    main: "Education Level Profile",
    pie: "Education Level Share",
    bar: "Top Education Levels (%)",
    radar: "Education Distribution Pattern",
  },
  Income: {
    main: "Income Range Distribution",
    pie: "Income Share by Range",
    bar: "Top Income Brackets (%)",
    radar: "Income Pattern",
  },
};

/* ===== CUSTOM TOOLTIP ===== */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const p = payload[0];
    return (
      <div className="glass-card px-4 py-2 text-sm">
        <p className="font-semibold">{p.name}</p>
        <p className="text-blue-400">{Number(p.value).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const avg = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const cx = (...classes) => classes.filter(Boolean).join(" ");

/**
 * rows: API rows
 * category: "Ethnicity" | "Region" | "Education" | "Income"
 * selectedCountry: "All" or exact country name
 * topN: show top N + group rest into "Others"
 */
const CategoryCharts = ({
  rows = [],
  category = "Income",
  selectedCountry = "All",
  topN = 10,
}) => {
  const t = TITLES[category] || {
    main: `${category} Overview`,
    pie: "Share",
    bar: "Top Categories (%)",
    radar: "Pattern View",
  };

  const subtitle =
    selectedCountry === "All"
      ? "Global overview (average across available countries)"
      : `Breakdown in ${selectedCountry}`;

  const data = useMemo(() => {
    const items = rows
      .filter((r) => String(r.category).trim() === category)
      .map((r) => {
        const valuesObj = r.values || {};
        const values = Object.values(valuesObj)
          .map(toNumber)
          .filter((n) => n > 0);

        const value =
          selectedCountry === "All"
            ? avg(values) // ✅ average % across countries
            : toNumber(valuesObj?.[selectedCountry]); // ✅ country % (already)

        return {
          name: r.subcategory,
          value: Number(value.toFixed(2)), // ✅ already percent
        };
      })
      .filter((d) => d.value > 0);

    // sort desc
    items.sort((a, b) => b.value - a.value);

    // topN + Others for pie readability
    if (items.length > topN) {
      const top = items.slice(0, topN);
      const rest = items.slice(topN);
      const others = rest.reduce((s, x) => s + x.value, 0);
      if (others > 0) top.push({ name: "Others", value: Number(others.toFixed(2)) });
      return top;
    }

    return items;
  }, [rows, category, selectedCountry, topN]);

  if (!data.length) {
    return (
      <div className="glass-card p-10 text-center text-gray-400">
        No {category} data available
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-xl font-semibold">{t.main}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>

        <div className="text-xs text-gray-400">
          Showing <span className="text-white/80 font-semibold">{Math.min(topN, data.length)}</span>{" "}
          items {data.find((x) => x.name === "Others") ? "(+ Others)" : ""}
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* PIE */}
        <div className="glass-card p-6">
          <h4 className="text-base font-semibold mb-3">{t.pie}</h4>
          <ResponsiveContainer height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={98}
                paddingAngle={6}
                animationDuration={900}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
              wrapperStyle={{ zIndex: 999999 }}
              content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="glass-card p-6 lg:col-span-2">
          <h4 className="text-base font-semibold mb-3">{t.bar}</h4>

          <ResponsiveContainer height={260}>
            <BarChart data={data} barSize={34} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis
                dataKey="name"
                stroke="#cbd5f5"
                tick={{ fontSize: 11 }}
                interval={0}
                angle={-18}
                textAnchor="end"
                height={70}
              />
              <YAxis stroke="#cbd5f5" unit="%" tick={{ fontSize: 12 }} />
              <Tooltip 
              wrapperStyle={{ zIndex: 999999 }}
              content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={800}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RADAR */}
        <div className="glass-card p-6 lg:col-span-3">
          <h4 className="text-base font-semibold mb-3">{t.radar}</h4>

          <div className={cx("text-xs text-gray-400 mb-3")}>
            Radar shows the “shape” of distribution (useful for quick pattern recognition).
          </div>

          <ResponsiveContainer height={320}>
            <RadarChart data={data}>
              <PolarGrid stroke="#ffffff14" />
              <PolarAngleAxis dataKey="name" tick={{ fill: "#cbd5f5", fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: "#cbd5f5", fontSize: 11 }} />
              <Tooltip 
              wrapperStyle={{ zIndex: 999999 }}
              content={<CustomTooltip />} />
              <Radar
                dataKey="value"
                stroke={COLORS[0]}
                fill={COLORS[0]}
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCharts);
