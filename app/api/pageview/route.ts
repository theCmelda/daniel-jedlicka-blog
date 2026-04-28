import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { path, locale, referrer } = await req.json();
    const ua = req.headers.get("user-agent") ?? null;
    const ip = req.headers.get("x-forwarded-for") ?? "0.0.0.0";
    const country = req.headers.get("x-vercel-ip-country") ?? null;
    // privacy-preserving session hash
    const sessionHash = crypto.createHash("sha256").update(`${ip}|${ua}|${new Date().toISOString().slice(0, 10)}`).digest("hex").slice(0, 16);
    await supabase.from("pageviews").insert({
      path,
      locale,
      referrer: referrer || null,
      user_agent: ua,
      country,
      session_hash: sessionHash,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
