import { ArrowRight } from "lucide-react";
import React from "react";
import ReactCompareImage from "react-compare-image";
import { useAppSelector, usePreloadedImage } from "~/lib/hooks";
import LoadingUplaod from "../../../components/LoadingUplaod";

const UploadedView = ({
  data,
  hanldeButtonProcess,
  title,
  children,
  buttonName,
  upscaledFiles,
}: {
  data: { url: string; name: string }[];
  hanldeButtonProcess: () => void;
  title: string;
  buttonName: string;
  children: React.ReactNode;
  upscaledFiles: { upscaledUrl: string; fileId: string }[];
}) => {
  const { upscaledFourFiles, scale } = useAppSelector((state) => state.upscale);
  const imageUrl = data[0]?.url ?? "";
  const upscaledTwoImageUrl = upscaledFiles[0]?.upscaledUrl ?? "";
  const upscaledFourImageUrl = upscaledFourFiles[0]?.upscaledUrl ?? "";

  const rightUrl = React.useMemo(() => {
    const chosen = scale === 4 ? upscaledFourImageUrl : upscaledTwoImageUrl;
    return chosen || upscaledTwoImageUrl || upscaledFourImageUrl || "";
  }, [scale, upscaledTwoImageUrl, upscaledFourImageUrl]);

  const { ready: rightReady, src: rightSrc } = usePreloadedImage(rightUrl, {
    timeoutMs: 15000,
  });

  const canShowCompare = Boolean(imageUrl && rightReady && rightSrc);
  return (
    <>
      {!canShowCompare ? (
        <LoadingUplaod feature="upscaling" />
      ) : (
        <div className="flex h-[calc(100vh-137px)] flex-grow">
          <main className="bg-background-light dark:bg-background-dark relative flex flex-1 flex-grow flex-col items-center justify-start overflow-y-auto p-8">
            {rightSrc && (
              <div className="w-full max-w-5xl">
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
                  }}
                  rightImageCss={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "transparent",
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
