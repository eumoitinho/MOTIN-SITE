export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <pattern id="circle-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <pattern
            id="diagonal-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="40" y1="0" x2="40" y2="60" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#circle-pattern)" />
        <rect width="100%" height="100%" fill="url(#diagonal-pattern)" />
      </svg>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-[150px] translate-x-1/2 translate-y-1/2 opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full filter blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
    </div>
  )
}
