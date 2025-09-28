"use client";
import { upload } from "@imagekit/next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CompressImageView from "./_components/CompressImageView";
import LoadingUplaod from "./_components/LoadingUplaod";
import UploadedView from "./_components/UploadedView";
import clsx from "clsx";

interface UploadAuthResponse {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

export interface UploadedFile {
  url: string | undefined;
  name: string | undefined;
}

const CompressImagePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);

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

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    setIsUploading(true);
    try {
      const authParams = await getUploadAuth();
      const res = await upload({
        file,
        fileName: file.name,
        folder: "/ImgForgeKit",
        ...authParams,
      });

      setUploaded({ url: res.url, name: res.name });

      toast.success("Upload successful!");
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (uploaded) {
      const existing = sessionStorage.getItem("uploadedFiles");
      let files: UploadedFile[] = [];

      try {
        files = existing ? JSON.parse(existing) : [];
      } catch (e) {
        files = [];
      }

      if (!Array.isArray(files)) {
        files = [files];
      }

      const updated = [...files, uploaded];
      sessionStorage.setItem("uploadedFiles", JSON.stringify(updated));

      const dataUploaded = sessionStorage.getItem("uploadedFiles");
      if (dataUploaded) {
        try {
          const parsed: any[] = JSON.parse(dataUploaded);
          setData(parsed);
        } catch (e) {
          console.error("Failed to parse sessionStorage:", e);
        }
      }
    }
  }, [uploaded]);

  return (
    <div
      className={clsx(
        "flex flex-col",
        uploaded ? "min-h-[calc(100vh-137px)]" : "min-h-[calc(100vh-200px)]",
      )}
    >
      {isUploading ? (
        <LoadingUplaod />
      ) : (
        <CompressImageView
          selectFile={selectFile}
          uploadFile={uploadFile}
          fileInputRef={fileInputRef}
          uploaded={uploaded}
        />
      )}

      {uploaded && (
        <UploadedView
          selectFile={selectFile}
          isUploading={isUploading}
          data={data}
        />
      )}
    </div>
  );
};

export default CompressImagePage;
