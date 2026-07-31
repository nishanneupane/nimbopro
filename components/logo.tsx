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
    <Link href={"/"} className="transition hover:opacity-80">
      <div className="flex items-center gap-x-2">
        <Image
          src={"/logo.png"}
          alt="Nimbopro logo"
          height={24}
          width={24}
          className="rounded-md"
        />
        <p
          className={cn(
            "pb-0.5 text-lg font-semibold tracking-tight text-foreground",
            headingFont.className,
          )}
        >
          Nimbopro
        </p>
      </div>
    </Link>
  );
};

export default Logo;
