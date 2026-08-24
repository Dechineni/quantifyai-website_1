import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const COLORS = ["#0066ff", "#00d4aa", "#9d4edd", "#f59e0b", "#ef4444"];

const norm = (s = "") => String(s).trim().toLowerCase();

const toNumber = (v) => {
  if (v === null || v === undefined) return NaN;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace("%", "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
};

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : NaN);

const getValueForCountry = (valuesObj = {}, country) => {
  if (!valuesObj || typeof valuesObj !== "object") return NaN;

  // exact
  if (valuesObj[country] != null) return toNumber(valuesObj[country]);

  // case-insensitive key match
  const key = Object.keys(valuesObj).find((k) => norm(k) === norm(country));
  if (key) return toNumber(valuesObj[key]);

  return NaN;
};

const titlesFor = (category) => {
  const c = String(category || "Category").trim();
  return {
    main: `${c} Overview`,
    pie: `${c} Share`,
    bar: `${c} Comparison (%)`,
    radar: `${c} Pattern`,
  };
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const p = payload[0];
    return (
      <div
        className="glass-card px-4 py-2 text-sm"
        style={{
          position: "relative",
          zIndex: 999999, // ✅ very high
          pointerEvents: "none", // ✅ prevents flicker on hover
        }}
      >
        <p className="font-semibold">{p.name}</p>
        <p className="text-blue-400">{Number(p.value).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};


const CategoryCharts = ({ rows = [], category = "", selectedCountry = "All", topN = 10 }) => {
  const t = titlesFor(category);

  const subtitle =
    selectedCountry === "All"
      ? "All Countries (average of available values)"
      : `Country: ${selectedCountry}`;

  const data = useMemo(() => {
    const items = rows
      .filter((r) => String(r?.category || "").trim() === category)
      .map((r) => {
        const valuesObj = r?.values || {};

        const allNums = Object.values(valuesObj)
          .map(toNumber)
          .filter(Number.isFinite);

        const value =
          selectedCountry === "All"
            ? avg(allNums)
            : getValueForCountry(valuesObj, selectedCountry);

        if (!Number.isFinite(value) || value <= 0) return null;

        return {
          name: String(r?.subcategory || "Unknown").trim(),
          value: +Number(value).toFixed(2), // ✅ already percent
        };
      })
      .filter(Boolean);

    items.sort((a, b) => b.value - a.value);

    // pie readability: topN + Others
    if (items.length > topN) {
      const top = items.slice(0, topN);
      const rest = items.slice(topN);
      const others = rest.reduce((s, x) => s + x.value, 0);
      if (others > 0) top.push({ name: "Others", value: +others.toFixed(2) });
      return top;
    }

    return items;
  }, [rows, category, selectedCountry, topN]);

  if (!data.length) {
    return (
      <div className="glass-card p-10 text-center text-gray-400">
        No data available for <span className="text-white">{category}</span>
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
          Showing{" "}
          <span className="text-white/80 font-semibold">{Math.min(topN, data.length)}</span>{" "}
          items {data.find((x) => x.name === "Others") ? "(+ Others)" : ""}
        </div>
      </div>

      {/* Charts */}
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
  content={<CustomTooltip />}
  cursor={{ fill: "transparent" }}
  wrapperStyle={{
    zIndex: 999999, // ✅ force tooltip layer on top
    outline: "none",
  }}
  allowEscapeViewBox={{ x: true, y: true }} // ✅ let tooltip escape chart box
/>
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
          <div className="text-xs text-gray-400 mb-3">
            Radar shows distribution “shape” across segments.
          </div>

          <ResponsiveContainer height={320}>
            <RadarChart data={data}>
              <PolarGrid stroke="#ffffff14" />
              <PolarAngleAxis dataKey="name" tick={{ fill: "#cbd5f5", fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: "#cbd5f5", fontSize: 11 }} />
              <Tooltip 
              wrapperStyle={{ zIndex: 999999 }}
              content={<CustomTooltip />} />
              <Radar dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCharts);
