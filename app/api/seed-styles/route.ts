import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

// One-time seeder for the 10 style-test articles.
// Reads /content/style-tests/*.md, parses frontmatter + H1 title, inserts as drafts.
// Auth: must send `Authorization: Bearer <SEED_TOKEN>` header.
// Token is hardcoded since this is a temporary endpoint we'll delete after use.

const SEED_TOKEN = "ovM3Z8zOk3gzM5oRubI2qMwIW6ntWYONkxwfnDEam5Q";

const ARTICLES = [
  { file: "01_naval_aphoristic.md",     slug: "01-naval-style-test",      category: "Štýl 01 · Naval (aphoristic)",      hero: "/photos/dj-pdfmetoda-post1.jpg", mins: 3 },
  { file: "02_personal_narrative.md",   slug: "02-narrative-style-test",  category: "Štýl 02 · Personal narrative",      hero: "/photos/dj-pdfmetoda-post6.jpg", mins: 6 },
  { file: "03_numbered_listicle.md",    slug: "03-listicle-style-test",   category: "Štýl 03 · Numbered listicle",       hero: "/photos/dj-pdfmetoda-post2.jpg", mins: 5 },
  { file: "04_contrarian_polemic.md",   slug: "04-polemic-style-test",    category: "Štýl 04 · Contrarian polemic",      hero: "/photos/dj-pdfmetoda-post3.jpg", mins: 5 },
  { file: "05_socratic_qa.md",          slug: "05-socratic-style-test",   category: "Štýl 05 · Socratic Q&A",            hero: "/photos/dj-pdfmetoda-post4.jpg", mins: 5 },
  { file: "06_step_by_step.md",         slug: "06-stepbystep-style-test", category: "Štýl 06 · Step-by-step guide",      hero: "/photos/dj-pdfmetoda-post5.jpg", mins: 6 },
  { file: "07_letter_younger_self.md",  slug: "07-letter-style-test",     category: "Štýl 07 · Letter to younger self",  hero: "/photos/dj-pdfmetoda-post6.jpg", mins: 7 },
  { file: "08_data_driven.md",          slug: "08-data-style-test",       category: "Štýl 08 · Data-driven analysis",    hero: "/photos/dj-pdfmetoda-post1.jpg", mins: 6 },
  { file: "09_paul_graham_essay.md",    slug: "09-essay-style-test",      category: "Štýl 09 · Paul Graham essay",       hero: "/photos/dj-pdfmetoda-post4.jpg", mins: 8 },
  { file: "10_hormozi_hook_loop.md",    slug: "10-hormozi-style-test",    category: "Štýl 10 · Hormozi hook & loop",     hero: "/photos/dj-pdfmetoda-post3.jpg", mins: 4 },
];

function parseMd(raw: string): { title: string; body: string } {
  // Walk past any leading garbage: code fences (```yaml, ```markdown, ```md, ```yml, ```),
  // frontmatter delimiters (---), and key:value YAML lines. Stop at first non-frontmatter line.
  const lines = raw.trim().split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    const isFence = /^```/.test(line);
    const isDashes = /^---+$/.test(line);
    const isKeyValue = /^[a-zA-Z_][a-zA-Z0-9_]*\s*:\s/.test(line) && !line.startsWith("#");
    const isQuotedKeyValue = /^[a-zA-Z_][a-zA-Z0-9_]*\s*:\s*"/.test(line);
    const isBlank = line === "";
    if (isFence || isDashes || isKeyValue || isQuotedKeyValue || isBlank) {
      i++;
    } else {
      break;
    }
  }
  // Pick up the H1
  let title = "Untitled";
  if (i < lines.length && /^#\s+/.test(lines[i].trim())) {
    title = lines[i].trim().replace(/^#\s+/, "");
    i++;
  }
  // Skip any blanks after the title
  while (i < lines.length && lines[i].trim() === "") i++;
  const body = lines.slice(i).join("\n").trim();
  return { title, body };
}

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${SEED_TOKEN}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "service_role key missing" }, { status: 500 });
  }
  const dir = path.join(process.cwd(), "content", "style-tests");
  const results: Array<{ slug: string; ok: boolean; error?: string }> = [];

  for (const a of ARTICLES) {
    try {
      const raw = fs.readFileSync(path.join(dir, a.file), "utf-8");
      const { title, body } = parseMd(raw);
      const paras = body.split("\n\n").map((p) => p.trim()).filter((p) => p && !p.startsWith("#"));
      const excerpt = (paras[0] ?? body).slice(0, 220);

      const { error } = await supabaseAdmin.from("articles").upsert(
        {
          slug: a.slug,
          locale: "sk",
          title,
          excerpt,
          body_md: body,
          hero_image_url: a.hero,
          category: a.category,
          status: "draft",
          primary_keyword: "šetrenie tvorba peniaze",
          reading_minutes: a.mins,
          published_at: new Date().toISOString(),
        },
        { onConflict: "slug,locale" }
      );
      if (error) throw error;
      results.push({ slug: a.slug, ok: true });
    } catch (e: any) {
      results.push({ slug: a.slug, ok: false, error: String(e?.message ?? e) });
    }
  }
  return NextResponse.json({ results, total: results.length });
}
