interface Window {
  gtag: (
    command: string,
    action: string,
    params?: {
      [key: string]: any
    },
  ) => void
  RDStationForms: any
  dataLayer: any[]
}
