import { v2 as cloudinary } from "cloudinary";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const configured =
  Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
  Boolean(process.env.CLOUDINARY_API_KEY) &&
  Boolean(process.env.CLOUDINARY_API_SECRET);

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function isCloudinaryConfigured() {
  return configured;
}

export type UploadResult = {
  url: string;
  publicId: string;
};

export async function uploadDocument(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<UploadResult> {
  if (configured) {
    const resourceType = mimeType.startsWith("image/") ? "image" : "raw";
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER || "mon-dossier",
          resource_type: resourceType,
          public_id: `${Date.now()}-${filename.replace(/\.[^.]+$/, "")}`,
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );
      stream.end(buffer);
    });
  }

  // Local fallback when Cloudinary env vars are not set
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const ext = path.extname(filename) || guessExt(mimeType);
  const publicId = `local/${randomUUID()}${ext}`;
  const diskName = publicId.replace("local/", "");
  await writeFile(path.join(uploadsDir, diskName), buffer);
  return {
    url: `/uploads/${diskName}`,
    publicId,
  };
}

function guessExt(mimeType: string) {
  if (mimeType === "application/pdf") return ".pdf";
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/webp") return ".webp";
  return "";
}
