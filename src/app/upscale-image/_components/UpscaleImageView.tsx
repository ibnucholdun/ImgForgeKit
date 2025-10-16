"use client";
import React, { useRef, useState } from "react";
import UploadedView from "./UploadedView";
import LoadingUplaod from "../../../components/LoadingUplaod";
import clsx from "clsx";
import { upload } from "@imagekit/next";
import { useRouter, useSearchParams } from "next/navigation";
import type { RootState } from "~/redux/store";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import HomeFeature from "~/components/HomeFeature";
import AsideUploadedView from "./AsideUploadedView";
import {
  setUpscaledTwoFile,
  setIsProses,
  setBaseData,
  setUpscaledFile,
} from "~/redux/slices/upscaleSlice";

export interface UploadedFile {
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

const UpscaleImageView = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const dispatch = useAppDispatch();
  const { upscaledTwoFiles, upscaledFourFiles, isProses } = useAppSelector(
    (state: RootState) => state.upscale,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = crypto.randomUUID();
  const scale = Number(searchParams.get("scale") ?? 2);
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

  const upscaleImage = async (files: File[]) => {
    try {
      const authParams = await getUploadAuth();
      const results = await Promise.all(
        files.map(async (file) => {
          return upload({
            file,
            fileName: file.name,
            folder: "/ImgForgeKit",
            ...authParams,
          });
        }),
      );

      const filesData = results.map((file) => ({
        url: file.url,
        width: file.width,
        height: file.height,
        fileId: file.fileId,
      }));
      dispatch(setBaseData(filesData));

      const upscaledTwoFiles = results.map((file) => ({
        upscaledUrl: `${file.url}?tr=e-upscale,w-${(file.width ?? 0) * 2},h-${(file.height ?? 0) * 2}`,
        fileId: file.fileId!,
      }));
      dispatch(setUpscaledTwoFile(upscaledTwoFiles));
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const objectUrl = URL.createObjectURL(file);
    const id = crypto.randomUUID();

    setUploadedFiles((prev) => [
      ...prev,
      {
        id,
        url: objectUrl,
        file,
        name: file.name,
        width: null,
        height: null,
      },
    ]);
    try {
      const { width, height } = await getDimsFromFile(file);
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, width, height } : f)),
      );

      await upscaleImage([file]);
      router.push(`/upscale-image?scale=2`);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const upscaleButton = () => {
    dispatch(setIsProses(true));

    const s = scale === 4 ? 4 : 2;
    const selected = s === 4 ? upscaledFourFiles : upscaledTwoFiles;

    dispatch(setUpscaledFile(selected));
    router.push(`/upscale-image/download/${id}`);
    setTimeout(() => dispatch(setIsProses(false)), 1000);
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
        <LoadingUplaod feature="Upscaling" />
      ) : (
        <HomeFeature
          selectFile={selectFile}
          uploadFile={handleFileSelect}
          fileInputRef={fileInputRef}
          uploaded={uploadedFiles[uploadedFiles.length - 1] ?? null}
          title="Upscale Image"
          description={
            <p className="mb-8 text-base text-gray-600 md:text-lg dark:text-gray-300">
              Easily increase the resolution of your images with our <br />
              advanced upscaling tool.
            </p>
          }
        />
      )}

      {uploadedFiles.length > 0 && !isProses && (
        <UploadedView
          data={uploadedFiles}
          title="Upscale Image"
          buttonName="Upscale IMAGE"
          upscaledFiles={upscaledTwoFiles}
          hanldeButtonProcess={upscaleButton}
        >
          <AsideUploadedView data={uploadedFiles} />
        </UploadedView>
      )}
    </div>
  );
};

export default UpscaleImageView;
