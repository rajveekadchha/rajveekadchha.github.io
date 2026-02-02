import { experience } from "../data/experience";
import { projects } from "../data/projects";

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-10 py-12">
      {/* EXPERIENCE */}

      <section className="mb-20">
        <div className="mb-8">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black">
            Where I’ve worked
          </h2>
        </div>

        <div className="space-y-10">
          {experience.map((exp) => (
            <div
              key={exp.company}
              className="rounded-[28px] border border-black/10 bg-white/60 p-6 backdrop-blur-md p-[20px] "
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-lg font-semibold text-black">
                    {exp.role}
                  </div>
                  <div className="text-sm text-black/70">{exp.company}</div>
                </div>
                <div className="text-sm text-black/50">{exp.period}</div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-black/70">
                {exp.summary}
              </p>

              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-black/70">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            PROJECTS
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black">
            Things I’ve built
          </h2>
        </div>

        {/* force 2-column rhythm */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-[24px] border border-black/10 bg-white/60 backdrop-blur-md transition hover:-translate-y-[2px] hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]"
            >
              {/* image */}
              <div className="overflow-hidden border-b border-black/10 bg-white/40">
                <img
                  src={p.image}
                  alt={p.title}
                  className=" w-full  transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black">{p.title}</h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/70">
                  {p.description}
                </p>

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
          ))}
        </div>
      </section>
    </div>
  );
}
