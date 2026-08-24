import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ service, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="cursor-pointer"
      onClick={() => onClick(service)}
    >
      <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 h-full group relative overflow-hidden">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Service Number */}
        <div className="absolute top-4 right-4 text-6xl font-bold text-gray-800 opacity-30">
          0{index + 1}
        </div>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features Preview */}
        <div className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
              <span className="text-gray-300 truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mt-auto">
          <span>Learn More</span>
          <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;