import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const heroSections = await prisma.heroSection.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(heroSections);
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero sections" },
      { status: 500 }
    );
  }
}
