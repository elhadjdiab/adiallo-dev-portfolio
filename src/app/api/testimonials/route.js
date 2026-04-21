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
    const testimonials = await prisma.testimonial.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de recuperer les temoignages." },
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

    const { content } = await request.json();
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Le contenu du temoignage est obligatoire." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        content: content.trim(),
        userId: authUser.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de creer le temoignage." },
      { status: 500 }
    );
  }
}
