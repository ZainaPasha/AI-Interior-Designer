"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader, Trash } from "lucide-react";
import { toast } from "sonner";
import { ProgressBar } from "./progress-bar";

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (value: string, publicId: string) => void;
  onRemove: (publicId: string) => void;
  value: { url: string; publicId: string } | null;
  location: string;
}

export const ImageUploader = ({
  disabled,
  onChange,
  onRemove,
  value,
  location,
}: ImageUploaderProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onDeleting, setOnDeleting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    onUpload(file);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] }, multiple: false });

  const onUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setProgress(0);

      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ai-room-designer");
      formData.append("folder", "/client");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setProgress(parseFloat(percent.toFixed(2)));
        }
      };

      xhr.onload = () => {
        setIsLoading(false); // ✅ move here
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const downloadUrl = response.secure_url;
          const publicId = response.public_id;
          onChange(downloadUrl, publicId);

          toast.success("Success", {
            description: "Image uploaded successfully",
          });
        } else {
          toast.error("Something went wrong", { description: xhr.statusText });
        }
      };

      xhr.onerror = () => {
        setIsLoading(false); // ✅ move here
        toast.error("Upload failed", {
          description: "Network error while uploading",
        });
      };

      xhr.send(formData);
    } catch (error) {
      setIsLoading(false); // ✅ still keep for safety
      toast.error("Error uploading image", {
        description: (error as Error).message,
      });
    }
  };

  const onDelete = async (publicId: string) => {
    setOnDeleting(true);
    try {
      if (!publicId) {
        toast.error("No Image to delete");
        return;
      }

      const res = await fetch("/api/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!res.ok) throw new Error("Failed to delete image");

      onRemove(publicId);
      toast.success("Image removed successfully");
    } catch (error) {
      toast.error("Failed to delete image", {
        description: (error as Error).message,
      });
    } finally {
      setOnDeleting(false);
    }
  };

  if (!isMounted) return null;
  return (
    <div className="w-full">
      {value ? (
        <div className="w-full flex-1/2 h-full aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-input bg-muted dark:bg-muted/50">
          <Image
            fill
            className="w-full h-full object-cover"
            alt="Uploaded Image"
            src={value.url}
            priority
          />
          <div
            className="absolute z-10 top-2 right-2 cursor-pointer"
            onClick={() => onDelete(value!.publicId)}
          >
            <Button
              size={"icon"}
              variant={"destructive"}
              className="cursor-pointer"
            >
              {onDeleting ? <Loader className="animate-spin" /> : <Trash />}
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `w-full h-full aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-dashed transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-100 dark:bg-blue-950"
                : isDragReject
                ? "border-red-500 bg-red-100 dark:bg-red-950"
                : "border-input bg-muted dark:bg-muted/50"
            }`,
          })}
        >
          <input {...getInputProps()} disabled={disabled || isLoading} />
          {isLoading ? (
            <div className="flex flex-col gap-2 w-full px-4">
              <ProgressBar progress={progress} />
              <p className="text-sm text-gray-400 text-center">
                {progress.toFixed(0)}%
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-muted-foreground">
              <ImagePlus className="w-10 h-10" />
              <p>
                {isDragActive
                  ? "Drop it here..."
                  : "Drag & Drop an image, or click to select one"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
