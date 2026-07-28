"use client"
import Logo from '@/components/logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { clerkAppearance } from '@/lib/clerk-appearance'

const Navbar = () => {
    return (
        <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-gray-900 flex items-center'>
            <MobileSidebar />
            <div className="flex items-center gap-4">
                <div className='hidden md:flex'>
                    <Logo />
                </div>
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