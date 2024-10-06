import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/utils/password";
import { generateToken } from "@/utils/jwt";
import { setCookie } from "@/utils/cookies";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: email }],
      },
      include: {
        password: true,
      },
    });

    if (user && user.password) {
      const isValidPassword = await verifyPassword(
        user.password.hash,
        password
      );

      if (isValidPassword) {
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        const expiresIn = "7d";
        const token = generateToken(
          userWithoutPassword,
          process.env.JWT_SECRET!,
          expiresIn
        );

        const cookie = setCookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        return new NextResponse(JSON.stringify({ user: userWithoutPassword }), {
          status: 200,
          headers: {
            "Set-Cookie": cookie,
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Invalid username/email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
