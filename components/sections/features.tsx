"use client";

import React, { useEffect, useRef } from "react";
import { Container } from "@/components/container";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  ValueAnimationTransition,
} from "framer-motion";

interface TabsProps {
  icon: string;
  title: string;
  isNew: boolean;
}

const tabs: TabsProps[] = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "Clean & Intuitive Dashboard",
    isNew: false,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One Click Redesign",
    isNew: true,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "AI-Powered Image Analysis",
    isNew: false,
  },
];

export const Features = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container className="p-4 md:p-8 relative z-10">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-semibold text-center tracking-tight">
          Transform Your Room with AI
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto text-center mt-5">
          Upload a room photo, describe your dream style, and let AI redesign
          your space into something stunning.
        </p>

        {/* Features Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map((tab) => (
            <FeatureTab key={tab.title} {...tab} />
          ))}
        </div>
      </Container>

      {/* Soft Glow Background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8c45ff]/20 blur-[200px] rounded-full pointer-events-none" />
    </section>
  );
};

const FeatureTab = ({ icon, title, isNew }: TabsProps) => {
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);
  const xPerencetage = useMotionValue(0);
  const yPerecetage = useMotionValue(0);
  const tabRef = useRef<HTMLDivElement>(null);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPerencetage}% ${yPerecetage}%, black ,transparent)`;

  useEffect(() => {
    if (!tabRef.current) return;
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];
    const options: ValueAnimationTransition = {
      times,
      duration: 5,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };

    animate(xPerencetage, [0, 100, 100, 0, 0], options);
    animate(yPerecetage, [0, 0, 100, 100, 0], options);
  }, []);

  const handleTabHover = () => {
    if (dotLottieRef.current === null) return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      className="relative p-6 rounded-2xl flex flex-col items-center gap-4 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 hover:border-[#8c45ff]/60 transition-all duration-300"
    >
      {/* Animated border shimmer */}
      <motion.div
        style={{ maskImage }}
        className="absolute inset-0 -m-px rounded-2xl border border-[#A369FF]/70 pointer-events-none"
      ></motion.div>

      {/* Icon */}
      <div className="h-14 w-14 flex items-center justify-center rounded-xl border border-white/20 bg-[#0f0f1a]/60 shadow-[0_0_12px_#8c45ff]">
        <DotLottiePlayer ref={dotLottieRef} src={icon} className="h-8 w-8" />
      </div>

      {/* Title */}
      <div className="text-center font-medium text-lg">{title}</div>

      {/* Badge */}
      {isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  );
};
