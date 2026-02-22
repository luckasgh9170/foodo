import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export type AuthPayload = {
  sub: string;
  role: "ADMIN" | "MANAGER";
  email: string;
};

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me"
);

export const signToken = async (payload: AuthPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthPayload;
  } catch {
    return null;
  }
};

export const getAuthFromRequest = async (request: NextRequest) => {
  const token = request.cookies.get("foodo_token")?.value;
  if (!token) return null;
  return verifyToken(token);
};
