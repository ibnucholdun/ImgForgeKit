import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import React from "react";
import {
  Cropper,
  ImageRestriction,
  RectangleStencil,
  type Coordinates,
  type CropperRef,
} from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";

const UploadedView = ({
  data,
  handleCrop,
  onChange,
  options,
  isUploading,
}: {
  data: { url: string; name: string }[];
  handleCrop: () => void;
  onChange: (cropper: CropperRef) => void;
  options: Coordinates | null;
  isUploading: boolean;
}) => {
  const image = data[0]?.url ?? "";

  return (
    <main className={clsx("flex flex-grow", isUploading && "hidden")}>
      <div className="bg-background-light dark:bg-background-dark flex flex-grow items-center justify-center p-4 lg:p-8">
        <div className="relative w-full">
          <div className="relative h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] w-full max-w-full overflow-hidden rounded-lg shadow-lg">
            <Cropper
              src={image}
              className="h-full w-full"
              imageRestriction={ImageRestriction.fitArea}
              stencilComponent={RectangleStencil}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <aside className="bg-surface-light dark:bg-surface-dark flex w-80 flex-col justify-between p-6 shadow-lg">
        <div>
          <h2 className="text-on-surface-light dark:text-on-surface-dark mb-6 text-2xl font-bold">
            Crop options
          </h2>
          <div className="space-y-4">
            <div className="mb-6 space-y-4">
              <div>
                <label
                  className="text-text-light dark:text-text-dark text-sm font-medium"
                  htmlFor="width"
                >
                  Width (px):
                </label>
                <div className="relative mt-1">
                  <input
                    className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary w-full rounded-md border p-2"
                    id="width"
                    type="number"
                    min={1}
                    value={options?.width ?? 0}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-text-light dark:text-text-dark text-sm font-medium"
                  htmlFor="height"
                >
                  Height (px):
                </label>
                <div className="relative mt-1">
                  <input
                    className="disable bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary w-full rounded-md border p-2"
                    id="height"
                    type="number"
                    min={1}
                    value={options?.height ?? 0}
                    disabled
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-text-light dark:text-text-dark text-sm font-medium"
                  htmlFor="height"
                >
                  Position X (px):
                </label>
                <div className="relative mt-1">
                  <input
                    className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary w-full rounded-md border p-2"
                    id="height"
                    type="number"
                    min={1}
                    value={options?.left ?? 0}
                    disabled
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-text-light dark:text-text-dark text-sm font-medium"
                  htmlFor="height"
                >
                  Position Y (px):
                </label>
                <div className="relative mt-1">
                  <input
                    className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary w-full rounded-md border p-2"
                    id="height"
                    type="number"
                    min={1}
                    value={options?.top ?? 0}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleCrop}
          className="bg-primary hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center rounded-lg py-3 text-lg font-semibold text-white transition-colors"
        >
          Crop IMAGES
          <ArrowRight className="ml-2" />
        </button>
      </aside>
    </main>
  );
};

export default UploadedView;
