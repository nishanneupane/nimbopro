import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocalFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = LocalFont({
  src: "../public/fonts/font.woff2",
});

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="group inline-flex items-center gap-2 transition hover:opacity-90"
    >
      <Image
        src={"/logo.png"}
        alt="Nimbopro logo"
        height={28}
        width={28}
        priority
        className="h-7 w-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className={cn(
          "text-[1.15rem] font-semibold leading-none tracking-tight text-foreground",
          headingFont.className,
        )}
      >
        Nimbopro
      </span>
    </Link>
  );
};

export default Logo;
