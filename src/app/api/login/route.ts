import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/utils/password";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
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
    const isValidPassword = await verifyPassword(user.password.hash, password);

    if (isValidPassword) {
      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return NextResponse.json(userWithoutPassword, { status: 200 });
    }
  }

  return NextResponse.json(
    { message: "Invalid username/email or password" },
    { status: 401 }
  );
}
