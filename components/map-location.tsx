"use client"

import { useEffect, useRef } from "react"

export function MapLocation() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Carrega o script do Google Maps
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    // Inicializa o mapa
    window.initMap = () => {
      if (!mapRef.current) return

      // Coordenadas de exemplo - substitua pelas coordenadas reais
      const location = { lat: -25.4284, lng: -49.2733 } // Curitiba

      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      })

      // Adiciona um marcador
      ;new (window as any).google.maps.Marker({
        position: location,
        map: map,
        title: "Motin Films",
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#00B2B2",
          fillOpacity: 1,
          strokeWeight: 0,
        },
      })
    }

    // Adiciona a função initMap ao objeto window
    window.initMap = window.initMap || (() => {})

    loadGoogleMapsScript()

    return () => {
      // Limpa a função global quando o componente é desmontado
      window.initMap = () => {}
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-[300px] rounded-lg overflow-hidden"
      aria-label="Mapa da localização da Motin Films"
    ></div>
  )
}

// Adiciona a definição do tipo para o objeto window
declare global {
  interface Window {
    initMap: () => void
  }
}
