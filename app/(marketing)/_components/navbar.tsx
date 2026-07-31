import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 h-16 w-full border-b border-border/60 glass">
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <Logo />

                <div className="flex items-center gap-1 sm:gap-2">
                    <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                        <Link href="#features">Features</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                        <Link href="#pricing">Pricing</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/sign-in">Log in</Link>
                    </Button>
                    <Button asChild size="sm" className="rounded-full px-4">
                        <Link href="/sign-up">Get started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
