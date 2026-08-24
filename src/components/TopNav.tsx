import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/work", label: "Work" },
  // { to: "/play", label: "Playground" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/instagram", label: "Content Creation" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-white/25 backdrop-blur-md">
        <nav className="mx-auto flex w-full items-center justify-between px-6 py-6 h-[40px] md:px-10 md:py-10">
          {/* left */}
          <Link
            to="/"
            className="text-[18px] font-semibold tracking-tight text-black/80 hover:text-black transition-colors"
          >
            Rajvee
          </Link>

          {/* right — desktop */}
          <div className="hidden items-center gap-[10px] md:flex">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[18px] font-medium text-black/70 no-underline hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* burger — mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-black/10 bg-white/60 md:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-black/80 transition-transform ${
                open ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-black/80 transition-transform ${
                open ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-b border-black/10 bg-white/80 backdrop-blur-md transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-64" : "max-h-0 border-b-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-black/10 py-3 text-[17px] font-medium text-black/70 no-underline last:border-0 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
