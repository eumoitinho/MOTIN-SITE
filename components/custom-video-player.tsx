"use client"

import { useState, useRef } from "react"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

interface CustomVideoPlayerProps {
  videoId: string
  className?: string
}

export function CustomVideoPlayer({ videoId, className = "" }: CustomVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    setShowThumbnail(false)
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* YouTube Player or Thumbnail */}
      <div className="aspect-video w-full">
        {showThumbnail ? (
          <div className="relative w-full h-full">
            <img
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        )}
      </div>

      {/* Play Button Overlay (when showing thumbnail) */}
      {showThumbnail && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
          <motion.div
            className="bg-[#00B2B2]/80 hover:bg-[#00B2B2] h-16 w-16 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={24} fill="white" />
          </motion.div>
        </div>
      )}
    </div>
  )
}
