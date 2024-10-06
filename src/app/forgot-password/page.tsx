"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: t("forgot_password_page.otp_sent"),
          description: `t("forgot_password_page.otp_sent_to", ${email})`,
        });
        sessionStorage.setItem("resetPasswordEmail", email);
        setTimeout(() => {
          router.push("/reset-password");
        }, 1000);
      } else {
        const data = await response.json();
        toast({
          title: t("forgot_password_page.error"),
          description:
            data.error || t("forgot_password_page.failed_to_send_otp"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: t("forgot_password_page.error"),
        description: t("forgot_password_page.unexpected_error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            {t("forgot_password_page.enter_email_for_otp")}
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? t("forgot_password_page.sending")
            : t("forgot_password_page.send_otp")}
        </Button>
        <Button variant="outline" className="w-full" onClick={handleBack}>
          {t("forgot_password_page.back")}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
