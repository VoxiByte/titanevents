// @ts-nocheck
import React from "react";
import Cropper from "react-easy-crop";

// ==============================
// Config
const API_BASE =
    import.meta?.env?.VITE_API_BASE ??
    "https://titanevents-gallery-production.up.railway.app";
const ADMIN_KEY =
    import.meta?.env?.VITE_ADMIN_KEY ?? "TitanPassword1!";

// 🔒 Use a separate env var if you want, or fall back to ADMIN_KEY
const ADMIN_PASSWORD =
    import.meta?.env?.VITE_ADMIN_PASSWORD ?? ADMIN_KEY;

// ------------------------------
// Helper: unique id (local only)
const uid = () => Math.random().toString(36).slice(2, 9);

// ------------------------------
// Helper: load image as HTMLImageElement
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// ------------------------------
// Helper: getCroppedImg -> returns Blob and objectURL
async function getCroppedImg(imageSrc, cropPixels, outW, outH) {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = outW;
    canvas.height = outH;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const sx = cropPixels.x * scaleX;
    const sy = cropPixels.y * scaleY;
    const sw = cropPixels.width * scaleX;
    const sh = cropPixels.height * scaleY;

    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) return resolve(null);
                const url = URL.createObjectURL(blob);
                resolve({ blob, url, width: canvas.width, height: canvas.height });
            },
            "image/jpeg",
            0.92
        );
    });
}

// ==============================
// Backend API helpers (all endpoints used)

async function apiCreate({ file, meta, cropped }) {
    const form = new FormData();
    // Spring controller expects a part named "file"
    form.append("file", file);
    // and a JSON part named "meta" containing { meta: {...}, cropped: {...} }
    const payload = { meta, cropped: cropped || null };
    form.append(
        "meta",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const res = await fetch(`${API_BASE}/api/v1/gallery`, {
        method: "POST",
        headers: { "X-Admin-Api-Key": ADMIN_KEY },
        body: form,
    });
    if (!res.ok) throw await parseErr(res);
    // ETag carries the version
    const dto = await res.json();
    dto.version = readETag(res.headers) ?? dto.version;
    console.log("Version: " + dto.version);
    return dto;
}

async function apiList({ page = 0, size = 24, q, category, year } = {}) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("size", String(size));
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (year) params.set("year", String(year));
    const res = await fetch(
        `${API_BASE}/api/v1/gallery?${params.toString()}`
    );
    if (!res.ok) throw await parseErr(res);
    const dto = await res.json();
    // Ensure versions are present from ETag when fetching single items later
    return dto;
}

async function apiGet(id) {
    const res = await fetch(`${API_BASE}/api/v1/gallery/${id}`);
    if (!res.ok) throw await parseErr(res);
    const dto = await res.json();
    dto.version = readETag(res.headers) ?? dto.version;
    return dto;
}

async function apiPatchMeta(id, version, partialMeta, cropped) {
    const res = await fetch(`${API_BASE}/api/v1/gallery/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "If-Match": String(version),
            "X-Admin-Api-Key": ADMIN_KEY,
        },
        body: JSON.stringify({
            meta: partialMeta ?? {},
            cropped: cropped ?? null,
        }),
    });
    if (!res.ok) throw await parseErr(res);
    const dto = await res.json();
    dto.version = readETag(res.headers) ?? dto.version;
    return dto;
}

async function apiReplaceImage(id, version, file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/api/v1/gallery/${id}/image`, {
        method: "PUT",
        headers: {
            "If-Match": String(version),
            "X-Admin-Api-Key": ADMIN_KEY,
        },
        body: form,
    });
    if (!res.ok) throw await parseErr(res);
    const dto = await res.json();
    dto.version = readETag(res.headers) ?? dto.version;
    return dto;
}

async function apiDelete(id) {
    const res = await fetch(`${API_BASE}/api/v1/gallery/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Api-Key": ADMIN_KEY },
    });
    if (!res.ok && res.status !== 204) throw await parseErr(res);
    return true;
}

// Utilities for API errors / ETags
async function parseErr(res) {
    const text = await res.text().catch(() => "");
    let msg = text;
    try {
        const j = JSON.parse(text);
        msg = j.message || text;
    } catch {}
    const err = new Error(
        `${res.status} ${res.statusText}${msg ? ` - ${msg}` : ""}`
    );
    err.status = res.status;
    return err;
}
function readETag(headers) {
    const et = headers.get("ETag");
    console.log("Broken: " + !et);
    if (!et) return null;
    return et.replaceAll('"', "");
}

// ==============================
// UI constants
const ASPECTS = [
    {
        key: "1:1",
        label: "Square 1:1 (1080)",
        value: 1 / 1,
        outW: 1080,
        outH: 1080,
    },
    {
        key: "4:5",
        label: "Portrait 4:5 (1080×1350)",
        value: 4 / 5,
        outW: 1080,
        outH: 1350,
    },
    {
        key: "16:9",
        label: "Landscape 16:9 (1920×1080)",
        value: 16 / 9,
        outW: 1920,
        outH: 1080,
    },
    {
        key: "9:16",
        label: "Story/Reel 9:16 (1080×1920)",
        value: 9 / 16,
        outW: 1080,
        outH: 1920,
    },
];

const DEFAULT_META = () => ({
    title: "",
    category: "",
    location: "",
    service: "",
    year: new Date().getFullYear().toString(),
    alt: "",
});

// ==============================

export default function AdminGallery() {
    const [items, setItems] = React.useState([]); // [{id,url,meta,cropped,version,originalFile,originalUrl}]
    const [draft, setDraft] = React.useState(null); // {serverId?, ...}
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const dropRef = React.useRef(null);

    // 🔒 Simple admin "auth"
    const [authorized, setAuthorized] = React.useState(false);
    const [passwordInput, setPasswordInput] = React.useState("");
    const [authError, setAuthError] = React.useState("");

    React.useEffect(() => {
        // restore session auth if present
        if (typeof window !== "undefined") {
            const stored = window.sessionStorage.getItem("adminAuthed");
            if (stored === "true") {
                setAuthorized(true);
            }
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setAuthorized(true);
            setAuthError("");
            setPasswordInput("");
            if (typeof window !== "undefined") {
                window.sessionStorage.setItem("adminAuthed", "true");
            }
        } else {
            setAuthError("Password errata");
            setPasswordInput("");
        }
    };

    // initial load – only after auth
    React.useEffect(() => {
        if (!authorized) return;
        setLoading(true);
        loadPage()
            .catch((e) => setError(String(e)))
            .finally(() => setLoading(false));
    }, [authorized]);

    async function loadPage() {
        const res = await apiList({ page: 0, size: 60 });
        const mapped = (res.items || []).map((it) => ({
            id: it.id,
            url: it.url,
            meta: it.meta || {},
            cropped: it.cropped || null,
            version: it.version ?? 0,
            // local-only helpers:
            originalFile: null,
            originalUrl: null,
        }));
        setItems(mapped);
    }

    // drag-n-drop – only useful after auth
    React.useEffect(() => {
        if (!authorized) return;
        const el = dropRef.current;
        if (!el) return;
        const prevent = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const onDrop = (e) => {
            prevent(e);
            const file = e.dataTransfer.files?.[0];
            if (file) openEditorWithFile(file);
        };
        ["dragenter", "dragover", "dragleave", "drop"].forEach((t) =>
            el.addEventListener(t, prevent)
        );
        el.addEventListener("drop", onDrop);
        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((t) =>
                el.removeEventListener(t, prevent)
            );
            el.removeEventListener("drop", onDrop);
        };
    }, [authorized]);

    const openEditorWithFile = async (file) => {
        const src = URL.createObjectURL(file);
        setDraft({
            id: uid(), // local id for the draft dialog
            serverId: null, // null => this is a CREATE
            src,
            file,
            meta: DEFAULT_META(),
            crop: { x: 0, y: 0, zoom: 1 },
            aspect: ASPECTS[1], // default 4:5
            croppedAreaPixels: null,
            didCrop: false,
            saving: false,
        });
    };

    const onFiles = (files) => {
        const [first] = files || [];
        if (first) openEditorWithFile(first);
    };

    const onDelete = async (id) => {
        try {
            await apiDelete(id);
            setItems((arr) => arr.filter((x) => x.id !== id));
        } catch (e) {
            alert("Errore eliminazione: " + e.message);
        }
    };

    const editItem = async (id) => {
        // fetch the latest (to get fresh ETag/version)
        try {
            const fresh = await apiGet(id);
            setDraft({
                id: uid(),
                serverId: id, // -> EDIT mode
                src: fresh.url, // show current
                file: null, // unless user selects/crops, no new file
                meta: {
                    title: fresh.meta?.title ?? "",
                    category: fresh.meta?.category ?? "",
                    location: fresh.meta?.location ?? "",
                    service: fresh.meta?.service ?? "",
                    year: String(
                        fresh.meta?.year ?? new Date().getFullYear()
                    ),
                    alt: fresh.meta?.alt ?? "",
                },
                currentVersion: fresh.version ?? 0,
                crop: { x: 0, y: 0, zoom: 1 },
                aspect:
                    ASPECTS.find(
                        (a) => a.key === (fresh.cropped?.aspectKey || "4:5")
                    ) || ASPECTS[1],
                croppedAreaPixels: null,
                didCrop: false,
                saving: false,
            });
        } catch (e) {
            alert("Errore apertura editor: " + e.message);
        }
    };

    const closeEditor = () => {
        if (draft?.src && draft.file) URL.revokeObjectURL(draft.src);
        setDraft(null);
    };

    const onSave = async () => {
        if (!draft) return;
        const {
            file,
            src,
            meta,
            croppedAreaPixels,
            didCrop,
            aspect,
            serverId,
        } = draft;

        // Normalize year as number for backend validation
        const metaClean = {
            title: meta.title?.trim() || "",
            category: meta.category?.trim() || "",
            location: meta.location?.trim() || "",
            service: meta.service?.trim() || "",
            year:
                Number.parseInt(meta.year, 10) ||
                new Date().getFullYear(),
            alt: meta.alt?.trim() || "",
        };

        let fileToUpload = file;
        let croppedMeta = null;

        // If the user cropped, we generate a new file (even in edit flow).
        if (didCrop && croppedAreaPixels) {
            const res = await getCroppedImg(
                src,
                croppedAreaPixels,
                aspect.outW,
                aspect.outH
            );
            if (res?.blob) {
                fileToUpload = new File(
                    [res.blob],
                    `crop_${Date.now()}.jpg`,
                    { type: "image/jpeg" }
                );
                croppedMeta = {
                    width: res.width,
                    height: res.height,
                    aspectKey: aspect.key,
                };
            }
        }

        draft.saving = true;
        setDraft({ ...draft });

        try {
            if (!serverId) {
                // -------- CREATE (POST multipart)
                if (!fileToUpload)
                    throw new Error("Seleziona un file prima di salvare.");
                const saved = await apiCreate({
                    file: fileToUpload,
                    meta: metaClean,
                    cropped: croppedMeta,
                });
                // add to top and close
                setItems((arr) => [
                    {
                        id: saved.id,
                        url: saved.url,
                        meta: saved.meta,
                        cropped: saved.cropped || null,
                        version: saved.version ?? 0,
                        originalFile: file, // local
                        originalUrl: src, // local
                    },
                    ...arr,
                ]);
                closeEditor();
            } else {
                // -------- EDIT
                // Strategy: if we have a new file (user cropped or uploaded), replace image first, then PATCH meta using the new version.
                let latestVersion = draft.currentVersion;

                if (fileToUpload) {
                    const replaced = await apiReplaceImage(
                        serverId,
                        latestVersion,
                        fileToUpload
                    );

                    latestVersion = (await apiGet(draft.serverId)).version;
                    // Update list preview immediately
                    setItems((arr) =>
                        arr.map((x) =>
                            x.id === serverId
                                ? {
                                    ...x,
                                    url: replaced.url,
                                    version: latestVersion,
                                }
                                : x
                        )
                    );
                }

                // Even if no new file, we may still update metadata/crop info
                const patched = await apiPatchMeta(
                    serverId,
                    latestVersion,
                    metaClean,
                    croppedMeta
                );
                // reflect in list
                setItems((arr) =>
                    arr.map((x) =>
                        x.id === serverId
                            ? {
                                ...x,
                                meta: patched.meta,
                                cropped: patched.cropped || null,
                                version: patched.version ?? x.version,
                            }
                            : x
                    )
                );
                closeEditor();
            }
        } catch (e) {
            draft.saving = false;
            setDraft({ ...draft });
            alert("Errore durante il salvataggio: " + e.message);
        }
    };

    // 🔒 If not authorized, show password gate instead of the dashboard
    if (!authorized) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#0a0b10] via-[#080a12] to-black text-white flex items-center justify-center px-4">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
                    <h1 className="text-xl font-semibold tracking-tight">
                        Admin · Accesso
                    </h1>
                    <p className="mt-1 text-sm text-white/70">
                        Inserisci la password amministratore per accedere
                        alla galleria.
                    </p>

                    <form className="mt-4 space-y-3" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs text-white/70 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {authError && (
                            <div className="text-xs text-rose-300/90">
                                {authError}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 min-h-10"
                        >
                            Entra
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --------------
    // UI (mobile-first)
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0b10] via-[#080a12] to-black text-white px-4 sm:px-6 py-5">
            <header className="mx-auto max-w-7xl">
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    Admin · Galleria
                </h1>
                <p className="text-white/70 mt-1 text-sm sm:text-base">
                    Carica, ritaglia, modifica metadati e salva nel sito.
                </p>
            </header>

            {/* Status */}
            <section className="mx-auto max-w-7xl mt-3">
                {loading && (
                    <div className="text-white/60 text-sm">Caricamento…</div>
                )}
                {error && (
                    <div className="text-rose-300/90 text-sm">
                        Errore: {error}
                    </div>
                )}
            </section>

            {/* Uploader (drag & drop + click) */}
            <section className="mx-auto max-w-7xl mt-5">
                <div
                    ref={dropRef}
                    className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 sm:p-6"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <div className="text-sm text-white/80">
                                Trascina qui o seleziona un&apos;immagine
                            </div>
                            <div className="mt-1 text-[11px] text-white/50">
                                JPG/PNG, lato lungo ≥ 1920px
                            </div>
                        </div>
                        <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm cursor-pointer hover:bg-white/15 active:scale-[0.99] transition">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => onFiles(e.target.files)}
                            />
                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4"
                                aria-hidden
                            >
                                <path
                                    d="M12 16v-8m0 0-3 3m3-3 3 3M5 16a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Carica immagine
                        </label>
                    </div>
                </div>
            </section>

            {/* Gallery list */}
            <section className="mx-auto max-w-7xl mt-5">
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-white/60 text-sm">
                        Ancora nessuna immagine salvata.
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((it) => (
                            <li
                                key={it.id}
                                className="rounded-2xl border border-white/10 bg-white/[0.035] overflow-hidden"
                            >
                                <div className="aspect-video bg-black/40">
                                    <img
                                        src={it.url}
                                        alt={it.meta?.alt || "thumb"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold truncate max-w-[36ch]">
                      {it.meta?.title ||
                          it.meta?.alt ||
                          "Senza titolo"}
                    </span>
                                        {it.meta?.category && (
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                        {it.meta.category}
                      </span>
                                        )}
                                        {it.cropped?.aspectKey && (
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-100">
                        {it.cropped.aspectKey}
                      </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-white/60">
                                        {it.meta?.location && (
                                            <span>{it.meta.location} · </span>
                                        )}
                                        {it.meta?.service && (
                                            <span>{it.meta.service} · </span>
                                        )}
                                        {it.meta?.year}
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <button
                                            onClick={() => editItem(it.id)}
                                            className="flex-1 min-h-10 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
                                        >
                                            Modifica
                                        </button>
                                        <button
                                            onClick={() => onDelete(it.id)}
                                            className="flex-1 min-h-10 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                                        >
                                            Elimina
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Editor (full-screen on mobile) */}
            {draft && (
                <div className="fixed inset-0 z-[1000] flex items-stretch justify-center bg-black/80">
                    <div className="relative flex flex-col w-full max-w-6xl h-full sm:h-[92vh] sm:my-[4vh] mx-0 sm:mx-6 overflow-hidden rounded-none sm:rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md">
                        {/* Header sticky */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/40 backdrop-blur">
                            <div>
                                <div className="text-xs uppercase tracking-[0.28em] text-white/60">
                                    Editor
                                </div>
                                <div className="text-sm text-white/80">
                                    Ritaglia e compila i metadati, poi salva
                                </div>
                            </div>
                            <button
                                onClick={closeEditor}
                                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 min-h-10"
                            >
                                Chiudi
                            </button>
                        </div>

                        {/* Body scrollable */}
                        <div className="flex-1 grid lg:grid-cols-2 min-h-0">
                            {/* Left: cropper section (WYSIWYG) */}
                            <div className="relative min-h-[55vh] sm:min-h-[56vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-white/10">
                                <Cropper
                                    image={draft.src}
                                    crop={draft.crop}
                                    zoom={draft.crop.zoom}
                                    aspect={draft.aspect.value}
                                    onCropChange={(c) =>
                                        setDraft((d) => ({
                                            ...d,
                                            crop: { ...d.crop, x: c.x, y: c.y },
                                        }))
                                    }
                                    onZoomChange={(z) =>
                                        setDraft((d) => ({
                                            ...d,
                                            crop: { ...d.crop, zoom: z },
                                        }))
                                    }
                                    onCropComplete={(area, areaPixels) =>
                                        setDraft((d) => ({
                                            ...d,
                                            croppedAreaPixels: areaPixels,
                                            didCrop: true,
                                        }))
                                    }
                                    cropShape="rect"
                                    showGrid
                                    objectFit="contain"
                                    restrictPosition
                                    minZoom={1}
                                    maxZoom={4}
                                    classes={{ containerClassName: "!bg-black" }}
                                />

                                {/* HUD */}
                                <div className="absolute left-3 right-3 top-3 flex items-center gap-2">
                  <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/90">
                    {draft.aspect.label}
                  </span>
                                    {draft.croppedAreaPixels && (
                                        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80">
                      {Math.round(
                          draft.croppedAreaPixels.width
                      )}
                                            ×
                                            {Math.round(
                                                draft.croppedAreaPixels.height
                                            )}
                                            px
                    </span>
                                    )}
                                    <span className="ml-auto rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80">
                    Zoom: {draft.crop.zoom.toFixed(2)}×
                  </span>
                                </div>

                                {/* Controls */}
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {ASPECTS.map((a) => (
                                            <button
                                                key={a.key}
                                                onClick={() =>
                                                    setDraft((d) => ({ ...d, aspect: a }))
                                                }
                                                className={`text-xs rounded-lg border px-3 py-2 min-h-9 ${
                                                    draft.aspect.key === a.key
                                                        ? "border-amber-300/40 bg-amber-400/10 text-amber-100"
                                                        : "border-white/15 bg-white/10 text-white/90 hover:bg-white/15"
                                                }`}
                                                aria-pressed={draft.aspect.key === a.key}
                                            >
                                                {a.key}
                                            </button>
                                        ))}
                                        <div className="ml-auto flex items-center gap-2 bg-black/40 px-2 py-1.5 rounded-lg border border-white/10">
                                            <label className="text-xs text-white/70">
                                                Zoom
                                            </label>
                                            <input
                                                type="range"
                                                min={1}
                                                max={4}
                                                step={0.01}
                                                value={draft.crop.zoom}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        crop: {
                                                            ...d.crop,
                                                            zoom: Number(e.target.value),
                                                        },
                                                    }))
                                                }
                                                className="w-28 sm:w-40"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: metadata + actions */}
                            <div className="flex flex-col min-h-0">
                                <div className="p-4 sm:p-5 grid grid-cols-1 gap-4 overflow-auto">
                                    {/* Metadata form */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Titolo
                                            </label>
                                            <input
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.title}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: { ...d.meta, title: e.target.value },
                                                    }))
                                                }
                                                placeholder="Es. Corporate keynote"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Categoria
                                            </label>
                                            <input
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.category}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: {
                                                            ...d.meta,
                                                            category: e.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder="corporate / live / wedding / launch"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Location
                                            </label>
                                            <input
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.location}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: {
                                                            ...d.meta,
                                                            location: e.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder="Milano"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Servizio
                                            </label>
                                            <input
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.service}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: {
                                                            ...d.meta,
                                                            service: e.target.value,
                                                        },
                                                    }))
                                                }
                                                placeholder="Light + LED"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Anno
                                            </label>
                                            <input
                                                type="number"
                                                min={2000}
                                                max={3000}
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.year}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: { ...d.meta, year: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70">
                                                Alt text
                                            </label>
                                            <input
                                                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-white"
                                                value={draft.meta.alt}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        meta: { ...d.meta, alt: e.target.value },
                                                    }))
                                                }
                                                placeholder="Descrizione accessibile dell'immagine"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sticky action bar on mobile with safe-area */}
                                <div
                                    className="sticky bottom-0 z-10 p-3 sm:p-4 border-t border-white/10 bg-black/60 backdrop-blur flex items-center gap-2 justify-end"
                                    style={{
                                        paddingBottom:
                                            "calc(env(safe-area-inset-bottom, 0px) + 12px)",
                                    }}
                                >
                                    <button
                                        disabled={draft.saving}
                                        onClick={onSave}
                                        className="rounded-lg border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 hover:bg-amber-400/15 disabled:opacity-60 min-h-10"
                                    >
                                        {draft.saving ? "Salvataggio..." : "OK, Salva"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
