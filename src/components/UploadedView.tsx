"use client";

/* eslint-disable @typescript-eslint/no-unsafe-call */
import clsx from "clsx";
import { ArrowRight, Plus, RotateCw, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { DropboxIcon } from "~/components/icons/Dropbox";
import { GoogleDriveIcon } from "~/components/icons/GoogleDrive";

const UploadedView = ({
  selectFile,
  isUploading,
  data,
  hanldeButtonProcess,
  setUploadedFiles,
  title,
  children,
  buttonName,
}: {
  selectFile: () => void;
  isUploading: boolean;
  data: { url: string; name: string }[];
  hanldeButtonProcess: () => void;
  setUploadedFiles: any;
  title: string;
  buttonName: string;
  children: React.ReactNode;
}) => {
  const handleDeleteFile = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setUploadedFiles((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  const pathname = usePathname();
  return (
    <div
      className={clsx(
        "flex h-[calc(100vh-137px)] flex-grow",
        isUploading && "hidden",
      )}
    >
      <main className="bg-background-light dark:bg-background-dark relative flex flex-1 flex-grow flex-col items-center justify-start overflow-y-auto p-8">
        <div className="flex flex-wrap space-y-6 space-x-6 lg:max-w-5xl">
          {data.map((item: { url: string; name: string }, index: number) => (
            <div
              className="group relative flex h-[250px] w-[230px] flex-col items-center rounded-lg bg-white p-2 shadow-md"
              key={item.url}
            >
              <div className="ml-auto flex items-center justify-end space-x-1 py-2 opacity-0 group-hover:opacity-100">
                <button className="bg-primary/25 cursor-pointer rounded-full p-1">
                  <RotateCw className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="bg-primary/25 cursor-pointer rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className="relative h-full w-full max-w-[200px]">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="rounded-md object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 w-full truncate text-center text-xs">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <div
          className={clsx(
            "absolute top-1/12 right-1/12 flex flex-col space-y-4",
            pathname === "/resize-image" && "hidden",
          )}
        >
          <div className="group relative">
            <button
              type="button"
              onClick={selectFile}
              className="bg-primary/80 hover:bg-primary relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg"
            >
              <Plus className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                {data.length}
              </span>
            </button>

            <div className="absolute top-12 -left-2 hidden flex-col space-y-2 p-2 group-hover:flex">
              <button
                type="button"
                className="bg-primary/80 hover:bg-primary flex cursor-pointer items-center space-x-2 rounded-full p-3 text-sm"
              >
                <GoogleDriveIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="bg-primary/80 hover:bg-primary flex cursor-pointer items-center space-x-2 rounded-full p-3 text-sm"
              >
                <DropboxIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <aside className="bg-surface-light dark:bg-surface-dark flex w-80 flex-col justify-between p-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold">{title}</h2>
          {children}
        </div>
        <button
          onClick={hanldeButtonProcess}
          className="bg-primary hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center rounded-lg py-3 text-lg font-semibold text-white transition-colors"
        >
          {buttonName}
          <ArrowRight className="ml-2" />
        </button>
      </aside>
    </div>
  );
};

export default UploadedView;
