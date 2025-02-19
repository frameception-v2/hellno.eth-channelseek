import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  
  if (!query) {
    return NextResponse.json({ channels: [] });
  }

  const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
  if (!NEYNAR_API_KEY) {
    throw new Error("NEYNAR_API_KEY is not set");
  }

  try {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/channel/search?q=${encodeURIComponent(query)}&limit=10`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": NEYNAR_API_KEY,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Channel search error:", error);
    return NextResponse.json({ error: "Failed to search channels" }, { status: 500 });
  }
}
