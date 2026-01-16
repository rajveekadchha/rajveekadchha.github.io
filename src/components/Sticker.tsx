import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type StickerProps = {
  title: string;
  subtitle?: string;
  emoji?: string;
  className?: string;
  onClick?: () => void;
};

export default function Sticker({ title, subtitle, emoji, className, onClick }: StickerProps) {
  return (
    <motion.button
      type="button"
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileTap={{ scale: 0.98, rotate: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={cn(
        "absolute select-none text-left",
        "rounded-[26px] border border-black/10 bg-white/75 px-5 py-4 backdrop-blur",
        "shadow-[0_14px_40px_rgba(0,0,0,0.14)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.18)]",
        "transition-shadow",
        className
      )}
      aria-label={title}
    >
      {/* tape */}
      <span className="pointer-events-none absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-2deg] rounded-xl border border-black/10 bg-[#fff2a8]/70" />

      <div className="flex items-start gap-3">
        {emoji ? (
          <div className="mt-0.5 text-2xl leading-none">{emoji}</div>
        ) : null}

        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-tight text-black">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-[13px] leading-snug text-black/65">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>

      {/* tiny corner doodle */}
      <span className="pointer-events-none absolute bottom-3 right-4 text-[10px] text-black/35">
        ✦
      </span>
    </motion.button>
  );
}
