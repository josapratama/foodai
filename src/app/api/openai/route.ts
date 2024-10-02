import { NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY environment variable is missing or empty.");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("OPENAI_API_KEY environment variable is missing or empty.");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  // Lanjutkan dengan pemrosesan API OpenAI di sini
  const { imageDescription } = await req.json();

  if (!imageDescription) {
    return NextResponse.json(
      { error: "Image description is required" },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that analyzes food images. The user will provide a description of an image, and you should identify the food item in Indonesian.",
        },
        {
          role: "user",
          content: `Analyze this image description and identify the food item in Indonesian: A photograph shows a plate with a food item. The food appears to be ${imageDescription}.`,
        },
      ],
      max_tokens: 100,
    });

    const result =
      response.choices[0]?.message?.content ||
      "Tidak dapat mengidentifikasi makanan";
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menganalisis gambar" },
      { status: 500 }
    );
  }
}
