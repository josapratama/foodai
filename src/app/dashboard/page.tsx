"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, LogOut } from "lucide-react";
import Logo from "@/components/logo";
import { analyzeImage } from "@/utils/openai";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (image) {
      setIsAnalyzing(true);
      try {
        const result = await analyzeImage(image);
        router.push(
          `/analysis?image=data:image/jpeg;base64,${image}&foodType=${encodeURIComponent(
            result
          )}`
        );
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Gagal menganalisis gambar. Silakan coba lagi.",
          variant: "destructive",
        });
        console.error("Error details:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Logo />
          <Input type="text" placeholder="Search..." className="w-64" />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.username}</span>
          <Button onClick={handleLogout} variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="container mx-auto mt-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center relative">
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
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Button onClick={handleAnalyzeImage} disabled={!image || isAnalyzing}>
            {isAnalyzing ? "Menganalisis..." : "Analisis Gambar"}
          </Button>
        </div>
        <Tabs defaultValue="food" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="drink">Drink</TabsTrigger>
            <TabsTrigger value="snack">Snack</TabsTrigger>
          </TabsList>
          <TabsContent value="food">Food Content</TabsContent>
          <TabsContent value="drink">Drink Content</TabsContent>
          <TabsContent value="snack">Snack Content</TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
