import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const fruits = await prisma.fruit.findMany({
      include: {
        food: true,
      },
    });
    return NextResponse.json(fruits);
  } catch (error) {
    console.error("Error fetching fruits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
