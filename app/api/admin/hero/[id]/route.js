import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const heroSection = await prisma.heroSection.findUnique({
      where: { id: params.id },
    });

    if (!heroSection) {
      return NextResponse.json(
        { error: "Hero section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const heroSection = await prisma.heroSection.update({
      where: { id: params.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        isActive: data.isActive,
        order: data.order,
      },
    });
    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json(
      { error: "Failed to update hero section" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.heroSection.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    console.error("Error deleting hero section:", error);
    return NextResponse.json(
      { error: "Failed to delete hero section" },
      { status: 500 }
    );
  }
}
