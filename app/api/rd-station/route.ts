import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Aqui você faria a integração real com o RD Station
    // Este é apenas um exemplo de como seria a estrutura
    const rdStationResponse = await fetch("https://api.rd.services/platform/conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RD_STATION_TOKEN}`,
      },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: data.conversion_identifier,
          name: data.name,
          email: data.email,
          personal_phone: data.phone,
          company_name: data.company,
          cf_message: data.message,
          traffic_source: data.source,
          client_tracking_id: "motin-films-website",
        },
      }),
    })

    // Para fins de demonstração, vamos simular uma resposta bem-sucedida
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao processar solicitação RD Station:", error)
    return NextResponse.json({ error: "Falha ao processar solicitação" }, { status: 500 })
  }
}
