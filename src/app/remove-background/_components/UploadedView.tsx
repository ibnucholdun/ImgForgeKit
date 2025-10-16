import { ArrowRight } from "lucide-react";
import React from "react";
import ReactCompareImage from "react-compare-image";
import { usePreloadedImage } from "~/lib/hooks";
import LoadingUplaod from "../../../components/LoadingUplaod";

const UploadedView = ({
  data,
  hanldeButtonProcess,
  title,
  children,
  buttonName,
  removeBackgroundFile,
}: {
  data: { url: string; name: string }[];
  hanldeButtonProcess: () => void;
  title: string;
  buttonName: string;
  children: React.ReactNode;
  removeBackgroundFile: { removedUrl: string; fileId: string }[];
}) => {
  const imageUrl = data[0]?.url ?? "";
  const removeBackgroundUrl = removeBackgroundFile[0]?.removedUrl ?? "";

  const { ready: rightReady, src: rightSrc } = usePreloadedImage(
    removeBackgroundUrl,
    {
      timeoutMs: 15000,
    },
  );

  const canShowCompare = Boolean(imageUrl && rightReady && rightSrc);
  return (
    <>
      {!canShowCompare ? (
        <LoadingUplaod feature="Upload and Removing" />
      ) : (
        <div className="flex h-[calc(100vh-137px)] flex-grow">
          <main className="bg-background-light dark:bg-background-dark relative flex flex-1 flex-grow flex-col items-center justify-start overflow-y-auto p-8">
            {rightSrc && (
              <div className="dark:bg-teal-100border-surface-light w-full max-w-5xl rounded-xl border border-slate-200 shadow-lg">
                <ReactCompareImage
                  leftImage={imageUrl}
                  rightImage={rightSrc}
                  leftImageAlt="Before"
                  rightImageAlt="After"
                  leftImageCss={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "transparent",
                    borderRadius: "0.5rem + 4px",
                  }}
                  rightImageCss={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "transparent",
                    borderRadius: "0.5rem + 4px",
                  }}
                  skeleton={
                    <div className="bg-surface-light dark:bg-surface-dark aspect-[4/3] w-full rounded-xl" />
                  }
                />
              </div>
            )}
          </main>

          <aside className="bg-surface-light dark:bg-surface-dark flex w-90 flex-col justify-between p-4">
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
      )}
    </>
  );
};

export default UploadedView;
