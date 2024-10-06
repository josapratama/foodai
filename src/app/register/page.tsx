"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { validatePassword } from "@/utils/password";
import { useTranslations } from "@/hooks/use-translations"; // Import useTranslations

const RegistrationPage: React.FC = () => {
  useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslations(); // Use translations

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast({
        title: t("registration_page.error"),
        description: t("registration_page.password_complexity_error"),
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t("registration_page.error"),
        description: t("registration_page.passwords_do_not_match"),
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        toast({
          title: t("registration_page.success"),
          description: t("registration_page.registration_successful"),
        });
        router.push("/login");
      } else {
        const data = await response.json();
        toast({
          title: t("registration_page.error"),
          description:
            data.message || t("registration_page.registration_failed"),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t("registration_page.error"),
        description: t("registration_page.unexpected_error"),
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <Logo />
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">{t("registration_page.username")}</Label>
          <Input
            id="username"
            type="text"
            placeholder={t("registration_page.username")}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("registration_page.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("registration_page.email")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("registration_page.password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("registration_page.password")}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword
                  ? t("registration_page.hide_password")
                  : t("registration_page.show_password")
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">
            {t("registration_page.confirm_password")}
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("registration_page.confirm_password")}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={toggleConfirmPasswordVisibility}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full">
          {t("registration_page.register")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/")}
        >
          {t("registration_page.back")}
        </Button>
        <div className="text-sm text-center">
          {t("registration_page.already_have_account")}{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            {t("registration_page.login")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
