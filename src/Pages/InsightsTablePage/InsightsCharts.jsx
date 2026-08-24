import React, { useMemo, useState } from "react";
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
} from "recharts";

const COLORS = ["#0066ff", "#00d4aa", "#9d4edd", "#f59e0b", "#ef4444"];

/* ---------------- helpers ---------------- */
const norm = (s = "") => String(s).trim().toLowerCase().replace(/\s+/g, " ");

// "12%" -> 12, " 0.23 " -> 0.23, 12 -> 12
const toNumber = (v) => {
  if (v === null || v === undefined) return NaN;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace("%", "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
};

const getCountryValue = (valuesObj = {}, selectedCountry) => {
  if (!valuesObj || typeof valuesObj !== "object") return NaN;

  // exact key match
  if (
    selectedCountry &&
    selectedCountry !== "All" &&
    valuesObj[selectedCountry] != null
  ) {
    return toNumber(valuesObj[selectedCountry]);
  }

  // case-insensitive key match
  if (selectedCountry && selectedCountry !== "All") {
    const key = Object.keys(valuesObj).find((k) => norm(k) === norm(selectedCountry));
    if (key) return toNumber(valuesObj[key]);
  }

  // fallback first numeric
  const firstNumeric = Object.values(valuesObj).map(toNumber).find(Number.isFinite);
  return Number.isFinite(firstNumeric) ? firstNumeric : NaN;
};

const pickCategory = (rows, aliases = []) => {
  const available = new Set(rows.map((r) => norm(r?.category)));
  const found = aliases.find((a) => available.has(norm(a)));
  return found || null;
};

const buildData = (rows, selectedCountry, categoryAliases = []) => {
  const picked = pickCategory(rows, categoryAliases);
  if (!picked) return { picked: null, data: [] };

  const data = rows
    .filter((r) => norm(r?.category) === norm(picked))
    .map((r) => {
      const valuesObj = r?.values || {};
      const allNums = Object.values(valuesObj)
        .map(toNumber)
        .filter(Number.isFinite);

      if (!allNums.length) return null;

      const raw =
        selectedCountry === "All"
          ? allNums.reduce((a, b) => a + b, 0) / allNums.length
          : getCountryValue(valuesObj, selectedCountry);

      if (!Number.isFinite(raw)) return null;

      // handle 0..1 or 0..100 automatically
      const pct = raw <= 1 ? raw * 100 : raw;

      return {
        name: r?.subcategory || "Unknown",
        value: +pct.toFixed(1),
      };
    })
    .filter(Boolean)
    .filter((d) => Number.isFinite(d.value) && d.value > 0);

  // sort high -> low for clean bars
  data.sort((a, b) => b.value - a.value);

  return { picked, data };
};

/* ---------------- UI components ---------------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const p = payload[0];
    return (
      <div className="glass-card px-4 py-2 text-sm">
        <p className="font-semibold">{p.name}</p>
        <p className="text-blue-400">{p.value}%</p>
      </div>
    );
  }
  return null;
};

const PieCard = ({ title, subtitle, data, activeIndex, onSliceClick }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

      <ResponsiveContainer height={280}>
        <PieChart>
          <Pie
            data={activeIndex === null ? data : [data[activeIndex]]}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={5}
            animationDuration={900}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.25}
                onClick={() => onSliceClick?.(i)}
                className={onSliceClick ? "cursor-pointer" : ""}
              />
            ))}
          </Pie>
          <Tooltip
          
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
            wrapperStyle={{ zIndex: 9999 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {onSliceClick && (
        <p className="text-xs text-white/60 mt-3">
          Tip: click slice to focus, click again to reset.
        </p>
      )}
    </div>
  );
};

const BarCard = ({ title, subtitle, data }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

      <ResponsiveContainer height={280}>
        <BarChart data={data} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            dataKey="name"
            stroke="#cbd5f5"
            tick={{ fontSize: 12 }}
            angle={-25}
            height={70}
          />
          <YAxis stroke="#cbd5f5" unit="%" tick={{ fontSize: 12 }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
            wrapperStyle={{ zIndex: 9999 }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ---------------- main component ---------------- */
const InsightsCharts = ({ rows = [], selectedCountry = "All" }) => {
  // slice focus states
  const [activeGender, setActiveGender] = useState(null);
  const [activeEthnicity, setActiveEthnicity] = useState(null);

  // OPTIONAL: helpful debug (keep it for now)
  // console.log("CATEGORIES:", [...new Set(rows.map((r) => r.category))]);
  // console.log("SAMPLE ROW:", rows[0]);

  const subtitle =
    selectedCountry === "All"
      ? "Global Average"
      : `Distribution in ${selectedCountry}`;

  // ✅ Smart aliases (works even if API names differ)
  const gender = useMemo(
    () =>
      buildData(rows, selectedCountry, [
        "Gender",
        "Sex",
        "Gender Identity",
      ]),
    [rows, selectedCountry]
  );

  const age = useMemo(
    () =>
      buildData(rows, selectedCountry, [
        "Age Range",
        "Age",
        "Age Group",
        "Age Bracket",
      ]),
    [rows, selectedCountry]
  );

  const ethnicity = useMemo(
    () =>
      buildData(rows, selectedCountry, [
        "Ethnicity",
        "Ethnic Group",
        "Race",
        "Ethnic",
      ]),
    [rows, selectedCountry]
  );

  const region = useMemo(
    () =>
      buildData(rows, selectedCountry, [
        "Region",
        "Geography",
        "Area",
        "Location",
        "Location Region",
      ]),
    [rows, selectedCountry]
  );

  const education = useMemo(
    () =>
      buildData(rows, selectedCountry, [
        "Education",
        "Education Level",
        "Qualification",
        "Education Qualification",
        "Highest Education",
      ]),
    [rows, selectedCountry]
  );

  const hasAny =
    gender.data.length ||
    age.data.length ||
    ethnicity.data.length ||
    region.data.length ||
    education.data.length;

  if (!hasAny) {
    return (
      <div className="glass-card p-10 text-center text-gray-400">
        No chart data available for this selection.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Row 1: Gender + Age */}
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up">
        {gender.data.length > 0 && (
          <PieCard
            title="Gender Distribution"
            subtitle={subtitle}
            data={gender.data}
            activeIndex={activeGender}
            onSliceClick={(i) => setActiveGender(activeGender === i ? null : i)}
          />
        )}

        {age.data.length > 0 && (
          <BarCard
            title="Age Distribution"
            subtitle="Clear percentage comparison"
            data={age.data}
          />
        )}
      </div>

      {/* Row 2: Ethnicity (Pie + Bar) */}
      {ethnicity.data.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up">
          <PieCard
            title="Ethnicity Distribution"
            subtitle={subtitle}
            data={ethnicity.data}
            activeIndex={activeEthnicity}
            onSliceClick={(i) =>
              setActiveEthnicity(activeEthnicity === i ? null : i)
            }
          />

          <BarCard
            title="Ethnicity Comparison"
            subtitle="Clear percentage comparison"
            data={ethnicity.data}
          />
        </div>
      )}

      {/* Row 3: Region + Education */}
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up">
        {region.data.length > 0 && (
          <BarCard
            title="Region Distribution"
            subtitle={subtitle}
            data={region.data}
          />
        )}

        {education.data.length > 0 && (
          <BarCard
            title="Education Distribution"
            subtitle={subtitle}
            data={education.data}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(InsightsCharts);
