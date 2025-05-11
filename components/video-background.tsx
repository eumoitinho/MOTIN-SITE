"use client"

import { useEffect, useState } from "react"

interface VideoBackgroundProps {
  videoId: string
  fallbackImage: string
}

const VideoBackground = ({ videoId, fallbackImage }: VideoBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className={`absolute inset-0 ${fallbackImage}`}></div>

      {isClient && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&quality=medium`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            loading="lazy"
          ></iframe>
        </div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  )
}

export { VideoBackground }
