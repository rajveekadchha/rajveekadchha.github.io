import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project: p }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [expanded]);

  return (
    <article className="group overflow-hidden rounded-[24px] border border-black/10 bg-white/60 backdrop-blur-md transition hover:-translate-y-[2px] hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
      {/* image */}
      <div className="overflow-hidden border-b border-black/10 bg-white/40">
        <img
          src={p.image}
          alt={p.title}
          className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-black">{p.title}</h3>

        <p
          ref={textRef}
          className={`mt-2 text-sm leading-relaxed text-black/70 ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {p.description}
        </p>

        {isTruncated && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-[13px] font-medium text-black/45 underline-offset-4 hover:text-black/70 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {p.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] text-black/70"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-medium text-black/80 underline-offset-4 hover:underline"
        >
          View project →
        </a>
      </div>
    </article>
  );
}
