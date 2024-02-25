"use client"
import Logo from '@/components/logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
    return (
        <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-black flex items-center'>
            <MobileSidebar />
            <div className="flex items-center gap-4">
                <div className='hidden md:flex '>
                    <Logo />
                </div>
            </div>

            <div className="ml-auto flex items-center gap-x-2 ">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl='select-org'
                    afterSelectOrganizationUrl={"/organization/:id"}
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        },
                        variables: {
                            colorText: "#fff"
                        },

                    }}
                />

                <UserButton afterSignOutUrl='/' appearance={{
                    elements: {
                        avatarBox: {
                            height: 30,
                            width: 30
                        }
                    }
                }} />
            </div>
        </nav >
    )
}

export default Navbar