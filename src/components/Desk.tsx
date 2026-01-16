import Sticker from "./Sticker";

type Props = {
  onGoWork: () => void;
  onGoAbout: () => void;
  onGoContact: () => void;
};

export default function Desk({
  onGoWork,
  onGoAbout,
  onGoContact,
}: Props) {
  return (
   <section className="relative rounded-[36px] border border-black/10 bg-white/55 backdrop-blur-md shadow-[0_30px_100px_rgba(0,0,0,0.12)]">
  <div className="absolute inset-0 overflow-hidden rounded-[36px]">
   {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-130 w-130 rounded-full bg-white/35 blur-3xl" />
      <div className="pointer-events-none absolute right-55 top-30 h-155 w-155 rounded-full bg-white/25 blur-3xl" />
      <div className="pointer-events-none absolute left-[15%] -bottom-70 h-155 w-155 rounded-full bg-white/20 blur-3xl" />

      {/* subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]"></div>
    </div>
    <div className="relative z-10">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-10 px-12 py-12 md:grid-cols-[1.05fr_0.95fr]">
        {/* left: intro */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
              Hi, I’m Rajvee
            </h1>

            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-black/70">
              I build frontend interfaces and overthink tiny details so you don’t have to.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={onGoWork}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
              >
                Open Work
              </button>
              {/* <button
                onClick={onGoPlay}
                className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-semibold text-black/80 backdrop-blur hover:bg-white/80"
              >
                Playground
              </button> */}
            </div>
          </div>

          <div className="text-xs text-black/55">
            Tip: drag a sticker, then click it.
          </div>
        </div>

        {/* right: sticker cluster */}
        <div className="relative h-[520px] sm:h-[560px] md:h-[520px] lg:h-full lg:min-h-[520px]">
          <Sticker
            title="Work"
            subtitle="case studies + impact"
            emoji="🗂️"
            onClick={onGoWork}
            className="
    left-[10%] top-[8%] w-[240px] rotate-[-2deg]
    sm:left-[14%] sm:top-[10%]
    md:left-[18%] md:top-[14%] md:w-[260px]
    lg:left-[20%] lg:top-[18%]
  "
          />

          {/* <Sticker
            title="Playground"
            subtitle="tiny interaction toys"
            emoji="🧸"
            onClick={onGoPlay}
            className="
    right-[8%] top-[28%] w-[250px] rotate-[2deg]
    sm:right-[10%] sm:top-[32%]
    md:right-[6%] md:top-[34%] md:w-[280px]
    lg:right-[4%] lg:top-[38%]
  "
          /> */}

          <Sticker
            title="About"
            subtitle="me, but cute"
            emoji="💖"
            onClick={onGoAbout}
            className="
    left-[18%] top-[32%] w-[240px] rotate-[1deg]
    sm:left-[32%] sm:top-[24%]
    md:left-[-14%] md:top-[34%]
    lg:left-[52%] lg:top-[42%]
  "
          />

          <Sticker
            title="Contact"
            subtitle="say hi"
            emoji="💌"
            onClick={onGoContact}
            className="
    left-[8%] top-[54%] w-[240px] rotate-[-1deg]
    sm:left-[14%] sm:top-[54%]
    md:left-[22%] md:top-[58%] md:w-[230px]
    lg:left-[28%] lg:top-[68%]
  "
          />
        </div>
        {/* <div className="relative h-full min-h-[420px]">
         
          <Sticker
            title="Work"
            subtitle="case studies + impact"
            emoji="🗂️"
            onClick={onGoWork}
            className="left-[20%] top-[18%] w-[260px] rotate-[-2deg]"
          />

          <Sticker
            title="Playground"
            subtitle="tiny interaction toys"
            emoji="🧸"
            onClick={onGoPlay}
            className="right-[4%] top-[38%] w-[280px] rotate-[2deg]"
          />

          <Sticker
            title="About"
            subtitle="me, but cute"
            emoji="💖"
            onClick={onGoAbout}
            className="left-[52%] top-[52%] w-[240px] rotate-[1deg]"
          />

          <Sticker
            title="Contact"
            subtitle="say hi"
            emoji="💌"
            onClick={onGoContact}
            className="left-[28%] top-[68%] w-[230px] rotate-[-1deg]"
          />
        </div> */}
      </div>
      </div>
    </section>
  );
}
