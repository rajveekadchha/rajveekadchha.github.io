export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-black md:text-5xl">
          About me
        </h1>
      </div>

      {/* Main card */}
      <section className="rounded-[32px] border border-black/10 bg-white/60 backdrop-blur-md shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
        <div className="grid gap-10 p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
        
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white/40">
              <img
                src="/me.jpg"
                alt="Rajvee"
                className="h-[340px] w-full object-cover md:h-[420px]"
              />
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white/50 p-5">
              <div className="text-sm font-semibold text-black">Quick bits</div>

              <div className="mt-3 grid gap-3 text-sm text-black/70">
                <div className="flex items-center justify-between">
                  <span className="text-black/50">Based in</span>
                  <span className="font-medium text-black/80">Bangalore</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/50">Focus</span>
                  <span className="font-medium text-black/80">
                    Frontend (React, TypeScript, JavaScript)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-xs text-black/70">
                🧩 UI details
              </span>
              <span className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-xs text-black/70">
                ☕ coffee
              </span>
              <span className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-xs text-black/70">
                🍳 cooking
              </span>

              <span className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-xs text-black/70">
                📸 Good sitcoms
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="pb-2">
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              Hey, I’m Rajvee 👋
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-black/70">
              I’m a frontend developer based in Bangalore. I mostly live in
              React, TypeScript, and the tiny details that make interfaces feel
              right.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-black/70">
              I studied Information and Communication Technology Engineering at
              Ahmedabad University, and frontend development is where I
              naturally ended up and stayed. I’ve built and shipped Shopify
              apps, worked on performance optimisation (yes, I care about
              Lighthouse scores), built a React app for Thinkific, and developed
              features in Wix using blocks. I’m also a certified Wix Velo
              developer, so wiring logic and UI together doesn’t scare me.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-black/70">
              I enjoy building interfaces that are clean, fast, and make sense
              to real users. I like things that feel playful but still solid
              under the hood. This site is a small reflection of that.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-black/70">
              Outside of work, I like cooking, drinking good coffee, and sharing
              small life snippets on Instagram and YouTube. Sometimes it’s
              coffee, sometimes it’s food, sometimes it’s just a random thought.
              Not everything needs to be serious.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-black/70">
              If you’re looking for a frontend developer who enjoys building
              things properly and keeping it fun, we’ll probably get along.
            </p>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/chaotic_yet_exotic"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-semibold text-black/80 hover:bg-white/80"
              >
                Instagram
              </a>

              <a
                href="https://github.com/rajveekadchha"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
