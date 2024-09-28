import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-16 px-6 bg-gray-900 flex items-center z-10">
            <div className="max-w-7xl mx-auto flex items-center w-full justify-between">
                <Logo />

                <div className="flex items-center space-x-6">
                    <Link href="#features" className="text-white hover:text-gray-200 transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-white hover:text-gray-200 transition-colors">
                        Pricing
                    </Link>
                    <Button size="sm" variant="secondary" asChild className="bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar