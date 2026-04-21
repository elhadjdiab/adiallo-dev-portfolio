import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

function getAuthUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

function normalizeTechnologies(technologies) {
  if (!Array.isArray(technologies)) return [];
  return technologies
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = projects.map((project) => ({
      ...project,
      technologies: project.technologies.map((item) => item.technology.name),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de recuperer les projets." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Debug: vérifier les headers
    const authHeader = request.headers.get('authorization');
    console.log("Auth header reçu:", authHeader ? "Présent" : "Absent");
    console.log("Auth header value:", authHeader?.substring(0, 30) + "...");
    
    const authUser = getAuthUser(request);
    console.log("Auth user:", authUser ? "Authentifié" : "Non authentifié");
    
    if (!authUser) {
      return NextResponse.json({ error: "Non autorise." }, { status: 401 });
    }

    const { title, description, imageUrl, githubUrl, liveUrl, technologies } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont obligatoires." },
        { status: 400 }
      );
    }

    const techNames = normalizeTechnologies(technologies);

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        technologies: {
          create: techNames.map((name) => ({
            technology: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
          })),
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ...project,
        technologies: project.technologies.map((item) => item.technology.name),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de creer le projet." },
      { status: 500 }
    );
  }
}
