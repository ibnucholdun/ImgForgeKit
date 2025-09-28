"use client";
import { upload } from "@imagekit/next";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import CompressImageView from "./_components/CompressImageView";
import LoadingUplaod from "./_components/LoadingUplaod";
import UploadedView from "./_components/UploadedView";

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

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col">
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

      {uploaded && <UploadedView url={uploaded.url} name={uploaded.name} />}
    </div>
  );
};

export default CompressImagePage;
