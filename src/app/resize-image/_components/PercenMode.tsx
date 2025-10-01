"use client";

import React from "react";
import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { setResizeSize } from "~/redux/slices/resizeSlice";

const options = [25, 50, 75] as const; // persen lebih kecil

export default function PercenMode() {
  const dispatch = useAppDispatch();
  const { original } = useAppSelector((s) => s.resize.resize);
  const [selectedPct, setSelectedPct] = React.useState<number | null>(50); // default pilih 50%

  const disabled = !original || original.ow <= 0 || original.oh <= 0;

  const applyPercent = (pctSmaller: number) => {
    if (disabled) return;
    // pctSmaller = 25 → scale = 0.75, dst.
    const scale = Math.max(0, Math.min(1, (100 - pctSmaller) / 100));
    const w = Math.max(1, Math.round(original.ow * scale));
    const h = Math.max(1, Math.round(original.oh * scale));
    setSelectedPct(pctSmaller);
    dispatch(setResizeSize({ width: w, height: h }));
  };

  return (
    <div className="space-y-3">
      {options.map((pct) => {
        const isActive = selectedPct === pct;
        const base =
          "flex cursor-pointer items-center justify-between rounded-md px-4 py-3 transition-colors";
        const active = "border-2 border-primary bg-red-50 dark:bg-red-900/20";
        const inactive =
          "border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary";

        return (
          <button
            key={pct}
            type="button"
            disabled={disabled}
            onClick={() => applyPercent(pct)}
            className={`${base} ${isActive ? active : inactive} disabled:cursor-not-allowed disabled:opacity-50`}
            title={
              disabled
                ? "Original size unknown"
                : `Resize to ${100 - pct}% of original`
            }
          >
            <span className="text-primary text-sm font-medium">
              {pct}% SMALLER
            </span>
            {isActive && <Check className="text-primary h-5 w-5" />}
          </button>
        );
      })}
    </div>
  );
}
