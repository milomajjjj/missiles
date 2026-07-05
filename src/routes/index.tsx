import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Splash } from "@/components/Splash";
import { MissileCard } from "@/components/MissileCard";
import { Reveal } from "@/components/Reveal";
import { Rocket, ChevronDown } from "lucide-react";

import heroImg from "@/assets/hero-military.jpg";
import ballisticImg from "@/assets/ballistic.jpg";
import cruiseImg from "@/assets/cruise.jpg";
import hypersonicImg from "@/assets/hypersonic.jpg";
import ggImg from "@/assets/ground-ground.jpg";
import gaImg from "@/assets/ground-air.jpg";
import agImg from "@/assets/air-ground.jpg";
import aaImg from "@/assets/air-air.jpg";
import antiShipImg from "@/assets/anti-ship.jpg";
import wireImg from "@/assets/wire-guided.jpg";
import inertialImg from "@/assets/inertial.jpg";
import satelliteImg from "@/assets/satellite.jpg";
import laserImg from "@/assets/laser.jpg";
import subsonicImg from "@/assets/subsonic.jpg";
import supersonicImg from "@/assets/supersonic.jpg";
import hyperSpeedImg from "@/assets/hyper-speed.jpg";
import harbiye from "@/assets/harbiye.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const NAV = [
  { id: "path", label: "مسار الطيران" },
  { id: "platform", label: "منصة الإطلاق" },
  { id: "range", label: "المدى" },
  { id: "guidance", label: "أنظمة التوجيه" },
  { id: "speed", label: "السرعة" },
];

function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [active, setActive] = useState("path");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("splash_seen");
    if (!seen) {
      setShowSplash(true);
      sessionStorage.setItem("splash_seen", "1");
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [showSplash]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      <div className={showSplash ? "opacity-0" : "animate-fade-in"}>
        {/* NAV */}
        <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
           <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-olive/20 border border-olive/50 grid place-items-center">
                <Rocket className="w-5 h-5 text-olive-glow" />
              </div>
              <span className="hidden sm:inline font-black text-sm text-foreground">
                الصواريخ العسكرية
              </span>
            </div>
            <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar min-w-0">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                      active === n.id
                        ? "bg-olive/25 text-olive-glow"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <img
            src={heroImg}
            alt="خلفية عسكرية"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="relative z-10 text-center max-w-4xl px-6 py-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-olive/50 bg-olive/10 text-olive-glow text-xs tracking-widest mb-6 animate-fade-in">
              MILITARY EDUCATIONAL GUIDE
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.15] text-foreground animate-slide-up">
              تصنيف الصواريخ
              <br />
              <span className="text-olive-glow">العسكرية</span>
            </h1>
            <p
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              دليل تعليمي يشرح أنواع الصواريخ العسكرية وتصنيفاتها وفق المسار،
              ومنصة الإطلاق، والمدى، وأنظمة التوجيه، والسرعة.
            </p>
            <button
              onClick={() => scrollTo("path")}
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-olive text-primary-foreground font-bold text-base hover:bg-olive-glow transition-all shadow-2xl shadow-olive/30 hover:scale-105 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              ابدأ الاستكشاف
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* SECTION 1 - PATH */}
        <Section id="path" number="01" title="التصنيف حسب مسار الطيران">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "الصواريخ الباليستية",
                image: ballisticImg,
                subtitle: "مسار قوسي عبر الفضاء",
                points: [
                  "تُطلق بواسطة محركات صاروخية قوية.",
                  "تصل إلى ارتفاعات شاهقة وقد تغادر الغلاف الجوي.",
                  "تتبع مساراً قوسياً ثم تسقط على الهدف بفعل الجاذبية.",
                ],
              },
              {
                title: "صواريخ كروز (الجوّالة)",
                image: cruiseImg,
                subtitle: "طيران منخفض ومتخفٍ",
                points: [
                  "تعمل بمحركات نفاثة.",
                  "تطير على ارتفاع منخفض جداً.",
                  "تتحرك بمحاذاة سطح الأرض.",
                  "تساعد هذه الطريقة على تقليل اكتشافها بواسطة الرادارات.",
                ],
              },
              {
                title: "المركبات الانزلاقية الفرط صوتية",
                image: hypersonicImg,
                subtitle: "سرعة ومناورة قصوى",
                points: [
                  "تجمع بين السرعة العالية جداً والقدرة على المناورة.",
                  "تتحرك داخل الغلاف الجوي.",
                  "تستطيع تغيير مسارها أثناء الطيران.",
                ],
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <MissileCard {...c} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SECTION 2 - PLATFORM */}
        <Section id="platform" number="02" title="التصنيف حسب منصة الإطلاق">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "أرض – أرض",
                image: ggImg,
                points: [
                  "تُطلق من منصات برية ثابتة أو متحركة لضرب أهداف أرضية.",
                ],
              },
              {
                title: "أرض – جو",
                image: gaImg,
                points: [
                  "صواريخ دفاع جوي لاعتراض الطائرات والمقذوفات.",
                ],
              },
              {
                title: "جو – أرض",
                image: agImg,
                points: [
                  "تُطلق من الطائرات أو المروحيات لضرب أهداف أرضية.",
                ],
              },
              {
                title: "جو – جو",
                image: aaImg,
                points: [
                  "مخصصة للقتال الجوي واعتراض الطائرات.",
                ],
              },
              {
                title: "مضادة للسفن والغواصات",
                image: antiShipImg,
                points: [
                  "صواريخ تُستخدم ضد السفن والغواصات والأهداف البحرية.",
                ],
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <MissileCard {...c} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SECTION 3 - RANGE */}
        <Section id="range" number="03" title="تصنيف الصواريخ الباليستية حسب المدى">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-olive/15 text-olive-glow">
                    <tr>
                      <th className="px-6 py-4 font-bold text-sm">الفئة</th>
                      <th className="px-6 py-4 font-bold text-sm">الاختصار</th>
                      <th className="px-6 py-4 font-bold text-sm">المدى</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RANGE_ROWS.map((r, i) => (
                      <tr
                        key={r.abbr}
                        className={`border-t border-border ${
                          i % 2 === 1 ? "bg-background/30" : ""
                        } hover:bg-olive/10 transition-colors`}
                      >
                        <td className="px-6 py-4 font-semibold text-foreground">{r.cat}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 rounded-md bg-olive/20 text-olive-glow font-mono text-sm font-bold">
                            {r.abbr}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{r.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-border">
                {RANGE_ROWS.map((r) => (
                  <div key={r.abbr} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-bold text-foreground">{r.cat}</h4>
                      <span className="px-2.5 py-1 rounded-md bg-olive/20 text-olive-glow font-mono text-xs font-bold shrink-0">
                        {r.abbr}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{r.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* SECTION 4 - GUIDANCE */}
        <Section id="guidance" number="04" title="التصنيف حسب نوع التوجيه">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "التوجيه السلكي أو اللاسلكي",
                image: wireImg,
                points: [
                  "يعتمد على التحكم عبر الأسلاك أو الإشارات اللاسلكية، ويُستخدم في بعض الصواريخ القديمة.",
                ],
              },
              {
                title: "التوجيه بالقصور الذاتي",
                image: inertialImg,
                points: [
                  "يعتمد على حواسيب ومستشعرات داخلية لتحديد المسار دون الحاجة إلى إشارات خارجية.",
                ],
              },
              {
                title: "التوجيه بالأقمار الصناعية",
                image: satelliteImg,
                points: [
                  "يعتمد على أنظمة الملاحة بالأقمار الصناعية مثل GPS وGLONASS لتحسين دقة الوصول.",
                ],
              },
              {
                title: "التوجيه الراداري أو الليزري",
                image: laserImg,
                points: [
                  "يعتمد على باحث راداري أو ليزري لتتبع الهدف بدقة عالية.",
                ],
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <MissileCard {...c} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SECTION 5 - SPEED */}
        <Section id="speed" number="05" title="التصنيف حسب السرعة">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "دون صوتية",
                image: subsonicImg,
                subtitle: "أقل من 0.8 ماخ",
                points: ["مثال: صاروخ توماهوك."],
              },
              {
                title: "فوق صوتية",
                image: supersonicImg,
                subtitle: "من 1 إلى 5 ماخ",
                points: ["مثال: صاروخ براهموس."],
              },
              {
                title: "فرط صوتية",
                image: hyperSpeedImg,
                subtitle: "أكثر من 5 ماخ",
                points: ["أسرع أنواع الصواريخ وأصعبها اعتراضاً."],
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <MissileCard {...c} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="border-t border-border bg-card/50 mt-16">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-olive/20 border border-olive/50 grid place-items-center mb-4">
              <Rocket className="w-6 h-6 text-olive-glow" />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              موقع تعليمي يشرح تصنيف الصواريخ العسكرية وفقاً للمراجع العلمية
              والعسكرية، ويهدف إلى عرض المعلومات بطريقة مبسطة ومنظمة.
            </p>
            <p className="mt-6 text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} — جميع الحقوق محفوظة
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

const RANGE_ROWS = [
  { cat: "تكتيكي قصير جداً", abbr: "CRBM", range: "أقل من 300 كم" },
  { cat: "قصير المدى", abbr: "SRBM", range: "من 300 إلى 1000 كم" },
  { cat: "متوسط المدى", abbr: "MRBM", range: "من 1000 إلى 3500 كم" },
  { cat: "وسيط المدى", abbr: "IRBM", range: "من 3500 إلى 5500 كم" },
  { cat: "عابر للقارات", abbr: "ICBM", range: "أكثر من 5500 كم" },
];

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12 sm:mb-16">
            <div className="text-olive-glow font-mono text-sm tracking-widest mb-3">
              — {number}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground leading-tight">
              {title}
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-l from-olive to-transparent rounded-full" />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}