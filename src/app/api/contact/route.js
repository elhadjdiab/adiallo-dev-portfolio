import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Protection Honeypot : si ce champ est rempli, c'est un bot
    if (honeypot) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    // 2. Validations Backend
    if (!name || name.length < 2) 
      return NextResponse.json({ error: "Nom trop court" }, { status: 400 });
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) 
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    
    if (!message || message.length < 10 || message.length > 1000) 
      return NextResponse.json({ error: "Message (10-1000 car.)" }, { status: 400 });

    // 3. Création dans SQLite
    const newMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET Protégé pour lister les messages
export async function GET(req) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}