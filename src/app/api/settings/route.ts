import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validators";
import { getAuthFromRequest } from "@/lib/auth";
import { emitEvent } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET() {
  const settings = await prisma.setting.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const settings = await prisma.setting.update({
    where: { id: "singleton" },
    data: parsed.data,
  });

  emitEvent(SOCKET_EVENTS.SETTINGS_UPDATED, settings);

  return NextResponse.json({ settings });
}
