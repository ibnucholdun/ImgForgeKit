import React from "react";

interface PixelMode {
  width: string | number;
  height: string | number;
  onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  original?: { ow: number; oh: number; ratio: number } | null;
  lockAspect: boolean;
  noEnlarge: boolean;
  dispatch: React.Dispatch<any>;
  setLockAspectRedux: React.Dispatch<any>;
  setNoEnlargeRedux: React.Dispatch<any>;
  setResizeSize: React.Dispatch<any>;
}

const PixelMode = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  original,
  lockAspect,
  noEnlarge,
  dispatch,
  setLockAspectRedux,
  setNoEnlargeRedux,
  setResizeSize,
}: PixelMode) => {
  return (
    <div className="">
      <p className="text-subtext-light dark:text-subtext-dark mb-4 text-sm">
        Resize all images to a{" "}
        <span className="text-text-light dark:text-text-dark font-bold">
          exact size
        </span>{" "}
        of
      </p>

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
              value={width}
              onChange={onWidthChange}
              placeholder={original?.ow ? String(original.ow) : "width"}
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
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary w-full rounded-md border p-2"
              id="height"
              type="number"
              min={1}
              value={height}
              onChange={onHeightChange}
              placeholder={original?.oh ? String(original.oh) : "height"}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <input
            className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
            id="aspect-ratio"
            type="checkbox"
            checked={lockAspect}
            onChange={(e) => dispatch(setLockAspectRedux(e.target.checked))}
          />
          <label
            className="text-text-light dark:text-text-dark ml-2 block text-sm"
            htmlFor="aspect-ratio"
          >
            Maintain aspect ratio
          </label>
        </div>

        <div className="flex items-center">
          <input
            className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
            id="enlarge"
            type="checkbox"
            checked={noEnlarge}
            onChange={(e) => {
              const checked = e.target.checked;
              dispatch(setNoEnlargeRedux(checked));
              if (checked && original) {
                const w =
                  typeof width === "number"
                    ? Math.min(width, original.ow)
                    : width;
                let h =
                  typeof height === "number"
                    ? Math.min(height, original.oh)
                    : height;

                if (lockAspect && typeof w === "number" && original.ratio > 0) {
                  const hCalc = Math.max(1, Math.round(w / original.ratio));
                  h = Math.min(hCalc, original.oh);
                }
                dispatch(setResizeSize({ width: w, height: h }));
              }
            }}
          />
          <label
            className="text-text-light dark:text-text-dark ml-2 block text-sm"
            htmlFor="enlarge"
          >
            Do not enlarge if smaller
          </label>
        </div>
      </div>
    </div>
  );
};

export default PixelMode;
