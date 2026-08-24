// WorldBranchesMap.jsx
import React from "react";
import { motion } from "framer-motion";
import mapImg from "../assets/profile/map.png";

const BRANCHES = [
  // The Americas – NORTH
  { country: "United States", region: "Americas", top: "37%", left: "18%" },
  { country: "Canada", region: "Americas", top: "24%", left: "20%" },
  { country: "Mexico", region: "Americas", top: "45%", left: "18%" },

  // The Americas – SOUTH
  { country: "Colombia", region: "Americas", top: "55%", left: "23%" },
  { country: "Brazil", region: "Americas", top: "65%", left: "28%" },
  { country: "Chile", region: "Americas", top: "75%", left: "25%" },
  { country: "Argentina", region: "Americas", top: "82%", left: "27%" },

  // APAC
  { country: "India", region: "APAC", top: "54%", left: "63%" },
  { country: "China", region: "APAC", top: "47%", left: "69%" },
  { country: "Hong Kong", region: "APAC", top: "50%", left: "71%" },
  { country: "Japan", region: "APAC", top: "45%", left: "78%" },
  { country: "South Korea", region: "APAC", top: "43%", left: "76%" },
  { country: "Taiwan", region: "APAC", top: "49%", left: "74%" },
  { country: "Indonesia", region: "APAC", top: "63%", left: "70%" },
  { country: "Malaysia", region: "APAC", top: "61%", left: "69%" },
  { country: "Singapore", region: "APAC", top: "64%", left: "69%" },
  { country: "Philippines", region: "APAC", top: "57%", left: "76%" },
  { country: "Thailand", region: "APAC", top: "57%", left: "68%" },
  { country: "Vietnam", region: "APAC", top: "56%", left: "71%" },
  { country: "Australia", region: "APAC", top: "80%", left: "78%" },
  { country: "New Zealand", region: "APAC", top: "84%", left: "86%" },

  // EMEA
  { country: "United Kingdom", region: "EMEA", top: "36%", left: "46%" },
  { country: "Ireland", region: "EMEA", top: "35%", left: "44%" },
  { country: "Norway", region: "EMEA", top: "26%", left: "49%" },
  { country: "Sweden", region: "EMEA", top: "28%", left: "51%" },
  { country: "Finland", region: "EMEA", top: "27%", left: "53%" },
  { country: "Denmark", region: "EMEA", top: "31%", left: "50%" },
  { country: "Netherlands", region: "EMEA", top: "34%", left: "49%" },
  { country: "Belgium", region: "EMEA", top: "35%", left: "49%" },
  { country: "Germany", region: "EMEA", top: "35%", left: "51%" },
  { country: "France", region: "EMEA", top: "37%", left: "49%" },
  { country: "Spain", region: "EMEA", top: "41%", left: "47%" },
  { country: "Portugal", region: "EMEA", top: "41%", left: "45%" },
  { country: "Italy", region: "EMEA", top: "40%", left: "52%" },
  { country: "Austria", region: "EMEA", top: "37%", left: "52%" },
  { country: "Switzerland", region: "EMEA", top: "38%", left: "50%" },
  { country: "Czech Republic", region: "EMEA", top: "36%", left: "53%" },
  { country: "Slovakia", region: "EMEA", top: "37%", left: "54%" },
  { country: "Hungary", region: "EMEA", top: "38%", left: "55%" },
  { country: "Poland", region: "EMEA", top: "33%", left: "54%" },
  { country: "Greece", region: "EMEA", top: "41%", left: "55%" },
  { country: "Bulgaria", region: "EMEA", top: "39%", left: "56%" },
  { country: "Romania", region: "EMEA", top: "37%", left: "56%" },
  { country: "South Africa", region: "EMEA", top: "78%", left: "52%" },
  { country: "Turkey", region: "EMEA", top: "39%", left: "59%" },
  { country: "UAE", region: "EMEA", top: "49%", left: "61%" },
];

const regionColor = {
  Americas: "bg-emerald-300",
  APAC: "bg-lime-300",
  EMEA: "bg-cyan-300",
};

export default function WorldBranchesMap() {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-5xl">
        <img
          src={mapImg}
          alt="Global coverage map"
          className="w-full h-auto select-none pointer-events-none"
        />

        {BRANCHES.map((b) => (
          <motion.div
            key={b.country}
            className="absolute group"
            style={{
              top: b.top,
              left: b.left,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* glow */}
            <motion.span
              className={`block rounded-full ${regionColor[b.region]} blur-md`}
              style={{ width: 18, height: 18 }}
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.5, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
            />

            {/* core dot */}
            <motion.span
              className="absolute inset-0 m-auto block rounded-full bg-white border border-slate-900/40"
              style={{ width: 8, height: 8 }}
              whileHover={{ scale: 1.4 }}
            />

            {/* tooltip */}
            <motion.div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white shadow-lg opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.15 }}
            >
              {b.country}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
