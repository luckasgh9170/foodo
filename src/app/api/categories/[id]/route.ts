import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validators";
import { getAuthFromRequest } from "@/lib/auth";
import { emitEvent } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const category = await prisma.category.update({
    where: { id: params.id },
    data: parsed.data,
  });

  emitEvent(SOCKET_EVENTS.CATEGORY_UPDATED, category);

  return NextResponse.json({ category });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const category = await prisma.category.delete({
    where: { id: params.id },
  });

  emitEvent(SOCKET_EVENTS.CATEGORY_DELETED, category);

  return NextResponse.json({ ok: true });
}
