"use client"
import Logo from '@/components/logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { clerkAppearance } from '@/lib/clerk-appearance'

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b border-border/60 px-4 glass">
            <MobileSidebar />
            <div className="hidden items-center md:flex">
                <Logo />
            </div>

            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl='select-org'
                    afterSelectOrganizationUrl={"/organization/:id"}
                    appearance={clerkAppearance}
                />

                <UserButton
                    afterSignOutUrl='/'
                    appearance={clerkAppearance}
                />
            </div>
        </nav>
    )
}

export default Navbar
