"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      const { otp } = data;
      localStorage.setItem("otp", otp.toString());
      localStorage.setItem("otpEmail", email);
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${email}`,
      });
      router.push("/reset-password");
    } else {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
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
        <Button type="submit" className="w-full">
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
