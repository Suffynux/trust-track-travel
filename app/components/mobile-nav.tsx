"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { href: string; label: string; note: string };

export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-bars" aria-hidden="true">
          <i />
          <i />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav id="nav-panel" className="nav-panel" aria-label="Main">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <span className="nav-panel-note">{item.note}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
