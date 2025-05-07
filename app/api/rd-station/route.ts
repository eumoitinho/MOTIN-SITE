import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("Received form data:", data)

    // Make sure we have the required fields
    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get the RD Station token
    const token = process.env.RD_STATION_TOKEN

    if (!token) {
      console.error("RD Station token is missing")
      return NextResponse.json({ error: "RD Station token is missing" }, { status: 500 })
    }

    // Prepare the payload for RD Station
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: data.identificador || "contato-site",
        name: data.name,
        email: data.email,
        personal_phone: data.phone,
        cf_message: data.message,
        company_name: data.company || "",
        traffic_source: data.traffic_source || "",
        traffic_medium: data.traffic_medium || "",
        traffic_campaign: data.traffic_campaign || "",
        traffic_value: data.traffic_value || "",
        client_tracking_id: "motin-films-website",
      },
    }

    console.log("Sending to RD Station:", payload)

    // Send the data to RD Station
    const response = await fetch("https://api.rd.services/platform/conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("RD Station API error:", responseData)
      return NextResponse.json(
        { error: "Failed to submit to RD Station", details: responseData },
        { status: response.status },
      )
    }

    console.log("RD Station response:", responseData)
    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error("Error in RD Station API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
