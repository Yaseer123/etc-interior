import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const heroSections = await prisma.heroSection.findMany({
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

export async function POST(request) {
  try {
    const data = await request.json();
    const heroSection = await prisma.heroSection.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });
    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error creating hero section:", error);
    return NextResponse.json(
      { error: "Failed to create hero section" },
      { status: 500 }
    );
  }
}
