import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/svg/logo.svg";

export const LogoContainer = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={Logo} alt="logo" className="w-auto h-8 md:h-12" />
      <p className="inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
        Interio
      </p>
    </div>
  );
};
