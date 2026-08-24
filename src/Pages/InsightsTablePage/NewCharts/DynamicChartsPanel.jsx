import React, { useMemo, useState } from "react";
import CategoryCharts from "./CategoryCharts";

/* helpers */
const norm = (v = "") => String(v).trim().toLowerCase();

const unique = (arr) => Array.from(new Set(arr));

const DynamicChartsPanel = ({
  rows = [],
  countries = [],          // array of country names
  selectedCountry = "All", // from page
  metric = "",
}) => {
  // ✅ categories from API (works for both demographics & income)
  const categories = useMemo(() => {
    const cats = rows.map((r) => String(r?.category || "").trim()).filter(Boolean);
    return unique(cats);
  }, [rows]);

  // ✅ default category based on metric
  const defaultCategory = useMemo(() => {
    if (!categories.length) return "";
    if (metric === "demographics") {
      return categories.includes("Gender") ? "Gender" : categories[0];
    }
    if (metric === "income") {
      return categories.includes("Ethnicity") ? "Ethnicity" : categories[0];
    }
    return categories[0];
  }, [categories, metric]);

  const [country, setCountry] = useState(selectedCountry || "All");
  const [category, setCategory] = useState(defaultCategory);
  const [subcategory, setSubcategory] = useState("All");
  const [search, setSearch] = useState("");

  // keep panel country in sync when page dropdown changes
  React.useEffect(() => {
    setCountry(selectedCountry || "All");
  }, [selectedCountry]);

  // keep category valid when rows/metric changes
  React.useEffect(() => {
    setCategory((prev) => (categories.includes(prev) ? prev : defaultCategory));
    setSubcategory("All");
    setSearch("");
  }, [categories, defaultCategory]);

  // subcategories for selected category
  const subcategories = useMemo(() => {
    const list = rows
      .filter((r) => String(r?.category || "").trim() === category)
      .map((r) => String(r?.subcategory || "").trim())
      .filter(Boolean);

    const uniq = unique(list).sort((a, b) => a.localeCompare(b));
    return ["All", ...uniq];
  }, [rows, category]);

  // rows filtered by category + subcategory + search
  const filteredRows = useMemo(() => {
    let r = rows.filter((x) => String(x?.category || "").trim() === category);

    if (subcategory !== "All") {
      r = r.filter((x) => String(x?.subcategory || "").trim() === subcategory);
    }

    if (search.trim()) {
      const q = norm(search);
      r = r.filter((x) => norm(x?.subcategory).includes(q));
    }

    return r;
  }, [rows, category, subcategory, search]);

  if (!rows.length) {
    return (
      <div className="glass-card p-10 text-center text-gray-400">
        No data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card p-4">
        <div className="grid md:grid-cols-3 gap-3">
          {/* Country */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/70">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 outline-none"
            >
              <option value="All" className="text-black">
                All (Average)
              </option>
              {countries.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/70">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("All");
                setSearch("");
              }}
              className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/70">Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 outline-none"
            >
              {subcategories.map((s) => (
                <option key={s} value={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          {/* <div className="flex flex-col gap-1">
            <label className="text-xs text-white/70">Search subcategory</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. japanese, white, 20,000..."
              className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 outline-none placeholder:text-white/30"
            />
          </div> */}
        </div>

        <div className="mt-3 text-xs text-white/60">
          Showing <span className="text-white">{filteredRows.length}</span> rows for{" "}
          <span className="text-white">{category}</span>
          {subcategory !== "All" ? ` → ${subcategory}` : ""}{" "}
          {country !== "All" ? `| ${country}` : "| All (Average)"}
        </div>
      </div>

      {/* Charts */}
      <CategoryCharts
        rows={filteredRows}
        category={category}
        selectedCountry={country}
        topN={category === "Income" ? 12 : 10}
      />
    </div>
  );
};

export default React.memo(DynamicChartsPanel);
