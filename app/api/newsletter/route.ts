import { NextResponse } from "next/server";
import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, locale, sourceSlug } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }
    const ip = req.headers.get("x-forwarded-for") ?? null;
    const ua = req.headers.get("user-agent") ?? null;

    const client = supabaseAdmin ?? supabase;
    const { error } = await client.from("subscribers").upsert(
      { email, locale: locale ?? "sk", source_slug: sourceSlug ?? null, ip, user_agent: ua },
      { onConflict: "email" }
    );
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
