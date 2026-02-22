"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators";
import { z } from "zod";
import { useRouter } from "next/navigation";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@foodo.local",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setError("Login failed. Please check credentials.");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-6">
      <div className="w-full rounded-3xl border border-brand/15 bg-[#141414] p-8 shadow-xl">
        <p className="text-sm text-muted">FOODO Admin</p>
        <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Use your email and password to access the dashboard.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-[#0f0f0f] px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-[#0f0f0f] px-4 py-3 text-ink"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-[#3a0f0f] px-3 py-2 text-sm text-[#ff8b8b]">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
