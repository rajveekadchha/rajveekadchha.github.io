import { Link } from "react-router-dom";

const items = [
  { to: "/work", label: "Work" },
  // { to: "/play", label: "Playground" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30">
      <div className="bg-white/25 backdrop-blur-md">
        <nav className="mx-auto flex w-full items-center justify-between px-10 py-10 h-[40px] ">
          {/* left */}
          <Link
            to="/"
            className="text-[18px] font-semibold tracking-tight text-black/80 hover:text-black transition-colors"
          >
            Rajvee
          </Link>

          {/* right */}
          <div className="flex items-center gap-[10px]">
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
        </nav>
      </div>
    </header>
  );
}
