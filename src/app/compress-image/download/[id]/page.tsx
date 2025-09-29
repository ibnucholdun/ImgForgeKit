"use client";

import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronRight,
  Download,
  Home,
  Ratio,
  RotateCw,
  Stamp,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "~/lib/hooks";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { downloadOne, filenameFromUrl } from "~/helper/download";
import { deleteImage } from "~/actions/image";

const featureConfig: Record<string, { action: string }> = {
  "compress-image": { action: "compressed" },
  "convert-image": { action: "converted" },
  "resize-image": { action: "resized" },
  "rotate-image": { action: "rotated" },
  "remove-bg": { action: "background removed" },
};

const DownloadPage = () => {
  const pathname = usePathname();
  const route = useRouter();
  const feature = pathname.split("/")[1] ?? "";

  const config = featureConfig[feature] ?? { action: "processed" };
  const { compressedFiles } = useAppSelector((s) => s.compress);
  const handleDownloadFile = async () => {
    if (!compressedFiles?.length) return;

    if (compressedFiles.length === 1) {
      const url = compressedFiles?.[0]?.compressedUrl ?? "";
      const name = filenameFromUrl(url, 0, { replaceTokenWith: "compressed" });
      try {
        await downloadOne(url, name);
        await deleteImage(compressedFiles?.[0]?.fileId ?? "");
      } catch (e) {
        console.error("Download failed:", e);
      }
      return;
    }

    const zip = new JSZip();

    for (let i = 0; i < compressedFiles.length; i++) {
      const url = compressedFiles?.[i]?.compressedUrl ?? "";
      const name = filenameFromUrl(url, i, { replaceTokenWith: "compressed" });
      try {
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`);
        const blob = await res.blob();
        zip.file(`${String(i + 1).padStart(2, "0")}-${name}`, blob);
        await deleteImage(compressedFiles?.[i]?.fileId ?? "");
      } catch (e) {
        console.error("Fetch failed:", e);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "compressed-images.zip");
  };

  return (
    <main className="flex-grow">
      <div className="bg-background-light dark:bg-background-dark py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-text-light dark:text-text-dark mb-10 text-center text-3xl font-bold">
            {compressedFiles.length !== 0
              ? `Your IMAGES have been ${config.action}!`
              : "This task has already been deleted."}
          </h1>
          <div className="flex items-start justify-center space-x-6">
            <div className="bg-card-light dark:bg-card-dark w-full max-w-2xl rounded-lg p-8 shadow-lg">
              <div className="mb-8 flex items-center justify-between">
                <button
                  onClick={() => route.back()}
                  className="text-text-secondary-light dark:text-text-secondary-dark cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                {compressedFiles.length !== 0 ? (
                  <button
                    onClick={handleDownloadFile}
                    className="bg-primary flex cursor-pointer items-center space-x-2 rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-red-700"
                  >
                    <Download className="h-6 w-6" />
                    <span>Download {config.action} IMAGES</span>
                  </button>
                ) : (
                  <button
                    onClick={() => route.push("/")}
                    className="bg-primary flex cursor-pointer items-center space-x-2 rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-red-700"
                  >
                    <Home className="h-6 w-6" />
                    <span>Back to Homepage</span>
                  </button>
                )}
                <div />
              </div>
              <div className="border-border-light dark:border-border-dark my-6 border-t"></div>
              <div className="space-y-4">
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-semibold">
                  Continue to...
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Link
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <div className="flex items-center space-x-2">
                      <Ratio className="text-primary h-6 w-6" />
                      <span className="text-sm font-medium">Resize IMAGE</span>
                    </div>
                    <ChevronRight className="text-text-secondary-light dark:text-text-secondary-dark h-6 w-6" />
                  </Link>
                  <Link
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <div className="flex items-center space-x-2">
                      <RotateCw className="text-primary h-6 w-6" />
                      <span className="text-sm font-medium">Rotate IMAGE</span>
                    </div>
                    <ChevronRight className="text-text-secondary-light dark:text-text-secondary-dark h-6 w-6" />
                  </Link>
                  <Link
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <div className="flex items-center space-x-2">
                      <ArrowLeftRight className="text-primary h-6 w-6" />
                      <span className="text-sm font-medium">
                        Convert from JPG
                      </span>
                    </div>
                    <ChevronRight className="text-text-secondary-light dark:text-text-secondary-dark h-6 w-6" />
                  </Link>
                  <Link
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <div className="flex items-center space-x-1">
                      <Stamp className="text-primary h-6 w-6" />
                      <span className="text-sm font-medium">
                        Watermark IMAGE
                      </span>
                    </div>
                    <ChevronRight className="text-text-secondary-light dark:text-text-secondary-dark h-6 w-6" />
                  </Link>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-text-light dark:text-text-dark mb-2 font-semibold">
                  How can you thank us? Spread the word!
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  Please share the tool to inspire more productive people!
                </p>
                <div className="flex justify-center space-x-2">
                  <button className="border-border-light dark:border-border-dark flex items-center space-x-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-green-500">
                      star
                    </span>
                    <span>Trustpilot</span>
                  </button>
                  <button className="border-border-light dark:border-border-dark flex items-center space-x-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                    <span>Facebook</span>
                  </button>
                  <button className="border-border-light dark:border-border-dark flex items-center space-x-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      className="h-4 w-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.561-.666 2.477 0 1.61.82 3.027 2.053 3.848-.764-.024-1.483-.234-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className="border-border-light dark:border-border-dark flex items-center space-x-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      className="h-4 w-4 text-blue-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DownloadPage;
