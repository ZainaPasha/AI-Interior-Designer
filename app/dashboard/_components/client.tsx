"use client";

import { CustomSelect } from "@/components/custom-select";
import { ImageUploader } from "@/components/image-uploader";
import { ToolTipButton } from "@/components/tool-tip-button";
import { Textarea } from "@/components/ui/textarea";
import { aiStyles, roomStyles } from "@/lib/helper";
import { FilterX, RefreshCcw, Save } from "lucide-react";
import { useState } from "react";

interface ClientProps {
  user: {
    id: string;
    fullName: string | null;
    imageUrl: string;
    email: string;
  };
}

export const Client = ({ user }: ClientProps) => {
  const [room, setRoom] = useState<string | null>(null);
  const [aitStyle, setAIStyle] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRoomChange = (value: string) => {
    setRoom(value);
  };

  const handleAIStyleChange = (value: string) => {
    setAIStyle(value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const clearAllFilters = () => {};
  const saveTheResults = () => {};
  const handleGenerate = () => {};
  const handleImageUpload = (url:string) => {
    setUploadedImage(url);
  };
  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  return (
    <div className="my-12 w-full p-4 rounded-md border border-input space-y-4">
      <div className="w-full grid grid-cols-1 min-md:grid-cols-3 gap-4">
        <div className="w-full space-y-4 col-span-1 p-10 border border-input rounded-md">
          <CustomSelect
            placeholder="Select Your Space"
            options={roomStyles}
            onChange={handleRoomChange}
            value={room}
          />

          <CustomSelect
            placeholder="Select Space Style"
            options={aiStyles}
            onChange={handleAIStyleChange}
            value={room}
          />
        </div>
        <div className="w-full space-y-4 col-span-2 relative p-10 border border-input rounded-md">
          <Textarea
            placeholder="Type your dream space as a prompt here..."
            onChange={handlePromptChange}
            className="min-h-[100px]"
          />
          <div className="absolute top-0 right-0">
            <ToolTipButton
              content="Clear all filters"
              onClick={clearAllFilters}
              icon={<FilterX className="min-w-4 min-h-4" />}
            />
            <ToolTipButton
              content="Save the results"
              onClick={saveTheResults}
              disabled={!outputImage || isSaving}
              loading={isSaving}
              icon={<Save className="min-h-4 min-w-4" />}
            />
          </div>
          <ToolTipButton
            content="Generate"
            icon={<RefreshCcw />}
            onClick={handleGenerate}
            label="Generate"
            buttonSize="default"
            buttonVariant={"default"}
            loading={loading}
            buttonClassName="w-full"
            disabled={!uploadedImage || loading}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 min-md:grid-cols-2 gap-4">
        <ImageUploader location="clients" onChange={handleImageUpload} onRemove={handleImageRemove} value={uploadedImage}/>
      </div>
    </div>
  );
};
