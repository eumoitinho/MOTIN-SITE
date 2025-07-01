"use client"
import { useEffect, useState } from "react"

interface VideoBackgroundProps {
  videoId: string
  fallbackImage: string
}

const VideoBackground = ({ videoId, fallbackImage }: VideoBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

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

  // Show video on mobile too, but with better loading
  if (!isClient) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute inset-0 ${fallbackImage}`}></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback background */}
      <div className={`absolute inset-0 ${fallbackImage}`}></div>

      {/* Video element - now works on mobile too */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src="./Showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => console.log("Video failed to load")}
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  )
}

export { VideoBackground }
