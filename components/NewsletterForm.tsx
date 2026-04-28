"use client";

import { useState } from "react";
import { dict, type Locale } from "@/lib/i18n";

export default function NewsletterForm({ locale, sourceSlug }: { locale: Locale; sourceSlug?: string }) {
  const d = dict(locale);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setState("err");
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, sourceSlug }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) setEmail("");
    } catch {
      setState("err");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        placeholder={d.newsletter_placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label={d.newsletter_placeholder}
        className="flex-1 px-4 py-3 rounded-chunk border-2 border-palm/30 bg-white focus:border-palm focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 rounded-chunk bg-palm text-white font-semibold shadow-chunkSun hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-60"
      >
        {state === "loading" ? "…" : d.newsletter_submit}
      </button>
      {state === "ok" && <span className="text-sm text-palm self-center">{d.newsletter_thanks}</span>}
    </form>
  );
}
