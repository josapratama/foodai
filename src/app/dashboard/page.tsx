"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { analyzeImage } from "@/utils/openai";
import { useToast } from "@/hooks/use-toast";
import AnalysisTabs from "@/components/dashboard/analysis-tabs";
import ImageUploader from "@/components/dashboard/image-uploader";
import { SearchTop } from "@/components/dashboard/search";
import SettingsDialog from "@/components/dashboard/settings-dialog";
import ProfileDialog from "@/components/dashboard/profile-dialog";
import HeaderPage from "@/components/dashboard/header";
import { useTranslations } from "@/hooks/use-translations";
import LogoutDialog from "@/components/dashboard/logout-dialog";
import ErrorBoundary from "@/components/error-boundary";

const DashboardPage: React.FC = () => {
  const { t, locale } = useTranslations();

  // Fungsi untuk mengambil nilai dari localStorage atau menggunakan nilai default
  const getInitialLanguage = () => {
    return localStorage.getItem("language") ?? locale;
  };

  const getInitialTheme = () => {
    return localStorage.getItem("theme") ?? "light";
  };

  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Set nilai awal dari localStorage atau default
  const [language, setLanguage] = useState<string>(getInitialLanguage());
  const [theme, setTheme] = useState<string>(getInitialTheme());

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    try {
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      router.push("/login");
    }
  }, [router]); // Runs once on mount

  // Simpan language ke localStorage jika berubah
  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Simpan theme ke localStorage jika berubah
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Fungsi untuk mengelola analisis gambar
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
          title: t("dashboard_page.error"),
          description:
            error instanceof Error
              ? error.message
              : t("dashboard_page.image_analysis_failed"),
          variant: "destructive",
        });
        console.error("Error details:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  // Fungsi untuk menutup dialog
  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   setIsProfileOpen(false);
  //   setIsSettingOpen(false);
  // };

  // Fungsi untuk logout
  const handleLogout = () => {
    setIsDialogOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      <HeaderPage
        user={user}
        setIsProfileOpen={setIsProfileOpen}
        setIsSettingOpen={setIsSettingOpen}
        handleLogout={handleLogout}
      />

      {isDialogOpen && (
        <LogoutDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          confirmLogout={confirmLogout}
        />
      )}

      {isProfileOpen && (
        <ProfileDialog
          user={user}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}

      {isSettingOpen && (
        <SettingsDialog
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          isSettingOpen={isSettingOpen}
          setIsSettingOpen={setIsSettingOpen}
        />
      )}

      <main className="container mx-auto my-8 px-4">
        <SearchTop />
        <ImageUploader
          onAnalyzeImage={handleAnalyzeImage}
          setImage={setImage}
          isAnalyzing={isAnalyzing}
          image={image}
        />
        <ErrorBoundary>
          <AnalysisTabs />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default DashboardPage;
