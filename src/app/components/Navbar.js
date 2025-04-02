"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Montserrat } from "next/font/google"
import Image from "next/image"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = ["home", "features", "cta"]
      const scrollPosition = window.scrollY + 100 // Offset for better trigger point

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const offset = element.offsetTop - 100

          if (
            scrollPosition >= offset &&
            scrollPosition < offset + element.offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = element.offsetTop - 80 // Account for navbar height
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      } ${montserrat.variable} font-montserrat`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Crypto Arsenal Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Crypto Arsenal</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "home"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "features"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "cta"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
