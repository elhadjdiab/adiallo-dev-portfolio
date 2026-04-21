import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import { ERROR_MESSAGES } from "@/lib/messages";

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
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.PROJECTS_FETCH_ERROR, details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { title, description, imageUrl, githubUrl, liveUrl, technologies } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.PROJECT_TITLE_REQUIRED },
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
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.PROJECT_CREATE_ERROR, details: error.message },
      { status: 500 }
    );
  }
}
