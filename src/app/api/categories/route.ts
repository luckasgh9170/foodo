import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validators";
import { getAuthFromRequest } from "@/lib/auth";
import { emitEvent } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const category = await prisma.category.create({ data: parsed.data });
  emitEvent(SOCKET_EVENTS.CATEGORY_CREATED, category);

  return NextResponse.json({ category }, { status: 201 });
}
