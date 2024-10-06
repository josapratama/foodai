import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const drinks = await prisma.drink.findMany({
      include: {
        food: true,
      },
    });
    return NextResponse.json(drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
