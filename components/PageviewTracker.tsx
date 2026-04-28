"use client";

import { useEffect } from "react";

export default function PageviewTracker({ path, locale }: { path: string; locale: string }) {
  useEffect(() => {
    fetch("/api/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, locale, referrer: typeof document !== "undefined" ? document.referrer : null }),
      keepalive: true,
    }).catch(() => {});
  }, [path, locale]);
  return null;
}
