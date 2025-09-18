"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FunnelX } from "lucide-react";

export const FilterControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPopularity = searchParams.get("popularity") ?? "";
  const currentDate = searchParams.get("date") ?? "";

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/designs?${params.toString()}`);
  };

  const handleClear = () => {
    router.push("/designs");
  };
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Select value={currentPopularity}
      onValueChange={(val)=> handleChange("popularity", val)}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Sort by Popularity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular_desc">Most Popular</SelectItem>
          <SelectItem value="popular_asc">Least Popular</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center justify-center gap-2">
         <Select value={currentDate}
      onValueChange={(val)=> handleChange("date", val)}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Sort by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date_desc">Newest First</SelectItem>
          <SelectItem value="date_asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>

      <Button size="icon" variant="ghost" onClick={handleClear}><FunnelX className="h-4 w-4"/></Button>
      </div>
    </div>
  );
};
