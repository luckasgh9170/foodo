import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";
import { getAuthFromRequest } from "@/lib/auth";
import { emitEvent } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const product = await prisma.product.create({ data: parsed.data });
  emitEvent(SOCKET_EVENTS.PRODUCT_CREATED, product);

  return NextResponse.json({ product }, { status: 201 });
}
