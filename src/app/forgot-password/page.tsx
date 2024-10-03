"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
          title: "OTP Sent",
          description: `An OTP has been sent to ${email}`,
        });
        sessionStorage.setItem("resetPasswordEmail", email);
        setTimeout(() => {
          router.push("/reset-password");
        }, 1000);
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Enter your email to receive OTP</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
