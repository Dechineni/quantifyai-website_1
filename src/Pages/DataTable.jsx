import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const DataTable = () => {
  const [countries, setCountries] = useState([]);
  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState("demographics");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'chart'
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Chart colors
  const CHART_COLORS = {
    primary: "#3B82F6",
    secondary: "#1E40AF",
    accent: "#60A5FA",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    purple: "#8B5CF6",
    pink: "#EC4899",
  };

  const colorPalette = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.accent,
    CHART_COLORS.success,
    CHART_COLORS.warning,
    CHART_COLORS.danger,
    CHART_COLORS.purple,
    CHART_COLORS.pink,
  ];

  useEffect(() => {
    const countryList = [
      "Argentina",
      "Australia",
      "Austria",
      "Bahrain",
      "Belgium",
      "Brazil",
      "Canada",
      "Chile",
      "China",
      "Germany",
      "India",
      "Japan",
      "UK",
      "USA",
      "France",
      "Italy",
      "Spain",
      "Mexico",
    ];

    setCountries(countryList);

    const sampleRows = [
      {
        category: "Gender",
        subcategory: "Female",
        values: {
          Argentina: 0.43,
          Australia: 0.57,
          Austria: 0.54,
          Bahrain: 0.22,
          Belgium: 0.57,
          Brazil: 0.43,
          Canada: 0.59,
          Chile: 0.47,
          China: 0.47,
          Germany: 0.45,
          India: 0.24,
          Japan: 0.59,
          UK: 0.57,
          USA: 0.62,
          France: 0.49,
          Italy: 0.48,
          Spain: 0.44,
          Mexico: 0.38,
        },
      },
      {
        category: "Gender",
        subcategory: "Male",
        values: {
          Argentina: 0.57,
          Australia: 0.43,
          Austria: 0.46,
          Bahrain: 0.78,
          Belgium: 0.43,
          Brazil: 0.57,
          Canada: 0.41,
          Chile: 0.53,
          China: 0.53,
          Germany: 0.55,
          India: 0.76,
          Japan: 0.41,
          UK: 0.43,
          USA: 0.38,
          France: 0.51,
          Italy: 0.52,
          Spain: 0.56,
          Mexico: 0.62,
        },
      },
      {
        category: "Age Range",
        subcategory: "18-24",
        values: {
          Argentina: 0.37,
          Australia: 0.3,
          Austria: 0.32,
          Bahrain: 0.01,
          Belgium: 0.28,
          Brazil: 0.43,
          Canada: 0.27,
          Chile: 0.37,
          China: 0.37,
          Germany: 0.35,
          India: 0.46,
          Japan: 0.14,
          UK: 0.33,
          USA: 0.3,
          France: 0.37,
          Italy: 0.27,
          Spain: 0.32,
          Mexico: 0.43,
        },
      },
      {
        category: "Age Range",
        subcategory: "25-34",
        values: {
          Argentina: 0.28,
          Australia: 0.25,
          Austria: 0.26,
          Bahrain: 0.24,
          Belgium: 0.21,
          Brazil: 0.28,
          Canada: 0.26,
          Chile: 0.3,
          China: 0.33,
          Germany: 0.27,
          India: 0.29,
          Japan: 0.28,
          UK: 0.25,
          USA: 0.26,
          France: 0.24,
          Italy: 0.25,
          Spain: 0.27,
          Mexico: 0.31,
        },
      },
      {
        category: "Age Range",
        subcategory: "35-44",
        values: {
          Argentina: 0.16,
          Australia: 0.16,
          Austria: 0.17,
          Bahrain: 0.36,
          Belgium: 0.16,
          Brazil: 0.12,
          Canada: 0.17,
          Chile: 0.14,
          China: 0.12,
          Germany: 0.14,
          India: 0.11,
          Japan: 0.23,
          UK: 0.15,
          USA: 0.16,
          France: 0.15,
          Italy: 0.2,
          Spain: 0.19,
          Mexico: 0.12,
        },
      },
      {
        category: "Income",
        subcategory: "Prefer not to answer",
        values: {
          Argentina: 0.18,
          Australia: 0.11,
          Austria: 0.22,
          Bahrain: 0.15,
          Belgium: 0.26,
          Brazil: 0.15,
          Canada: 0.17,
          Chile: 0.21,
          China: 0.08,
          Germany: 0.17,
          India: 0.12,
          Japan: 0.21,
          UK: 0.12,
          USA: 0.14,
          France: 0.18,
          Italy: 0.17,
          Spain: 0.15,
          Mexico: 0.12,
        },
      },
    ];

    setRows(sampleRows);
    setIsLoading(false);
  }, []);

  const formatValue = (value) => {
    if (typeof value === "number") {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value || "-";
  };

  const filteredRows = rows.filter((row) => {
    if (activeTab === "demographics") {
      return row.category === "Gender" || row.category === "Age Range";
    } else {
      return row.category === "Income";
    }
  });

  // Prepare data for charts
  const getChartData = () => {
    if (selectedCountry === "All") {
      // Return aggregated data for all countries
      return countries
        .map((country) => {
          const dataPoint = { country };
          filteredRows.forEach((row) => {
            const value = row.values[country] || 0;
            dataPoint[row.subcategory] = value * 100; // Convert to percentage
          });
          return dataPoint;
        })
        .slice(0, 10); // Limit to 10 countries for better visualization
    } else {
      // Return data for selected country
      return filteredRows.map((row) => ({
        category: row.subcategory,
        value: (row.values[selectedCountry] || 0) * 100,
        fill: colorPalette[filteredRows.indexOf(row) % colorPalette.length],
      }));
    }
  };

  // Get top countries for a specific metric
  const getTopCountries = (metric) => {
    const countryData = countries
      .map((country) => {
        const row = filteredRows.find((r) => r.subcategory === metric);
        return {
          name: country,
          value: row ? (row.values[country] || 0) * 100 : 0,
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return countryData.map((item, index) => ({
      ...item,
      fill: colorPalette[index % colorPalette.length],
    }));
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Subcategory
              </th>
              {countries.map((country) => (
                <th
                  key={country}
                  className="px-4 py-4 text-left text-sm font-semibold text-blue-300 uppercase tracking-wider min-w-[130px]"
                >
                  <div className="truncate max-w-[120px]" title={country}>
                    {country}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {filteredRows.map((row, index) => (
              <tr
                key={`${row.category}-${row.subcategory}-${index}`}
                className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {row.category}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{row.subcategory}</div>
                </td>
                {countries.map((country) => {
                  const value = row.values[country];
                  const displayValue = formatValue(value);
                  const isPercentage = typeof value === "number";

                  return (
                    <td
                      key={`${row.subcategory}-${country}`}
                      className="px-4 py-4 whitespace-nowrap"
                    >
                      <div className="flex items-center space-x-3">
                        {isPercentage && value > 0 && (
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(value * 100, 100)}%`,
                              }}
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            isPercentage
                              ? "font-medium text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {displayValue}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCharts = () => {
    const chartData = getChartData();
    const topGenderCountries = getTopCountries("Female");
    const topAgeCountries = getTopCountries("18-24");

    return (
      <div className="space-y-8">
        {/* Country Selector */}
        <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Country Selection
            </h3>
            <p className="text-sm text-gray-400">
              Select a country to view detailed data
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
            >
              <option value="All">All Countries (Comparative View)</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedCountry === "All" ? (
            <>
              {/* Comparative Bar Chart */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Gender Distribution by Country
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="country" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        label={{
                          value: "%",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#9CA3AF",
                        }}
                      />
                      <Tooltip
                      wrapperStyle={{ zIndex: 999999 }}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#4B5563",
                          color: "white",
                        }}
                        formatter={(value) => [`${value.toFixed(1)}%`, "Value"]}
                      />
                      <Legend />
                      <Bar
                        dataKey="Female"
                        fill={CHART_COLORS.pink}
                        name="Female %"
                      />
                      <Bar
                        dataKey="Male"
                        fill={CHART_COLORS.primary}
                        name="Male %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Age Distribution Trends
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="country" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        label={{
                          value: "%",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#9CA3AF",
                        }}
                      />
                      <Tooltip
                      wrapperStyle={{ zIndex: 999999 }}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#4B5563",
                          color: "white",
                        }}
                        formatter={(value) => [`${value.toFixed(1)}%`, "Value"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="18-24"
                        stroke={CHART_COLORS.success}
                        strokeWidth={2}
                        name="18-24 %"
                      />
                      <Line
                        type="monotone"
                        dataKey="25-34"
                        stroke={CHART_COLORS.warning}
                        strokeWidth={2}
                        name="25-34 %"
                      />
                      <Line
                        type="monotone"
                        dataKey="35-44"
                        stroke={CHART_COLORS.purple}
                        strokeWidth={2}
                        name="35-44 %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Single Country Pie Chart */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Distribution in {selectedCountry}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, value }) =>
                          `${category}: ${value.toFixed(1)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="category"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                      wrapperStyle={{ zIndex: 999999 }}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#4B5563",
                          color: "white",
                        }}
                        formatter={(value) => [
                          `${value.toFixed(1)}%`,
                          "Percentage",
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Single Country Bar Chart */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Detailed Breakdown for {selectedCountry}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="category" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        label={{
                          value: "%",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#9CA3AF",
                        }}
                      />
                      <Tooltip
                      wrapperStyle={{ zIndex: 999999 }}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#4B5563",
                          color: "white",
                        }}
                        formatter={(value) => [`${value.toFixed(1)}%`, "Value"]}
                      />
                      <Bar
                        dataKey="value"
                        fill={CHART_COLORS.primary}
                        name="Percentage"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Countries for Female Population */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Top Countries: Female Population
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topGenderCountries} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    horizontal={false}
                  />
                  <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9CA3AF"
                    width={80}
                  />
                  <Tooltip
                  wrapperStyle={{ zIndex: 999999 }}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#4B5563",
                      color: "white",
                    }}
                    formatter={(value) => [
                      `${value.toFixed(1)}%`,
                      "Female Population",
                    ]}
                  />
                  <Bar
                    dataKey="value"
                    fill={CHART_COLORS.pink}
                    name="Female %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Countries for Young Population */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Top Countries: Youth Population (18-24)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={topAgeCountries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis
                    stroke="#9CA3AF"
                    label={{
                      value: "%",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#9CA3AF",
                    }}
                  />
                  <Tooltip
                  wrapperStyle={{ zIndex: 999999 }}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#4B5563",
                      color: "white",
                    }}
                    formatter={(value) => [
                      `${value.toFixed(1)}%`,
                      "Youth Population",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_COLORS.success}
                    fill={CHART_COLORS.success}
                    fillOpacity={0.3}
                    name="18-24 %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3">
            Chart Legend
          </h4>
          <div className="flex flex-wrap gap-4">
            {colorPalette.map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-300">
                  Series {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl text-white">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/10 py-0 md:py-22">
      <div className="max-w-full mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/10"></div>
          <div className="relative container mx-auto px-4 ">
            <div className="max-w-4xl mx-auto text-center">
              {/* <div className="inline-flex items-center justify-center w-20 h-20 glass-card rounded-2xl mb-8 animate-fade-in-up">
                      {service.icon}
                    </div> */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block gradient-text text-white mb-2">
                  Global Data Analytics Dashboard
                </span>
                {/* <span className="gradient-text text-2xl">Analytics Dashboard</span> */}
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Interactive visualization of demographic and income data across{" "}
                {countries.length} countries
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="mt-4 md:mt-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
<div className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-800 border-b border-gray-700 gap-3 md:gap-0 p-2 md:p-0">

  {/* Left Tabs */}
  <div className="flex flex-wrap w-full md:w-auto">
    <button
      className={`flex-1 md:flex-none px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base transition-all duration-300 ${
        activeTab === "demographics"
          ? "text-blue-400 border-b-2 border-blue-400 bg-gray-900"
          : "text-gray-400 hover:text-blue-300 hover:bg-gray-700"
      }`}
      onClick={() => setActiveTab("demographics")}
    >
      📈 Demographics
    </button>

    <button
      className={`flex-1 md:flex-none px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base transition-all duration-300 ${
        activeTab === "income"
          ? "text-blue-400 border-b-2 border-blue-400 bg-gray-900"
          : "text-gray-400 hover:text-blue-300 hover:bg-gray-700"
      }`}
      onClick={() => setActiveTab("income")}
    >
      💰 Income Data
    </button>
  </div>

  {/* Right Toggle Button */}
  <div className="w-full md:w-auto flex justify-end md:justify-normal">
    <button
      onClick={() =>
        setViewMode(viewMode === "table" ? "chart" : "table")
      }
      className="w-full md:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
    >
      <span>{viewMode === "table" ? "📊" : "📋"}</span>
      <span className="text-sm md:text-base">
        Switch to {viewMode === "table" ? "Chart View" : "Table View"}
      </span>
    </button>
  </div>
</div>


        {/* View Mode Indicator */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  viewMode === "table" ? "bg-green-500" : "bg-blue-500"
                }`}
              ></div>
              <span className="text-white font-medium">
                {viewMode === "table" ? "Table View" : "Chart View"} -{" "}
                {activeTab === "demographics" ? "Demographics" : "Income Data"}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {filteredRows.length} metrics • {countries.length} countries
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900 rounded-b-2xl shadow-2xl overflow-hidden">
          {viewMode === "table" ? renderTable() : renderCharts()}

          {/* Mobile warning for table view */}
          {viewMode === "table" && (
            <div className="md:hidden p-3 bg-gray-800 border-t border-gray-700">
              <p className="text-xs text-blue-300 text-center">
                <span className="font-bold">💡 Tip:</span> Swipe horizontally to
                view all countries
              </p>
            </div>
          )}

          {/* Dashboard Stats */}
          <div className="border-t border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-5 rounded-xl shadow-lg">
                <div className="text-sm text-blue-200">Total Countries : {countries.length}</div>
               
                <div className="text-xs text-blue-300 mt-1">
                  🌍 Global coverage
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-xl shadow-lg">
                <div className="text-sm text-gray-300">Data Metrics : {filteredRows.length}</div>
                
                <div className="text-xs text-gray-400 mt-1">
                  📊 Active {activeTab}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-5 rounded-xl shadow-lg">
                <div className="text-sm text-blue-200">Current View</div>
                <div className=" font-bold text-white mt-2 capitalize">
                  {viewMode} :  {viewMode === "table"
                    ? "📋 Tabular data"
                    : "📈 Visual analytics"}
                </div>
               
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-xl shadow-lg">
                <div className="text-sm text-gray-300">Selected Country</div>
                <div className=" font-bold text-white mt-2 truncate">
                  {viewMode === "chart" ? selectedCountry : "All"} :  {viewMode === "chart"
                    ? "🎯 Filter applied"
                    : "🌐 Comparative view"}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                 
                </div>
              </div>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default DataTable;
