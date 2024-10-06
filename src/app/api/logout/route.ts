import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  return new NextResponse(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
    headers: {
      "Set-Cookie": serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Menghapus cookie
        path: "/",
      }),
    },
  });
}
