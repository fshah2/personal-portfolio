"use client"

import { Sparkles } from "lucide-react"
import type { Accent } from "./accent"
import { accent as accentClasses } from "./accent"

interface SectionSummaryProps {
  text: string
  accent: Accent
}

export function SectionSummary({ text, accent }: SectionSummaryProps) {
  const a = accentClasses[accent]
  return (
    <aside
      className={`my-12 border-l-2 ${a.border} ${a.bgSoft} px-6 py-5`}
      aria-label="Section summary"
    >
      <div className={`flex items-center gap-2 mb-3 ${a.text}`}>
        <Sparkles className="h-3.5 w-3.5" />
        <span className="text-[11px] font-mono uppercase tracking-wider">
          Summary
        </span>
      </div>
      <p className="font-serif text-lg italic leading-relaxed text-foreground/90">
        {text}
      </p>
    </aside>
  )
}
