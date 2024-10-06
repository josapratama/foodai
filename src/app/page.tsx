"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "@/hooks/use-translations";

const MainPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <Logo className="mb-6" />
      <h1 className="mt-4 text-3xl font-bold text-center text-gray-800 dark:text-gray-200 sm:text-4xl md:text-5xl lg:text-6xl">
        {t("main_page.welcome_message")}
      </h1>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400 text-lg max-w-lg">
        {t("main_page.description")}
      </p>
      <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
        {!isAuthenticated ? (
          <>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/login">{t("main_page.login")}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/register">{t("main_page.register")}</Link>
            </Button>
          </>
        ) : (
          <Button variant="secondary" className="w-full sm:w-auto">
            {t("main_page.logout")}
          </Button>
        )}
      </div>
      <footer className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>
          {t("main_page.footer")} {currentYear}
        </p>
      </footer>
    </div>
  );
};

export default MainPage;
