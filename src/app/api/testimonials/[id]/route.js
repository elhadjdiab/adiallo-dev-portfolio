import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/messages";

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

// GET - Récupérer un témoignage spécifique
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIAL_FETCH_ERROR, details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Changer le status (approuver/rejeter)
export async function PATCH(request, { params }) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_STATUS_INVALID },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial status:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIAL_STATUS_UPDATE_ERROR, details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Modifier le contenu
export async function PUT(request, { params }) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { id } = await params;
    const { content, status } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TESTIMONIAL_CONTENT_REQUIRED },
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

    const updateData = {
      content: content.trim(),
    };

    // Optionnel : mettre à jour le status aussi
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      updateData.status = status;
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIAL_UPDATE_ERROR, details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un témoignage
export async function DELETE(request, { params }) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { id } = await params;
    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: SUCCESS_MESSAGES.TESTIMONIAL_DELETED });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.TESTIMONIAL_DELETE_ERROR, details: error.message },
      { status: 500 }
    );
  }
}
