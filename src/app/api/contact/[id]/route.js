import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
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
    const { id } = params;
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: "Supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}