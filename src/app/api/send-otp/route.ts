import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.otp.create({
      data: {
        userId: user.id,
        otp,
        email,
      },
    });

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
