import React, { useEffect, useState, lazy, Suspense, useMemo, useCallback } from "react";
import axios from "axios";
import { exportToExcel } from "./ExcelExport";
import HeroBg from "../../assets/imgs/hero-bg2.png";

const InsightsTable = lazy(() => import("./InsightsTable"));
const DynamicChartsPanel = lazy(() => import("./NewCharts/DynamicChartsPanel"));

const API = "https://quantifyaiapi.mavenerp.in/public/api/insights";
const YEAR = 2024;

// helper
const toSlug = (v = "") => String(v).trim().toLowerCase();

const InsightsPage = () => {
  const [metric, setMetric] = useState("demographics");
  const [rows, setRows] = useState([]);
  const [countries, setCountries] = useState([]); // [{name, slug}]
  const [view, setView] = useState("table");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchCountries = useCallback(async () => {
    const res = await axios.get(API, { params: { metric_type: metric, year: YEAR } });

    const apiCountries = res?.data?.data?.countries ?? [];
    const normalized = Array.isArray(apiCountries)
      ? apiCountries
          .map((c) => {
            const name = c?.name ?? c?.country ?? c?.label;
            const slug = c?.slug ?? c?.code ?? c?.key ?? toSlug(name);
            return name ? { name, slug } : null;
          })
          .filter(Boolean)
      : [];

    setCountries(normalized);
    return normalized;
  }, [metric]);

  const fetchRows = useCallback(
    async (countrySlugOrAll) => {
      const isAll = countrySlugOrAll === "All";
      const res = await axios.get(API, {
        params: {
          metric_type: metric,
          year: YEAR,
          ...(isAll ? {} : { country: countrySlugOrAll }),
        },
      });
      return res?.data?.data?.rows ?? [];
    },
    [metric]
  );

  // metric change
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setSelectedCountry("All");

        await fetchCountries();
        const apiRows = await fetchRows("All");
        if (!mounted) return;
        setRows(apiRows);
      } catch (err) {
        console.error("Insights API error:", err);
        if (!mounted) return;
        setRows([]);
        setCountries([]);
        setSelectedCountry("All");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [metric, fetchCountries, fetchRows]);

  // country change
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!countries.length) return;
        setLoading(true);

        if (selectedCountry === "All") {
          const apiRows = await fetchRows("All");
          if (!mounted) return;
          setRows(apiRows);
        } else {
          const found = countries.find((c) => c.name === selectedCountry);
          const slug = found?.slug ?? toSlug(selectedCountry);

          const apiRows = await fetchRows(slug);
          if (!mounted) return;
          setRows(apiRows);
        }
      } catch (err) {
        console.error("Insights API error:", err);
        if (!mounted) return;
        setRows([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedCountry, countries, fetchRows]);

  const visibleCountries = useMemo(() => {
    if (selectedCountry === "All") return countries.map((c) => c.name);
    return countries.some((c) => c.name === selectedCountry) ? [selectedCountry] : [];
  }, [countries, selectedCountry]);

  return (
    <main
      className="relative min-h-screen text-white px-5"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%),
                          radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%),
                          url(${HeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="py-30 text-center">
        <h1 className="text-5xl font-bold gradient-text pb-5">Global Insights</h1>
      </section>

      {/* Metric + Country + View + Export */}
      <div className="flex max-w-7xl flex-wrap gap-4 justify-between mb-6">
        <div className="flex gap-3 flex-wrap uppercase capitalize">
          {["demographics", "income"].map((t) => (
            <button
              key={t}
              onClick={() => setMetric(t)}
              className={`px-5 py-2 rounded-full ${
                metric === t ? "gradient-bg uppercase" : "border uppercase border-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="gradient-bg border border-white/10 px-4 py-2 rounded-lg"
            disabled={loading || countries.length === 0}
          >
            <option value="All" className="text-blue-900">
              All Countries
            </option>
            {countries.map((c) => (
              <option className="text-blue-900" key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setView(view === "table" ? "chart" : "table")}
            className="gradient-bg px-5 py-2 rounded-lg"
            disabled={loading}
          >
            {view === "table" ? "Charts" : "Table"}
          </button>

          <button
            onClick={() => exportToExcel(rows, visibleCountries, `${metric}-${selectedCountry}`)}
            className="border border-white/20 px-5 py-2 rounded-lg"
            disabled={loading || rows.length === 0 || visibleCountries.length === 0}
          >
            Download Excel
          </button>
        </div>
      </div>

      {!loading && (
        <div className="mb-4 text-sm text-white/70">
          Rows: <span className="text-white">{rows.length}</span> | Countries showing:{" "}
          <span className="text-white">{visibleCountries.length}</span>
          {selectedCountry !== "All" ? ` | ${selectedCountry}` : ""}
        </div>
      )}

      <Suspense fallback={<div className="glass-card p-6">Loading…</div>}>
        {loading && <div className="glass-card p-6">Loading…</div>}

        {!loading && view === "table" && (
          <InsightsTable rows={rows} countries={visibleCountries} />
        )}

        {!loading && view === "chart" && (
          <DynamicChartsPanel
            rows={rows}
            countries={countries.map((c) => c.name)}
            selectedCountry={selectedCountry}
            metric={metric}
          />
        )}
      </Suspense>
    </main>
  );
};

export default InsightsPage;
