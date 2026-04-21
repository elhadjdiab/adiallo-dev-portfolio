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

function normalizeTechnologies(technologies) {
  if (!Array.isArray(technologies)) return [];
  return technologies
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseId(id);
    if (!projectId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    return NextResponse.json({
      ...project,
      technologies: project.technologies.map((item) => item.technology.name),
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Impossible de recuperer le projet.", details: error.message },
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

    const { id } = await params;
    const projectId = parseId(id);
    if (!projectId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
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

    await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
      },
    });

    await prisma.projectTechnology.deleteMany({
      where: { projectId },
    });

    if (techNames.length > 0) {
      await prisma.project.update({
        where: { id: projectId },
        data: {
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
      });
    }

    const updated = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    return NextResponse.json({
      ...updated,
      technologies: updated.technologies.map((item) => item.technology.name),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Impossible de modifier le projet.", details: error.message },
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

    const { id } = await params;
    const projectId = parseId(id);
    if (!projectId) {
      return NextResponse.json({ error: "ID invalide." }, { status: 400 });
    }

    await prisma.projectTechnology.deleteMany({
      where: { projectId },
    });

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ message: "Projet supprime." });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer le projet.", details: error.message },
      { status: 500 }
    );
  }
}
