"use client";

import { GenerateRoom } from "@/lib/generated/prisma";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface DesignsProps {
  designs: GenerateRoom[];
  isDesignPage?: boolean;
  userId: string | null;
}

export const Designs = ({
  designs,
  isDesignPage = false,
  userId,
}: DesignsProps) => {
  if (designs.length === 0) return null;
  return (
    <Container className="pb-40 space-y-4">
      {!isDesignPage && (
        <h2 className="text-xl text-muted-foreground font-bold tracking-wider">
          Your Designs
        </h2>
      )}

      <div className="w-full grid grid-cols-1 min-md:grid-cols-3 gap-4">
        {designs.map((designs) => (
          <DesignCard key={designs.id} design={designs} userId={userId} />
        ))}
      </div>
    </Container>
  );
};

const DesignCard = ({
  design,
  userId,
}: {
  design: GenerateRoom;
  userId: string | null;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleFavorite = async () => {
    setIsLoading(true)
    try{
        const response = await axios.patch(`/api/results/${design.id}`)
        if(response.data.success){
            toast.success("Favourites", {
                description:"Updated favourites successfully"
            })
            router.refresh();
        }else{
            toast.info("Favourites", {description:"Failed to update favourites"})
        }
    }catch(error){
      console.error("Error toggling favourites:", error)
    }finally{
        setIsLoading(false)
    }
  };
  const isFavorite = design.favourites?.includes(userId || "unknown-user");
  return (
    <Card className="p-2 rounded-md shadow-none border-input hover:shadow-md gap-3 relative">
      {design.favourites?.length > 0 && (
        <Badge className="absolute top-3 left-3 z-50 rounded-sm bg-black/70 font-semibold text-white">
          {design?.favourites.length.toLocaleString("en-IN")} Liked
        </Badge>
      )}

      <div className="w-full aspect-square rounded-md overflow-hidden h-full">
        <ReactBeforeSliderComponent
          key={design.outputImage} // 🔑 forces rerender when output changes
          firstImage={{ imageUrl: design?.uploadedImage }}
          secondImage={{ imageUrl: design?.outputImage }}
        />
      </div>

      <div className="w-full flex items-center justify-start">
        <HoverCard openDelay={0} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-sm max-w-full truncate whitespace-nowrap overflow-hidden block text-muted-foreground">
              {design?.prompt}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="min-w-sm text-sm">
            {design?.prompt}
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="w-ful flex items-center justify-between">
        {design?.userImage && (
          <div className="flex items-center gap-2">
            <Image
              src={design?.userImage}
              width={30}
              height={30}
              priority
              alt={design?.userName}
              className="object-cover rounded-full"
            />
            <div>
              <p className="w-24 truncate font-semibold">{design?.userName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(design?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"} className="text-xs rounded-sm">
            {design?.roomStyle}
          </Badge>
          <Badge variant={"secondary"} className="text-xs rounded-sm">
            {design?.aiStyle}
          </Badge>
        </div>

        {userId && (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={toggleFavorite}
            className="cursor-pointer"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <Heart fill={isFavorite ? "#ff0000" : "#999"} strokeWidth={0} />
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};
