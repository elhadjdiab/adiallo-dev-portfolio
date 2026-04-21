import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function POST(request) {
  try {
    // Vérifier l'authentification
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF." },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Maximum 5MB." },
        { status: 400 }
      );
    }

    // Créer le dossier uploads si nécessaire
    const uploadsDir = join(process.cwd(), "public", "uploads", "projects");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${originalName}`;
    const filePath = join(uploadsDir, fileName);

    // Convertir le fichier en buffer et sauvegarder
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retourner l'URL publique
    const publicUrl = `/uploads/projects/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload.", details: error.message },
      { status: 500 }
    );
  }
}
