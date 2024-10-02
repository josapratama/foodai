import { NextApiRequest, NextApiResponse } from "next";

const APP_ID = process.env.EDAMAM_APP_ID;
const APP_KEY = process.env.EDAMAM_APP_KEY;

if (!APP_ID || !APP_KEY) {
  console.error(
    "Edamam API credentials are not set. Please check your environment variables."
  );
}

const BASE_URL = "https://api.edamam.com/api/nutrition-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foodName } = req.query;

  if (!foodName || typeof foodName !== "string") {
    return res.status(400).json({ error: "Food name is required" });
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
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
}
