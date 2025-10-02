export function filenameFromUrl(
  url: string,
  idx: number,
  opts?: {
    replaceTokenWith?: string;
    forceExt?: ".jpg" | ".png" | ".webp" | ".avif";
  },
) {
  try {
    const u = new URL(url);
    const base = u.pathname.split("/").pop() ?? `image-${idx + 1}.jpg`;
    const dotIdx = base.lastIndexOf(".");
    const name = dotIdx > -1 ? base.slice(0, dotIdx) : base;

    // detect dari query jika ada f-<format>
    const tr = u.searchParams.get("tr") ?? "";
    const detected = /\bf-(jpg|jpeg)\b/.test(tr)
      ? ".jpg"
      : /\bf-png\b/.test(tr)
        ? ".png"
        : /\bf-webp\b/.test(tr)
          ? ".webp"
          : /\bf-avif\b/.test(tr)
            ? ".avif"
            : null;

    const ext =
      opts?.forceExt ?? detected ?? (dotIdx > -1 ? base.slice(dotIdx) : ".jpg");

    const cleanedName = name.replace(/_[A-Za-z0-9-]{6,}$/, "");
    const finalName = opts?.replaceTokenWith
      ? `${cleanedName}_${opts.replaceTokenWith}${ext}`
      : `${cleanedName}${ext}`;
    return finalName.trim();
  } catch {
    const base = `image-${idx + 1}${opts?.forceExt ?? ".jpg"}`;
    if (opts?.replaceTokenWith) {
      const dotIdx = base.lastIndexOf(".");
      const name = base.slice(0, dotIdx);
      const ext = base.slice(dotIdx);
      return `${name}_${opts.replaceTokenWith}${ext}`;
    }
    return base;
  }
}

export async function downloadOne(url: string, filename: string) {
  const res = await fetch(url, { credentials: "omit" });
  if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`);
  const blob = await res.blob();

  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 3000);
}
