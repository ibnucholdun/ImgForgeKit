"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="bg-surface-light dark:bg-surface-dark sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <Link className="flex items-center space-x-2" href="/">
            <div className="flex items-center justify-center space-x-2">
              <Image
                src={"/ImgForgeKit.png"}
                alt="iLoveIMG Logo"
                className="rounded-full"
                width={52}
                height={52}
              />
              <h1 className="text-primary text-xl font-semibold">
                ImgForgeKit
              </h1>
            </div>
          </Link>
          <div className="text-text-secondary-light dark:text-text-secondary-dark hidden items-center space-x-6 font-medium md:flex">
            <Link
              className={clsx(
                "hover:text-primary",
                pathname === "/compress-image" && "text-primary font-bold",
              )}
              href="/compress-image"
            >
              Compress Image
            </Link>
            <Link
              className={clsx(
                "hover:text-primary",
                pathname === "/resize-image" && "text-primary font-bold",
              )}
              href="/resize-image"
            >
              Resize Image
            </Link>
            <Link
              className={clsx(
                "hover:text-primary",
                pathname === "/crop-image" && "text-primary font-bold",
              )}
              href="/crop-image"
            >
              Crop Image
            </Link>
            <Link
              className={clsx(
                "hover:text-primary",
                pathname === "/convert-to-jpg" && "text-primary font-bold",
              )}
              href="/convert-to-jpg"
            >
              Convert to JPG
            </Link>
            <Link
              className={clsx(
                "hover:text-primary",
                pathname === "/photo-editor" && "text-primary font-bold",
              )}
              href="/photo-editor"
            >
              Photo Editor
            </Link>
            <div className="group relative">
              <button className="hover:text-primary group flex items-center space-x-1">
                <span>More Tools</span>
                <ChevronDown className="h-4 w-4 group-hover:hidden" />
                <ChevronUp className="hidden h-4 w-4 group-hover:inline" />
              </button>
              <div className="bg-surface-light dark:bg-surface-dark absolute hidden w-48 rounded-lg py-2 shadow-lg group-hover:block">
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/upscale-image"
                >
                  Upscale Image
                </Link>
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/remove-background"
                >
                  Remove Background
                </Link>
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/watermark-image"
                >
                  Watermark Image
                </Link>
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/meme-generator"
                >
                  Meme Generator
                </Link>
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/blur-face"
                >
                  Blur Face
                </Link>
                <Link
                  className="hover:bg-background-light dark:hover:bg-background-dark block px-4 py-2"
                  href="/html-to-image"
                >
                  HTML to Image
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
