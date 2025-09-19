"use client";

import React from "react";
import { LogoContainer } from "@/components/logo-container";
import { Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/container";

export const Footer = () => {
  return (
    <footer id="footer" className="py-8 border-t border-white/15 bg-black">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:px-12">
        {/* Left Section: Logo, Punchline, Copyright */}
        <div className="flex flex-col items-start gap-2">
          <LogoContainer />
          <p className="text-white/70 text-sm font-medium">
            Transforming spaces, one design at a time.
          </p>
          <span className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} InterioAI
          </span>
        </div>

        {/* Right Section: Contact Icons */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:zaina.bint.pasha@gmail.com"
            className="flex items-center gap-1 text-white/40 hover:text-white transition text-sm"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/zaina-pasha-34a875227/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </Container>
    </footer>
  );
};
