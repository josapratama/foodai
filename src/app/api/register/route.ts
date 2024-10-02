import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/password";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      },
      { status: 400 }
    );
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      username,
      email,
      password: {
        create: {
          hash: passwordHash,
        },
      },
    },
  });

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 201 }
  );
}
