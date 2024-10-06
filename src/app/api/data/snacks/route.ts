import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const snacks = await prisma.snack.findMany({
      include: {
        food: true,
      },
    });
    return NextResponse.json(snacks);
  } catch (error) {
    console.error("Error fetching snacks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
