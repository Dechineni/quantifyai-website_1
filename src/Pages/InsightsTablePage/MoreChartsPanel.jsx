import React, { useMemo, useState } from "react";
import CategoryCharts from "./CategoryCharts";

const normalizeCountry = (v) => String(v || "").trim();

const MoreChartsPanel = ({ rows = [], countries = [], selectedCountry }) => {
  const [tab, setTab] = useState("Ethnicity");
  const [country, setCountry] = useState(selectedCountry || "All");

  const tabs = ["Ethnicity", "Region", "Education", "Income"];

  const countryOptions = useMemo(() => {
    const list = (countries || []).map((c) => normalizeCountry(c?.name)).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [countries]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${tab === t ? "bg-white/10 text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Country dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Country:</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 outline-none"
          >
            {countryOptions.map((c) => (
              <option key={c} value={c} className="text-black">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts */}
      <CategoryCharts rows={rows} category={tab} selectedCountry={country} topN={tab === "Income" ? 12 : 10} />
    </div>
  );
};

export default MoreChartsPanel;
