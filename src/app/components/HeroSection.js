"use client"

import React, { useState } from "react"
import Image from "next/image"
import Navbar from "./Navbar"
import InteractiveCard from "./InteractiveCard"
import BackgroundElements from "./BackgroundElements"
import { AnimatePresence, motion } from "framer-motion"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Randomized bounce animation
  const bounceVariant = {
    bounce: {
      y: [0, -50, 120, 60, 120], // First bounce high, second bounce lower
      x: [0, Math.random() * 20 - 10, Math.random() * 10 - 5, 0], // Random slight sideways motion
      transition: {
        duration: 1.5, // Longer duration for a realistic bounce
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 0.8, 1], // Timing control for each keyframe
        repeat: 0, // Bounces twice (original + 1 repeat)
      },
    },
    stop: {
      y: 0,
      x: 0,
      transition: {
        duration: 0.7, // Slightly longer for a smooth return
        ease: "easeOut", // Makes it decelerate naturally
        delay: 0.5,
      },
    },
  }

  const bounceVariantSolana = {
    bounce: {
      y: [0, -30, 120, 100, 120, 120], // Gravity-based bounce height reduction (gradually decreases)
      x: [0, 50, 80, 84, 90, 90], // Horizontal speed starts fast and slows down
      rotate: [
        0,
        // Rotate counterclockwise for leftward movement (negative x), clockwise for rightward movement (positive x)
        90,
        180,
        270,
        360,
        405, // Gradually increase rotation in a physics-based manner
      ],
      transition: {
        duration: 1.6, // Random duration between 1.5s to 2.5s
        ease: "easeIn", // Smooth acceleration and deceleration
        times: [0, 0.2, 0.75, 0.84, 0.95, 1], // Adjusts timing of each keyframe for realistic motion
        repeat: 0, // Single bounce
      },
    },
    stop: {
      y: 0,
      x: 0,
      rotate: 360, // Ensure the final rotation position aligns with the bounce
      transition: {
        duration: 1, // Smooth return to original position
        ease: "easeOut", // Smooth deceleration
        delay: 0.5, // Delay before starting to return
      },
    },
  }

  const bounceVariantEthereum = {
    bounce: {
      y: [0, -30, 120, 100, 120, 120], // Gravity-based bounce height reduction (gradually decreases)
      x: [0, 50, 30, 70, 60, 60], // Horizontal speed starts fast and slows down
      rotate: [
        0,
        // Rotate counterclockwise for leftward movement (negative x), clockwise for rightward movement (positive x)
        -90,
        -180,
        -270,
        -360,
        -405, // Gradually increase rotation in a physics-based manner
      ],
      transition: {
        duration: 1.6, // Random duration between 1.5s to 2.5s
        ease: "easeIn", // Smooth acceleration and deceleration
        times: [0, 0.2, 0.75, 0.84, 0.95, 1], // Adjusts timing of each keyframe for realistic motion
        repeat: 0, // Single bounce
      },
    },
    stop: {
      y: 0,
      x: 0,
      rotate: 360, // Ensure the final rotation position aligns with the bounce
      transition: {
        duration: 1, // Smooth return to original position
        ease: "easeOut", // Smooth deceleration
        delay: 0.5, // Delay before starting to return
      },
    },
  }

  const bounceVariantBitcoin = {
    bounce: {
      y: [0, -30, 120, 100, 120, 120], // Gravity-based bounce height reduction (gradually decreases)
      x: [0, 20, 40, 60, 80, 70], // Horizontal speed starts fast and slows down
      rotate: [
        0,
        // Rotate counterclockwise for leftward movement (negative x), clockwise for rightward movement (positive x)
        45,
        90,
        135,
        180,
        225, // Gradually increase rotation in a physics-based manner
      ],
      transition: {
        duration: 1.6, // Random duration between 1.5s to 2.5s
        ease: "easeIn", // Smooth acceleration and deceleration
        times: [0, 0.2, 0.75, 0.84, 0.95, 1], // Adjusts timing of each keyframe for realistic motion
        repeat: 0, // Single bounce
      },
    },
    stop: {
      y: 0,
      x: 0,
      rotate: 360, // Ensure the final rotation position aligns with the bounce
      transition: {
        duration: 1, // Smooth return to original position
        ease: "easeOut", // Smooth deceleration
        delay: 0.5, // Delay before starting to return
      },
    },
  }

  const bounceVariantLitecoin = {
    bounce: {
      y: [0, -50, 120, 100, 120, 120], // Gravity-based bounce height reduction (gradually decreases)
      x: [0, -40, -80, -84, -90, -90], // Horizontal speed starts fast and slows down
      rotate: [
        0,
        // Rotate counterclockwise for leftward movement (negative x), clockwise for rightward movement (positive x)
        -90,
        -180,
        -270,
        -360,
        -405, // Gradually increase rotation in a physics-based manner
      ],
      transition: {
        duration: 1.6, // Random duration between 1.5s to 2.5s
        ease: "easeIn", // Smooth acceleration and deceleration
        times: [0, 0.2, 0.75, 0.84, 0.95, 1], // Adjusts timing of each keyframe for realistic motion
        repeat: 0, // Single bounce
      },
    },
    stop: {
      y: 0,
      x: 0,
      rotate: 360, // Ensure the final rotation position aligns with the bounce
      transition: {
        duration: 1, // Smooth return to original position
        ease: "easeOut", // Smooth deceleration
        delay: 0.5, // Delay before starting to return
      },
    },
  }

  return (
    <div
      className={`relative h-[calc(100vh+20em)] bg-[#0A0A0A] overflow-hidden ${montserrat.variable} font-montserrat`}
      id="home"
    >
      <BackgroundElements />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <Navbar />

        {/* Main Content Container */}
        <main className="flex-1 flex flex-col mt-[-170px] justify-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Content */}
            <div className="text-center space-y-8 sm:space-y-10 md:space-y-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug"
              >
                <span className="text-white/90">
                  Launch Your Trading Platform
                </span>{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  Zero Cost
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full flex justify-center"
              >
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-normal">
                  Turn your trading expertise into a subscription business.
                  Launch your platform instantly and earn up to 60% of
                  subscription revenue.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center items-center"
              >
                <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Request Demo
                    <span className="ml-2">→</span>
                  </span>
                  <div className="rounded-full absolute inset-[-1px] bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                </button>
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 transform translate-y-[-50%] top-[60%] left-1/5"
              >
                {/* First Feature Card */}
                <motion.div
                  initial={{ height: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  whileHover={{ height: 300 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 overflow-hidden transition-all duration-300 ease-in-out hover:border-white/80"
                >
                  {/* Border Hover Effect */}
                  {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/50 transition-colors duration-300 "></div> */}
                  <div className="relative flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-white mb-2 text-center transition-all duration-300 group-hover:opacity-0">
                      Launch at{" "}
                      <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                        Zero Cost
                      </span>
                    </h3>
                    <div className="relative flex flex-col items-center">
                      <div className="flex items-center justify-center group-hover:scale-[0.9] transition-all duration-300 translate-y-[calc(10%+1rem)] group-hover:translate-y-[-20%] [perspective:1000px] z-10">
                        <Image
                          src="/web5.svg"
                          alt="Web Platform Icon"
                          width={200}
                          height={200}
                          className="transition-all duration-300  group-hover:[transform:rotate3d(1,1,0,30deg)] w-100 h-100"
                        />
                      </div>
                      <div className="flex items-center justify-center group-hover:scale-[0.95] transition-all duration-300 translate-y-[calc(10%+1rem)] group-hover:translate-y-[-12%] group-hover:translate-x-[-10%] [perspective:1000px] z-0 absolute top-0 left-0">
                        <Image
                          src="/web_frame1.svg"
                          alt="Web Platform Icon"
                          width={200}
                          height={200}
                          className="transition-all duration-300 group-hover:[transform:rotate3d(1,1,0,30deg)] w-100 h-100"
                        />
                      </div>
                      <div className="flex items-center justify-center group-hover:scale-[1] transition-all duration-300 translate-y-[calc(10%+1rem)] group-hover:translate-y-[-3%] group-hover:translate-x-[-20%] [perspective:1000px] z-0 absolute top-0 left-0">
                        <Image
                          src="/web_frame2.svg"
                          alt="Web Platform Icon"
                          width={200}
                          height={200}
                          className="transition-all duration-300  group-hover:[transform:rotate3d(1,1,0,30deg)] w-100 h-100"
                        />
                      </div>
                    </div>
                    <h3 className="text-gray-300 text-m opacity-0 group-hover:opacity-100 transition-all duration-300 mt-8 pb-4">
                      Use our ready-to-go infrastructure and tools—no upfront
                      costs.
                    </h3>
                  </div>
                </motion.div>

                {/* Second Feature Card */}
                <motion.div
                  initial={{ height: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  whileHover={{ height: 300 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 overflow-hidden transition-all duration-300 ease-in-out hover:border-white/80"
                  onMouseEnter={() => setIsHovered(true)} // Start animation
                  onMouseLeave={() => setIsHovered(false)} // Stop animation
                >
                  <div className="relative flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-white mb-2 text-center transition-all duration-300 group-hover:opacity-0">
                      Earn Up to{" "}
                      <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                        60%
                      </span>{" "}
                      Revenue
                    </h3>
                    <h3 className="text-gray-300 text-m opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-[6px]">
                      Increase your revenue share as you grow your subscriber
                      base.
                    </h3>
                    <AnimatePresence>
                      {/* Coin Animation Container */}
                      <motion.div
                        key={isHovered}
                        className="relative flex items-center justify-center w-[200px] h-[100px]"
                      >
                        {/* Solana Coin */}
                        <motion.div
                          key={`solana-${isHovered}`}
                          variants={bounceVariantSolana}
                          animate={isHovered ? "bounce" : "stop"}
                          transition={{ delay: isHovered ? 0 : 0.3 }}
                          layout
                          className="absolute left-[-40%] bottom-[-20%]"
                        >
                          <Image
                            src="/coins/Solana Coin.svg"
                            alt="Solana Coin"
                            width={50}
                            height={50}
                          />
                        </motion.div>

                        {/* USD Coin */}
                        <motion.div
                          key={`usd-${isHovered}`}
                          variants={bounceVariantLitecoin}
                          animate={isHovered ? "bounce" : "stop"}
                          transition={{ delay: isHovered ? 0 : 0.3 }}
                          layout
                          className="absolute left-[10%] bottom-[-20%]"
                        >
                          <Image
                            src="/coins/USD Coin.svg"
                            alt="USD Coin"
                            width={50}
                            height={50}
                          />
                        </motion.div>

                        {/* Ethereum Coin */}
                        <motion.div
                          key={`eth-${isHovered}`}
                          variants={bounceVariantEthereum}
                          animate={isHovered ? "bounce" : "stop"}
                          transition={{ delay: isHovered ? 0 : 0.3 }}
                          layout
                          className="absolute right-[-40%] bottom-[-18%]"
                        >
                          <Image
                            src="/coins/Ethereum Coin.svg"
                            alt="Ethereum Coin"
                            width={70}
                            height={70}
                          />
                        </motion.div>

                        {/* Bitcoin Coin */}
                        <motion.div
                          key={`btc-${isHovered}`}
                          variants={bounceVariantBitcoin}
                          animate={isHovered ? "bounce" : "stop"}
                          transition={{ delay: isHovered ? 0 : 0.3 }}
                          layout
                          className="absolute right-0 bottom-[-18%]"
                        >
                          <Image
                            src="/coins/Bitcoin Coin.svg"
                            alt="Bitcoin Coin"
                            width={100}
                            height={100}
                          />
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HeroSection
