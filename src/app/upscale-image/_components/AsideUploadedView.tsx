"use client";

import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import type { UploadedFile } from "~/app/resize-image/page";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { setScale, setUpscaledFourFile } from "~/redux/slices/upscaleSlice";

const AsideUploadedView = ({ data }: { data: UploadedFile[] }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { scale, baseData } = useAppSelector((state) => state.upscale);
  const handleUpscaleTwo = () => {
    dispatch(setScale(2));
    router.push(`/upscale-image?scale=2`);
  };

  const handleUpscaleFour = () => {
    const base: { url: string; width: number; height: number; fileId: string } =
      Array.isArray(baseData) ? baseData[0] : baseData;
    if (!base) return;

    dispatch(setScale(4));
    const upscaledFourFile = {
      upscaledUrl: `${base.url}?tr=e-upscale,w-${(base.width ?? 0) * 4},h-${(base.height ?? 0) * 4}`,
      fileId: base.fileId,
    };

    dispatch(setUpscaledFourFile([upscaledFourFile]));
    router.push(`/upscale-image?scale=4`);
  };

  return (
    <aside className="bg-surface-light dark:bg-surface-dark flex flex-col py-6">
      <div
        className="border-primary text-primary relative mb-6 rounded border bg-red-100 px-4 py-3 dark:bg-red-900 dark:text-red-200"
        role="alert"
      >
        <span className="block text-sm sm:inline">
          Select a size multiplier and click &quot;Upscale&quot; to upscale any
          image smaller than 6MP.
        </span>
      </div>
      <div className="mb-6">
        <h3 className="text-text-light dark:text-text-dark mb-2 text-sm font-medium">
          Size multiplier
        </h3>
        <div className="flex space-x-2">
          <button
            type="button"
            aria-pressed={scale === 2}
            onClick={handleUpscaleTwo}
            className={clsx(
              "w-1/2 cursor-pointer rounded py-2 text-center",
              scale === 2
                ? "border-primary text-primary bg-red-100 dark:bg-red-900/50"
                : "text-text-light dark:text-text-dark bg-gray-200 dark:bg-gray-700",
            )}
          >
            2x
          </button>
          <button
            type="button"
            aria-pressed={scale === 4}
            onClick={handleUpscaleFour}
            className={clsx(
              "w-1/2 cursor-pointer rounded py-2 text-center",
              scale === 4
                ? "border-primary text-primary bg-red-100 dark:bg-red-900/50"
                : "text-text-light dark:text-text-dark bg-gray-200 dark:bg-gray-700",
            )}
          >
            4x
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="text-text-light dark:text-text-dark flex items-center justify-between space-x-[2px] rounded-md bg-slate-100 p-1 text-[12px]">
          <p className="truncate">{data?.[0]?.name}</p>
          <div className="flex items-center space-x-1">
            <p className="rounded-md bg-slate-200 px-1 py-1">
              {(data?.[0]?.width ?? 0).toFixed(0)} x{" "}
              {(data?.[0]?.height ?? 0).toFixed(0)} px
            </p>
            <ArrowRight className="text-primary h-4 w-4" />
            <p className="bg-primary relative rounded-md px-2 py-1 font-bold text-white">
              {(data?.[0]?.width ?? 0) * scale} x{" "}
              {(data?.[0]?.height ?? 0) * scale} px
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideUploadedView;
