import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, getUserFromToken } from "@/lib/auth";
import { ERROR_MESSAGES } from "@/lib/messages";

export async function GET() {
  try {
    // Retourner seulement les témoignages approuvés pour le public
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "approved",
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIALS_FETCH_ERROR, details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const authUser = await getUserFromToken(token);
    if (!authUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { content, projectId } = await request.json();
    
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_CONTENT_REQUIRED },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_PROJECT_REQUIRED },
        { status: 400 }
      );
    }

    if (content.trim().length < 20) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_MIN_LENGTH },
        { status: 400 }
      );
    }

    if (content.trim().length > 500) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_MAX_LENGTH },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        content: content.trim(),
        status: "pending", // Par défaut en attente de modération
        userId: authUser.id,
        projectId: parseInt(projectId),
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIAL_CREATE_ERROR, details: error.message },
      { status: 500 }
    );
  }
}
