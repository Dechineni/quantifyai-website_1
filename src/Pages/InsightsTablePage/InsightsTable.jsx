import React from "react";

const InsightsTable = ({ rows, countries }) => {
  return (
    <div className=" overflow-x-auto max-h-[75vh]">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-blue-800 rounded-t-3xl text-sm z-20">
          <tr className="">
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Segment</th>
            {countries.map((c) => (
              <th key={c} className="px-3 py-3 text-center text-sm">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="px-4 py-2">{r.category}</td>
              <td className="px-4 py-2 text-gray-300">{r.subcategory}</td>
              {countries.map((c) => (
                <td key={c} className="px-3 py-2 text-center">
                  {r.values[c] ? `${r.values[c]}%` : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(InsightsTable);
