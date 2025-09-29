 
"use server";

import ImageKit from "@imagekit/nodejs";
import { env } from "~/env";

const imagekit = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export async function deleteImage(fileId: string) {
  try {
    await imagekit.files.delete(fileId);
  } catch (err) {
    console.error("Failed to delete image in ImageKit:", err);
  }
}
