"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const BackgroundElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Initialize motion values with 0
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Create transforms at the top level
  const rotateX = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [15, -15]
  )
  const rotateY = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [-15, 15]
  )
  const orb1X = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [-100, 100]
  )
  const orb1Y = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [-100, 100]
  )
  const orb2X = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [100, -100]
  )
  const orb2Y = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [100, -100]
  )
  const orb3X = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [-50, 50]
  )
  const orb3Y = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [-50, 50]
  )
  const orb4X = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [50, -50]
  )
  const orb4Y = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [50, -50]
  )
  const orb5X = useTransform(
    cursorXSpring,
    [0, dimensions.width || 1000],
    [-30, 30]
  )
  const orb5Y = useTransform(
    cursorYSpring,
    [0, dimensions.height || 1000],
    [-30, 30]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return
    cursorX.set(mousePosition.x)
    cursorY.set(mousePosition.y)
  }, [mousePosition, cursorX, cursorY, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          x: orb1X,
          y: orb1Y,
        }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        style={{
          x: orb2X,
          y: orb2Y,
        }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
      />

      {/* Animated floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: orb3X,
          y: orb3Y,
        }}
        className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: orb4X,
          y: orb4Y,
        }}
        className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
      />

      {/* Pulsing center orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: orb5X,
          y: orb5Y,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-full blur-3xl"
      />

      {/* Animated grid lines */}
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"
      />
    </div>
  )
}

export default BackgroundElements
