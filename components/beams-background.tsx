"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
}

export function BeamsBackground({ className, intensity = "strong", children }: AnimatedGradientBackgroundProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render the static version on the server or if client-side rendering is not yet available
  if (!isClient) {
    return (
      <div className={cn("relative overflow-hidden bg-neutral-950", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"></div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-neutral-950", className)}>
      {/* Static gradient background instead of canvas animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a1a] via-black to-[#001a1a] opacity-80"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-10%] left-[5%] w-[40%] h-[60%] rounded-full bg-[#00B2B2] blur-[120px]"></div>
          <div className="absolute bottom-[-5%] right-[10%] w-[35%] h-[50%] rounded-full bg-[#00B2B2] blur-[100px]"></div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-neutral-950/5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backdropFilter: "blur(50px)",
        }}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
