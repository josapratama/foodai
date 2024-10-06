"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validatePassword } from "@/utils/password"; // Import the function
import { useTranslations } from "@/hooks/use-translations"; // Import translations hook

const ResetPasswordPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslations(); // Use translations

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast({
        title: t("reset_password_page.error"),
        description: t("reset_password_page.password_complexity_error"),
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, newPassword }),
      });

      if (response.ok) {
        toast({
          title: t("reset_password_page.success"),
          description: t("reset_password_page.password_reset_success"),
        });
        router.push("/login");
      } else {
        const data = await response.json();
        toast({
          title: t("reset_password_page.error"),
          description:
            data.error || t("reset_password_page.failed_to_reset_password"),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t("reset_password_page.error"),
        description: t("reset_password_page.unexpected_error"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleReset} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp">{t("reset_password_page.enter_otp")}</Label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">
            {t("reset_password_page.new_password")}
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full">
          {t("reset_password_page.reset_password")}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
