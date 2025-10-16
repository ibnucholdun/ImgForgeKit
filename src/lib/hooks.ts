import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "~/redux/store";
import { useEffect, useRef, useState } from "react";
import { isImageReady } from "./utils";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function usePreloadedImage(
  url: string | null,
  { timeoutMs = 15000 }: { timeoutMs?: number } = {},
) {
  const [ready, setReady] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let alive = true;
    setReady(false);
    setSrc(null);
    if (!url) return;

    void (async () => {
      // 1) tunggu sampai benar2 image/*
      const deadline = Date.now() + timeoutMs;
      let delay = 250;
      while (alive && Date.now() < deadline) {
        const ok = await isImageReady(url);
        if (!alive) return;
        if (ok) break;
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(Math.round(delay * 1.6), 1000);
      }

      if (!alive) return;

      // 2) preload + decode
      const img = new Image();
      imgRef.current = img;
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;

      // Pastikan decode selesai sebelum swap (zero-gap)
      try {
        // Jika sudah tercache, decode akan resolve sangat cepat
        await (img.decode
          ? img.decode()
          : new Promise<void>((res) => (img.onload = () => res())));
      } catch {}
      if (!alive) return;

      setSrc(url);
      setReady(true);
    })();

    return () => {
      alive = false;
      imgRef.current = null;
    };
  }, [url, timeoutMs]);

  return { ready, src };
}
