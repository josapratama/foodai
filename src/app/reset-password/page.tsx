"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-={}[\];':"\\|,.<>/?]+/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol
    );
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");
    const storedEmail = localStorage.getItem("otpEmail");
    const users = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (otp !== storedOtp) {
      toast({
        title: "Error",
        description: "Invalid OTP",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(newPassword)) {
      toast({
        title: "Error",
        description:
          "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = users.map(
      (user: { email: string; password: string }) => {
        if (user.email === storedEmail) {
          return { ...user, password: newPassword };
        }
        return user;
      }
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("otp");
    localStorage.removeItem("otpEmail");

    toast({
      title: "Password Reset",
      description: "Your password has been reset successfully",
    });
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleReset} className="w-full max-w-sm mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
