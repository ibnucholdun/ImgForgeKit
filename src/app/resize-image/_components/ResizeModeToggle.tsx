"use client";

import { Grid2x2Plus, Percent } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import clsx from "clsx";

export function ResizeModeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mode = (searchParams.get("mode") ?? "pixels") as "pixels" | "percent";

  const setMode = (next: "pixels" | "percent") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const pixelsActive = mode === "pixels";
  const percentActive = mode === "percent";

  return (
    <div className="bg-border-light dark:bg-border-dark mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={() => setMode("pixels")}
        aria-pressed={pixelsActive}
        className={clsx(
          "flex cursor-pointer flex-col items-center gap-2 border-b-2 p-4",
          pixelsActive
            ? "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-primary"
            : "bg-background-light dark:bg-background-dark text-subtext-light dark:text-subtext-dark border-transparent hover:bg-gray-200 dark:hover:bg-slate-600",
        )}
        title="Resize by pixels"
      >
        <Grid2x2Plus
          className={clsx("h-8 w-8", pixelsActive ? "text-primary" : undefined)}
        />
        <span className="text-sm font-medium">By pixels</span>
      </button>

      <button
        type="button"
        onClick={() => setMode("percent")}
        aria-pressed={percentActive}
        className={clsx(
          "flex cursor-pointer flex-col items-center gap-2 p-4",
          percentActive
            ? "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-primary border-b-2"
            : "bg-background-light dark:bg-background-dark text-subtext-light dark:text-subtext-dark hover:bg-gray-200 dark:hover:bg-slate-600",
        )}
        title="Resize by percentage"
      >
        <Percent
          className={clsx(
            "h-8 w-8",
            percentActive ? "text-primary" : undefined,
          )}
        />
        <span className="text-sm font-medium">By percentage</span>
      </button>
    </div>
  );
}
