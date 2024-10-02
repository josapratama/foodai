export async function analyzeImage(imageDescription: string): Promise<string> {
  console.log(
    "Sending Image Description:",
    imageDescription.substring(0, 100) + "..."
  );

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Server error: ${response.status} - ${
          errorData.error || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat menganalisis gambar"
    );
  }
}
