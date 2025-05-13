"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface PortfolioVideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
}

export function PortfolioVideoModal({ isOpen, onClose, videoId }: PortfolioVideoModalProps) {
  if (!videoId) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-black border-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        <div className="aspect-video w-full">
          {isOpen && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
