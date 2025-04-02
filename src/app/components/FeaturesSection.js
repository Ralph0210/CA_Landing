"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const FeaturesSection = () => {
  const cardRefs = useRef([])
  const [isFirstCardHovered, setIsFirstCardHovered] = useState(false)
  const [isSecondCardHovered, setIsSecondCardHovered] = useState(false)
  const [isThirdCardHovered, setIsThirdCardHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    cursorX.set(mousePosition.x)
    cursorY.set(mousePosition.y)
  }, [mousePosition, cursorX, cursorY])

  const rotateX = useTransform(
    cursorYSpring,
    [0, window.innerHeight],
    [15, -15]
  )
  const rotateY = useTransform(cursorXSpring, [0, window.innerWidth], [-15, 15])

  useEffect(() => {
    // Create animations for each card
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          scale: 1.05,
          opacity: 1,
          y: 0,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play none none none",
            once: true,
            onEnter: () => {
              gsap.to(card, {
                scale: 1,
                duration: 1,
                ease: "expo.out",
              })
            },
          },
        }
      )
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      className={`relative py-24 sm:py-32 bg-[#0A0A0A] ${montserrat.variable} font-montserrat`}
      id="features"
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

        {/* Crypto-themed grid */}
        {/* <motion.div
          style={{
            rotateX,
            rotateY,
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"
        /> */}

        {/* Floating crypto symbols */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                x: useTransform(
                  cursorXSpring,
                  [0, window.innerWidth],
                  [-50, 50]
                ),
                y: useTransform(
                  cursorYSpring,
                  [0, window.innerHeight],
                  [-50, 50]
                ),
              }}
              className={`absolute w-8 h-8 rounded-full blur-xl ${
                i % 4 === 0
                  ? "bg-purple-500/10"
                  : i % 4 === 1
                    ? "bg-pink-500/10"
                    : i % 4 === 2
                      ? "bg-blue-500/10"
                      : "bg-red-500/10"
              }`}
            />
          ))}
        </div>

        {/* Animated connection lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                duration: 1,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={`absolute w-[2px] h-20 bg-gradient-to-b ${
                i % 3 === 0
                  ? "from-purple-500/20"
                  : i % 3 === 1
                    ? "from-pink-500/20"
                    : "from-blue-500/20"
              } to-transparent`}
              style={{
                left: `${(i + 1) * 15}%`,
                top: `${(i + 1) * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Interactive orb */}
        <motion.div
          style={{
            x: useTransform(cursorXSpring, [0, window.innerWidth], [-100, 100]),
            y: useTransform(
              cursorYSpring,
              [0, window.innerHeight],
              [-100, 100]
            ),
          }}
          className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl"
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
          >
            <span className="text-sm font-medium text-white/100 tracking-wider">
              How It Works
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Succeed
            </span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="group relative flex flex-row bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden w-full h-[300px] transition-all duration-300 ease-in-out hover:border-white/80"
            onMouseEnter={() => setIsFirstCardHovered(true)}
            onMouseLeave={() => setIsFirstCardHovered(false)}
          >
            <div className="relative flex flex-1 flex-col items-start">
              <h3 className="text-lg font-semibold text-white text-center transition-all duration-300 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full group-hover:bg-white group-hover:text-gray-800">
                1
              </h3>
              <h3 className="text-white text-lg mt-4">Choose Your Template</h3>
              <p className="text-gray-400 text-sm mt-4 pb-4">
                Customize your platform with our various color schemes.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center flex-1 min-w-0">
              <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[304px] h-[204px]">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center justify-center transition-all duration-500 ${
                      isFirstCardHovered
                        ? index === 4
                          ? "scale-100 opacity-100 transition-all duration-500"
                          : `animate-flip opacity-0`
                        : index === 4
                          ? "scale-[3] opacity-100"
                          : "opacity-0 scale-0"
                    }`}
                    style={{
                      animationDelay:
                        isFirstCardHovered && index !== 4
                          ? `${index * 100}ms`
                          : "0ms",
                    }}
                  >
                    <Image
                      src={`/web${index + 1}.svg`}
                      alt={`Web Platform Icon ${index + 1}`}
                      width={98}
                      height={67}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Keyframes for Flip Animation */}
            <style jsx global>{`
              @keyframes flip {
                0% {
                  transform: rotateY(0deg);
                  opacity: 0;
                }
                100% {
                  transform: rotateY(180deg);
                  opacity: 1;
                }
              }

              .animate-flip {
                animation: flip 0.6s ease-in-out forwards;
              }
            `}</style>
          </div>

          {/* Feature 2 */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="group relative flex flex-row bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden w-full h-[300px] transition-all duration-300 ease-in-out hover:border-white/80"
            onMouseEnter={() => setIsSecondCardHovered(true)}
            onMouseLeave={() => setIsSecondCardHovered(false)}
          >
            <div className="relative flex flex-1 flex-col items-start">
              <h3 className="text-lg font-semibold text-white text-center transition-all duration-300 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full group-hover:bg-white group-hover:text-gray-800">
                2
              </h3>
              <h3 className="text-white text-lg mt-4">Customize Easily</h3>
              <p className="text-gray-400 text-sm mt-4 pb-4">
                Customize your logo, name, experience, and more.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center flex-1 min-w-0 rounded-2xl overflow-hidden">
              <svg
                width="304"
                height="204"
                viewBox="0 0 416 284"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 45H416V264C416 275.046 407.046 284 396 284H20C8.95431 284 0 275.046 0 264V45Z"
                  fill="#505050"
                />
                <path
                  className={`transition-all duration-500 ease-in-out transform ${isSecondCardHovered ? "scale-[0.25] translate-x-[-20px] translate-y-[20px]" : "scale-100 translate-x-0 translate-y-0"}`}
                  d="M231.333 135H184.667C180.985 135 178 137.985 178 141.667V188.333C178 192.015 180.985 195 184.667 195H231.333C235.015 195 238 192.015 238 188.333V141.667C238 137.985 235.015 135 231.333 135Z"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  className={`transition-all duration-500 ease-in-out transform ${isSecondCardHovered ? "scale-[0.25] translate-x-[-20px] translate-y-[20px]" : "scale-100 translate-x-0 translate-y-0"}`}
                  d="M198 161.667C201.682 161.667 204.667 158.682 204.667 155C204.667 151.318 201.682 148.333 198 148.333C194.318 148.333 191.333 151.318 191.333 155C191.333 158.682 194.318 161.667 198 161.667Z"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  className={`transition-all duration-500 ease-in-out transform ${isSecondCardHovered ? "scale-[0.25] translate-x-[-20px] translate-y-[20px]" : "scale-100 translate-x-0 translate-y-0"}`}
                  d="M238 175L227.713 164.713C226.463 163.464 224.768 162.761 223 162.761C221.232 162.761 219.537 163.464 218.287 164.713L188 195"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0 20C0 8.9543 8.95431 0 20 0H396C407.046 0 416 8.95431 416 20V45H0V20Z"
                  fill="#939393"
                />
                <circle cx="28.5" cy="22.5" r="4.5" fill="#D9D9D9" />
                <circle cx="44.5" cy="22.5" r="4.5" fill="#D9D9D9" />
                <circle cx="60.5" cy="22.5" r="4.5" fill="#D9D9D9" />
                {/* Animated Text */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fontSize="14"
                  strokeWidth="2"
                  fill="#ffffff"
                  className={`transition-all duration-500 transform ${isSecondCardHovered ? "scale-100 translate-x-[-130px] translate-y-[-75px]" : "opacity-0 translate-x-[-130px] translate-y-[-75px]"}`}
                >
                  Platform
                </text>
                <rect
                  x="337"
                  y="239"
                  width="67"
                  height="35"
                  rx="17.5"
                  fill="#D55EF3"
                  className={`transition-all duration-300 delay-1000 transform ${isSecondCardHovered ? "" : "opacity-0 transition-none"}`}
                />
                <rect
                  x="112"
                  y="99"
                  width="101"
                  height="70"
                  rx="20"
                  fill="#5E7EF3"
                  className={`transition-all duration-300 delay-150 transform ${isSecondCardHovered ? "" : "opacity-0 transition-none"}`}
                />
                <rect
                  x="126"
                  y="177"
                  width="98"
                  height="44"
                  rx="20"
                  fill="#818080"
                  className={`transition-all duration-300 delay-300 transform ${isSecondCardHovered ? "" : "opacity-0 transition-none"}`}
                />
                <rect
                  x="218"
                  y="115"
                  width="82"
                  height="54"
                  rx="20"
                  fill="#818080"
                  className={`transition-all duration-300 delay-500 transform ${isSecondCardHovered ? "" : "opacity-0 transition-none"}`}
                />
                <rect
                  x="230"
                  y="177"
                  width="82"
                  height="54"
                  rx="20"
                  fill="#818080"
                  className={`transition-all duration-300 delay-700 transform ${isSecondCardHovered ? "" : "opacity-0 transition-none"}`}
                />
              </svg>
              <style jsx>{`
                .animated-path {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                }

                .drawn {
                  stroke-dashoffset: 0;
                  animation: none; /* No animation when not hovered */
                }

                .animate-path {
                  animation: drawPath 5s ease-in-out infinite;
                }

                @keyframes drawPath {
                  0% {
                    stroke-dashoffset: 1000;
                  }
                  50% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: 1000;
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="group relative flex flex-row bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden w-full h-[300px] transition-all duration-300 ease-in-out hover:border-white/80"
            onMouseEnter={() => setIsThirdCardHovered(true)}
            onMouseLeave={() => setIsThirdCardHovered(false)}
          >
            <div className="relative flex flex-1 flex-col items-start">
              <h3 className="text-lg font-semibold text-white text-center transition-all duration-300 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full group-hover:bg-white group-hover:text-gray-800">
                3
              </h3>
              <h3 className="text-white text-lg mt-4">Launch Your Platform!</h3>
              <p className="text-gray-400 text-sm mt-4 pb-4">
                Onboard your followers and start earning from your platform.
              </p>
            </div>

            <style jsx>{`
              .animated-rect {
                transition: width 1s ease-in; /* Ensure a smooth transition */
              }
              /* Animation when hovered */
              .animate-rect1 {
                animation: changeWidth 2s infinite; /* Infinite width change when hovered */
              }
              .animate-rect2 {
                animation: changeWidth2 3s infinite; /* Infinite width change when hovered */
              }

              @keyframes changeWidth {
                0% {
                  width: 122px; /* Initial width */
                }
                50% {
                  width: 150px; /* Width on halfway through the animation */
                }
                100% {
                  width: 122px; /* Back to the original width */
                }
              }

              @keyframes changeWidth2 {
                0% {
                  width: 143px; /* Initial width */
                }
                50% {
                  width: 200px; /* Width on halfway through the animation */
                }
                100% {
                  width: 143px; /* Back to the original width */
                }
              }
              .animated-path {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
              }

              .drawn {
                stroke-dashoffset: 0;
                animation: none; /* No animation when not hovered */
              }

              .animate-path {
                animation: drawPath 5s ease-in-out infinite;
              }

              .animate-path2 {
                animation: drawPath2 5s ease-in-out infinite;
                animation-delay: 0.8s;
              }

              @keyframes drawPath {
                0% {
                  stroke-dashoffset: 1000;
                }
                50% {
                  stroke-dashoffset: 0;
                }
                100% {
                  stroke-dashoffset: 1000;
                }
              }

              @keyframes drawPath2 {
                0% {
                  stroke-dashoffset: 1000;
                }
                50% {
                  stroke-dashoffset: 0;
                }
                100% {
                  stroke-dashoffset: 1000;
                }
              }
            `}</style>

            {/* Right Side */}
            <div className="flex items-center justify-center flex-1 min-w-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="304"
                height="204"
                viewBox="0 0 416 284"
                fill="none"
                className="rounded-2xl"
              >
                <path
                  d="M0 45H416V264C416 275.046 407.046 284 396 284H20C8.95431 284 0 275.046 0 264V45Z"
                  fill="#505050"
                />
                <rect
                  className={`animated-rect ${isThirdCardHovered ? "animate-rect1" : "drawn"}`}
                  x="23"
                  y="111"
                  width="122"
                  height="29"
                  rx="14.5"
                  fill="#8E8E8E"
                />
                <rect
                  className={`animated-rect ${isThirdCardHovered ? "animate-rect2" : "drawn"}`}
                  x="23"
                  y="150"
                  width="143"
                  height="29"
                  rx="14.5"
                  fill="#818080"
                />
                <rect
                  x="23"
                  y="189"
                  width="67"
                  height="29"
                  rx="14.5"
                  fill="#5E7EF3"
                />
                <path
                  d="M241 120V200C241 202.652 242.054 205.196 243.929 207.071C245.804 208.946 248.348 210 251 210H331"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-miterlimit="5.759"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  className={`animated-path ${isThirdCardHovered ? "animate-path" : "drawn"}`} // Apply animation when hovered
                  d="M261 175L281 155L301 175L331 145"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-miterlimit="5.759"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  className={`animated-path ${isThirdCardHovered ? "animate-path2" : "drawn"}`} // Apply animation when hovered
                  d="M316 145H331V160"
                  stroke="#5E7EF3"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0 20C0 8.9543 8.95431 0 20 0H396C407.046 0 416 8.95431 416 20V45H0V20Z"
                  fill="#939393"
                />
                <circle cx="28.5" cy="22.5" r="4.5" fill="#D9D9D9" />
                <circle cx="44.5" cy="22.5" r="4.5" fill="#D9D9D9" />
                <circle cx="60.5" cy="22.5" r="4.5" fill="#D9D9D9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
