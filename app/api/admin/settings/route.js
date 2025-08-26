import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the first (and should be only) site settings record
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.siteSettings.create({
        data: {
          siteName: "ETC Interior",
          siteDescription: "Professional Interior Design Services",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Get existing settings or create new ones
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      // Update existing settings
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: body.siteName,
          siteDescription: body.siteDescription,
          logo: body.logo,
          favicon: body.favicon,
          phone: body.phone,
          email: body.email,
          address: body.address,
          socialLinks: body.socialLinks,
          seoTitle: body.seoTitle,
          seoDescription: body.seoDescription,
          seoKeywords: body.seoKeywords,
        },
      });
    } else {
      // Create new settings
      settings = await prisma.siteSettings.create({
        data: {
          siteName: body.siteName,
          siteDescription: body.siteDescription,
          logo: body.logo,
          favicon: body.favicon,
          phone: body.phone,
          email: body.email,
          address: body.address,
          socialLinks: body.socialLinks,
          seoTitle: body.seoTitle,
          seoDescription: body.seoDescription,
          seoKeywords: body.seoKeywords,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
