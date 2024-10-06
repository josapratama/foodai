import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const vegetables = await prisma.vegetable.findMany({
      include: {
        food: true,
      },
    });
    return NextResponse.json(vegetables);
  } catch (error) {
    console.error("Error fetching vegetables:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
