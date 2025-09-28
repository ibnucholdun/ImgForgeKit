import React from "react";
import { DropboxIcon } from "~/components/icons/Dropbox";
import { GoogleDriveIcon } from "~/components/icons/GoogleDrive";

const CompressImagePage = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col">
      <section className="flex flex-grow flex-col items-center justify-center px-4 text-center">
        <h1 className="text-on-surface-light dark:text-on-surface-dark mb-4 text-2xl font-bold md:text-5xl">
          Compress IMAGE
        </h1>
        <p className="mb-8 text-base text-gray-600 md:text-lg dark:text-gray-300">
          Compress <span className="text-primary font-bold">JPG</span>,
          <span className="text-primary font-bold">PNG</span>,
          <span className="text-primary font-bold">SVG</span> or
          <span className="text-primary font-bold">GIF</span> with the best
          quality and compression.
          <br />
          Reduce the filesize of your images at once.
        </p>
        <div className="w-full max-w-lg">
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-text-dark flex-grow cursor-pointer rounded-lg px-3 py-2 text-base font-bold shadow-lg transition duration-300 hover:bg-red-700 md:px-6 md:py-4 md:text-xl">
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
      </section>
    </div>
  );
};

export default CompressImagePage;
