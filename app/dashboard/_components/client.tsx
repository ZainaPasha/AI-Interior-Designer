"use client";

import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { CustomSelect } from "@/components/custom-select";
import { ImageUploader } from "@/components/image-uploader";
import { ProgressBar } from "@/components/progress-bar";
import { ToolTipButton } from "@/components/tool-tip-button";
import { Textarea } from "@/components/ui/textarea";
import { aiStyles, roomStyles } from "@/lib/helper";
import { FilterX, Info, Loader, RefreshCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateFromHuggingFaceModel } from "@/actions/generate-from-hugging-face";
import { set } from "react-hook-form";
import { resolveTxt } from "dns";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const router = useRouter();

  const handleRoomChange = (value: string) => {
    setRoom(value);
  };

  const handleAIStyleChange = (value: string) => {
    setAIStyle(value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  
  const handleRoomReset = ()=>{
    setRoom(null);
  }

  const handleAIStyleReset = ()=>{
    setAIStyle(null);
  }

  const clearAllFilters = () => {
  if(uploadedImage && !isSaving){
    toast.warning("Please delete the uploaded image to clear all filters");
    return;
  }
  handleRoomReset();
  handleAIStyleReset();
  setPrompt("");
  setOutputImage(null);
  setUploadedImage(null);
  setProgress(0);
  setIsSaving(false);
  };

  const clearAfterSave = () => {
    setUploadedImage(null);
    setOutputImage(null);
    setPrompt("");
    setRoom(null);
    setAIStyle(null);
    setProgress(0);
    setIsSaving(false);
  }

  const saveTheResults = async() => {
     if(!uploadedImage || !outputImage){
      toast.error("Please generate an image before saving")
      return
     }

     try {
      setIsSaving(true)
      const response = await axios.post('/api/results',{
        uploadedImage: uploadedImage.url, 
        outputImage,
        prompt,
        roomStyle: room ?? "Default",
        aitStyle: aitStyle ?? "Default",
        userName: user.fullName ?? "Unknown User",
        userImage: user.imageUrl ?? "/assets/img/avatar.jpg",
      })

      if(response.data?.success){
        toast.success("Results saved successfully");
        router.refresh()
        clearAfterSave();
      }else{
        toast.error("Failed to save the results. Please try again.");
      }
     } catch (error) {
      
     }finally{
      setIsSaving(false)
     }
  };


  // const handleGenerate = async() => {
  //   if (!uploadedImage) return;
  //   try {
  //     setLoading(true);
  //     const result = await generateFromHuggingFaceModel({
  //       imageUrl: uploadedImage.url,
  //       prompt: `${prompt} ${room? `Room Style: ${room}`:""} ${aitStyle? `AI Style: ${aitStyle}`:""}. Make sure the image is high quality(1800p) and make sure the ratio is 16:9 and visually appealing.`,
  //     })
  //     setOutputImage(result);
  //   } catch (error) {
  //     toast.error("Failed to generate room design. Please try again.");
  //   } finally{
  //     setLoading(false);
  //   }
  // };

const handleGenerate = async () => {
  if (!uploadedImage) return;
  setLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: uploadedImage.url,
        prompt: `${prompt} ${room ? `Room Style: ${room}` : ""} ${aitStyle ? `AI Style: ${aitStyle}` : ""}`,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.success) {
      setOutputImage(data.outputImage); // ✅ permanent Cloudinary URL
    } else {
      toast.error("Generation failed");
    }
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const handleImageUpload = (url: string, publicId: string) => {
    setUploadedImage({ url, publicId });
  };

  const handleImageRemove = (publicId: string) => {
    setUploadedImage(null);
  };

  useEffect(()=>{
    setProgress(0);
    let interval: NodeJS.Timeout;
    if(loading){
      interval = setInterval(()=>{
        setProgress((prev)=>(prev < 95 ? prev + 5 : prev));
      }, 300);
    }else if(!loading && progress !== 100){
      setProgress(100);
      const timeout = setTimeout(()=>{
        setProgress(0);
      }, 1000)
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [loading])

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
            value={aitStyle}
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
        <ImageUploader
          location="clients"
          onChange={handleImageUpload}
          onRemove={handleImageRemove}
          value={uploadedImage}
        />
        <div className="w-full aspect-square relative rounded-md border border-input bg-muted dark:bg-muted/50">
          {loading && !outputImage && (
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-lg text-blue-500 animate-pulse">
                  Generating...
                </span>
              </div>
              <div className="w-full mt-4 h-40 flex items-center justify-center">
                <ProgressBar progress={progress} />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span>
                  Keep waiting, this might take a while...Please dont&apos;t
                  close the tab
                </span>
              </div>
            </div>
          )}

          {!loading && !outputImage && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Info className="my-2 text-muted-foreground" />
              <span className="text-lg text-muted-foreground">
                Start analysing the image
              </span>
            </div>
          )}

          {outputImage && (
            <ReactBeforeSliderComponent
              firstImage={{imageUrl: uploadedImage?.url || "https://via.placeholder.com/600x400"}}
              secondImage={{imageUrl: outputImage || "https://via.placeholder.com/600x400"}}
            />
          )}
        </div>
      </div>
    </div>
  );
};
