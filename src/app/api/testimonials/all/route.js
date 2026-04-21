import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request) {
  try {
    // Vérifier que l'utilisateur est authentifié (admin)
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    // Retourner tous les témoignages (tous status)
    const testimonials = await prisma.testimonial.findMany({
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
    console.error("Error fetching all testimonials:", error);
    return NextResponse.json(
      { error: "Impossible de recuperer les temoignages.", details: error.message },
      { status: 500 }
    );
  }
}
