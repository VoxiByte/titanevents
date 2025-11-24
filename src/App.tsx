import React from "react";
import {
    AnimatePresence,
    LazyMotion,
    domAnimation,
    m,
    useReducedMotion,
} from "framer-motion";
import {
    CalendarCheck2,
    CheckCircle2,
    Facebook,
    Factory,
    Gauge,
    Headphones,
    Heart,
    Instagram,
    Leaf,
    Lightbulb,
    Linkedin,
    MessageSquareMore,
    Sparkles,
    ToggleLeft,
    ToggleRight,
    Truck,
} from "lucide-react";
import { createPortal } from "react-dom";
import GallerySection from "./GallerySection.tsx";

export default function TitanEvents({
                                        heroImageUrl = "cristiana_giovanni716.webp",
                                    }) {
    const reduceMotion = useReducedMotion();
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0b10] via-[#080a12] to-black text-white selection:bg-amber-300/20 selection:text-white">
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-overlay will-change-opacity"
                aria-hidden
            >
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zw8AAq8B5o3aQyUAAAAASUVORK5CYII=)",
                    }}
                />
            </div>

            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-4 rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border border-white/10 shadow-[0_0_28px_-10px_rgba(0,0,0,0.6)] will-change-transform contain-paint">
                        <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
                            <a href="#top" className="group inline-flex items-center gap-2">
                                <img
                                    src="logo.svg"
                                    alt="Titan Events Logo"
                                    className="h-8 sm:h-10 object-contain"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            </a>

                            {/* Desktop links */}
                            <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
                                <a href="#about" className="hover:text-white transition">
                                    Chi Siamo
                                </a>
                                <a href="#services" className="hover:text-white transition">
                                    Servizi
                                </a>
                                <a href="#gallery" className="hover:text-white transition">
                                    Galleria
                                </a>
                                <a href="#contact" className="hover:text-white transition">
                                    Contatti
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="#about"
                                    className="group relative inline-flex items-center overflow-hidden rounded-xl border border-amber-300/30 px-4 py-2 text-sm font-medium text-amber-200/90 transition hover:text-white"
                                >
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(120px_80px_at_10%_20%,rgba(255,200,0,0.25),transparent_60%)]" />
                                    <span className="absolute inset-0 rounded-xl shadow-[0_0_18px_4px_rgba(255,200,0,0.08)]" />
                                    Avvia un Progetto
                                </a>

                                {/* Hamburger (mobile only) — pixel-perfect */}
                                <button
                                    type="button"
                                    className={[
                                        "md:hidden relative inline-flex items-center justify-center",
                                        "h-[40px] w-[40px] rounded-[12px]",
                                        "border border-white/10 bg-white/5 hover:bg-white/10",
                                        "transition-colors duration-200",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40",
                                        menuOpen ? "border-white/15 bg-white/[0.06]" : "",
                                    ].join(" ")}
                                    aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
                                    aria-controls="mobile-menu"
                                    aria-expanded={menuOpen}
                                    onClick={() => setMenuOpen((s) => !s)}
                                >
                                    {/* Icon box: 24×16 px for crisp geometry */}
                                    <span className="relative block w-[24px] h-[16px]">
                    {/* top bar */}
                                        <span
                                            className={[
                                                "absolute left-0 top-0 h-[2px] w-[24px] rounded-full bg-white",
                                                "transition-transform",
                                                // pivot exactly at bar center; only whole-pixel transforms
                                                "[transform-origin:50%_50%]",
                                                menuOpen
                                                    ? "translate-y-[8px] rotate-45"
                                                    : "translate-y-[0px] rotate-0",
                                            ].join(" ")}
                                        />
                                        {/* middle bar */}
                                        <span
                                            className={[
                                                "absolute left-0 top-1/2 -mt-[1px] h-[2px] w-[24px] rounded-full bg-white",
                                                "transition-[opacity,transform] duration-150",
                                                menuOpen
                                                    ? "opacity-0 scale-x-0"
                                                    : "opacity-100 scale-x-100",
                                            ].join(" ")}
                                        />
                                        {/* bottom bar */}
                                        <span
                                            className={[
                                                "absolute left-0 bottom-0 h-[2px] w-[24px] rounded-full bg-white",
                                                "transition-transform",
                                                "[transform-origin:50%_50%]",
                                                menuOpen
                                                    ? "-translate-y-[8px] -rotate-45"
                                                    : "translate-y-[0px] rotate-0",
                                            ].join(" ")}
                                        />
                  </span>
                                </button>
                            </div>
                        </nav>

                        {/* Mobile dropdown (no style changes to the navbar container) */}
                        {/* Mobile dropdown (smooth, no height auto) */}
                        <AnimatePresence initial={false}>
                            {menuOpen && (
                                <LazyMotion features={domAnimation} strict>
                                    <m.div
                                        id="mobile-menu"
                                        key="mobile-menu"
                                        // Keep the outer wrapper static (no blur/radius animation here)
                                        className="md:hidden border-t border-white/10 px-4 sm:px-6 pb-4"
                                    >
                                        {/* Animate a child with transform, not height */}
                                        <m.div
                                            initial={
                                                reduceMotion
                                                    ? { opacity: 0 }
                                                    : { opacity: 0, scaleY: 0 }
                                            }
                                            animate={
                                                reduceMotion
                                                    ? { opacity: 1 }
                                                    : { opacity: 1, scaleY: 1 }
                                            }
                                            exit={
                                                reduceMotion
                                                    ? { opacity: 0 }
                                                    : { opacity: 0, scaleY: 0 }
                                            }
                                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ transformOrigin: "top" }}
                                            className="origin-top will-change-transform transform-gpu"
                                        >
                                            <div className="pt-3 flex flex-col gap-2 text-sm text-white/80">
                                                {[
                                                    { href: "#about", label: "Chi Siamo" },
                                                    { href: "#services", label: "Servizi" },
                                                    { href: "#gallery", label: "Galleria" },
                                                    { href: "#contact", label: "Contatti" },
                                                ].map((l) => (
                                                    <a
                                                        key={l.href}
                                                        href={l.href}
                                                        className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white transition"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {l.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </m.div>
                                    </m.div>
                                </LazyMotion>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <section id="top" className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroImageUrl}
                        alt="TitanEvents hero background"
                        className="h-full w-full object-cover opacity-50 [image-rendering:auto] will-change-transform"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />

                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_20%,rgba(66,135,245,0.14),transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_80%,rgba(255,200,0,0.10),transparent_60%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
                    </div>
                </div>

                <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center contain-paint">
                    <LazyMotion features={domAnimation} strict>
                        <m.h1
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 max-w-5xl text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-[0_8px_14px_rgba(0,0,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
                            style={{
                                fontFamily: "Poppins, ui-sans-serif, system-ui",
                                textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                            }}
                        >
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/75 drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]">
                We light
              </span>
                            {" "}
                            <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-slate-200 drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]">your dream
                </span>
                <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-amber-300/70 via-amber-200/60 to-transparent blur-[1px]" />
              </span>
                        </m.h1>

                        <m.p
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 motion-reduce:transform-none motion-reduce:transition-none"
                            style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
                        >
                            Da incontri intimi a produzioni su larga scala, TitanEvents crea
                            momenti coinvolgenti e perfetti, che sembrano naturali e hanno un
                            aspetto spettacolare.
                        </m.p>

                        <m.div
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-10 flex flex-col sm:flex-row items-center gap-4 motion-reduce:transform-none motion-reduce:transition-none"
                        >
                            <a
                                href="#about"
                                className="group relative inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-base font-medium transition border-white/15 bg-white/15 hover:bg-white/20 will-change-transform"
                            >
                                <span className="absolute inset-0 -z-10 rounded-2xl shadow-[0_0_28px_4px_rgba(255,200,0,0.06)]" />
                                Il Nostro Mondo
                                <svg
                                    className="size-4 translate-x-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                >
                                    <path
                                        d="M5 12h14M13 5l7 7-7 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-6 py-3 text-base font-medium text-amber-100 shadow-[0_0_36px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_40px_2px_rgba(255,200,0,0.1)] transition will-change-transform"
                            >
                                Progetta con Noi
                            </a>
                        </m.div>
                    </LazyMotion>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center text-[10px] tracking-[0.35em] text-white/60">
                    <div className="mb-2">SCORRI</div>
                    <div className="h-9 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[pulse_2.8s_ease-in-out_infinite]" />
                </div>

                <div className="absolute bottom-6 left-4 z-30 hidden md:flex flex-col items-center space-y-4 text-white/80">
                    <div className="rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.4em] uppercase text-white/80 mb-3">
                        follow us
                    </div>

                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent animate-[pulse_3.5s_ease-in-out_infinite]" />

                    <div className="flex flex-col items-center space-y-4">
                        <a
                            href="https://www.instagram.com/titan_events"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-300 transition duration-300 hover:scale-110"
                        >
                            <Instagram className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                        <a
                            href="https://www.facebook.com/TITANSERVICE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-300 transition duration-300 hover:scale-110"
                        >
                            <Facebook className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </section>

            <section id="reviews" className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Leggi le recensioni
                        </h2>
                        <p className="mt-2 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                            Scopri perché scegliere {" "}
                            <span className="font-medium">TitanEvents</span>
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                            <a
                                href="https://maps.app.goo.gl/hd1njSydpbhEMp778"
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-300/70 dark:ring-zinc-700/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                                    alt=""
                                    className="h-5 w-5"
                                />
                                Google
                            </a>

                            <a
                                href="https://www.matrimonio.com/animazione-matrimoni/titan-events--e170141"
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-300/70 dark:ring-zinc-700/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                            >
                                <img
                                    src="https://www.matrimonio.com/assets/img/logos/square-icon.svg"
                                    alt=""
                                    className="h-5 w-5"
                                />
                                Matrimonio.com
                            </a>
                        </div>
                    </div>

                    <div className="mt-5 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            ★★★★★ 5.0/5 su Google &nbsp;•&nbsp; ★★★★★ 5.0/5 su Matrimonio.com
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="about"
                aria-label="Chi Siamo"
                className="relative isolate overflow-hidden"
            >
                <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36">
                    <div className="grid items-start gap-y-16 gap-x-10 lg:grid-cols-12">
                        <div className="lg:col-span-6 xl:col-span-7">
                            <LazyMotion features={domAnimation} strict>
                                <m.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="inline-block mb-4 text-[11px] tracking-[0.3em] uppercase text-white/60"
                                    style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
                                >
                                    Chi Siamo
                                </m.span>

                                <m.h2
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
                                    style={{ fontFamily: "Poppins, ui-sans-serif, system-ui" }}
                                >
                                    La passione che dà vita a ogni evento
                                </m.h2>

                                <m.p
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{
                                        delay: 0.05,
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-6 max-w-2xl text-base sm:text-lg text-white/75"
                                >
                                    Siamo una crew tecnica, unita dalla passione per dare vita
                                    alle idee. Con passione, dedizione e professionalità
                                    trasformiamo ogni progetto in realtà, garantendo il massimo
                                    risultato e rispondendo a qualsiasi esigenza. La cura per i
                                    dettagli e l’impiego di materiali sempre all’avanguardia ci
                                    permettono di valorizzare ogni location, anticipando e
                                    risolvendo ogni possibile criticità grazie a un’esperienza
                                    consolidata e a una progettazione meticolosa.
                                </m.p>

                                <m.ul
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{
                                        delay: 0.1,
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/80 text-left"
                                >
                                    {[
                                        {
                                            title: "Precisione Invisibile",
                                            body: "Pianificazione attenta, piani B e C. Ci noti perché non ci noti: tutto fila liscio.",
                                            Icon: CheckCircle2,
                                        },
                                        {
                                            title: "Creatività Senza Limiti",
                                            body: "Soluzioni luci, visive e audio pensate per valorizzare il contenuto, non l’effetto fine a sé stesso.",
                                            Icon: Lightbulb,
                                        },
                                        {
                                            title: "Tecnologia Mirata",
                                            body: "Soluzioni luci/visual/audio calibrate sul contenuto, non sull’effetto fine a sé stesso.",
                                            Icon: Gauge,
                                        },
                                        {
                                            title: "Cultura del Servizio",
                                            body: "Passione per il servizio. Strutturati, ma sempre guidati da attenzione e passione, unendo tecnologia e artigianalità su misura.",
                                            Icon: Heart,
                                        },
                                    ].map(({ title, body, Icon }, i) => (
                                        <li key={i} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 flex-none">
                        <Icon
                            className="w-4 h-4 text-amber-300/80"
                            strokeWidth={1.5}
                        />
                      </span>

                                            <div className="min-w-0">
                                                <p className="font-semibold text-white">{title}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-white/70">
                                                    {body}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </m.ul>

                                <m.dl
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 border-t border-white/10 pt-8"
                                >
                                    {[
                                        { k: "> 10", v: "Anni di attività" },
                                        { k: "450+", v: "Eventi realizzati" },
                                        { k: "98%", v: "Clienti che ci consigliano" },
                                        { k: "24/7", v: "Operatività" },
                                    ].map((s, i) => (
                                        <div key={i}>
                                            <dt className="text-xs tracking-widest uppercase text-white/50">
                                                {s.v}
                                            </dt>
                                            <dd className="mt-1 text-2xl font-bold text-white">
                                                {s.k}
                                            </dd>
                                        </div>
                                    ))}
                                </m.dl>

                                <m.blockquote
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{ delay: 0.25, duration: 0.6 }}
                                    className="mt-12 border-l border-white/10 pl-6 text-white/80"
                                >
                                    <p className="text-base leading-relaxed">
                                        “Siamo sarti della tecnologia: trasformiamo un semplice
                                        input in un allestimento unico, su misura e di classe.”
                                    </p>
                                    <footer className="mt-3 text-xs uppercase tracking-widest text-white/50">
                                        Mirco Bruni · TitanEvents
                                    </footer>
                                </m.blockquote>
                            </LazyMotion>
                        </div>

                        <div className="lg:col-span-6 xl:col-span-5 relative">
                            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                                <img
                                    src="image.webp"
                                    alt="Backstage TitanEvents — light & stage detail"
                                    className="h-full w-full object-cover opacity-90 will-change-transform"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_15%,rgba(66,135,245,0.12),transparent_60%)]" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                            </div>

                            <div className="absolute -bottom-4 right-6 hidden sm:block">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 backdrop-blur">
                                    <span className="size-1.5 rounded-full bg-amber-300/80 shadow-[0_0_10px_rgba(255,200,0,0.5)]" />
                                    Live Production • LED • Audio • Light Design
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />
            </section>

            <section
                id="services"
                aria-label="Servizi"
                className="relative isolate overflow-hidden"
            >
                <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36">
                    {(() => {
                        type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
                        const reduceMotion = useReducedMotion();

                        const services = [
                            {
                                title: "Matrimoni ed Eventi Privati",
                                copy: "Nel giorno più bello della vostra vita, tutto deve essere perfetto e curato.",
                                points: [
                                    "Light design",
                                    "Audio per cerimonie e live performance",
                                    "Pedane, strutture su misura e corsie",
                                    "Arredi e complementi d’arredo",
                                ],
                                detail:
                                    "Con un progetto di light design accurato e ben studiato in ogni particolare, trasformeremo sorprendentemente e piacevolmente la location da Voi scelta per questo giorno speciale. Come l'ambiente viene trasformato grazie all'illuminazione, così anche il Vostro sogno si trasformerà in realtà. Con l'aiuto di una wedding designer potremmo allestire la location con il mood che meglio preferite.",
                                details: [
                                    "Illuminazione architetturale e funzionale",
                                    "Taglio torta scenografici",
                                    "Impianti audio per cerimonie e performance",
                                    "Scenografie su misura",
                                ],
                                Icon: Heart as IconType,
                            },
                            {
                                title: "Eventi Aziendali",
                                copy: "Per avere il massimo feedback positivo dalla Vostra clientela.",
                                points: [
                                    "Audio Hi-Fi su misura",
                                    "Luci scenografiche full focus",
                                    "Pedane che valorizzano il prodotto",
                                    "Arredi personalizzabili",
                                ],
                                detail:
                                    "Delineando le necessità e gli obiettivi dell’evento, seguendo uno studio dettagliato dell’ambiente scelto, progettando e curando l’importante aspetto audio, dando un’ottima intelligibilità. Non bisogna trascurare neppure l’aspetto visivo: il video, di forte impatto, grazie a immagini di grandi dimensioni e altissima definizione. L’illuminazione attenta mantiene attivi i partecipanti. Studiamo nei minimi dettagli i prodotti e la location: è nel dettaglio che si nota la differenza.",
                                details: [
                                    "Videoproiezione e LED wall",
                                    "Impianti audio professionali",
                                    "Servizi streaming e traduzione simultanea",
                                    "Quinte e pipe and drapes",
                                ],
                                Icon: Factory as IconType,
                            },
                            {
                                title: "Rent",
                                copy: "Tutta la tecnologia che ti serve per lasciare i tuoi ospiti a bocca aperta.",
                                points: [
                                    "Effetti luce plug and play",
                                    "Console e diffusori audio",
                                    "Elementi riscaldanti e raffrescanti",
                                    "Arredi ed effetti speciali",
                                ],
                                detail:
                                    "Qualsiasi sia la Vostra richiesta saremmo lieti di trovare un'ottima formula di noleggio su misura per Voi. Noleggio a lungo/medio/breve termine. Con tecnici e installatori o senza. Logistica compresa o meno.",
                                details: [
                                    "Console compatte, cdj, mixer e desk personalizzati",
                                    "Impianti luci scenografiche e \"Free Cable\"",
                                    "Impianti elettrici e d'emergenza provvisori",
                                    "Effetti speciali, spark, flame, confetti",
                                    "Riscaldatori e raffrescatori portatili",
                                    "Sedie, sgabelli e pouf",
                                    "Palchi e pedane"
                                ],
                                Icon: Truck as IconType,
                            },
                        ] as const;

                        function ServiceCard({
                                                 data,
                                                 reduceMotion,
                                             }: {
                            data: (typeof services)[number];
                            reduceMotion: boolean;
                        }) {
                            const { title, copy, points, detail, details, Icon } = data;
                            const [flipped, setFlipped] = React.useState(false);

                            // spotlight/tilt handlers
                            const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
                                const el = e.currentTarget;
                                const r = el.getBoundingClientRect();
                                const x = e.clientX - r.left;
                                const y = e.clientY - r.top;
                                el.style.setProperty("--x", `${x}px`);
                                el.style.setProperty("--y", `${y}px`);
                                el.style.setProperty(
                                    "--rx",
                                    `${((y / r.height - 0.5) * -6).toFixed(2)}deg`
                                );
                                el.style.setProperty(
                                    "--ry",
                                    `${((x / r.width - 0.5) * 6).toFixed(2)}deg`
                                );
                                el.style.setProperty("--spot-visible", "1");
                            };
                            const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
                                const el = e.currentTarget;
                                el.style.setProperty("--spot-visible", "1");
                            };
                            const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                                const el = e.currentTarget;
                                el.style.removeProperty("--x");
                                el.style.removeProperty("--y");
                                el.style.removeProperty("--rx");
                                el.style.removeProperty("--ry");
                                el.style.setProperty("--spot-visible", "0");
                            };

                            // ---- adaptive height (robust) ----
                            const shellRef = React.useRef<HTMLDivElement | null>(null);
                            const frontMeasureRef = React.useRef<HTMLDivElement | null>(null);
                            const backMeasureRef = React.useRef<HTMLDivElement | null>(null);

                            const setHeightToFace = React.useCallback(() => {
                                const shell = shellRef.current;
                                if (!shell) return;
                                const faceEl = flipped
                                    ? backMeasureRef.current
                                    : frontMeasureRef.current;
                                if (!faceEl) return;

                                // read layout AFTER paint for accurate fonts
                                requestAnimationFrame(() => {
                                    const h = faceEl.getBoundingClientRect().height;
                                    shell.style.height = `${Math.max(h, 1)}px`;
                                });
                            }, [flipped]);

                            // run on mount + when content likely changes
                            React.useLayoutEffect(() => {
                                setHeightToFace();
                            }, [
                                setHeightToFace,
                                title,
                                copy,
                                points.length,
                                detail,
                                details.length,
                            ]);

                            // observe dynamic changes (wraps, responsive, fonts, grid width)
                            React.useEffect(() => {
                                const ro = new ResizeObserver(() => setHeightToFace());
                                frontMeasureRef.current && ro.observe(frontMeasureRef.current);
                                backMeasureRef.current && ro.observe(backMeasureRef.current);
                                // also observe the shell width changes caused by grid breakpoints
                                shellRef.current && ro.observe(shellRef.current);
                                return () => ro.disconnect();
                            }, [setHeightToFace]);

                            const onKeyFlip: React.KeyboardEventHandler<HTMLDivElement> = (
                                e
                            ) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setFlipped((s) => !s);
                                }
                            };

                            return (
                                <m.li
                                    variants={{
                                        hidden: { opacity: 0, y: 14 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                                        },
                                    }}
                                >
                                    <div className="relative" style={{ perspective: "1000px" }}>
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onMouseEnter={onEnter}
                                            onMouseMove={onMove}
                                            onMouseLeave={onLeave}
                                            onClick={() => setFlipped((s) => !s)}
                                            onKeyDown={onKeyFlip}
                                            aria-pressed={flipped}
                                            aria-label={
                                                flipped
                                                    ? "Mostra il fronte della scheda"
                                                    : "Mostra il retro della scheda"
                                            }
                                            className="group relative rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm overflow-hidden will-change-transform contain-paint focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
                                            style={{
                                                transform:
                                                    "perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0)) translateZ(0)",
                                                transition:
                                                    "transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms",
                                                boxShadow:
                                                    "0 10px 30px -15px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.03)",
                                            }}
                                        >
                                            {/* grid background + spotlight */}
                                            <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
                                                <div className="absolute inset-0 [background:linear-gradient(transparent,transparent),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_100%,28px_28px,28px_28px]" />
                                            </div>
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0"
                                                style={{
                                                    opacity: "var(--spot-visible, 0)",
                                                    transition:
                                                        "opacity 180ms cubic-bezier(0.22,1,0.36,1)",
                                                }}
                                            >
                                                <div
                                                    className="absolute"
                                                    style={{
                                                        left: 0,
                                                        top: 0,
                                                        width: 0,
                                                        height: 0,
                                                        transform:
                                                            "translate(calc(var(--x, -9999px)), calc(var(--y, -9999px)))",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "320px",
                                                            height: "240px",
                                                            marginLeft: "-160px",
                                                            marginTop: "-120px",
                                                            background:
                                                                "radial-gradient(160px 120px at center, rgba(255,200,0,0.12), transparent 60%)",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Height-controlled shell */}
                                            <div
                                                ref={shellRef}
                                                className="relative w-full transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                            >
                                                {/* Flip wrapper */}
                                                <div
                                                    className="relative z-10 w-full"
                                                    style={{
                                                        transformStyle: "preserve-3d",
                                                        transition: reduceMotion
                                                            ? "none"
                                                            : "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                                                        transform: flipped
                                                            ? "rotateY(180deg)"
                                                            : "rotateY(0deg)",
                                                    }}
                                                >
                                                    {/* FRONT (absolute for overlap; inner is measured) */}
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{ backfaceVisibility: "hidden" }}
                                                    >
                                                        <div ref={frontMeasureRef}>
                                                            <div className="grid grid-rows-[auto_1fr_auto] p-6 gap-4 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
                                                                <div className="flex items-start gap-3">
                                  <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2">
                                    <Icon
                                        className="w-4 h-4 text-amber-300/90"
                                        strokeWidth={1.75}
                                    />
                                  </span>
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold text-white">
                                                                            {title}
                                                                        </h3>
                                                                        <p className="mt-1 text-sm text-white/70 max-w-[42ch]">
                                                                            {copy}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <ul className="min-w-0 flex flex-wrap gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] leading-relaxed text-white/70">
                                                                        {points.map((p, idx) => (
                                                                            <li
                                                                                key={idx}
                                                                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 max-w-full break-words"
                                                                            >
                                                                                <span className="size-1.5 rounded-full bg-amber-300/80 shadow-[0_0_8px_rgba(255,200,0,0.5)]" />
                                                                                {p}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* BACK */}
                                                    <div
                                                        className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-amber-200/10 to-amber-300/5"
                                                        style={{
                                                            transform: "rotateY(180deg)",
                                                            backfaceVisibility: "hidden",
                                                        }}
                                                        aria-hidden={!flipped}
                                                    >
                                                        <div ref={backMeasureRef}>
                                                            <div className="flex flex-col justify-between p-6 sm:p-6">
                                                                <div className="space-y-4">
                                                                    <div className="flex items-start gap-3">
                                    <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2">
                                      <Icon
                                          className="w-4 h-4 text-amber-200"
                                          strokeWidth={1.75}
                                      />
                                    </span>
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-white">
                                                                                {title}
                                                                            </h3>
                                                                        </div>
                                                                    </div>

                                                                    <p className="text-sm text-white/80 leading-relaxed">
                                                                        {detail}
                                                                    </p>

                                                                    <p className="pt-1 text-xs uppercase tracking-[0.25em] text-white/60">
                                                                        Cosa offriamo
                                                                    </p>

                                                                    <ul className="space-y-2 text-sm text-white/80">
                                                                        {details.map((d, idx) => (
                                                                            <li key={idx} className="flex gap-2">
                                                                                <span className="size-1.5 mt-2 rounded-full bg-amber-300/80 shadow-[0_0_8px_rgba(255,200,0,0.5)]" />
                                                                                <span>{d}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                                                    <a
                                                                        href="#contact"
                                                                        className="inline-flex items-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-5 py-2.5 text-sm font-medium text-amber-100 shadow-[0_0_24px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_30px_2px_rgba(255,200,0,0.1)] transition"
                                                                    >
                                                                        Contatta il team
                                                                    </a>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setFlipped(false);
                                                                        }}
                                                                        className="inline-flex items-center rounded-2xl border px-5 py-2.5 text-sm font-medium border-white/15 bg-white/5 hover:bg-white/10"
                                                                    >
                                                                        Torna indietro
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* bottom accent */}
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent opacity-70" />
                                        </div>
                                    </div>
                                </m.li>
                            );
                        }

                        return (
                            <LazyMotion features={domAnimation} strict>
                                <m.div
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20% 0px" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-center"
                                >
                  <span
                      className="inline-block text-[11px] tracking-[0.3em] uppercase text-white/60"
                      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
                  >
                    Cosa Facciamo
                  </span>
                                    <h2
                                        className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
                                        style={{ fontFamily: "Poppins, ui-sans-serif, system-ui" }}
                                    >
                                        Servizi end-to-end, curati al millimetro
                                    </h2>
                                    <p className="mx-auto mt-5 max-w-2xl text-white/70">
                                        Dalla richiesta alla messa in scena: ogni dettaglio prende
                                        forma, fino a creare l’atmosfera perfetta.
                                    </p>
                                </m.div>

                                <m.ul
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                                        },
                                    }}
                                    className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {services.map((s, i) => (
                                        <ServiceCard key={i} data={s} reduceMotion={reduceMotion} />
                                    ))}
                                </m.ul>

                                <m.div
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                                >
                                    <a
                                        href="#gallery"
                                        className="group relative inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-base font-medium transition border-white/15 bg-white/5 hover:bg-white/10"
                                    >
                                        <span className="absolute inset-0 -z-10 rounded-2xl shadow-[0_0_28px_4px_rgba(255,200,0,0.06)]" />
                                        Guarda i set-up reali
                                        <svg
                                            className="size-4 translate-x-0 transition-transform group-hover:translate-x-0.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-hidden
                                        >
                                            <path
                                                d="M5 12h14M13 5l7 7-7 7"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://online.fliphtml5.com/vkdtj/ibuu/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-6 py-3 text-base font-medium text-amber-100 shadow-[0_0_36px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_40px_2px_rgba(255,200,0,0.1)] transition"
                                    >
                                        Scarica il Catalogo
                                    </a>

                                    <a
                                        href="#contact"
                                        className="inline-flex items-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-6 py-3 text-base font-medium text-amber-100 shadow-[0_0_36px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_40px_2px_rgba(255,200,0,0.1)] transition"
                                    >
                                        Iniziamo dal sopralluogo
                                    </a>
                                </m.div>
                            </LazyMotion>
                        );
                    })()}
                </div>

                <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />
            </section>

            <GallerySection />

            <section
                id="contact"
                aria-label="Contatti"
                className="relative isolate overflow-hidden"
            >
                <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36">
                    {(() => {
                        const [submitting, setSubmitting] = React.useState(false);
                        const [sent, setSent] = React.useState(false);
                        const [guests, setGuests] = React.useState(150);
                        const [dateFlex, setDateFlex] = React.useState(false);

                        React.useEffect(() => {
                            if (!sent) return;
                            const t = setTimeout(() => setSent(false), 4500);
                            return () => clearTimeout(t);
                        }, [sent]);

                        const onSubmit = (e) => {
                            e.preventDefault();
                            setSubmitting(true);
                            // Simulated send — replace with real API endpoint
                            setTimeout(() => {
                                setSubmitting(false);
                                setSent(true);
                            }, 1100);
                        };

                        function SentToast({
                                               open,
                                               onClose,
                                               reduceMotion,
                                           }: {
                            open: boolean;
                            onClose: () => void;
                            reduceMotion: boolean;
                        }) {
                            if (typeof document === "undefined") return null;

                            return createPortal(
                                <AnimatePresence>
                                    {open && (
                                        <m.div
                                            key="sent-toast"
                                            initial={
                                                reduceMotion
                                                    ? false
                                                    : { opacity: 0, y: -12, scale: 0.98 }
                                            }
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={
                                                reduceMotion
                                                    ? { opacity: 0 }
                                                    : { opacity: 0, y: -10, scale: 0.98 }
                                            }
                                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                            role="status"
                                            aria-live="polite"
                                            className="
                        fixed z-[2000] inset-x-0 flex justify-center
                        px-4 pointer-events-none
                      "
                                            style={{
                                                top: "calc(env(safe-area-inset-top, 0px) + 88px)",
                                            }}
                                        >
                                            <div
                                                className="
                          pointer-events-auto
                          flex items-center gap-3
                          rounded-2xl border border-emerald-600 bg-emerald-600
                          text-emerald-50 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.6)]
                          px-5 py-3
                          max-w-[90%] sm:max-w-md
                        "
                                            >
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-700/90 p-2">
                          <CheckCircle2
                              className="w-5 h-5"
                              strokeWidth={1.75}
                          />
                        </span>
                                                <span className="text-sm sm:text-base font-semibold">
                          Inviato! Ti ricontatteremo a breve.
                        </span>
                                                <button
                                                    type="button"
                                                    aria-label="Chiudi notifica"
                                                    onClick={onClose}
                                                    className="ml-2 rounded-md bg-emerald-700/90 px-2 py-1 text-xs hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-white/40"
                                                >
                                                    Chiudi
                                                </button>
                                            </div>
                                        </m.div>
                                    )}
                                </AnimatePresence>,
                                document.body
                            );
                        }

                        return (
                            <LazyMotion features={domAnimation} strict>
                                <m.div
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-18% 0px" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-center"
                                >
                  <span
                      className="inline-block text-[11px] tracking-[0.3em] uppercase text-white/60"
                      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
                  >
                    Parliamo del tuo evento
                  </span>
                                    <h2
                                        className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
                                        style={{ fontFamily: "Poppins, ui-sans-serif, system-ui" }}
                                    >
                                        Brief rapido, risposta entro 24h
                                    </h2>
                                    <p className="mx-auto mt-5 max-w-2xl text-white/70">
                                        Pochi dettagli chiari per iniziare: ti rispondiamo con una
                                        proposta di set-up, tempistiche e budget indicativo.
                                    </p>
                                </m.div>

                                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                    <m.aside
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-12% 0px" }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        className="lg:col-span-4"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm p-6">
                                            <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                                                <div className="absolute inset-0 [background:linear-gradient(transparent,transparent),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_100%,28px_28px,28px_28px]" />
                                            </div>

                                            <div className="relative z-10 space-y-6">
                                                <div>
                                                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                                                        Contatti diretti
                                                    </p>
                                                    <div className="mt-3 text-white">
                                                        <a
                                                            href="mailto:info@titanevents.it"
                                                            className="group inline-flex items-center gap-2 text-base hover:text-amber-200"
                                                        >
                                                            <svg
                                                                className="size-4 opacity-80 group-hover:opacity-100"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                aria-hidden
                                                            >
                                                                <path
                                                                    d="M4 6h16v12H4V6Zm0 0 8 6 8-6"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            info@titanevents.it
                                                        </a>
                                                        <div className="text-white/80">
                                                            <a
                                                                href="tel:+393405129709"
                                                                className="group inline-flex items-center gap-2 hover:text-amber-200"
                                                            >
                                                                <svg
                                                                    className="size-4 opacity-80 group-hover:opacity-100"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    aria-hidden
                                                                >
                                                                    <path
                                                                        d="M4 5c0 8.284 6.716 15 15 15v-3.5a2 2 0 0 0-1.85-1.995l-2.62-.233a2 2 0 0 0-1.76.79l-.9 1.17a13 13 0 0 1-6.1-6.1l1.17-.9a2 2 0 0 0 .79-1.76l-.23-2.62A2 2 0 0 0 7.5 4H4Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                +39 340 512 9709
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="text-white/80">
                                                        <a
                                                            href="https://wa.me/393405129709"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group inline-flex items-center gap-2 hover:text-amber-200"
                                                        >
                                                            <MessageSquareMore
                                                                className="size-4 opacity-80 group-hover:opacity-100"
                                                                strokeWidth={1.5}
                                                            />
                                                            WhatsApp
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                                                        <div className="text-white/60 uppercase tracking-widest text-[10px]">
                                                            Disponibilità
                                                        </div>
                                                        <div className="mt-2 font-semibold">
                                                            Lun–Ven 9–19
                                                        </div>
                                                        <div className="text-white/60">Su appuntamento</div>
                                                    </div>
                                                    <a
                                                        href="https://maps.app.goo.gl/Bmrt2fCnvn6Y2fQ78"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
                                                    >
                                                        <div className="text-white/60 uppercase tracking-widest text-[10px]">
                                                            Sede operativa
                                                        </div>
                                                        <div className="mt-2 font-semibold">
                                                            Camisano Vicentino
                                                        </div>
                                                        <div className="text-white/60">Italia · EU</div>
                                                    </a>
                                                </div>

                                                <div className="flex items-center gap-3 pt-2">
                                                    <a
                                                        href="https://www.instagram.com/titan_events"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition"
                                                        aria-label="Instagram"
                                                    >
                                                        <Instagram className="w-4 h-4" strokeWidth={1.5} />
                                                    </a>
                                                    <a
                                                        href="https://www.facebook.com/TITANSERVICE"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition"
                                                        aria-label="Facebook"
                                                    >
                                                        <Facebook className="w-4 h-4" strokeWidth={1.5} />
                                                    </a>
                                                </div>

                                                {/*
                        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-amber-200/10 to-amber-300/5 p-4">
                          <div className="flex items-center gap-2 text-amber-100/90">
                            <CheckCircle2
                              className="w-4 h-4"
                              strokeWidth={1.75}
                            />
                            <span className="text-sm font-medium">
                              Slot sopralluogo gratuito
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-white/70">
                            Ti proponiamo 2–3 date per vedere insieme la venue e
                            definire i passaggi chiave.
                          </p>
                        </div>
                        */}
                                            </div>
                                        </div>
                                    </m.aside>

                                    <m.div
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-12% 0px" }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="lg:col-span-8"
                                    >
                                        <form
                                            onSubmit={onSubmit}
                                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm p-6 sm:p-8"
                                            aria-describedby="form-help"
                                        >
                                            <div className="pointer-events-none absolute inset-0">
                                                <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_20%,rgba(66,135,245,0.12),transparent_60%)] opacity-70" />
                                                <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_80%,rgba(255,200,0,0.10),transparent_60%)] opacity-80" />
                                                <div className="absolute inset-0 opacity-[0.12] [background:linear-gradient(transparent,transparent),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_100%,28px_28px,28px_28px]" />
                                            </div>
                                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="col-span-1">
                                                    <label className="block text-sm text-white/70">
                                                        Nome e Cognome
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        autoComplete="name"
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        placeholder="Mario Rossi"
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block text-sm text-white/70">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        autoComplete="email"
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        placeholder="mario@azienda.it"
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block text-sm text-white/70">
                                                        Telefono
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        autoComplete="tel"
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        placeholder="+39 ..."
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block text-sm text-white/70">
                                                        Tipo di Evento
                                                    </label>
                                                    <select
                                                        name="eventType"
                                                        required
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>
                                                            Seleziona
                                                        </option>
                                                        <option>Corporate</option>
                                                        <option>Product Launch</option>
                                                        <option>Live/Show</option>
                                                        <option>Wedding</option>
                                                        <option>Altro</option>
                                                    </select>
                                                </div>
                                                <div className="col-span-1 min-w-0">
                                                    <label className="block text-sm text-white/70">
                                                        Data
                                                    </label>

                                                    <div className="mt-2 relative">
                                                        {/* EXACT MODE: date input + right toggle */}
                                                        <div
                                                            aria-hidden={dateFlex}
                                                            className={`relative transition-all duration-300 ease-out ${
                                                                dateFlex
                                                                    ? "max-h-0 opacity-0 -translate-y-1 overflow-hidden pointer-events-none"
                                                                    : "max-h-24 opacity-100 translate-y-0"
                                                            }`}
                                                        >
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                defaultValue={
                                                                    new Date().toISOString().split("T")[0]
                                                                }
                                                                className={`w-full min-w-0 max-w-full rounded-xl border bg-black/30 px-4 py-3 pr-16 sm:pr-28 text-white placeholder-white/40 
            focus:outline-none focus:ring-2 transition appearance-none [-webkit-appearance:none]
            ${
                                                                    dateFlex
                                                                        ? "border-amber-400/40 bg-amber-400/10 focus:ring-amber-300/40"
                                                                        : "border-white/10 focus:ring-amber-300/40"
                                                                }`}
                                                            />

                                                            {/* Segmented toggle on the right (visible only in EXACT mode) */}
                                                            <div
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 flex overflow-hidden rounded-lg border
                     border-white/10 bg-black/40 backdrop-blur-sm"
                                                                role="tablist"
                                                                aria-label="Modalità data"
                                                            >
                                                                {/* EXACT */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDateFlex(false)}
                                                                    role="tab"
                                                                    aria-selected={!dateFlex}
                                                                    title="Data esatta"
                                                                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs transition ${
                                                                        !dateFlex
                                                                            ? "bg-white/10 text-white"
                                                                            : "text-white/60 hover:text-white/80"
                                                                    }`}
                                                                >
                                                                    <CalendarCheck2 size={14} />
                                                                    <span className="hidden sm:inline">
                                    Esatta
                                  </span>
                                                                </button>

                                                                {/* FLEXIBLE */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDateFlex(true)}
                                                                    role="tab"
                                                                    aria-selected={dateFlex}
                                                                    title="Data flessibile"
                                                                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs transition ${
                                                                        dateFlex
                                                                            ? "bg-amber-400/20 text-amber-200"
                                                                            : "text-white/60 hover:text-white/80"
                                                                    }`}
                                                                >
                                                                    <Sparkles size={14} />
                                                                    <span className="hidden sm:inline">
                                    Flessibile
                                  </span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* FLEXIBLE MODE: full-width segmented bar (date input hidden) */}
                                                        <div
                                                            aria-hidden={!dateFlex}
                                                            className={`transition-all duration-300 ease-out ${
                                                                dateFlex
                                                                    ? "max-h-24 opacity-100 translate-y-0"
                                                                    : "max-h-0 opacity-0 -translate-y-1 overflow-hidden pointer-events-none"
                                                            }`}
                                                        >
                                                            <div
                                                                className="flex w-full overflow-hidden rounded-xl border border-amber-400/40 bg-amber-400/10 backdrop-blur-sm"
                                                                role="tablist"
                                                                aria-label="Modalità data"
                                                            >
                                                                {/* EXACT */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDateFlex(false)}
                                                                    role="tab"
                                                                    aria-selected={!dateFlex}
                                                                    title="Data esatta"
                                                                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm transition ${
                                                                        !dateFlex
                                                                            ? "bg-white/10 text-white"
                                                                            : "text-white/80 hover:text-white"
                                                                    }`}
                                                                >
                                                                    <CalendarCheck2 size={14} />
                                                                    <span className="hidden sm:inline">
                                    Esatta
                                  </span>
                                                                </button>

                                                                {/* FLEXIBLE */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDateFlex(true)}
                                                                    role="tab"
                                                                    aria-selected={dateFlex}
                                                                    title="Data flessibile"
                                                                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm transition ${
                                                                        dateFlex
                                                                            ? "bg-amber-400/20 text-amber-200"
                                                                            : "text-white/80 hover:text-white"
                                                                    }`}
                                                                >
                                                                    <Sparkles size={14} />
                                                                    <span className="hidden sm:inline">
                                    Flessibile
                                  </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-1">
                                                    <label className="block text-sm text-white/70">
                                                        Location / Città
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        placeholder="Milano, venue da definire"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm text-white/70">
                                                        Note & Obiettivi
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        rows={5}
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                                                        placeholder="Raccontaci il contesto, obiettivi, brand guidelines, tempistiche..."
                                                    />
                                                </div>
                                                <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <label className="inline-flex items-start gap-3 text-sm text-white/70">
                                                        <input
                                                            type="checkbox"
                                                            required
                                                            className="mt-1 size-4 rounded border-white/20 bg-black/30"
                                                            name="privacy"
                                                        />
                                                        <span>
                              Ho letto e accetto la{" "}
                                                            <a
                                                                href="#"
                                                                className="underline decoration-dotted underline-offset-4 hover:text-amber-200"
                                                            >
                                Privacy Policy
                              </a>
                              .
                            </span>
                                                    </label>

                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="submit"
                                                            disabled={submitting}
                                                            className="relative inline-flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-6 py-3 text-base font-medium text-amber-100 shadow-[0_0_36px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_40px_2px_rgba(255,200,0,0.1)] transition disabled:opacity-60"
                                                        >
                                                            {submitting && (
                                                                <svg
                                                                    className="size-4 animate-spin"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    aria-hidden
                                                                >
                                                                    <circle
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="9"
                                                                        stroke="currentColor"
                                                                        strokeOpacity="0.25"
                                                                        strokeWidth="2"
                                                                    />
                                                                    <path
                                                                        d="M21 12a9 9 0 0 1-9 9"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                    />
                                                                </svg>
                                                            )}
                                                            {submitting ? "Invio..." : "Invia Richiesta"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p
                                                id="form-help"
                                                className="relative z-10 mt-4 text-xs text-white/60"
                                            >
                                                Compilando il modulo riceverai una risposta entro 24 ore
                                                lavorative con i prossimi step.
                                            </p>{" "}
                                            <SentToast
                                                open={sent}
                                                onClose={() => setSent(false)}
                                                reduceMotion={reduceMotion}
                                            />
                                        </form>
                                    </m.div>
                                </div>
                            </LazyMotion>
                        );
                    })()}
                </div>

                <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />
            </section>

            <footer
                id="footer"
                aria-label="Footer"
                className="relative isolate overflow-hidden"
            >
                <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />

                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
                    <LazyMotion features={domAnimation} strict>
                        <m.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20% 0px" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                                <div className="absolute inset-0 [background:linear-gradient(transparent,transparent),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_100%,28px_28px,28px_28px]" />
                            </div>
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_20%,rgba(66,135,245,0.1),transparent_60%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_80%,rgba(255,200,0,0.08),transparent_60%)]" />
                            </div>

                            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                                    <div className="lg:w-[34%]">
                                        <a href="#top" className="inline-flex items-center gap-3">
                                            <img
                                                src="logo.svg"
                                                alt="Titan Events Logo"
                                                className="h-10 object-contain"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </a>
                                        <p className="mt-4 max-w-md text-sm sm:text-base text-white/70">
                                            Produzione eventi end-to-end con regia invisibile e
                                            finiture impeccabili. Dal sopralluogo al last cue, con un
                                            unico referente.
                                        </p>

                                        <div className="mt-6 flex flex-wrap items-center gap-3">
                                            <a
                                                href="#contact"
                                                className="inline-flex items-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-amber-200/20 to-amber-300/10 px-5 py-2.5 text-sm font-medium text-amber-100 shadow-[0_0_24px_0_rgba(255,200,0,0.07)] hover:shadow-[0_0_30px_2px_rgba(255,200,0,0.1)] transition"
                                            >
                                                Parla con noi
                                            </a>
                                            <a
                                                href="https://wa.me/393405129709"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-medium border-white/15 bg-white/5 hover:bg-white/10"
                                            >
                                                <MessageSquareMore className="w-4 h-4" />
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>

                                    <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 gap-8">
                                        <nav aria-label="Navigazione rapida">
                                            <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                Naviga
                                            </div>
                                            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                                                <li>
                                                    <a
                                                        href="#about"
                                                        className="hover:text-white transition"
                                                    >
                                                        Chi Siamo
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#services"
                                                        className="hover:text-white transition"
                                                    >
                                                        Servizi
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#gallery"
                                                        className="hover:text-white transition"
                                                    >
                                                        Galleria
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#contact"
                                                        className="hover:text-white transition"
                                                    >
                                                        Contatti
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>

                                        <nav aria-label="Servizi">
                                            <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                Servizi
                                            </div>
                                            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                                                <li>
                                                    <a
                                                        href="#services"
                                                        className="hover:text-white transition"
                                                    >
                                                        Matrimoni ed Evennti Privati
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#services"
                                                        className="hover:text-white transition"
                                                    >
                                                        Eventi Aziendali
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#services"
                                                        className="hover:text-white transition"
                                                    >
                                                        Rent
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>

                                        <div aria-label="Contatti">
                                            <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                Contatti
                                            </div>
                                            <ul className="mt-4 space-y-3 text-sm text-white">
                                                <li>
                                                    <a
                                                        href="mailto:info@titanevents.it"
                                                        className="group inline-flex items-center gap-2 hover:text-amber-200"
                                                    >
                                                        <svg
                                                            className="size-4 opacity-80 group-hover:opacity-100"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            aria-hidden
                                                        >
                                                            <path
                                                                d="M4 6h16v12H4V6Zm0 0 8 6 8-6"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        info@titanevents.it
                                                    </a>
                                                </li>
                                                <li className="text-white/80">
                                                    <a
                                                        href="tel:+393405129709"
                                                        className="group inline-flex items-center gap-2 hover:text-amber-200"
                                                    >
                                                        <svg
                                                            className="size-4 opacity-80 group-hover:opacity-100"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            aria-hidden
                                                        >
                                                            <path
                                                                d="M4 5c0 8.284 6.716 15 15 15v-3.5a2 2 0 0 0-1.85-1.995l-2.62-.233a2 2 0 0 0-1.76.79l-.9 1.17a13 13 0 0 1-6.1-6.1l1.17-.9a2 2 0 0 0 .79-1.76l-.23-2.62A2 2 0 0 0 7.5 4H4Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        +39 340 512 9709
                                                    </a>
                                                </li>
                                                <li className="text-white/70">
                          <span className="inline-flex items-start gap-2">
                            <svg
                                className="mt-0.5 size-4 opacity-80"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                            >
                              <path
                                  d="M12 22s7-5.333 7-12a7 7 0 1 0-14 0c0 6.667 7 12 7 12Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              />
                              <circle
                                  cx="12"
                                  cy="10"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                              />
                            </svg>
                            Camisano Vicentino · Italia · EU
                          </span>
                                                </li>
                                                <li className="text-white/70">
                          <span className="inline-flex items-start gap-2">
                            <svg
                                className="mt-0.5 size-4 opacity-80"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                            >
                              <circle
                                  cx="12"
                                  cy="12"
                                  r="9"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                              />
                              <path
                                  d="M12 7v5l3 2"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                              />
                            </svg>
                            Lun–Ven 9–19 · Su appuntamento
                          </span>
                                                </li>
                                                <li className="pt-1">
                                                    <div className="flex items-center gap-3">
                                                        <a
                                                            href="https://www.instagram.com/titan_events"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label="Instagram"
                                                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] p-2.5 hover:bg-white/[0.1] transition"
                                                        >
                                                            <Instagram
                                                                className="w-4 h-4"
                                                                strokeWidth={1.5}
                                                            />
                                                        </a>
                                                        <a
                                                            href="https://www.facebook.com/TITANSERVICE"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label="Facebook"
                                                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] p-2.5 hover:bg-white/[0.1] transition"
                                                        >
                                                            <Facebook className="w-4 h-4" strokeWidth={1.5} />
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                    <div className="text-xs sm:text-sm text-white/60">
                                        © {new Date().getFullYear()} TitanEvents. Tutti i diritti
                                        riservati.
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                                        <a
                                            href="#"
                                            className="text-white/70 hover:text-white transition"
                                        >
                                            Privacy
                                        </a>
                                        <span className="text-white/30">•</span>
                                        <a
                                            href="#"
                                            className="text-white/70 hover:text-white transition"
                                        >
                                            Cookie
                                        </a>
                                        <span className="text-white/30">•</span>
                                        <a
                                            href="#"
                                            className="text-white/70 hover:text-white transition"
                                        >
                                            Termini &amp; Condizioni
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    </LazyMotion>
                </div>
                <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />
            </footer>
        </div>
    );
}
