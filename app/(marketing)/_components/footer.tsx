import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full border-t border-border/60 bg-background">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                    <Logo />
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Nimbopro. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-1">
                    <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <Link href="/terms">Terms of Service</Link>
                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
