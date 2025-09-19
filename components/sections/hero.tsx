"use client";

import React, { useRef } from "react";
import { Container } from "@/components/container";
import { GenerateButton } from "@/components/generate-button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  isAuthenticated: boolean;
  userId: string | null;
}

export const Hero = ({ isAuthenticated }: HeroProps) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-150, 150]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-[492px] md:h-[800px] flex items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
    >
      {/* ===== Glass Ripple Filter ===== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <filter id="rippleFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01 0.02"
            numOctaves="3"
            result="turb"
          >
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.01 0.02;0.02 0.01;0.01 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>

      {/* ===== Background Layer with Ripple ===== */}
      <motion.div
        style={{
          filter: "url(#rippleFilter)",
          backgroundPositionY,
        }}
        className="absolute inset-0"
      >
        {/* animated gradient blobs */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[500px] w-[500px] bg-purple-500/30 rounded-full blur-3xl top-1/4 left-1/4"
        />
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[600px] w-[600px] bg-pink-500/20 rounded-full blur-3xl bottom-1/4 right-1/4"
        />
      </motion.div>

      {/* ===== Content ===== */}
      <Container className="relative mt-1 z-10">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[96px] font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white leading-[1.4]"
        >
          AI Interior Designer
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-white/80 mt-5 text-center"
        >
          Upload your room photo, describe your dream style, <br /> and let AI
          redesign it into a stunning new space.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex justify-center mt-8"
        >
          <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
            <GenerateButton label="Redesign my room" />
          </Link>
        </motion.div>
      </Container>
    </motion.section>
  );
};
