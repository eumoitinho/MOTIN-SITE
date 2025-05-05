"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import YouTube from "react-youtube"

interface CustomVideoPlayerProps {
  videoId: string
  className?: string
}

export function CustomVideoPlayer({ videoId, className = "" }: CustomVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handlePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const handleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number.parseFloat(e.target.value)
    setProgress(newProgress)
    if (playerRef.current) {
      const newTime = (duration * newProgress) / 100
      playerRef.current.seekTo(newTime)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const onReady = (event: any) => {
    playerRef.current = event.target
    setDuration(event.target.getDuration())
  }

  const onStateChange = (event: any) => {
    const state = event.data
    // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    setIsPlaying(state === 1)

    if (state === 1) {
      // Start progress tracking when playing
      const interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime()
          const duration = playerRef.current.getDuration()
          setCurrentTime(currentTime)
          setProgress((currentTime / duration) * 100)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* YouTube Player */}
      <div className="aspect-video w-full">
        <YouTube
          videoId={videoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
          className="w-full h-full"
        />
      </div>

      {/* Custom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white">{formatTime(currentTime)}</span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00B2B2 0%, #00B2B2 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
              <span className="text-xs text-white">{formatTime(duration)}</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlay}
                  className="text-white hover:text-[#00B2B2] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={handleMute}
                  className="text-white hover:text-[#00B2B2] transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <div>
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-[#00B2B2] transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
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
