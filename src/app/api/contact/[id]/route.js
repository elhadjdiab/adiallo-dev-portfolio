import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req, { params }) {
  try {
    const authCheck = await requireAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    const body = await req.json();
    
    const updated = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead: body.isRead }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authCheck = await requireAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: "Supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}