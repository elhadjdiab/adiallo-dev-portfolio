import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request, { params }) {
  try {
    const testimonialId = parseId(params.id);
    if (!testimonialId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Temoignage introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de recuperer le temoignage." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    const testimonialId = parseId(params.id);
    if (!testimonialId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
    }

    const existing = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Temoignage introuvable." },
        { status: 404 }
      );
    }

    if (existing.userId !== authUser.id) {
      return NextResponse.json({ error: "Acces refuse." }, { status: 403 });
    }

    const { content } = await request.json();
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Le contenu du temoignage est obligatoire." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: { content: content.trim() },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de modifier le temoignage." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    const testimonialId = parseId(params.id);
    if (!testimonialId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
    }

    const existing = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Temoignage introuvable." },
        { status: 404 }
      );
    }

    if (existing.userId !== authUser.id) {
      return NextResponse.json({ error: "Acces refuse." }, { status: 403 });
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json({ message: "Temoignage supprime." });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de supprimer le temoignage." },
      { status: 500 }
    );
  }
}
