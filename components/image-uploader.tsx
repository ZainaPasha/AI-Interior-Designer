"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader, Trash } from "lucide-react";

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string | null;
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

  const onUpload = (file: File) => {
    console.log(file);
  };

  const onDelete = () => {};

  if (!isMounted) return null;
  return (
    <div className="w-full">
      {value ? (
        <div className="w-full flex-1/2 h-full aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-input bg-muted dark:bg-muted/50">
          <Image
            fill
            className="w-full h-full object-cover"
            alt="Uploaded Image"
            src={value}
            priority
          />
          <div
            className="absolute z-10 top-2 right-2 cursor-pointer"
            onClick={onDelete}
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
          {
            isLoading ? (
              <div className="flex flex-col gap-2">
                {/* progress */}
                <p>progress</p>
              </div>):(<div className="w-full h-full flex flex-col gap-2 items-center justify-center text-muted-foreground">
                <ImagePlus className="w-10 h-10"/>
                <p>{isDragActive?"Drop it here...": "Drag & Drop an image, or click to select one"}</p>
              </div>
            )
          }

        </div>
      )}
    </div>
  );
};
