import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="w-full p-4 border-t bg-slate-900">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />

                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"ghost"} asChild>
                        <Link href={"/privacy-policy"}>
                            Privacy Policy
                        </Link>
                    </Button>
                    <Button size={"sm"} variant={"ghost"} asChild>
                        <Link href={"/terms"}>
                            Terms of Service
                        </Link>

                    </Button>

                </div>
            </div>
        </div>
    )
}

export default Footer