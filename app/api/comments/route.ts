import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");
  if (!articleId) return NextResponse.json({ comments: [] });
  const { data } = await supabase
    .from("comments")
    .select("id, author_name, body, created_at")
    .eq("article_id", articleId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(200);
  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { articleId, name, body } = await req.json();
    if (!articleId || !name || !body) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    if (body.trim().length < 3 || body.length > 5000) {
      return NextResponse.json({ error: "invalid body length" }, { status: 400 });
    }
    const ip = req.headers.get("x-forwarded-for") ?? null;
    const ua = req.headers.get("user-agent") ?? null;
    const { error } = await supabase.from("comments").insert({
      article_id: articleId,
      author_name: name.slice(0, 80),
      body: body.slice(0, 5000),
      status: "pending",
      ip,
      user_agent: ua,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
