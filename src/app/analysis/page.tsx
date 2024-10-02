"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface NutritionData {
  calories: number;
  totalNutrients: {
    CHOCDF: { quantity: number };
    PROCNT: { quantity: number };
    FAT: { quantity: number };
    NA: { quantity: number };
    K: { quantity: number };
    CHOLE: { quantity: number };
  };
}

const getNutritionData = async (foodType: string): Promise<NutritionData> => {
  const response = await fetch(
    `/api/edamam?foodName=${encodeURIComponent(foodType)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch nutrition data");
  }
  return response.json();
};

const AnalysisResultPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image") ?? "";
  const foodType = searchParams.get("foodType") ?? "";
  const { toast } = useToast();
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  useEffect(() => {
    if (!foodType) return;

    const fetchNutritionData = async () => {
      try {
        const data = await getNutritionData(foodType);
        setNutritionData(data);
      } catch {
        toast({
          title: "Error",
          description: "Gagal mengambil data nutrisi. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    };

    fetchNutritionData();
  }, [foodType, toast]);

  if (!nutritionData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const isHealthy =
    nutritionData.calories < 300 &&
    nutritionData.totalNutrients.FAT.quantity < 10;

  return (
    <div className="min-h-screen bg-background p-8">
      <Button
        variant="outline"
        size="icon"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src={image}
              alt={foodType}
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {foodType}
            </div>
            <p className="mt-2 text-gray-500">Informasi Nutrisi (per 100g):</p>
            <ul className="mt-2 text-gray-500">
              <li>Kalori: {nutritionData.calories.toFixed(1)} kkal</li>
              <li>
                Karbohidrat:{" "}
                {nutritionData.totalNutrients.CHOCDF?.quantity.toFixed(1) ||
                  "N/A"}{" "}
                g
              </li>
              <li>
                Protein:{" "}
                {nutritionData.totalNutrients.PROCNT?.quantity.toFixed(1) ||
                  "N/A"}{" "}
                g
              </li>
              <li>
                Lemak:{" "}
                {nutritionData.totalNutrients.FAT?.quantity.toFixed(1) || "N/A"}{" "}
                g
              </li>
              <li>
                Natrium:{" "}
                {nutritionData.totalNutrients.NA?.quantity.toFixed(1) || "N/A"}{" "}
                mg
              </li>
              <li>
                Kalium:{" "}
                {nutritionData.totalNutrients.K?.quantity.toFixed(1) || "N/A"}{" "}
                mg
              </li>
              <li>
                Kolesterol:{" "}
                {nutritionData.totalNutrients.CHOLE?.quantity.toFixed(1) ||
                  "N/A"}{" "}
                mg
              </li>
            </ul>
            <p className="mt-4 text-gray-500">
              Penilaian Kesehatan:{" "}
              {isHealthy ? (
                <span className="text-green-500 font-semibold">Sehat</span>
              ) : (
                <span className="text-red-500 font-semibold">Kurang Sehat</span>
              )}
            </p>
            <p className="mt-2 text-gray-500">
              {isHealthy
                ? "Makanan ini merupakan bagian dari diet seimbang dan menyediakan nutrisi penting."
                : "Makanan ini sebaiknya dikonsumsi secara moderat sebagai bagian dari diet seimbang."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Membungkus AnalysisResultPage dalam Suspense
const WrappedAnalysisResultPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AnalysisResultPage />
  </Suspense>
);

export default WrappedAnalysisResultPage;
