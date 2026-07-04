import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function MissileCard({
  title,
  image,
  points,
  subtitle,
}: {
  title: string;
  image: string;
  points: string[];
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl hover:border-olive/60 transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={768}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute bottom-3 right-4 left-4">
          <h3 className="text-xl sm:text-2xl font-black text-foreground drop-shadow-lg">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-olive-glow mt-1 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="p-5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-right text-olive-glow hover:text-foreground transition-colors font-semibold text-sm"
          aria-expanded={open}
        >
          <span>{open ? "إخفاء التفاصيل" : "عرض الشرح الكامل"}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ease-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <ul className="overflow-hidden space-y-2 text-muted-foreground leading-relaxed">
            {points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-olive-glow" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
