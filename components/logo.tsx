import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocalFont from 'next/font/local'
import { cn } from '@/lib/utils'

const headingFont=LocalFont({
    src:"../public/fonts/font.woff2"
})

const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src={"/logo.png"}
                    alt='logo'
                    height={60}
                    width={60}
                />
                <p className={cn("text-lg text-neutral-500 pb-1",headingFont.className)}>Nimbopro</p>
            </div>
        </Link>
    )
}

export default Logo