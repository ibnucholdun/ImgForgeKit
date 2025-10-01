import clsx from "clsx";
import React from "react";
import type { UploadedFile } from "~/app/compress-image/page";
import { DropboxIcon } from "~/components/icons/Dropbox";
import { GoogleDriveIcon } from "~/components/icons/GoogleDrive";

const HomeFeature = ({
  selectFile,
  uploadFile,
  fileInputRef,
  uploaded,
  title,
  description,
}: {
  selectFile: () => void;
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  uploaded: UploadedFile | null;
  title: string;
  description: React.ReactNode;
}) => {
  return (
    <section
      className={clsx(
        "flex flex-grow flex-col items-center justify-center px-4 text-center",
        uploaded && "hidden",
      )}
    >
      <h1 className="text-on-surface-light dark:text-on-surface-dark mb-4 text-2xl font-bold md:text-5xl">
        {title}
      </h1>
      {description}
      <div className="w-full max-w-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={selectFile}
            className="bg-primary text-text-dark flex-grow cursor-pointer rounded-lg px-3 py-2 text-base font-bold shadow-lg transition duration-300 hover:bg-red-700 md:px-6 md:py-4 md:text-xl"
          >
            Select images
          </button>
          <div className="flex flex-col space-y-2">
            <button className="bg-surface-light dark:bg-surface-dark cursor-pointer rounded-full p-3 shadow-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <GoogleDriveIcon className="h-6 w-6" />
            </button>
            <button className="bg-surface-light dark:bg-surface-dark cursor-pointer rounded-full p-3 shadow-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <DropboxIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          or drop images here
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadFile}
        className="hidden"
      />
    </section>
  );
};

export default HomeFeature;
