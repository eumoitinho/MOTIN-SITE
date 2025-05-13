"use client"

import { Video } from "lucide-react"
import { useEffect, useState } from "react"

interface VideoBackgroundProps {
  videoId: string
  fallbackImage: string
}

const VideoBackground = ({ videoId, fallbackImage }: VideoBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Always use the fallback on mobile
  if (!isClient || isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute inset-0 ${fallbackImage}`}></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className={`absolute inset-0 ${fallbackImage}`}></div>

      {/* Use a static image with a play button overlay instead of auto-playing video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 object-cover w-full h-full"
          src="./Showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster={fallbackImage}
          preload="auto"
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  )
}

export { VideoBackground }
