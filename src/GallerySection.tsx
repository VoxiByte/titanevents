import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "https://titanevents-gallery-production.up.railway.app";

// Put this file in your project's /public folder, or update the path below accordingly
const FALLBACK_IMAGE = "/cristiana_giovanni716.webp"; // if the backend is unreachable, use this

function classNames(...xs) {
    return xs.filter(Boolean).join(" ");
}

export default function GallerySection() {
    const [filter, setFilter] = React.useState("tutti");
    const [activeIndex, setActiveIndex] = React.useState(null);
    const [items, setItems] = React.useState([]); // [{id,src,alt,cat,meta:{...}}]
    const [categories, setCategories] = React.useState([
        { key: "tutti", label: "Tutti" },
    ]);

    const [page, setPage] = React.useState(0);
    const [size] = React.useState(18);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [error, setError] = React.useState("");

    // Small helper to build a set of placeholder items using the fallback image
    const buildFallbackItems = React.useCallback(
        (count = 9) =>
            Array.from({ length: count }).map((_, i) => ({
                id: `fallback-${i}`,
                src: FALLBACK_IMAGE,
                alt: "immagine di esempio",
                cat: "template",
                meta: { luogo: "", servizio: "", anno: "" },
            })),
        []
    );

    // fetch page (list endpoint)
    const fetchPage = React.useCallback(
        async (pageToLoad, append = false) => {
            const params = new URLSearchParams();
            params.set("page", String(pageToLoad));
            params.set("size", String(size));
            if (filter !== "tutti") params.set("category", filter);

            // Add a timeout so we fail fast when the backend is not reachable
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            try {
                const res = await fetch(
                    `${API_BASE}/api/v1/gallery?${params.toString()}`,
                    { signal: controller.signal }
                );
                if (!res.ok)
                    throw new Error(await res.text().catch(() => res.statusText));
                const dto = await res.json(); // {items,total,page,size}

                const mapped = (dto.items ?? []).map((it) => ({
                    id: it.id,
                    src: it.url,
                    alt: it.meta?.alt || it.meta?.title || "immagine",
                    cat: it.meta?.category || "other",
                    meta: {
                        luogo: it.meta?.location || "",
                        servizio: it.meta?.service || "",
                        anno: it.meta?.year ?? "",
                    },
                }));

                setTotal(dto.total ?? 0);
                setItems((prev) => (append ? [...prev, ...mapped] : mapped));

                // build categories from available items on first fetch of all/tutti
                if (pageToLoad === 0 && filter === "tutti") {
                    const uniq = new Map();
                    for (const it of dto.items ?? []) {
                        const key = (it.meta?.category || "other").toString();
                        if (!uniq.has(key))
                            uniq.set(key, key.charAt(0).toUpperCase() + key.slice(1));
                    }
                    const cats = [
                        { key: "tutti", label: "Tutti" },
                        ...Array.from(uniq.entries()).map(([k, v]) => ({
                            key: k,
                            label: v,
                        })),
                    ];
                    setCategories(cats);
                }
            } catch (e) {
                // If the backend is unreachable, fall back to local template image(s)
                setError(
                    String(e?.message || e) || "Impossibile raggiungere il server"
                );
                const count = pageToLoad === 0 ? 9 : 0; // show a grid on the first page; ignore load-more failures
                const fallbacks = buildFallbackItems(count);
                if (count > 0) {
                    setTotal(fallbacks.length);
                    setItems(fallbacks);
                    setCategories([
                        { key: "tutti", label: "Tutti" },
                        { key: "template", label: "Template" },
                    ]);
                }
            } finally {
                clearTimeout(timeoutId);
            }
        },
        [API_BASE, filter, size, buildFallbackItems]
    );

    // initial + whenever filter changes (reset paging)
    React.useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError("");
                setPage(0);
                await fetchPage(0, false);
            } catch (e) {
                if (!cancelled) setError(String(e.message || e));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [filter, fetchPage]);

    // load more
    const canLoadMore = items.length < total;
    const onLoadMore = async () => {
        if (!canLoadMore || loadingMore) return;
        const next = page + 1;
        try {
            setLoadingMore(true);
            await fetchPage(next, true);
            setPage(next);
        } catch (e) {
            setError(String(e.message || e));
        } finally {
            setLoadingMore(false);
        }
    };

    // keyboard nav for lightbox
    React.useEffect(() => {
        if (activeIndex === null) return;
        const onKey = (e) => {
            if (e.key === "Escape") setActiveIndex(null);
            if (e.key === "ArrowRight")
                setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));
            if (e.key === "ArrowLeft")
                setActiveIndex((i) =>
                    i === null ? null : (i - 1 + items.length) % items.length
                );
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [activeIndex, items.length]);

    // lock scroll when lightbox open
    React.useEffect(() => {
        if (activeIndex === null) return;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevBodyOverscroll = document.body.style.overscrollBehavior;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overscrollBehavior = "none";
        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.overscrollBehavior = prevBodyOverscroll;
        };
    }, [activeIndex]);

    // simple skeletons – now square to match the grid
    const skeletons = Array.from({ length: 9 }).map((_, i) => (
        <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
            <div className="w-full aspect-square bg-white/[0.06] animate-pulse" />
        </div>
    ));

    // If an individual image fails, swap to the fallback template image
    const handleImgError = (e) => {
        if (e?.currentTarget?.src?.includes(FALLBACK_IMAGE)) return;
        e.currentTarget.src = FALLBACK_IMAGE;
        e.currentTarget.onerror = null; // prevent infinite loop
    };

    return (
        <section
            id="gallery"
            aria-label="Galleria"
            className="relative isolate overflow-hidden"
        >
            <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />

            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36">
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
              Gallery
            </span>
                        <h2
                            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
                            style={{ fontFamily: "Poppins, ui-sans-serif, system-ui" }}
                        >
                            Set-up reali, finiture senza compromessi
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-white/70">
                            Una selezione di produzioni recenti tra corporate, live e product
                            launch. Ogni scatto racconta un processo: sopralluogo, design,
                            messa in scena.
                        </p>
                    </m.div>

                    {/* Filters */}
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15% 0px" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                        role="tablist"
                        aria-label="Filtra galleria per categoria"
                    >
                        {categories.map(({ key, label }) => {
                            const active = filter === key;
                            return (
                                <button
                                    key={key}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setFilter(key)}
                                    className={classNames(
                                        "relative rounded-full border px-4 py-2 text-sm transition focus:outline-none",
                                        active
                                            ? "border-amber-300/40 text-amber-100 bg-amber-300/10"
                                            : "border-white/10 text-white/75 hover:bg-white/5"
                                    )}
                                >
                                    <span className="tracking-wide">{label}</span>
                                    {active && (
                                        <span className="pointer-events-none absolute -bottom-[6px] left-1/2 h-[2px] w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
                                    )}
                                </button>
                            );
                        })}
                    </m.div>

                    {/* Error notice */}
                    {error && (
                        <div className="mt-6 text-center text-sm text-rose-300">
                            Errore durante il caricamento: {error}
                        </div>
                    )}

                    {/* Instagram-style grid: 2/3/4 columns of square tiles, no captions */}
                    <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2"
                    >
                        {loading
                            ? skeletons
                            : items.map((it, idx) => (
                                <button
                                    key={it.id}
                                    aria-label={`Apri: ${it.alt}`}
                                    onClick={() => setActiveIndex(idx)}
                                    className="group relative block overflow-hidden rounded-none sm:rounded-[10px] border border-white/10 bg-white/[0.03] focus:outline-none"
                                >
                                    <div className="aspect-square w-full">
                                        <img
                                            src={it.src}
                                            alt={it.alt}
                                            loading="lazy"
                                            decoding="async"
                                            onError={handleImgError}
                                            className="h-full w-full object-cover align-top transition duration-300 group-hover:scale-[1.02] will-change-transform"
                                        />
                                    </div>
                                    {/* subtle hover tint only, no text */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/0 group-hover:bg-black/10" />
                                    {/* For screen readers, keep metadata accessible but visually hidden */}
                                    <span className="sr-only">{`${it.cat} • ${it.meta.luogo} • ${it.meta.servizio} • ${it.meta.anno}`}</span>
                                </button>
                            ))}
                    </m.div>

                    {/* Load more */}
                    {!loading && canLoadMore && (
                        <div className="mt-8 flex items-center justify-center">
                            <button
                                onClick={onLoadMore}
                                disabled={loadingMore}
                                className="group relative inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-base font-medium transition border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-60"
                            >
                                <span className="absolute inset-0 -z-10 rounded-2xl shadow-[0_0_28px_4px_rgba(255,200,0,0.06)]" />
                                {loadingMore ? "Caricamento..." : "Carica altri"}
                            </button>
                        </div>
                    )}

                    {/* CTA */}
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 flex items-center justify-center"
                    >
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-base font-medium transition border-white/15 bg-white/5 hover:bg-white/10"
                        >
                            <span className="absolute inset-0 -z-10 rounded-2xl shadow-[0_0_28px_4px_rgba(255,200,0,0.06)]" />
                            Chiedi il case study completo
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
                    </m.div>

                    {/* Lightbox */}
                    {activeIndex !== null && items[activeIndex] && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
                            role="dialog"
                            aria-modal="true"
                            onClick={() => setActiveIndex(null)}
                        >
                            <div
                                className="relative w-full max-w-6xl mx-auto"
                                onClick={(e) => e.stopPropagation()}
                                role="document"
                            >
                                {/* media container */}
                                <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
                                    <img
                                        src={items[activeIndex].src}
                                        alt={items[activeIndex].alt}
                                        loading="eager"
                                        decoding="async"
                                        onError={handleImgError}
                                        className="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
                                    />

                                    {/* metadata only in lightbox */}
                                    <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                      <span className="uppercase tracking-[0.25em]">
                        {items[activeIndex].cat}
                      </span>
                                            <span className="text-white/30">•</span>
                                            <span>{items[activeIndex].meta.luogo}</span>
                                            <span className="text-white/30">•</span>
                                            <span>{items[activeIndex].meta.servizio}</span>
                                            <span className="text-white/30">•</span>
                                            <span>{items[activeIndex].meta.anno}</span>
                                        </div>
                                        <div className="mt-1 text-sm sm:text-base font-medium text-white">
                                            {items[activeIndex].alt}
                                        </div>
                                    </div>
                                </div>

                                {/* prev/next buttons */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveIndex(
                                            (i) => (i - 1 + items.length) % items.length
                                        );
                                    }}
                                    className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 p-3 sm:p-2 hover:bg-white/15 focus:outline-none"
                                    aria-label="Precedente"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 sm:w-5 sm:h-5"
                                        aria-hidden
                                    >
                                        <path
                                            d="M15 6l-6 6 6 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveIndex((i) => (i + 1) % items.length);
                                    }}
                                    className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15 bg-white/10 p-3 sm:p-2 hover:bg-white/15 focus:outline-none"
                                    aria-label="Successivo"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 sm:w-5 sm:h-5"
                                        aria-hidden
                                    >
                                        <path
                                            d="M9 6l6 6-6 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </m.div>
                    )}
                </LazyMotion>
            </div>

            <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/[0.06] to-transparent blur-2xl opacity-60" />
        </section>
    );
}
