"use client";

import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  label: string;
}

export const GenerateButton = ({ label }: GenerateButtonProps) => {
  return (
    <Button
      size={"sm"}
      className="relative h-8 px-4 text-xs font-medium rounded-md
                 bg-[#0f0f1a] text-white
                 border border-[#8c45ff]/50
                 shadow-[0_0_6px_#8c45ff,0_0_12px_#8c45ff]
                 transition-all duration-300
                 hover:shadow-[0_0_10px_#8c45ff,0_0_20px_#8c45ff,0_0_40px_#8c45ff]
                 hover:bg-[#0f0f1a] hover:border-[#8c45ff]/70
                 focus-visible:outline-none
                 active:scale-95
                 disabled:opacity-50"
      // 👇 disables shadcn default overlay
      variant="ghost"
    >
      <span className="relative z-10">{label}</span>

      {/* Neon Glow Overlay */}
      <div
        className="absolute inset-0 rounded-md
                   bg-gradient-to-b from-[#8c45ff]/20 to-transparent
                   blur-lg opacity-60
                   transition duration-500
                   group-hover:opacity-80"
      />
    </Button>
  );
};
