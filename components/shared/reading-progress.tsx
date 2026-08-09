"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ReadingProgressProps {
  targetId?: string
}

export function ReadingProgress({ targetId = "article-content" }: ReadingProgressProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    setMounted(true)
    containerRef.current = document.getElementById(targetId)
  }, [targetId])

  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  })
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (!mounted) return null

  return (
    <>
      {/* Background track */}
      <div className="fixed top-16 lg:top-20 left-0 right-0 h-1 bg-border z-50" />
      {/* Progress fill */}
      <motion.div
        className="fixed top-16 lg:top-20 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
    </>
  )
}
