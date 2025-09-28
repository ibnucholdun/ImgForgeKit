"use client";
import React, { useRef, useState } from "react";
import CompressImageView from "./_components/CompressImageView";
import UploadedView from "./_components/UploadedView";
import LoadingUplaod from "./_components/LoadingUplaod";
import clsx from "clsx";
import { upload } from "@imagekit/next";

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
  const [isProses, setIsProses] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dataImageKit, setDataImageKit] = useState<any[]>([]);

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

  const compressedFiles = dataImageKit.map((file: { url: string }) => ({
    compressedUrl: getTransformedUrl(file.url),
  }));

  const uploadAllToImageKit = async (files: File[]) => {
    setIsProses(true);
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
      setIsProses(false);

      console.log(compressedFiles);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      setIsProses(false);
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
        <LoadingUplaod />
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
          handleCompressImage={async () => {
            await uploadAllToImageKit(uploadedFiles.map((f) => f.file));
          }}
        />
      )}
    </div>
  );
};

export default CompressImagePage;
