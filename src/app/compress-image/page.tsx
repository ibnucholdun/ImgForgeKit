"use client";
import React, { useRef, useState } from "react";
import CompressImageView from "./_components/CompressImageView";
import UploadedView from "./_components/UploadedView";
import LoadingUplaod from "./_components/LoadingUplaod";
import clsx from "clsx";
import { upload, type UploadResponse } from "@imagekit/next";
import { useRouter } from "next/navigation";
import { setCompressedFiles, setIsProses } from "~/redux/slices/compressSlice";
import type { RootState } from "~/redux/store";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";

export interface UploadedFile {
  url: string;
  file: File;
  name: string;
}

interface UploadAuthResponse {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

const CompressImagePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dataImageKit, setDataImageKit] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const isProses = useAppSelector(
    (state: RootState) => state.compress.isProses,
  );
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const objectUrl = URL.createObjectURL(file);

    setUploadedFiles((prev) => [
      ...prev,
      { url: objectUrl, file, name: file.name },
    ]);
  };

  const getTransformedUrl = (
    originalUrl: string,
    {
      quality = "auto",
      format = "jpg",
    }: { quality?: string | number; format?: string } = {},
  ) => {
    const params: string[] = [];

    if (format) params.push(`f-${format}`);
    if (quality) params.push(`q-${quality}`);

    const transform = params.length ? `?tr=${params.join(",")}` : "";
    return `${originalUrl}${transform}`;
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

      const compressedFiles = results.map((file) => ({
        compressedUrl: getTransformedUrl(file.url!),
        fileId: file.fileId!,
      }));
      dispatch(setCompressedFiles(compressedFiles));
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      dispatch(setIsProses(false));
      router.push(`/compress-image/download/${id}`);
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
        <LoadingUplaod feature="Compressing" />
      ) : (
        <CompressImageView
          selectFile={selectFile}
          uploadFile={handleFileSelect}
          fileInputRef={fileInputRef}
          uploaded={uploadedFiles[uploadedFiles.length - 1] ?? null}
        />
      )}

      {uploadedFiles.length > 0 && dataImageKit.length === 0 && (
        <UploadedView
          selectFile={selectFile}
          isUploading={isProses}
          data={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          handleCompressImage={async () => {
            await uploadAllToImageKit(uploadedFiles.map((f) => f.file));
          }}
        />
      )}
    </div>
  );
};

export default CompressImagePage;
