import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-military.jpg";

export function Splash({ onDone }: { onDone: () => void }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadingOut(true), 5000);
    const t2 = setTimeout(() => onDone(), 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background overflow-hidden ${
        fadingOut ? "animate-fade-out" : ""
      }`}
      aria-hidden="true"
    >
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      <div className="absolute inset-0 flex items-end justify-center pb-24">
        <div className="text-center px-6 animate-fade-in">
          <div className="inline-block px-4 py-1 rounded-full border border-olive/50 text-olive-glow text-xs tracking-widest mb-4">
            MILITARY GUIDE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground drop-shadow-2xl">
            تصنيف الصواريخ العسكرية
          </h1>
        </div>
      </div>
    </div>
  );
}
