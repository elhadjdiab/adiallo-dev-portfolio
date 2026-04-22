import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserFromToken(token) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  } catch (error) {
    return null;
  }
}

export function isAdmin(user) {
  return user && user.role === "admin";
}

export async function requireAdmin(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return { error: "Non autorisé", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");
  const user = await getUserFromToken(token);

  if (!user) {
    return { error: "Token invalide", status: 401 };
  }

  if (!isAdmin(user)) {
    return { error: "Accès admin requis", status: 403 };
  }

  return { user };
}
