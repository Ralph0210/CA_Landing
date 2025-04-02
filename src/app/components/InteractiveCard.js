"use client"

import React from "react"
import { motion } from "framer-motion"

const InteractiveCard = ({
  title,
  description,
  icon: Icon,
  className = "",
  contentClassName = "",
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className={`relative ${contentClassName}`}>
        <div className="p-6 sm:p-8">
          <div className="mb-4 sm:mb-6">
            <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-[#FF6B6B]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default InteractiveCard
