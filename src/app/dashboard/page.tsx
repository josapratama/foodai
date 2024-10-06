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
  const { t } = useTranslations();

  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState<string>("light");
  const [theme, setTheme] = useState<string>("light");

  const router = useRouter();
  const { toast } = useToast();

  // Check if in the browser before accessing localStorage
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

  // Initialize language and theme from localStorage in a useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      const storedTheme = localStorage.getItem("theme");

      if (storedLanguage) setLanguage(storedLanguage);
      if (storedTheme) setTheme(storedTheme);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

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
