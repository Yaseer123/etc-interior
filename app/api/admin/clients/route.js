import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await prisma.client.create({
      data: {
        name: data.name,
        company: data.company,
        logo: data.logo,
        website: data.website,
        description: data.description,
        testimonial: data.testimonial,
        rating: data.rating ?? 5,
        isActive: data.isActive ?? true,
        featured: data.featured ?? false,
        order: data.order ?? 0,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}


