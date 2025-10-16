import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isImageReady(
  url: string,
  signal?: AbortSignal,
): Promise<boolean> {
  try {
    const head = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      signal,
      mode: "cors",
    });
    const ct = head.headers.get("content-type") ?? "";
    if (head.ok && ct.startsWith("image/")) return true;
  } catch {}
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { Range: "bytes=0-1023" },
      signal,
      mode: "cors",
    });
    const ct = res.headers.get("content-type") ?? "";
    return res.ok && ct.startsWith("image/");
  } catch {
    return false;
  }
}
