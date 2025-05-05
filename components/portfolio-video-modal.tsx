"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CustomVideoPlayer } from "@/components/custom-video-player"
import { X } from "lucide-react"

interface PortfolioVideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
}

export function PortfolioVideoModal({ isOpen, onClose, videoId }: PortfolioVideoModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-black border-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 bg-black/50 rounded-full p-2 text-white hover:bg-black transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        <div className="w-full aspect-video">
          <CustomVideoPlayer videoId={videoId} className="w-full h-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
