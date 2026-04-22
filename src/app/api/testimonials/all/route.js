import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { ERROR_MESSAGES } from "@/lib/messages";

export async function GET(request) {
  try {
    // Vérifier que l'utilisateur est admin
    const authCheck = await requireAdmin(request);
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
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
      { error: ERROR_MESSAGES.TESTIMONIALS_FETCH_ERROR, details: error.message },
      { status: 500 }
    );
  }
}
