"use client";
import React, { useRef, useState } from "react";
import UploadedView from "./_components/UploadedView";
import LoadingUplaod from "../../components/LoadingUplaod";
import clsx from "clsx";
import { upload } from "@imagekit/next";
import { useRouter } from "next/navigation";
import type { RootState } from "~/redux/store";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import HomeFeature from "~/components/HomeFeature";
import {
  setRemovedFile,
  setIsProses,
} from "~/redux/slices/removeBackgroundSlice";

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

const RemoveBackgroundPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const dispatch = useAppDispatch();
  const { removedFiles, isProses } = useAppSelector(
    (state: RootState) => state.removeBackground,
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

  const removeBackground = async (files: File[]) => {
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

      const removeBackgroundFile = results.map((file) => ({
        removedUrl: `${file.url}?tr=rt-auto,e-bgremove,f-auto`,
        fileId: file.fileId!,
      }));
      dispatch(setRemovedFile(removeBackgroundFile));
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
      await removeBackground([file]);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const removeBackgroundButton = () => {
    dispatch(setIsProses(true));
    router.push(`/remove-background/download/${id}`);
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
        <LoadingUplaod feature="Removing" />
      ) : (
        <HomeFeature
          selectFile={selectFile}
          uploadFile={handleFileSelect}
          fileInputRef={fileInputRef}
          uploaded={uploadedFiles[uploadedFiles.length - 1] ?? null}
          title="Remove Background"
          description={
            <p className="mb-8 text-base text-gray-600 md:text-lg dark:text-gray-300">
              Instantly remove the background from your JPG or PNG images.{" "}
              <br />
              Get clean, transparent results with professional-grade quality.
            </p>
          }
        />
      )}

      {uploadedFiles.length > 0 && !isProses && (
        <UploadedView
          data={uploadedFiles}
          title="Remove Background"
          buttonName="Remove Background"
          removeBackgroundFile={removedFiles}
          hanldeButtonProcess={removeBackgroundButton}
        >
          <></>
        </UploadedView>
      )}
    </div>
  );
};

export default RemoveBackgroundPage;
