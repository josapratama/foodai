"use client";

import React, { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Corrected import here
import { Camera } from "lucide-react";

interface ImageUploaderProps {
  onAnalyzeImage: (image: string) => void;
  setImage: (image: string | null) => void;
  isAnalyzing: boolean;
  image: string | null; // Add image prop
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onAnalyzeImage,
  setImage,
  isAnalyzing,
  image, // Destructure image prop
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(",")[1];
        setImage(base64String ?? null);
        onAnalyzeImage(base64String ?? ""); // Call the function to analyze the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative border border-dashed border-gray-300 flex justify-center items-center w-64 h-64">
        {image ? (
          <Image
            src={`data:image/jpeg;base64,${image}`}
            alt="Uploaded food"
            className="w-full h-full object-cover rounded-lg"
            width={500}
            height={500}
            unoptimized={true}
          />
        ) : (
          <Camera className="h-12 w-12 text-gray-400" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Update to use handleFileChange
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <Button
        onClick={() => onAnalyzeImage(image ?? "")} // Use the onAnalyzeImage prop
        disabled={!image || isAnalyzing}
        className="w-full max-w-xs"
      >
        {isAnalyzing ? "Menganalisis..." : "Analisis Gambar"}
      </Button>
    </div>
  );
};

export default ImageUploader;
