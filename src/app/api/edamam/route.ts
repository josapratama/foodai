import { NextRequest, NextResponse } from "next/server";

const APP_ID = process.env.EDAMAM_APP_ID;
const APP_KEY = process.env.EDAMAM_APP_KEY;

if (!APP_ID || !APP_KEY) {
  console.error(
    "Edamam API credentials are not set. Please check your environment variables."
  );
}

const BASE_URL = "https://api.edamam.com/api/nutrition-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const foodName = searchParams.get("foodName");

  if (!foodName || typeof foodName !== "string") {
    return NextResponse.json(
      { error: "Food name is required" },
      { status: 400 }
    );
  }

  const url = `${BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(
    foodName
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch nutrition data");
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return NextResponse.json(
      { error: "Failed to fetch nutrition data" },
      { status: 500 }
    );
  }
}
