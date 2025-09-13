"use client";

import React from "react";
import { Container } from "@/components/container";
import { LogoContainer } from "@/components/logo-container";
import { NavMenu } from "@/components/nav-menu";
import Link from "next/link";
import { GenerateButton } from "./generate-button";
import { UserButton } from "@clerk/nextjs";
import { ToggleContainer } from "./toggle-container";

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  return (
    <header className="p-4 md:px-6 md:py-12 border-b border-input md:border-none sticky top-2 z-10 backdrop-blur md:backdrop-blur-none">
      <Container>
        <div className="flex items-center justify-between border border-transparent md:border-white/15 p-2.5 rounded-xl max-w-4xl mx-auto md:backdrop-blur-md">
          {/* logo */}
          <LogoContainer />
          {/* menu */}
          <div className="hidden min-md:block">
            <NavMenu />
          </div>
          {/* toggle button */}
          <div className="flex gap-4 items-center">
            <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
              <GenerateButton label="Generate"/>
            </Link>

            <UserButton afterSignOutUrl="/" />
            <ToggleContainer isAuthenticated = {isAuthenticated}/>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
