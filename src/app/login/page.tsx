"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "@/hooks/use-translations";

const LoginPage: React.FC = () => {
  useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslations();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ username: user.username, email: user.email })
        );
        toast({
          title: t("login_page.login_successful"),
          description: t("login_page.enter_email_or_username"),
        });
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        toast({
          title: t("error"),
          description: errorData.message || t("login_page.invalid_credentials"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("login_page.login_error"),
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <Logo />
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            {t("login_page.enter_email_or_username_label")}
          </Label>
          <Input
            id="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("login_page.enter_email_or_username")}
            className="text-base sm:text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">
            {t("login_page.enter_password_label")}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login_page.enter_password")}
              className="text-base sm:text-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword
                  ? t("login_page.hide_password")
                  : t("login_page.show_password")
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
        <div className="text-sm text-right">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            {t("login_page.forgot_password")}
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("login_page.logging_in") : t("login_page.login")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/")}
        >
          {t("login_page.back")}
        </Button>
        <div className="text-sm text-center">
          {t("login_page.no_account")}{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            {t("login_page.register")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
