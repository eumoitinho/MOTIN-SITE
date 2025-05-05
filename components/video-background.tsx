"use client"

import { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"

interface VideoBackgroundProps {
  videoId: string
  fallbackImage: string
}

export function VideoBackground({ videoId, fallbackImage }: VideoBackgroundProps) {
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const onReady = (event: any) => {
    playerRef.current = event.target
    event.target.mute()
    event.target.playVideo()
    setTimeout(() => setIsReady(true), 300)
  }

  const onEnd = (event: any) => {
    event.target.playVideo()
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      enablejsapi: 1,
      origin: typeof window !== "undefined" ? window.location.origin : "",
    },
  }

  // Mostrar imagem de fallback em dispositivos móveis para melhor performance
  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${fallbackImage}')` }} />
    )
  }

  return (
    <>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${isReady ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url('${fallbackImage}')` }}
      />
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 scale-[1.15]">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
            iframeClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
    </>
  )
}
