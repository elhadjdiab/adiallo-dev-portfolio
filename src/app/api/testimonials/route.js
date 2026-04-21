import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

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
      { error: "Impossible de recuperer les temoignages.", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    const { content, projectId } = await request.json();
    
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Le contenu du temoignage est obligatoire." },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "Le projet est obligatoire." },
        { status: 400 }
      );
    }

    if (content.trim().length < 20) {
      return NextResponse.json(
        { error: "Le temoignage doit contenir au moins 20 caracteres." },
        { status: 400 }
      );
    }

    if (content.trim().length > 500) {
      return NextResponse.json(
        { error: "Le temoignage ne peut pas depasser 500 caracteres." },
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
      { error: "Impossible de creer le temoignage.", details: error.message },
      { status: 500 }
    );
  }
}
