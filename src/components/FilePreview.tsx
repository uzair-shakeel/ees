type Props = {
  url: string | null;
  filename: string | null;
  /** Friendly label shown instead of the raw filename */
  label: string;
  className?: string;
};

function extFrom(url: string | null, filename: string | null) {
  const src = (filename || url || "").split("?")[0].toLowerCase();
  const match = src.match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? "";
}

function isImage(url: string | null, filename: string | null) {
  const ext = extFrom(url, filename);
  if (["png", "jpg", "jpeg", "gif", "webp", "bmp", "avif"].includes(ext)) return true;
  if (url?.includes("/image/upload/")) return true;
  return false;
}

function isPdf(url: string | null, filename: string | null) {
  const ext = extFrom(url, filename);
  if (ext === "pdf") return true;
  if (url?.toLowerCase().includes(".pdf")) return true;
  return false;
}

function FileGlyph({ kind }: { kind: "pdf" | "file" }) {
  if (kind === "pdf") {
    return (
      <svg viewBox="0 0 40 48" className="h-12 w-10" aria-hidden>
        <path
          d="M4 4h20l12 12v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
          fill="#E4EFF6"
          stroke="#173B5D"
          strokeWidth="1.5"
        />
        <path d="M24 4v12h12" fill="none" stroke="#173B5D" strokeWidth="1.5" />
        <text
          x="20"
          y="34"
          textAnchor="middle"
          fill="#2E6F9E"
          fontSize="9"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          PDF
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 48" className="h-12 w-10" aria-hidden>
      <path
        d="M4 4h20l12 12v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#E4EFF6"
        stroke="#173B5D"
        strokeWidth="1.5"
      />
      <path d="M24 4v12h12" fill="none" stroke="#173B5D" strokeWidth="1.5" />
      <path
        d="M12 28h16M12 34h12"
        stroke="#5E7282"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FilePreview({ url, filename, label, className = "" }: Props) {
  if (!url) return null;

  const image = isImage(url, filename);
  const pdf = isPdf(url, filename);
  const ext = extFrom(url, filename).toUpperCase();

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-stretch overflow-hidden rounded-xl border border-eef-soft bg-eef-mist transition hover:border-eef-blue/50 ${className}`}
    >
      <div className="flex w-[7.5rem] shrink-0 items-center justify-center bg-white sm:w-40">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="h-28 w-full object-cover sm:h-32"
          />
        ) : (
          <div className="flex h-28 w-full flex-col items-center justify-center gap-1 sm:h-32">
            <FileGlyph kind={pdf ? "pdf" : "file"} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
        <p className="truncate font-medium text-eef-navy">{label}</p>
        <p className="text-xs text-eef-secondary">
          {ext ? `${ext} · ` : ""}
          Cliquez pour ouvrir
        </p>
        <span className="mt-1 text-sm font-medium text-eef-deep group-hover:underline">
          Voir le document →
        </span>
      </div>
    </a>
  );
}
