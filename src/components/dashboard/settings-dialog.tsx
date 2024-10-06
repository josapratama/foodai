import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import ThemeToggle from "../theme-toggle";
import LanguageSwitcher from "../language-switcher";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "../ui/button";

interface SettingsDialogProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isSettingOpen: boolean;
  setIsSettingOpen: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  isSettingOpen,
  setIsSettingOpen,
}) => {
  const { t } = useTranslations();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [tempLanguage, setTempLanguage] = useState(language);

  const handleSave = () => {
    setTheme(selectedTheme);
    setLanguage(tempLanguage);
    localStorage.setItem("theme", selectedTheme);
    localStorage.setItem("language", tempLanguage);
    setIsSettingOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AlertDialog open={isSettingOpen} onOpenChange={setIsSettingOpen}>
      <AlertDialogContent className="max-w-[90%] md:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("dashboard_page.settings_title")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1">{t("dashboard_page.language")}</label>
            <LanguageSwitcher
              selectedLanguage={tempLanguage}
              setSelectedLanguage={setTempLanguage}
            />
          </div>
          <div>
            <label className="block mb-1">{t("dashboard_page.theme")}</label>
            <ThemeToggle
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-4 space-x-4 min-h-[40px]">
          <Button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center"
          >
            {t("dashboard_page.save")}
          </Button>
          <AlertDialogCancel
            onClick={() => setIsSettingOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-md flex items-center justify-center"
          >
            {t("dashboard_page.close")}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsDialog;
