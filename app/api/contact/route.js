import {
  contactFormEmailSubject,
  contactFormEmailTemplate,
} from "@/lib/email-templates";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Save message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        isRead: false,
      },
    });

    // Send email notification via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailHtml = contactFormEmailTemplate({
        name,
        email,
        phone,
        subject,
        message,
        messageId: contactMessage.id,
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@yourdomain.com", // You'll need to update this with your verified domain
        to: [process.env.ADMIN_EMAIL || "admin@yourdomain.com"], // You'll need to set this in your .env
        subject: contactFormEmailSubject(subject),
        html: emailHtml,
        replyTo: email, // This allows you to reply directly to the person who submitted the form
      });

      console.log("Email sent successfully via Resend");
    } catch (emailError) {
      console.error("Error sending email via Resend:", emailError);
      // Don't fail the entire request if email fails, just log the error
    }

    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you soon.",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
