import { experience } from "../data/experience";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

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
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
