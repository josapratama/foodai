import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
  const { otp, newPassword } = await req.json();

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

  if (!validatePassword(newPassword)) {
    return NextResponse.json(
      { error: "Password must meet complexity requirements." },
      { status: 400 }
    );
  }

  try {
    const otpEntry = await prisma.otp.findFirst({
      where: { otp: Number(otp) },
    });

    if (!otpEntry) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.password.update({
      where: { userId: otpEntry.userId },
      data: { hash: hashedPassword },
    });

    await prisma.otp.delete({
      where: { id: otpEntry.id },
    });

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { error: "An error occurred during the reset process" },
      { status: 500 }
    );
  }
}
