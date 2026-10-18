import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, MessageCircle, Share2, Volume2, VolumeX, Moon, Send } from "lucide-react";
import bg from "@/assets/night-bg.jpg";
import crest from "@/assets/guard-crest.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hollowmoon — Night Phase" },
      { name: "description", content: "Hollowmoon: a 2D social deduction game under the cursed moon." },
      { property: "og:title", content: "Hollowmoon — Night Phase" },
      { property: "og:description", content: "Find the traitors before dawn in Hollowmoon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

const NAMES = ["Hugo","You","Nico","Elsa","Iris","Tove","Dax","Uma","Ada","Leo","Pip","Kira","Vik","Cleo","Jax","Gwen"];
const TOTAL = 45;

function Game() {
  const [time, setTime] = useState(32);
  const [sel, setSel] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : TOTAL)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col overflow-hidden text-ink">
      <img src={bg} alt="" width={768} height={1536} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-night/55" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="pointer-events-none absolute size-1 rounded-full bg-gold animate-ember"
          style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 13) % 40}%`, animationDelay: `${i * 0.45}s` }} />
      ))}

      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button aria-label="Leave" className="grid size-10 place-items-center rounded-full panel"><X className="size-5" /></button>
        <h1 className="font-display text-2xl font-bold tracking-wider text-gold-grad">Hollowmoon</h1>
        <div className="flex gap-2">
          <button aria-label="Chat" className="relative grid size-10 place-items-center rounded-full panel">
            <MessageCircle className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-blood ring-2 ring-night" />
          </button>
          <button aria-label="Share" className="grid size-10 place-items-center rounded-full panel"><Share2 className="size-5" /></button>
        </div>
      </header>

      {/* Phase bar */}
      <div className="flex items-center gap-2 px-3">
        <img src={crest} alt="Your role: Guard" width={816} height={816} className="size-16 shrink-0 drop-shadow-[0_0_12px_var(--blood)]" />
        <div className="relative flex-1 overflow-hidden rounded-xl panel px-3 py-2 shadow-[var(--shadow-glow)]">
          <div className="flex items-center gap-2">
            <Moon className="size-6 fill-arcane text-arcane" />
            <div className="flex-1 leading-tight">
              <div className="font-display text-xl font-bold text-gold-grad">Night 1</div>
              <div className="font-ui text-[10px] tracking-[0.2em] text-ink/70">16 ALIVE</div>
            </div>
            <div className={`font-ui text-2xl font-bold tabular-nums ${time <= 10 ? "text-blood animate-pulse" : "text-ink"}`}>
              0:{String(time).padStart(2, "0")}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-night">
            <div className="h-full timer-bar transition-[width] duration-1000 ease-linear" style={{ width: `${(time / TOTAL) * 100}%` }} />
          </div>
        </div>
        <button aria-label="Sound" onClick={() => setMuted(!muted)} className="grid size-12 shrink-0 place-items-center rounded-xl panel">
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </div>

      {/* Grid */}
      <div className="mt-3 grid grid-cols-4 gap-1.5 px-3">
        {NAMES.map((n, i) => {
          const me = n === "You";
          return (
            <button key={n} onClick={() => !me && setSel(i)}
              className={`slot relative aspect-[3/4] overflow-hidden rounded-lg ${sel === i ? "slot-selected" : ""} ${me ? "ring-1 ring-arcane" : ""}`}>
              <span className="absolute top-1 right-1.5 font-ui text-[10px] font-bold text-ink/60 animate-z" style={{ animationDelay: `${i * 0.2}s` }}>z</span>
              {me && <img src={crest} alt="" width={816} height={816} className="absolute top-1 left-1 size-6" />}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-night to-transparent px-1 pt-4 pb-1">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-gold font-ui text-[9px] font-bold text-night">{i + 1}</span>
                <span className={`truncate font-ui text-[11px] font-semibold ${me ? "text-gold" : "text-ink"}`}>{n}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Log */}
      <section className="mx-3 mt-3 flex-1 rounded-2xl panel p-3 min-h-28">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-display text-lg font-bold text-gold-grad">Night 1</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
        <p className="mt-2 text-center text-sm italic text-ink/60">The village sleeps. Something stirs in the fog…</p>
      </section>

      {/* Role hint */}
      <div className="mx-3 mt-2 rounded-full border border-gold/50 bg-night-2/80 px-4 py-2 text-sm shadow-[var(--shadow-glow)]">
        <span className="font-ui font-bold text-gold">Guard.</span>{" "}
        {sel !== null ? <>Protect <b className="text-gold">{NAMES[sel]}</b> as your Deputy?</> : "Tap a player to make them your Deputy."}
      </div>
      <p className="mt-1.5 text-center font-ui text-[11px] tracking-widest text-arcane">WAITING FOR 16 PLAYERS…</p>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); setMsg(""); }} className="flex items-center gap-2 px-3 pt-2 pb-5">
        <input value={msg} onChange={(e) => setMsg(e.target.value)}
          placeholder={sel !== null ? `Choose ${NAMES[sel]}…` : "Tap a player"}
          className="h-12 flex-1 rounded-full panel px-5 text-ink placeholder:text-ink/40 outline-none focus:border-gold" />
        <button aria-label="Send" className="grid size-12 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-night shadow-[0_0_18px_var(--gold-deep)] active:scale-95">
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}
