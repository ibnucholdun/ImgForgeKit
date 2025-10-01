"use client";
import React, { useRef, useState } from "react";
import UploadedView from "../../components/UploadedView";
import LoadingUplaod from "../../components/LoadingUplaod";
import clsx from "clsx";
import { upload } from "@imagekit/next";
import { useRouter } from "next/navigation";
import { setResizedFile, setIsProses } from "~/redux/slices/resizeSlice";
import type { RootState } from "~/redux/store";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import HomeFeature from "~/components/HomeFeature";
import AsideUploadedView from "./_components/AsideUploadedView";

export interface UploadedFile {
  at?: any;
  url: string;
  file: File;
  name: string;
  id: string;
  width: number | null;
  height: number | null;
}

interface UploadAuthResponse {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

const ResizeImagePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dataImageKit, setDataImageKit] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const isProses = useAppSelector((state: RootState) => state.resize.isProses);
  const { width, height } = useAppSelector((s) => s.resize.resize);

  const w = typeof width === "number" ? width : undefined;
  const h = typeof height === "number" ? height : undefined;

  const router = useRouter();
  const id = crypto.randomUUID();

  const selectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const getUploadAuth = async (): Promise<UploadAuthResponse> => {
    const response = await fetch("/api/upload-auth");
    if (!response.ok) throw new Error("Auth failed");
    return response.json() as Promise<UploadAuthResponse>;
  };

  function getDimsFromFile(file: File) {
    return createImageBitmap(file).then((b) => {
      const dims = { width: b.width, height: b.height };
      b.close?.();
      return dims;
    });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    const id = crypto.randomUUID();
    setUploadedFiles((p) => [
      ...p,
      { id, url, file, name: file.name, width: null, height: null },
    ]);

    void getDimsFromFile(file).then(({ width, height }) => {
      setUploadedFiles((p) =>
        p.map((f) => (f.id === id ? { ...f, width, height } : f)),
      );
    });
  }

  const getTransformedUrl = (
    originalUrl: string,
    {
      width = w,
      height = h,
    }: { width?: number | null; height?: number | null } = {},
  ) => {
    const params: string[] = [];

    if (width) params.push(`w-${width}`);
    if (height) params.push(`h-${height}`);

    const transform = params.length ? `?tr=${params.join(",")}` : "";
    return `${originalUrl}${transform},c-force`;
  };

  const uploadAllToImageKit = async (files: File[]) => {
    dispatch(setIsProses(true));
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const authParams = await getUploadAuth();
          return upload({
            file,
            fileName: file.name,
            folder: "/ImgForgeKit",
            ...authParams,
          });
        }),
      );

      setDataImageKit(results);

      const resizedFiles = results.map((file) => ({
        resizedUrl: getTransformedUrl(file.url!),
        fileId: file.fileId!,
      }));

      dispatch(setResizedFile(resizedFiles));
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      dispatch(setIsProses(false));
      router.push(`/resize-image/download/${id}`);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col",
        uploadedFiles.length > 0
          ? "min-h-[calc(100vh-137px)]"
          : "min-h-[calc(100vh-200px)]",
      )}
    >
      {isProses ? (
        <LoadingUplaod feature="Resizing" />
      ) : (
        <HomeFeature
          selectFile={selectFile}
          uploadFile={handleFileSelect}
          fileInputRef={fileInputRef}
          uploaded={uploadedFiles[uploadedFiles.length - 1] ?? null}
          title="Resize Image"
          description={
            <p className="mb-8 text-base text-gray-600 md:text-lg dark:text-gray-300">
              Resize <span className="text-primary font-bold">JPG</span>,
              <span className="text-primary font-bold">PNG</span>,
              <span className="text-primary font-bold">SVG</span> or
              <span className="text-primary font-bold">GIF</span> by defining
              new height and width pixels.
              <br />
              Change dimensions your images instantly
            </p>
          }
        />
      )}

      {uploadedFiles.length > 0 && dataImageKit.length === 0 && (
        <UploadedView
          selectFile={selectFile}
          isUploading={isProses}
          data={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          title="Resize Options"
          buttonName="Resize IMAGE"
          hanldeButtonProcess={async () => {
            await uploadAllToImageKit(uploadedFiles.map((f) => f.file));
          }}
        >
          <AsideUploadedView uploadedFiles={uploadedFiles} />
        </UploadedView>
      )}
    </div>
  );
};

export default ResizeImagePage;
