"use client";

import { useEffect, useState } from "react";
import { dict, type Locale } from "@/lib/i18n";

type Comment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export default function CommentSection({ articleId, locale }: { articleId: string; locale: Locale }) {
  const d = dict(locale);
  const [list, setList] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  useEffect(() => {
    fetch(`/api/comments?articleId=${articleId}`)
      .then((r) => r.json())
      .then((data) => setList(data.comments ?? []));
  }, [articleId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || body.trim().length < 3) return;
    setState("loading");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, name, body }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) {
        setName("");
        setBody("");
      }
    } catch {
      setState("err");
    }
  }

  return (
    <section className="mt-12 max-w-2xl mx-auto">
      <h2 className="font-serif text-3xl text-palm mb-6">{d.comments_title}</h2>
      <form onSubmit={submit} className="space-y-3 mb-10">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={d.comments_name}
          aria-label={d.comments_name}
          className="w-full px-4 py-3 rounded-chunk border-2 border-palm/30 bg-white focus:border-palm focus:outline-none"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={d.comments_placeholder}
          aria-label={d.comments_placeholder}
          rows={4}
          className="w-full px-4 py-3 rounded-chunk border-2 border-palm/30 bg-white focus:border-palm focus:outline-none resize-y"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 rounded-chunk bg-palm text-white font-semibold shadow-chunkSun hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-60"
        >
          {state === "loading" ? "…" : d.comments_submit}
        </button>
        {state === "ok" && <p className="text-palm text-sm">{d.comments_pending}</p>}
      </form>
      <ul className="space-y-5">
        {list.map((c) => (
          <li key={c.id} className="bg-white p-5 rounded-chunk border border-palm/15">
            <div className="font-semibold text-palm">{c.author_name}</div>
            <div className="text-sm text-ink/50 mb-2">
              {new Date(c.created_at).toLocaleDateString(locale === "cs" ? "cs-CZ" : "sk-SK")}
            </div>
            <p className="text-ink/90 whitespace-pre-wrap">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
