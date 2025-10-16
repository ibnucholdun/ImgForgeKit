"use client";
import React, { useRef, useState } from "react";
import LoadingUplaod from "../../components/LoadingUplaod";
import clsx from "clsx";
import { upload } from "@imagekit/next";
import { useRouter } from "next/navigation";
import { setCropedFile, setIsProses } from "~/redux/slices/cropSlice";
import type { RootState } from "~/redux/store";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import HomeFeature from "~/components/HomeFeature";
import UploadedView from "./_components/UploadedView";
import { type Coordinates, type CropperRef } from "react-advanced-cropper";

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
type CropRect = { x: number; y: number; width: number; height: number };

const CropImagePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dataImageKit, setDataImageKit] = useState<any[]>([]);
  const [options, setOptions] = React.useState<Coordinates | null>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const dispatch = useAppDispatch();
  const isProses = useAppSelector((state: RootState) => state.crop.isProses);

  function isCropRect(v: CropRect): v is CropRect {
    return (
      Number.isFinite(v?.x) &&
      Number.isFinite(v?.y) &&
      Number.isFinite(v?.width) &&
      Number.isFinite(v?.height)
    );
  }
  const router = useRouter();
  const id = crypto.randomUUID();
  const onChange = (cropper: CropperRef) => {
    const coordinate = cropper.getCoordinates();
    setOptions(coordinate ?? null);
  };

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
    crop?: { x: number; y: number; width: number; height: number },
  ) => {
    if (!crop) return originalUrl;
    const tr = [
      `w-${Math.round(crop.width)}`,
      `h-${Math.round(crop.height)}`,
      "cm-extract",
      `x-${Math.round(crop.x)}`,
      `y-${Math.round(crop.y)}`,
    ].join(",");

    return `${originalUrl}${originalUrl.includes("?") ? "&" : "?"}tr=${tr}`;
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

      const maybeCrop: CropRect = {
        x: options?.left ?? 0,
        y: options?.top ?? 0,
        width: options?.width ?? 0,
        height: options?.height ?? 0,
      };
      const crop = isCropRect(maybeCrop) ? maybeCrop : undefined;
      const cropedFile = results.map((file) => ({
        cropedUrl: getTransformedUrl(file.url!, crop),
        fileId: file.fileId!,
      }));

      dispatch(setCropedFile(cropedFile));
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      dispatch(setIsProses(false));
      router.push(`/crop-image/download/${id}`);
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
        <LoadingUplaod feature="Croping" />
      ) : (
        <HomeFeature
          selectFile={selectFile}
          uploadFile={handleFileSelect}
          fileInputRef={fileInputRef}
          uploaded={uploadedFiles[uploadedFiles.length - 1] ?? null}
          title="Crop Image"
          description={
            <p className="mb-8 text-base text-gray-600 md:text-lg dark:text-gray-300">
              Crop <span className="text-primary font-bold">JPG</span>,
              <span className="text-primary font-bold">PNG</span>,
              <span className="text-primary font-bold">SVG</span> or
              <span className="text-primary font-bold">GIF</span> by defining a
              rectangle in pixels.
              <br />
              Cut your image online
            </p>
          }
        />
      )}

      {uploadedFiles.length > 0 && dataImageKit.length === 0 && (
        <UploadedView
          data={uploadedFiles}
          handleCrop={async () => {
            await uploadAllToImageKit(uploadedFiles.map((f) => f.file));
          }}
          options={options}
          onChange={onChange}
          isUploading={isProses}
        />
      )}
    </div>
  );
};

export default CropImagePage;
