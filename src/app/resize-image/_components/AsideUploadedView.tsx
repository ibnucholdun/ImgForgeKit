"use client";
import React, { useEffect, useMemo } from "react";
import type { UploadedFile } from "../page";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  seedResizeFromOriginal,
  setResizeSize,
  setResizeWidth,
  setResizeHeight,
  setLockAspect as setLockAspectRedux,
  setNoEnlarge as setNoEnlargeRedux,
} from "~/redux/slices/resizeSlice";
import { ResizeModeToggle } from "./ResizeModeToggle";
import { useSearchParams } from "next/navigation";
import PixelMode from "./PixelMode";
import PercenMode from "./PercenMode";

type NumberOrEmpty = number | "";

const clampPositiveInt = (v: string | number): NumberOrEmpty => {
  if (v === "" || v === null || v === undefined) return "";
  const n = Math.max(1, Math.floor(Number(v) || 0));
  return Number.isFinite(n) ? n : "";
};

const AsideUploadedView = ({
  uploadedFiles,
}: {
  uploadedFiles: Array<UploadedFile>;
}) => {
  const last = uploadedFiles.at(-1);
  const dispatch = useAppDispatch();
  const mode = (useSearchParams().get("mode") ?? "pixels") as
    | "pixels"
    | "percent";

  const { width, height, lockAspect, noEnlarge, original } = useAppSelector(
    (s) => s.resize.resize,
  );

  const origMemo = useMemo(() => {
    const ow = last?.width ?? 0;
    const oh = last?.height ?? 0;
    return { ow, oh };
  }, [last?.width, last?.height]);

  useEffect(() => {
    if (origMemo.ow || origMemo.oh) {
      dispatch(seedResizeFromOriginal(origMemo));
    }
  }, [dispatch, origMemo.ow, origMemo.oh]);

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = raw === "" ? "" : clampPositiveInt(raw);
    if (!original) {
      if (parsed === "") dispatch(setResizeWidth(""));
      else dispatch(setResizeWidth(parsed));
      return;
    }

    if (parsed === "") {
      dispatch(setResizeSize({ width: "", height: lockAspect ? "" : height }));
      return;
    }

    let w = parsed;
    if (noEnlarge && original.ow > 0) w = Math.min(w, original.ow);

    if (lockAspect && original.ratio > 0) {
      const h = Math.max(1, Math.round(w / original.ratio));
      const hFinal =
        noEnlarge && original.oh > 0 ? Math.min(h, original.oh) : h;
      dispatch(setResizeSize({ width: w, height: hFinal }));
    } else {
      dispatch(setResizeWidth(w));
    }
  };

  const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = raw === "" ? "" : clampPositiveInt(raw);
    if (!original) {
      if (parsed === "") dispatch(setResizeHeight(""));
      else dispatch(setResizeHeight(parsed));
      return;
    }

    if (parsed === "") {
      dispatch(setResizeSize({ height: "", width: lockAspect ? "" : width }));
      return;
    }

    let h = parsed;
    if (noEnlarge && original.oh > 0) h = Math.min(h, original.oh);

    if (lockAspect && original.ratio > 0) {
      const w = Math.max(1, Math.round(h * original.ratio));
      const wFinal =
        noEnlarge && original.ow > 0 ? Math.min(w, original.ow) : w;
      dispatch(setResizeSize({ width: wFinal, height: h }));
    } else {
      dispatch(setResizeHeight(h));
    }
  };

  return (
    <div className="border-border-light dark:border-border-dark border-t-2s">
      <ResizeModeToggle />
      {mode === "pixels" && (
        <PixelMode
          width={width}
          height={height}
          onWidthChange={onWidthChange}
          onHeightChange={onHeightChange}
          original={original}
          lockAspect={lockAspect}
          noEnlarge={noEnlarge}
          dispatch={dispatch}
          setLockAspectRedux={setLockAspectRedux}
          setNoEnlargeRedux={setNoEnlargeRedux}
          setResizeSize={setResizeSize}
        />
      )}
      {mode === "percent" && <PercenMode />}
    </div>
  );
};

export default AsideUploadedView;
